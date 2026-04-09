import { BrainCircuit, CheckCircle, XCircle } from "lucide-react";

export default function QuestQuiz() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Quest Quiz</h1>
        <p className="text-slate-400 text-sm md:text-lg">Test your knowledge and create cheat sheets.</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 md:p-8 mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <span className="text-emerald-400 font-medium text-sm md:text-base">Question 4 of 10</span>
          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs md:text-sm">Python Basics</span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
          What is the correct syntax to output "Hello World" in Python?
        </h2>

        <div className="space-y-3 md:space-y-4">
          {[
            'echo "Hello World"',
            'print("Hello World")',
            'p("Hello World")',
            'console.log("Hello World")'
          ].map((opt, i) => (
            <button key={i} className={`w-full p-3 md:p-4 rounded-xl border text-left transition-all ${
              i === 1 
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
            }`}>
              <div className="flex items-center justify-between">
                <code className="font-mono text-sm md:text-base break-all">{opt}</code>
                {i === 1 && <CheckCircle className="w-5 h-5 shrink-0 ml-2" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
        <button className="w-full sm:w-auto px-6 py-2 rounded-lg text-slate-400 hover:text-white transition-colors">
          Save to Cheat Sheet
        </button>
        <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors">
          Next Question
        </button>
      </div>
    </div>
  );
}
