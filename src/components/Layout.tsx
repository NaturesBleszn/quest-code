import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { 
  BookOpen, Code, Swords, Briefcase, FileCode2, 
  MessageSquare, HelpCircle, Newspaper, LayoutDashboard,
  Moon, Sun, Menu, X, Bell, UserPlus, Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type NotificationType = 'challenge' | 'friend' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'challenge', message: 'CodeNinja challenged you to a 1v1 duel!', time: '2m ago', read: false },
  { id: '2', type: 'friend', message: 'DataMiner sent you a friend request.', time: '1h ago', read: false },
  { id: '3', type: 'system', message: 'New Quest Learn module: Advanced React Patterns is now available.', time: '2h ago', read: true },
];

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Quest Learn", path: "/learn", icon: BookOpen },
  { name: "Code Range", path: "/range", icon: Code },
  { name: "Quest Battle", path: "/battle", icon: Swords },
  { name: "Code Pouch", path: "/pouch", icon: Briefcase },
  { name: "Quest Snippets", path: "/snippets", icon: FileCode2 },
  { name: "Quest Prompts", path: "/prompts", icon: MessageSquare },
  { name: "Quest Quiz", path: "/quiz", icon: HelpCircle },
  { name: "Article Quest", path: "/articles", icon: Newspaper },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const NotificationBell = ({ isMobile }: { isMobile?: boolean }) => (
    <div className="relative">
      <button 
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        className={cn(
          "p-2 rounded-lg transition-colors relative",
          isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        )}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className={cn(
            "absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2",
            isDarkMode ? "border-slate-900" : "border-white"
          )} />
        )}
      </button>

      <AnimatePresence>
        {isNotificationsOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsNotificationsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute z-50 w-80 rounded-2xl border shadow-xl overflow-hidden",
                isMobile 
                  ? "right-0 top-full mt-2" 
                  : "left-full top-0 ml-4",
                isDarkMode ? "bg-slate-900 border-slate-800 shadow-black/50" : "bg-white border-slate-200 shadow-slate-200/50"
              )}
            >
              <div className={cn(
                "p-4 border-b flex items-center justify-between",
                isDarkMode ? "border-slate-800" : "border-slate-200"
              )}>
                <h3 className="font-bold">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-emerald-500 hover:text-emerald-400 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className={cn("divide-y", isDarkMode ? "divide-slate-800/50" : "divide-slate-100")}>
                    {notifications.map(notification => (
                      <div 
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={cn(
                          "p-4 flex gap-3 cursor-pointer transition-colors",
                          !notification.read && (isDarkMode ? "bg-slate-800/30" : "bg-slate-50"),
                          isDarkMode ? "hover:bg-slate-800/50" : "hover:bg-slate-100"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          notification.type === 'challenge' ? "bg-red-500/20 text-red-500" :
                          notification.type === 'friend' ? "bg-blue-500/20 text-blue-500" :
                          "bg-emerald-500/20 text-emerald-500"
                        )}>
                          {notification.type === 'challenge' && <Swords className="w-5 h-5" />}
                          {notification.type === 'friend' && <UserPlus className="w-5 h-5" />}
                          {notification.type === 'system' && <Info className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm mb-1",
                            !notification.read ? (isDarkMode ? "text-slate-200 font-medium" : "text-slate-900 font-medium") : "text-slate-500"
                          )}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-500">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className={cn(
      "flex h-screen font-sans transition-colors duration-200 overflow-hidden",
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Mobile Header */}
      <div className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b transition-colors duration-200",
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      )}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl font-bold text-emerald-500 tracking-tight">QUEST CODE</h1>
        </div>
        <div className="flex items-center gap-1">
          <NotificationBell isMobile />
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDarkMode ? "text-slate-400 hover:text-emerald-400 hover:bg-slate-800" : "text-slate-500 hover:text-emerald-600 hover:bg-slate-100"
            )}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 border-r flex flex-col transition-all duration-300 transform",
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 hidden lg:flex items-center justify-between relative">
          <h1 className="text-2xl font-bold text-emerald-500 tracking-tight">QUEST CODE</h1>
          <div className="flex items-center gap-1">
            <NotificationBell />
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                isDarkMode ? "text-slate-400 hover:text-emerald-400 hover:bg-slate-800" : "text-slate-500 hover:text-emerald-600 hover:bg-slate-100"
              )}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div className="lg:hidden p-4 border-b border-slate-800/50 flex justify-end">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-4 lg:py-0 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 lg:py-2 rounded-lg transition-colors",
                  isActive 
                    ? (isDarkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600")
                    : (isDarkMode ? "text-slate-400 hover:bg-slate-800 hover:text-slate-200" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900")
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className={cn(
          "p-4 border-t transition-colors duration-200",
          isDarkMode ? "border-slate-800" : "border-slate-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white shrink-0">
              QC
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">Questcoder</div>
              <div className={cn("text-xs", isDarkMode ? "text-slate-500" : "text-slate-500")}>Level 12</div>
            </div>
          </div>
        </div>
      </aside>
      <main className={cn(
        "flex-1 overflow-y-auto transition-colors duration-200 pt-16 lg:pt-0",
        isDarkMode ? "bg-slate-950" : "bg-slate-50"
      )}>
        {children}
      </main>
    </div>
  );
}
