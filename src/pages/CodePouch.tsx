import { Folder, FileCode, Star } from "lucide-react";

export default function CodePouch() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Code Pouch</h1>
          <p className="text-slate-400 text-sm md:text-lg">Your personal portfolio of creations and lesson projects.</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-slate-700 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-slate-800 rounded-xl text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                <FileCode className="w-6 h-6" />
              </div>
              <button className="text-slate-500 hover:text-yellow-400 transition-colors">
                <Star className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Project Alpha {i}</h3>
            <p className="text-sm text-slate-400 mb-4">Python • 2 days ago</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">Algorithms</span>
              <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300">Battle</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
