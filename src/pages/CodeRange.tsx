import { useState } from "react";
import { Play, RotateCcw, Save, CheckCircle2, XCircle, Clock, Cpu, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type ExecutionStatus = 'idle' | 'running' | 'success' | 'error';

interface ExecutionResult {
  output: string;
  status: ExecutionStatus;
  executionTime?: number;
  memoryUsed?: number;
}

export default function CodeRange() {
  const [code, setCode] = useState('def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Questcoder"))');
  const [result, setResult] = useState<ExecutionResult>({ output: '', status: 'idle' });

  const runCode = () => {
    setResult({ output: 'Executing...', status: 'running' });
    
    // Mock running code with a slight delay
    setTimeout(() => {
      const isError = code.toLowerCase().includes('error');
      
      if (isError) {
        setResult({
          output: 'Traceback (most recent call last):\n  File "main.py", line 4, in <module>\nNameError: name \'error\' is not defined',
          status: 'error',
          executionTime: 42,
          memoryUsed: 12.4
        });
      } else {
        setResult({
          output: 'Hello, Questcoder!\n',
          status: 'success',
          executionTime: 124,
          memoryUsed: 24.8
        });
      }
    }, 800);
  };

  const clearTerminal = () => {
    setResult({ output: '', status: 'idle' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 md:p-6 border-b border-slate-800 bg-slate-900">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Code Range</h1>
        <p className="text-slate-400 text-sm md:text-base">Gamified testing and playground for creating code and practicing.</p>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row p-4 md:p-6 gap-4 md:gap-6 overflow-hidden">
        <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden min-h-[300px]">
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-slate-800 bg-slate-950/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex gap-2 md:gap-3">
              <button className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs md:text-sm font-medium transition-colors">
                <Save className="w-4 h-4" /> <span className="hidden sm:inline">Save</span>
              </button>
              <button 
                onClick={runCode} 
                disabled={result.status === 'running'}
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm font-bold transition-colors"
              >
                <Play className="w-4 h-4" /> <span className="hidden sm:inline">{result.status === 'running' ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-transparent p-4 md:p-6 text-slate-300 font-mono text-xs md:text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden min-h-[200px] lg:min-h-0">
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <h3 className="font-bold text-slate-300 text-sm md:text-base">Terminal Output</h3>
            </div>
            <button onClick={clearTerminal} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="Clear Terminal">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 p-4 md:p-6 font-mono text-xs md:text-sm overflow-y-auto flex flex-col">
            {result.status === 'idle' && !result.output && (
              <span className="text-slate-600">Ready for execution...</span>
            )}
            
            {result.status === 'running' && (
              <div className="flex items-center gap-2 text-blue-400">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.div>
                <span>Executing code...</span>
              </div>
            )}

            {(result.status === 'success' || result.status === 'error') && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col h-full"
                >
                  <div className={`mb-4 flex items-center gap-2 pb-3 border-b ${result.status === 'success' ? 'border-emerald-500/20 text-emerald-400' : 'border-red-500/20 text-red-400'}`}>
                    {result.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span className="font-bold">{result.status === 'success' ? 'Execution Successful' : 'Execution Failed'}</span>
                  </div>
                  
                  <div className={`flex-1 whitespace-pre-wrap mb-6 ${result.status === 'success' ? 'text-slate-300' : 'text-red-400/90'}`}>
                    {result.output}
                  </div>

                  {(result.executionTime !== undefined || result.memoryUsed !== undefined) && (
                    <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/50">
                      {result.executionTime !== undefined && (
                        <div className="flex items-center gap-2 text-slate-400 bg-slate-950/50 p-2 rounded-lg">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider opacity-70">Time</div>
                            <div className="font-medium text-slate-300">{result.executionTime}ms</div>
                          </div>
                        </div>
                      )}
                      {result.memoryUsed !== undefined && (
                        <div className="flex items-center gap-2 text-slate-400 bg-slate-950/50 p-2 rounded-lg">
                          <Cpu className="w-4 h-4 text-purple-400" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider opacity-70">Memory</div>
                            <div className="font-medium text-slate-300">{result.memoryUsed}MB</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
