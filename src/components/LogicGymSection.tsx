import React from 'react';
import {
  Zap,
  Flame,
  BrainCircuit,
  Award,
  ChevronRight,
  Sparkles,
  BookOpen,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LogicGymSection: React.FC = () => {
  const {
    courses,
    jobs,
    stats,
    openLogicChallengeModal
  } = useApp();

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span>Cognitive Aptitude & Logic Gymnastics</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Daily Logic Gym & Architectural Dilemmas
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sharpen your algorithmic intuition and systems reasoning. Every puzzle mirrors real architectural trade-offs encountered in course enrollment and job application screens.
          </p>
        </div>
      </div>

      {/* Streak and Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Daily Streak</span>
            <p className="text-2xl font-extrabold text-slate-900">{stats.logicStreakDays} Days</p>
            <p className="text-[11px] text-amber-700 font-semibold">Keep daily momentum active</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Total Logic Points</span>
            <p className="text-2xl font-extrabold text-slate-900">{stats.logicPoints} pts</p>
            <p className="text-[11px] text-indigo-700 font-semibold">Rank: Elite Architect</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <BrainCircuit className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Challenges Solved</span>
            <p className="text-2xl font-extrabold text-slate-900">{stats.challengesSolvedCount}</p>
            <p className="text-[11px] text-emerald-700 font-semibold">Across courses & jobs</p>
          </div>
        </div>
      </div>

      {/* Course-Triggered Challenges Hub */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Course Domain Logic Boosters</h2>
        </div>
        <p className="text-xs text-slate-500">
          Challenges automatically triggered when enrolling in courses. Test your reasoning anytime below:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {courses.map(course => (
            <div
              key={course.id}
              onClick={() => openLogicChallengeModal(course.logicChallenge, 'course', course.title)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 cursor-pointer flex items-center justify-between gap-3 transition-colors group shadow-2xs"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{course.category}</span>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {course.logicChallenge.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{course.logicChallenge.scenario}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-xs font-bold text-amber-700">+{course.logicChallenge.rewardPoints} pts</span>
                <span className="text-[10px] text-slate-500 block">{course.logicChallenge.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job-Triggered Challenges Hub */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Company Job Application Assessments</h2>
        </div>
        <p className="text-xs text-slate-500">
          Cognitive tests triggered when applying for top company roles:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {jobs.map(job => (
            <div
              key={job.id}
              onClick={() => openLogicChallengeModal(job.logicChallenge, 'job', `${job.role} at ${job.company}`)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 cursor-pointer flex items-center justify-between gap-3 transition-colors group shadow-2xs"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{job.company}</span>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {job.logicChallenge.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{job.logicChallenge.scenario}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-xs font-bold text-amber-700">+{job.logicChallenge.rewardPoints} pts</span>
                <span className="text-[10px] text-slate-500 block">{job.logicChallenge.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
