import { Search, Copy, Plus, Code2 } from "lucide-react";

export default function QuestSnippets() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Quest Snippets</h1>
          <p className="text-slate-400 text-sm md:text-lg">Unlocked and created code snippets for your journey.</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" /> Create Snippet
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-8 flex items-center">
        <Search className="w-5 h-5 text-slate-500 ml-3 shrink-0" />
        <input 
          type="text" 
          placeholder="Search snippets by name, language, or tag..." 
          className="bg-transparent border-none outline-none text-white px-4 py-2 w-full text-sm md:text-base"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
        {[
          { title: "Binary Search", lang: "Python", desc: "O(log n) search algorithm for sorted arrays.", code: "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1" },
          { title: "Center Div", lang: "CSS", desc: "The modern way to perfectly center an element.", code: ".center {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}" },
          { title: "Fetch API", lang: "JavaScript", desc: "Basic async/await fetch wrapper.", code: "async function getData(url) {\n    try {\n        const res = await fetch(url);\n        return await res.json();\n    } catch (err) {\n        console.error(err);\n    }\n}" },
          { title: "React Counter", lang: "React", desc: "Simple useState counter hook example.", code: "const [count, setCount] = useState(0);\n\nreturn (\n  <button onClick={() => setCount(c => c + 1)}>\n    Count: {count}\n  </button>\n);" },
          { title: "SQL Select", lang: "SQL", desc: "Basic SELECT query with JOIN.", code: "SELECT users.name, orders.total\nFROM users\nJOIN orders ON users.id = orders.user_id\nWHERE orders.status = 'completed';" },
          { title: "Docker Build", lang: "Dockerfile", desc: "Standard Node.js Dockerfile.", code: "FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD [\"npm\", \"start\"]" }
        ].map((snippet, i) => (
          <div key={i} className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col">
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-slate-800 rounded-lg text-emerald-400 shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-lg truncate">{snippet.title}</h3>
                </div>
                <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100" title="Copy snippet">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300">{snippet.lang}</span>
              </div>
              
              <p className="text-slate-400 text-sm flex-1">{snippet.desc}</p>
            </div>

            {/* Expandable Code Preview */}
            <div className="max-h-0 group-hover:max-h-48 transition-all duration-500 ease-in-out overflow-hidden bg-slate-950">
              <div className="p-4 border-t border-slate-800 relative">
                <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold flex justify-between items-center">
                  <span>Preview</span>
                </div>
                <pre className="font-mono text-xs text-emerald-400 whitespace-pre-wrap"><code>{snippet.code}</code></pre>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
