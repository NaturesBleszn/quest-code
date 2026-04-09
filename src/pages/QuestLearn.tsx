import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { PlayCircle, CheckCircle2, Lock, Trophy, Star, Shield } from "lucide-react";

type LessonStatus = "completed" | "in-progress" | "locked";

interface Lesson {
  id: number;
  title: string;
  description: string;
  status: LessonStatus;
  xp: number;
}

const initialLessons: Lesson[] = [
  { id: 1, title: "Computing Systems", description: "What is Computer Science? What is a Computer?", status: "completed", xp: 100 },
  { id: 2, title: "Data and Analysis", description: "Storing Information, Collecting and Using Information", status: "in-progress", xp: 150 },
  { id: 3, title: "Software Engineering", description: "Designing Computer Systems, Testing, Documenting", status: "locked", xp: 200 },
  { id: 4, title: "Algorithms and Programming", description: "Using Algorithms, Programming Languages", status: "locked", xp: 250 },
  { id: 5, title: "Universal Programming Principles", description: "Variables, Conditional Statements, Loops", status: "locked", xp: 300 },
  { id: 6, title: "Programming with Scratch", description: "Getting Started, Basic Algorithms", status: "locked", xp: 350 },
  { id: 7, title: "Programming in Python", description: "Variables, Strings, Lists, Loops", status: "locked", xp: 400 },
  { id: 8, title: "Web Development", description: "HTML, CSS, The Internet", status: "locked", xp: 450 },
];

export default function QuestLearn() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  const completedCount = lessons.filter(l => l.status === 'completed').length;
  const totalCount = lessons.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);
  
  const totalXP = useMemo(() => {
    return lessons.filter(l => l.status === 'completed').reduce((acc, curr) => acc + curr.xp, 0);
  }, [lessons]);

  // Leveling System Logic
  const XP_PER_LEVEL = 500;
  const currentLevel = Math.floor(totalXP / XP_PER_LEVEL) + 1;
  const xpIntoCurrentLevel = totalXP % XP_PER_LEVEL;
  const levelProgressPercentage = Math.round((xpIntoCurrentLevel / XP_PER_LEVEL) * 100);

  const handleLessonAction = (lessonId: number) => {
    setLessons(prev => {
      const newLessons = [...prev];
      const lessonIndex = newLessons.findIndex(l => l.id === lessonId);
      const lesson = newLessons[lessonIndex];

      if (lesson.status === 'in-progress') {
        // Complete this lesson
        newLessons[lessonIndex] = { ...lesson, status: 'completed' };
        // Unlock next lesson if it exists
        if (lessonIndex + 1 < newLessons.length) {
          newLessons[lessonIndex + 1] = { ...newLessons[lessonIndex + 1], status: 'in-progress' };
        }
      }
      return newLessons;
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Quest Learn</h1>
          <p className="text-slate-400 text-base md:text-lg">Gamified lesson plans designed to teach coding from the ground up.</p>
        </div>
        
        {/* Level and XP Stats */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl flex-1 sm:flex-none">
            <div className="p-2 bg-blue-500/20 rounded-lg relative">
              <Shield className="w-6 h-6 text-blue-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {currentLevel}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Level {currentLevel}</div>
                <div className="text-xs text-blue-400 font-bold">{xpIntoCurrentLevel} / {XP_PER_LEVEL}</div>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgressPercentage}%` }}
                  className="bg-blue-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-3 rounded-2xl flex-1 sm:flex-none">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total XP</div>
              <div className="text-xl font-bold text-white">{totalXP}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-5 md:p-6 rounded-2xl mb-8">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h3 className="text-white font-bold text-lg">Course Progress</h3>
            <p className="text-slate-400 text-sm">{completedCount} of {totalCount} lessons completed</p>
          </div>
          <span className="text-2xl font-bold text-emerald-400">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-950 rounded-full h-4 border border-slate-800 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-emerald-500 h-full rounded-full relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)', backgroundSize: '1rem 1rem' }}></div>
          </motion.div>
        </div>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <motion.div 
            key={lesson.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 md:p-6 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              lesson.status === 'locked' 
                ? 'bg-slate-900/50 border-slate-800/50 opacity-75' 
                : 'bg-slate-900 border-slate-800 hover:border-emerald-500/30 transition-colors'
            }`}
          >
            <div className="flex items-start md:items-center gap-4 md:gap-6">
              <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center ${
                lesson.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                lesson.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                'bg-slate-800 text-slate-500'
              }`}>
                {lesson.status === 'completed' && <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" />}
                {lesson.status === 'in-progress' && <PlayCircle className="w-5 h-5 md:w-6 md:h-6" />}
                {lesson.status === 'locked' && <Lock className="w-5 h-5 md:w-6 md:h-6" />}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                  <h3 className="text-lg md:text-xl font-bold text-white">Unit {lesson.id}: {lesson.title}</h3>
                  <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 text-xs font-medium text-yellow-400 border border-slate-700">
                    <Star className="w-3 h-3 fill-current" /> {lesson.xp} XP
                  </span>
                </div>
                <p className="text-slate-400 text-sm md:text-base">{lesson.description}</p>
              </div>
            </div>
            {lesson.status !== 'locked' && (
              <button 
                onClick={() => handleLessonAction(lesson.id)}
                className={`w-full md:w-auto px-6 py-2 rounded-lg font-medium transition-colors shrink-0 ${
                  lesson.status === 'completed' 
                    ? 'bg-slate-800 text-white hover:bg-slate-700' 
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                }`}
              >
                {lesson.status === 'completed' ? 'Review' : 'Complete Lesson'}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
