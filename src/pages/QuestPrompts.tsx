import { MessageSquarePlus, ThumbsUp, MessageCircle } from "lucide-react";

export default function QuestPrompts() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Quest Prompts</h1>
          <p className="text-slate-400 text-sm md:text-lg">Build, review, and share prompts learned through Quest Code.</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
          <MessageSquarePlus className="w-4 h-4" /> New Prompt
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {[
          { title: "Explain Recursion to a 10-year-old", author: "CodeNinja", likes: 124, comments: 12 },
          { title: "Generate a Python boilerplate for a web scraper", author: "DataMiner", likes: 89, comments: 5 },
          { title: "Debug this React useEffect hook", author: "FrontendWizard", likes: 256, comments: 34 },
        ].map((prompt, i) => (
          <div key={i} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 md:p-6 hover:border-slate-700 transition-colors cursor-pointer">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{prompt.title}</h3>
            <p className="text-sm md:text-base text-slate-400 mb-4">Created by <span className="text-emerald-400">@{prompt.author}</span></p>
            <div className="flex items-center gap-6 text-slate-500 text-sm md:text-base">
              <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <ThumbsUp className="w-4 h-4" /> {prompt.likes}
              </div>
              <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-4 h-4" /> {prompt.comments}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
