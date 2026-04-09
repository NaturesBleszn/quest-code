import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BookOpen, Code, Swords, Zap, Trophy, Target } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, Questcoder!</h1>
        <p className="text-slate-400 text-base md:text-lg">Ready to continue your coding journey?</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-slate-400">Current Streak</div>
              <div className="text-xl md:text-2xl font-bold text-white">14 Days</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-slate-400">Total XP</div>
              <div className="text-xl md:text-2xl font-bold text-white">12,450</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-800 sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-slate-400">Quests Completed</div>
              <div className="text-xl md:text-2xl font-bold text-white">42</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <Link to="/learn" className="group block">
          <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all h-full">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Quest Learn</h3>
            <p className="text-sm md:text-base text-slate-400">Continue your lesson on Python Variables and Data Types.</p>
          </div>
        </Link>
        <Link to="/range" className="group block">
          <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all h-full">
            <Code className="w-10 h-10 md:w-12 md:h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Code Range</h3>
            <p className="text-sm md:text-base text-slate-400">Practice your skills in the sandbox environment.</p>
          </div>
        </Link>
        <Link to="/battle" className="group block sm:col-span-2 md:col-span-1">
          <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-red-500/50 transition-all h-full">
            <Swords className="w-10 h-10 md:w-12 md:h-12 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Quest Battle</h3>
            <p className="text-sm md:text-base text-slate-400">Enter the arena for a 1v1 coding duel.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
