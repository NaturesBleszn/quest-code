import express from "express";
import { createServer as createViteServer } from "vite";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Create HTTP server
  const httpServer = createServer(app);

  // Initialize Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Socket.IO logic
  let waitingPlayer: string | null = null;
  const rooms: Record<string, { players: string[], code: string }> = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_battle", () => {
      if (waitingPlayer && waitingPlayer !== socket.id) {
        // Match found
        const roomId = `room_${waitingPlayer}_${socket.id}`;
        rooms[roomId] = { players: [waitingPlayer, socket.id], code: "" };
        
        socket.join(roomId);
        io.sockets.sockets.get(waitingPlayer)?.join(roomId);
        
        io.to(roomId).emit("battle_start", { roomId, players: rooms[roomId].players });
        waitingPlayer = null;
      } else {
        // Wait for a match
        waitingPlayer = socket.id;
        socket.emit("waiting_for_opponent");
      }
    });

    socket.on("code_update", ({ roomId, code }) => {
      if (rooms[roomId]) {
        rooms[roomId].code = code;
        socket.to(roomId).emit("opponent_code_update", code);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      if (waitingPlayer === socket.id) {
        waitingPlayer = null;
      }
      // Notify opponent if in a room
      for (const [roomId, room] of Object.entries(rooms)) {
        if (room.players.includes(socket.id)) {
          socket.to(roomId).emit("opponent_disconnected");
          delete rooms[roomId];
        }
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
