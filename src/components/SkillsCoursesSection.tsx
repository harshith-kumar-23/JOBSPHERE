import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Star,
  Users,
  Award,
  ArrowRight,
  Zap,
  PlayCircle,
  Sparkles,
  ChevronRight,
  Check,
  BrainCircuit
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Course } from '../types';

export const SkillsCoursesSection: React.FC = () => {
  const {
    courses,
    enrolledCourses,
    enrollInCourse,
    completeCourseModule,
    openLogicChallengeModal,
    setActiveTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);

  const categories = [
    'All',
    'Programming Languages',
    'Frontend',
    'System Design',
    'AI & Data Science',
    'Cloud & DevOps',
    'Career & Professional'
  ];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsGained.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    return matchesSearch && matchesCat && matchesLevel;
  });

  const handleEnroll = (course: Course) => {
    enrollInCourse(course.id);
  };

  const handleOpenCoursePlayer = (course: Course) => {
    // If not enrolled, enroll first (which triggers logic question)
    const isEnrolled = enrolledCourses.some(ec => ec.courseId === course.id);
    if (!isEnrolled) {
      enrollInCourse(course.id);
    }
    setActiveCourseModal(course);
    setActiveModuleIndex(0);
  };

  const handleCompleteModule = (courseId: string, moduleId: string) => {
    completeCourseModule(courseId, moduleId);
    const enrollment = enrolledCourses.find(ec => ec.courseId === courseId);
    if (enrollment && enrollment.completedModuleIds.length + 1 >= (activeCourseModal?.modules.length || 0)) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interactive Skill Upskilling & Instant Logic Calibration</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Level Up Your Engineering Competencies
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Gain mastery in high-throughput architectures, concurrent UI frameworks, and distributed AI loops. Enrolling in any course instantly unlocks a domain-specific <strong>Logic Booster Challenge</strong> to test your cognitive reasoning.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="course-search-input"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by topic, keyword, or skill (e.g., React 19, Raft, Kubernetes)..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => {
          const enrollment = enrolledCourses.find(ec => ec.courseId === course.id);
          const isEnrolled = !!enrollment;
          const progress = enrollment?.progressPercent || 0;
          const isCompleted = enrollment?.isCompleted || false;

          return (
            <div
              key={course.id}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs group"
            >
              <div>
                {/* Course Thumbnail & Badges */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-indigo-700 border border-indigo-200 shadow-xs">
                      {course.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-700 border border-slate-200 shadow-xs">
                      {course.level}
                    </span>
                  </div>

                  {isCompleted && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                      <Award className="w-3 h-3" />
                      <span>Certified</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.tagline}
                    </p>
                  </div>

                  {/* Instructor & Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px] font-medium text-slate-700 truncate max-w-[120px]">
                        {course.instructor.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px]">
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {course.rating}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {course.durationHours}h
                      </span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.skillsGained.slice(0, 3).map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Logic Question Trigger Banner */}
                  <div
                    onClick={() => openLogicChallengeModal(course.logicChallenge, 'course', course.title)}
                    className="p-2.5 rounded-xl bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/80 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-[11px] font-bold text-indigo-900">
                        Course Logic Challenge (+{course.logicChallenge.rewardPoints} pts)
                      </span>
                    </div>
                    <span className="text-[10px] text-indigo-600 font-semibold flex items-center gap-0.5">
                      <span>Test Logic</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Progress Bar if enrolled */}
                  {isEnrolled && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Course Progress</span>
                        <span className="font-bold text-indigo-600">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                {isEnrolled ? (
                  <button
                    id={`resume-course-btn-${course.id}`}
                    onClick={() => handleOpenCoursePlayer(course)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{isCompleted ? 'Review Modules & Certificate' : 'Continue Learning'}</span>
                  </button>
                ) : (
                  <button
                    id={`enroll-course-btn-${course.id}`}
                    onClick={() => handleEnroll(course)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <BrainCircuit className="w-4 h-4 text-indigo-300" />
                    <span>Enroll & Unlock Logic Test</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Course Player Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl my-6 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden text-slate-900 flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-indigo-600">{activeCourseModal.category}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{activeCourseModal.instructor.name}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 truncate max-w-xl">{activeCourseModal.title}</h2>
                </div>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content Area (Sidebar Modules + Active Module Reader) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Modules Sidebar */}
              <div className="w-full md:w-80 bg-slate-50/60 border-r border-slate-200 p-4 overflow-y-auto space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Course Modules ({activeCourseModal.modules.length})
                </h4>

                {activeCourseModal.modules.map((mod, idx) => {
                  const enrollment = enrolledCourses.find(ec => ec.courseId === activeCourseModal.id);
                  const isModCompleted = enrollment?.completedModuleIds.includes(mod.id);
                  const isCurrent = activeModuleIndex === idx;

                  return (
                    <div
                      key={mod.id}
                      onClick={() => setActiveModuleIndex(idx)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-medium shadow-xs'
                          : 'bg-white border-slate-200 hover:bg-slate-100/80 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-semibold line-clamp-2">{mod.title}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{mod.durationMinutes} min read</span>
                        </div>
                        {isModCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => {
                      openLogicChallengeModal(activeCourseModal.logicChallenge, 'course', activeCourseModal.title);
                    }}
                    className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Practice Course Logic Riddle</span>
                  </button>
                </div>
              </div>

              {/* Active Lesson Reader */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white">
                {activeCourseModal.modules[activeModuleIndex] && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono text-indigo-600 font-semibold">
                        Lesson {activeModuleIndex + 1} of {activeCourseModal.modules.length}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                        {activeCourseModal.modules[activeModuleIndex].title}
                      </h3>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {activeCourseModal.modules[activeModuleIndex].content}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Key Architectural Takeaways:
                      </h4>
                      <div className="space-y-2">
                        {activeCourseModal.modules[activeModuleIndex].keyTakeaways.map((takeaway, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeModuleIndex === 0}
                  onClick={() => setActiveModuleIndex(prev => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                >
                  Previous
                </button>
                <button
                  disabled={activeModuleIndex >= activeCourseModal.modules.length - 1}
                  onClick={() => setActiveModuleIndex(prev => Math.min(activeCourseModal.modules.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                >
                  Next
                </button>
              </div>

              {activeCourseModal.modules[activeModuleIndex] && (
                <button
                  onClick={() => handleCompleteModule(activeCourseModal.id, activeCourseModal.modules[activeModuleIndex].id)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-xs transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Lesson Complete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
