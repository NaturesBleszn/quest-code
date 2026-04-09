import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Swords, Users, UsersRound, Loader2, Code2, Play, Trophy, Medal } from "lucide-react";
import { io, Socket } from "socket.io-client";

type BattleStatus = 'idle' | 'searching' | 'in_battle';

const leaderboardData = [
  { rank: 1, name: "CodeNinja", rating: 2845, winRate: "92%", lang: "Python" },
  { rank: 2, name: "ByteMaster", rating: 2710, winRate: "88%", lang: "JavaScript" },
  { rank: 3, name: "AlgoRhythm", rating: 2650, winRate: "85%", lang: "C++" },
  { rank: 4, name: "SyntaxError", rating: 2590, winRate: "81%", lang: "Rust" },
  { rank: 5, name: "Questcoder", rating: 2420, winRate: "76%", lang: "TypeScript" },
];

export default function QuestBattle() {
  const [status, setStatus] = useState<BattleStatus>('idle');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [myCode, setMyCode] = useState('def solve():\n    # Write your solution here\n    pass');
  const [opponentCode, setOpponentCode] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const findMatch = () => {
    setStatus('searching');
    
    // Connect to Socket.IO server
    const socket = io();
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("join_battle");
    });

    socket.on("waiting_for_opponent", () => {
      setStatus('searching');
    });

    socket.on("battle_start", (data: { roomId: string, players: string[] }) => {
      setRoomId(data.roomId);
      setStatus('in_battle');
    });

    socket.on("opponent_code_update", (code: string) => {
      setOpponentCode(code);
    });

    socket.on("opponent_disconnected", () => {
      alert("Your opponent disconnected. You win by default!");
      setStatus('idle');
      setRoomId(null);
      setMyCode('def solve():\n    # Write your solution here\n    pass');
      setOpponentCode('');
      socket.disconnect();
    });
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setMyCode(newCode);
    if (socketRef.current && roomId) {
      socketRef.current.emit("code_update", { roomId, code: newCode });
    }
  };

  const leaveBattle = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    setStatus('idle');
    setRoomId(null);
    setMyCode('def solve():\n    # Write your solution here\n    pass');
    setOpponentCode('');
  };

  if (status === 'in_battle') {
    return (
      <div className="p-4 md:p-6 h-full flex flex-col max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <Swords className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">1v1 Duel</h2>
              <p className="text-sm text-slate-400">First to solve the challenge wins!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block mb-1">Time Elapsed</span>
              <span className="text-emerald-400 font-mono font-bold">00:00</span>
            </div>
            <button 
              onClick={leaveBattle}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Surrender
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* My Editor */}
          <div className="flex flex-col bg-slate-900 rounded-2xl border border-emerald-500/30 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200 text-sm">Your Code</span>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-xs font-bold transition-colors">
                <Play className="w-3 h-3" /> Run Tests
              </button>
            </div>
            <textarea 
              value={myCode}
              onChange={handleCodeChange}
              className="flex-1 w-full bg-transparent p-4 text-slate-300 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>

          {/* Opponent Editor (Read Only) */}
          <div className="flex flex-col bg-slate-900 rounded-2xl border border-red-500/30 overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.1)] opacity-80">
            <div className="flex items-center justify-between p-3 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-red-400" />
                <span className="font-bold text-slate-200 text-sm">Opponent's Code</span>
              </div>
              <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded">Live View</span>
            </div>
            <div className="flex-1 w-full bg-transparent p-4 text-slate-400 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              {opponentCode || '# Waiting for opponent to type...'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto h-full flex flex-col overflow-y-auto">
      <div className="mb-8 md:mb-12 text-center shrink-0">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Quest Battle</h1>
        <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto">
          Enter the PVP battleground to test your coding skills against other real, live Questcoders.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 shrink-0">
        <motion.div 
          whileHover={status === 'idle' ? { y: -5 } : {}}
          className={`bg-slate-900 rounded-3xl border ${status === 'searching' ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-slate-800 hover:border-red-500/50'} p-6 md:p-8 flex flex-col items-center justify-center text-center group transition-all`}
        >
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${status === 'searching' ? 'bg-red-500/20' : 'bg-red-500/10 group-hover:bg-red-500/20'} flex items-center justify-center mb-4 md:mb-6 transition-colors`}>
            {status === 'searching' ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                <Loader2 className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
              </motion.div>
            ) : (
              <Swords className="w-10 h-10 md:w-12 md:h-12 text-red-500" />
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">1v1 Duel</h2>
          <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8">Face off against a single opponent in a rapid-fire coding challenge.</p>
          
          {status === 'searching' ? (
            <button 
              onClick={() => {
                if (socketRef.current) socketRef.current.disconnect();
                setStatus('idle');
              }}
              className="px-6 md:px-8 py-2 md:py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors w-full"
            >
              Cancel Search
            </button>
          ) : (
            <button 
              onClick={findMatch}
              disabled={status !== 'idle'}
              className="px-6 md:px-8 py-2 md:py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 disabled:opacity-50 transition-colors w-full"
            >
              Find Match
            </button>
          )}
        </motion.div>

        <motion.div 
          whileHover={status === 'idle' ? { y: -5 } : {}}
          className={`bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 flex flex-col items-center justify-center text-center group ${status === 'idle' ? 'cursor-pointer hover:border-blue-500/50' : 'opacity-50'} transition-all`}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-500/20 transition-colors">
            <Users className="w-10 h-10 md:w-12 md:h-12 text-blue-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">2v2 Skirmish</h2>
          <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8">Team up with a partner to solve complex algorithmic puzzles.</p>
          <button disabled className="px-6 md:px-8 py-2 md:py-3 rounded-xl bg-blue-500/50 text-white/50 font-bold w-full cursor-not-allowed">
            Coming Soon
          </button>
        </motion.div>

        <motion.div 
          whileHover={status === 'idle' ? { y: -5 } : {}}
          className={`bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 flex flex-col items-center justify-center text-center group sm:col-span-2 md:col-span-1 ${status === 'idle' ? 'cursor-pointer hover:border-purple-500/50' : 'opacity-50'} transition-all`}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-purple-500/20 transition-colors">
            <UsersRound className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">3v3 War</h2>
          <p className="text-slate-400 text-sm md:text-base mb-6 md:mb-8">Form a squad for an epic architectural and debugging battle.</p>
          <button disabled className="px-6 md:px-8 py-2 md:py-3 rounded-xl bg-purple-500/50 text-white/50 font-bold w-full cursor-not-allowed">
            Coming Soon
          </button>
        </motion.div>
      </div>

      {/* Leaderboard Section */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shrink-0">
        <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Global Leaderboard</h2>
            <p className="text-sm text-slate-400">Top ranked Questcoders this season</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Rank</th>
                <th className="p-4 font-medium">Player</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Win Rate</th>
                <th className="p-4 font-medium">Main Lang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {leaderboardData.map((player) => (
                <tr 
                  key={player.rank} 
                  className={`transition-colors hover:bg-slate-800/50 ${player.name === 'Questcoder' ? 'bg-emerald-500/5' : ''}`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {player.rank === 1 && <Medal className="w-5 h-5 text-yellow-400" />}
                      {player.rank === 2 && <Medal className="w-5 h-5 text-slate-300" />}
                      {player.rank === 3 && <Medal className="w-5 h-5 text-amber-600" />}
                      <span className={`font-bold ${player.rank <= 3 ? 'text-white' : 'text-slate-400'}`}>
                        #{player.rank}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    {player.name}
                    {player.name === 'Questcoder' && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase tracking-wider">You</span>}
                  </td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">{player.rating}</td>
                  <td className="p-4 text-slate-300">{player.winRate}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">
                      {player.lang}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
