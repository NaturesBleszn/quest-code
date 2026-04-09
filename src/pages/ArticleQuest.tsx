import { BookOpen, BookmarkPlus, Share2 } from "lucide-react";

export default function ArticleQuest() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Article Quest</h1>
        <p className="text-slate-400 text-sm md:text-lg">Read, save, and share articles on technology, coding, and learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {[
          { title: "Understanding Computing Systems", category: "Hardware", time: "5 min read" },
          { title: "The Evolution of Programming Languages", category: "History", time: "8 min read" },
          { title: "Mastering Python Data Structures", category: "Python", time: "12 min read" },
          { title: "Web Development Basics: HTML & CSS", category: "Web", time: "10 min read" },
        ].map((article, i) => (
          <div key={i} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 md:p-6 flex flex-col hover:border-slate-700 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs md:text-sm font-medium">
                {article.category}
              </span>
              <span className="text-xs md:text-sm text-slate-500">{article.time}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex-1">{article.title}</h2>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm md:text-base">
                <BookOpen className="w-4 h-4" /> Read Now
              </button>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <BookmarkPlus className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
