import React, { useState, useEffect } from 'react';
import {
  MessagesSquare,
  Award,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Star,
  Clock,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Printer,
  Download,
  Plus,
  BookOpen,
  Zap,
  Filter,
  Check,
  TrendingUp,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { InterviewQuestion, Course } from '../types';

export const InterviewSection: React.FC = () => {
  const {
    interviewQuestions,
    completedInterviews,
    enrolledCourses,
    courses,
    recordCompletedInterview,
    completeCourseModule,
    setActiveTab: setNavTab,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState<'practice' | 'history' | 'certificates'>('practice');
  const [selectionMode, setSelectionMode] = useState<'skill' | 'course'>('skill');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('All');
  
  // Interactive question states
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [checkedConcepts, setCheckedConcepts] = useState<Record<string, string[]>>({});
  const [userDraftAnswers, setUserDraftAnswers] = useState<Record<string, string>>({});

  // Practice Timer State
  const [timerActive, setTimerActive] = useState<Record<string, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState<Record<string, number>>({});

  // Certificate Modal State
  const [activeCertModal, setActiveCertModal] = useState<{
    course: Course;
    certId: string;
    completedDate: string;
  } | null>(null);

  // Mock Interview scoring modal state
  const [scoringQuestion, setScoringQuestion] = useState<InterviewQuestion | null>(null);
  const [selfScore, setSelfScore] = useState<number>(92);
  const [selfNotes, setSelfNotes] = useState<string>('Clearly articulated core principles, covered key architectural trade-offs, and structured response using STAR methodology.');

  // Timer Tick Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds(prev => {
        const next = { ...prev };
        Object.keys(timerActive).forEach(qId => {
          if (timerActive[qId]) {
            next[qId] = (next[qId] || 0) + 1;
          }
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const toggleTimer = (qId: string) => {
    setTimerActive(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const resetTimer = (qId: string) => {
    setTimerActive(prev => ({ ...prev, [qId]: false }));
    setTimerSeconds(prev => ({ ...prev, [qId]: 0 }));
  };

  const formatTimer = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Distinct skills list derived from interview questions
  const distinctSkills = ['All', ...Array.from(new Set(interviewQuestions.map(q => q.skillTag)))];

  // Filtering questions based on either selected skill or selected course
  const filteredQuestions = interviewQuestions.filter(q => {
    if (selectionMode === 'skill') {
      if (selectedSkill === 'All') return true;
      return q.skillTag === selectedSkill;
    } else {
      if (selectedCourseId === 'All') return true;
      return q.courseId === selectedCourseId;
    }
  });

  const toggleRevealAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleConcept = (qId: string, concept: string) => {
    setCheckedConcepts(prev => {
      const current = prev[qId] || [];
      const updated = current.includes(concept)
        ? current.filter(c => c !== concept)
        : [...current, concept];
      return { ...prev, [qId]: updated };
    });
  };

  const handleRecordInterview = () => {
    if (!scoringQuestion) return;

    recordCompletedInterview({
      domain: scoringQuestion.domain,
      sessionTitle: `${scoringQuestion.domain} Mock: ${scoringQuestion.skillTag}`,
      scorePercent: selfScore,
      questionsAttempted: 1,
      feedbackSummary: selfNotes,
      topStrengths: [scoringQuestion.keyConceptsToCover[0] || 'Structured technical breakdown', 'Clear communication & depth'],
      growthAreas: [scoringQuestion.proTips[0] || 'Explore edge case performance bounds']
    });

    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.6 }
    });

    setScoringQuestion(null);
    setActiveTab('history');
  };

  const completedCoursesList = enrolledCourses.filter(ec => ec.isCompleted);
  const inProgressCoursesList = enrolledCourses.filter(ec => !ec.isCompleted);

  // Average interview score calculation
  const avgScore = completedInterviews.length > 0
    ? Math.round(completedInterviews.reduce((acc, curr) => acc + curr.scorePercent, 0) / completedInterviews.length)
    : 0;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <MessagesSquare className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interview Simulator, Completed Sessions & Course Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Interview Mastery & Technical Preparation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Select any skill area or enrolled course curriculum to practice high-yield technical and behavioral questions asked by industry leaders. Track your <strong>Completed Practice Interviews</strong> and access accredited certificates for your <strong>Completed Courses</strong>.
          </p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          id="tab-interview-practice"
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'practice'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MessagesSquare className="w-4 h-4 text-indigo-600" />
          <span>Practice Question Simulator ({filteredQuestions.length})</span>
        </button>

        <button
          id="tab-interview-history"
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'history'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4 text-indigo-600" />
          <span>Completed Interviews ({completedInterviews.length})</span>
        </button>

        <button
          id="tab-interview-certificates"
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'certificates'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>Completed Courses & Certificates ({completedCoursesList.length})</span>
        </button>
      </div>

      {/* TAB 1: Practice Questions */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Dual Selection Mode: Select by Skill vs Select by Course */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">Select Practice Focus Area:</span>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => {
                    setSelectionMode('skill');
                    setSelectedSkill('All');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectionMode === 'skill'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Select by Skill / Topic
                </button>
                <button
                  onClick={() => {
                    setSelectionMode('course');
                    setSelectedCourseId('All');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectionMode === 'course'
                      ? 'bg-white text-indigo-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Select by Course Curriculum
                </button>
              </div>
            </div>

            {/* Selection Controls */}
            {selectionMode === 'skill' ? (
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 block">Choose Skill or Domain:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {distinctSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                        selectedSkill === skill
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 block">Choose Enrolled Course Curriculum:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedCourseId('All')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCourseId === 'All'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    All Courses ({courses.length})
                  </button>
                  {courses.map(course => (
                    <button
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                        selectedCourseId === course.id
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <BookOpen className="w-3 h-3 text-indigo-600" />
                      <span>{course.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Question List */}
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">No questions found for this selection</p>
              <p className="text-xs text-slate-500">Try selecting "All" or choosing another skill/course above.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredQuestions.map(q => {
                const isRevealed = !!revealedAnswers[q.id];
                const conceptsSelected = checkedConcepts[q.id] || [];
                const associatedCourse = courses.find(c => c.id === q.courseId);
                const isTimerRunning = !!timerActive[q.id];
                const elapsedSeconds = timerSeconds[q.id] || 0;

                return (
                  <div
                    key={q.id}
                    className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5 hover:border-slate-300 transition-colors shadow-xs"
                  >
                    {/* Top Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                          {q.domain}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-700 font-semibold">{q.skillTag}</span>
                        {associatedCourse && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                              <BookOpen className="w-3 h-3 text-slate-400" />
                              {associatedCourse.title}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Live Practice Timer */}
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{formatTimer(elapsedSeconds)}</span>
                          <button
                            onClick={() => toggleTimer(q.id)}
                            className="ml-1 text-indigo-600 hover:text-indigo-800"
                            title={isTimerRunning ? 'Pause Timer' : 'Start Timer'}
                          >
                            {isTimerRunning ? <PauseCircle className="w-3.5 h-3.5" /> : <PlayCircle className="w-3.5 h-3.5" />}
                          </button>
                          {elapsedSeconds > 0 && (
                            <button
                              onClick={() => resetTimer(q.id)}
                              className="text-slate-400 hover:text-slate-600"
                              title="Reset Timer"
                            >
                              <RotateCcw className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                          {q.type}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            q.difficulty === 'Easy'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : q.difficulty === 'Medium'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Question Heading & Scenario */}
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>
                      <p className="text-xs text-slate-500">{q.context}</p>
                    </div>

                    {/* Self-Recall Checklist */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                          Key Concept Checklist (Check items as you articulate them in your answer)
                        </h4>
                        <span className="text-[11px] font-bold text-indigo-600">
                          {conceptsSelected.length} / {q.keyConceptsToCover.length} Covered
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.keyConceptsToCover.map((concept, i) => {
                          const isChecked = conceptsSelected.includes(concept);
                          return (
                            <div
                              key={i}
                              onClick={() => toggleConcept(q.id, concept)}
                              className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-start gap-2 transition-colors ${
                                isChecked
                                  ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-medium'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                readOnly
                                className="mt-0.5 rounded text-indigo-600 bg-white border-slate-300 pointer-events-none"
                              />
                              <span>{concept}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Answer Drafting Sandbox */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-700">
                          Your Practice Answer Outline / Speech Notes:
                        </label>
                        <span className="text-[10px] text-slate-400">Optional self-notes</span>
                      </div>
                      <textarea
                        rows={3}
                        value={userDraftAnswers[q.id] || ''}
                        onChange={e => setUserDraftAnswers({ ...userDraftAnswers, [q.id]: e.target.value })}
                        placeholder="Outline your architectural solution, trade-offs, or STAR bullet points here before revealing the model answer..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                      />
                    </div>

                    {/* Model Answer Accordion */}
                    {isRevealed && (
                      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-4 animate-in fade-in">
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            Model Answer & Staff-Level Breakdown:
                          </span>
                          <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
                            {q.idealAnswer}
                          </p>
                        </div>

                        {q.proTips.length > 0 && (
                          <div className="pt-3 border-t border-indigo-200/60 space-y-1.5">
                            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                              Staff-Level Interviewer Pro Tips:
                            </span>
                            {q.proTips.map((tip, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => toggleRevealAnswer(q.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-indigo-600" />}
                        <span>{isRevealed ? 'Hide Model Answer' : 'Reveal Model Answer'}</span>
                      </button>

                      <button
                        onClick={() => setScoringQuestion(q)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-xs transition-all"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Record as Completed Mock Interview</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Completed Interviews History */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Summary Analytics Metric Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-slate-900">{completedInterviews.length}</span>
                <p className="text-xs text-slate-500">Total Practice Sessions</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-slate-900">{avgScore}%</span>
                <p className="text-xs text-slate-500">Average Interview Score</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-slate-900">
                  {completedInterviews.reduce((acc, curr) => acc + curr.questionsAttempted, 0)}
                </span>
                <p className="text-xs text-slate-500">Questions Mastered</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  Completed Interview Sessions Ledger
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verifiable record of completed technical, architecture, and behavioral mock interviews with performance evaluations and feedback.
                </p>
              </div>
            </div>

            {completedInterviews.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <MessagesSquare className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-800">No mock sessions recorded yet</p>
                <p className="text-xs text-slate-500">Practice questions from the simulator tab and click "Record as Completed Mock Interview".</p>
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                >
                  Start Practice Simulation
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {completedInterviews.map(session => (
                  <div
                    key={session.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{session.sessionTitle}</h3>
                        <p className="text-xs font-semibold text-indigo-600">{session.domain}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 shadow-xs">
                          {session.scorePercent}% Mastery Score
                        </span>
                        <span className="block text-[10px] text-slate-500 mt-1">
                          {new Date(session.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      <span className="font-semibold text-slate-900 block mb-0.5">Evaluation Feedback:</span>
                      {session.feedbackSummary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px]">
                          Demonstrated Strengths:
                        </span>
                        {session.topStrengths.map((str, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{str}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-amber-800 uppercase tracking-wider text-[10px]">
                          Target Growth Areas:
                        </span>
                        {session.growthAreas.map((area, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-700">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span>{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Completed Courses & Verifiable Certificates */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          {/* Completed Courses Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  Completed Courses & Verifiable Cryptographic Credentials ({completedCoursesList.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official JOBSPHERE credentials issued upon completing 100% of curriculum modules and passing domain logic tests.
                </p>
              </div>
            </div>

            {completedCoursesList.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-800">No completed courses yet</p>
                <p className="text-xs text-slate-500">Finish all modules in an enrolled course to unlock your verified certificate.</p>
                <button
                  onClick={() => setNavTab('skills')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                >
                  Explore Course Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedCoursesList.map(ec => {
                  const course = courses.find(c => c.id === ec.courseId);
                  if (!course) return null;

                  return (
                    <div
                      key={ec.courseId}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-indigo-300 transition-colors flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 shadow-xs">
                            100% Completed
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">{ec.certificateId}</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900">{course.title}</h3>
                        <p className="text-xs text-slate-500">{course.tagline}</p>

                        <div className="text-xs text-slate-600 pt-1">
                          <span>Instructor: <strong className="text-slate-900">{course.instructor.name}</strong></span>
                          <span className="block text-[11px] text-slate-500 mt-0.5">
                            Completed on {new Date(ec.completedAt || ec.enrolledAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-200">
                        <button
                          onClick={() => setActiveCertModal({
                            course,
                            certId: ec.certificateId || 'JS-CERT-VERIFIED',
                            completedDate: new Date(ec.completedAt || ec.enrolledAt).toLocaleDateString()
                          })}
                          className="w-full py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>View & Print Official Certificate</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectionMode('course');
                            setSelectedCourseId(course.id);
                            setActiveTab('practice');
                          }}
                          className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-indigo-700 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <MessagesSquare className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Practice Interview Questions for this Course</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* In-Progress Enrolled Courses Progress */}
          {inProgressCoursesList.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    In-Progress Enrolled Courses ({inProgressCoursesList.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Continue learning modules and complete your coursework to earn verifiable certificates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inProgressCoursesList.map(ec => {
                  const course = courses.find(c => c.id === ec.courseId);
                  if (!course) return null;

                  return (
                    <div
                      key={ec.courseId}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{course.title}</h4>
                          <span className="text-[10px] text-indigo-600 font-semibold">{course.category}</span>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {ec.progressPercent}%
                        </span>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${ec.progressPercent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <span className="text-[11px] text-slate-500">
                          {ec.completedModuleIds.length} of {course.modules.length} modules
                        </span>
                        <button
                          onClick={() => {
                            setSelectionMode('course');
                            setSelectedCourseId(course.id);
                            setActiveTab('practice');
                          }}
                          className="text-indigo-600 font-bold hover:underline flex items-center gap-0.5 text-xs"
                        >
                          <span>Practice Questions</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Record Mock Interview Score Modal */}
      {scoringQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-600" />
                Score & Record Mock Session
              </h3>
              <button onClick={() => setScoringQuestion(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">Question Practiced:</span>
                <p className="font-semibold text-slate-900">{scoringQuestion.question}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-semibold">Self-Evaluated Score:</label>
                  <span className="font-extrabold text-indigo-600">{selfScore}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={selfScore}
                  onChange={e => setSelfScore(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Session Takeaways / Notes</label>
                <textarea
                  rows={3}
                  value={selfNotes}
                  onChange={e => setSelfNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500 text-xs shadow-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setScoringQuestion(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium shadow-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRecordInterview}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save to Ledger (+{Math.round(selfScore * 1.5)} pts)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verifiable Certificate Modal */}
      {activeCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
          <div className="relative w-full max-w-3xl my-6 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 flex flex-col print:border-none print:shadow-none print:bg-white print:text-black">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between print:hidden">
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verifiable Cryptographic Credential</span>
              </span>
              <button onClick={() => setActiveCertModal(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {/* Official Certificate Canvas */}
            <div className="p-8 sm:p-12 bg-white text-slate-900 text-center space-y-6 border-8 border-double border-indigo-950 m-4 rounded-xl print:m-0 print:border-4">
              <div className="space-y-1">
                <div className="inline-block px-3 py-1 bg-indigo-950 text-white text-[10px] uppercase font-bold tracking-widest rounded-full mb-2">
                  JOBSPHERE CAREER & COGNITIVE PLATFORM
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-950 uppercase">
                  Certificate of Technical Competency
                </h1>
                <p className="text-xs text-slate-500 font-sans tracking-wide">
                  This officially certifies that
                </p>
              </div>

              <div className="border-b-2 border-slate-300 pb-2 max-w-md mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-indigo-900">
                  {user.fullName}
                </h2>
              </div>

              <div className="max-w-lg mx-auto space-y-1">
                <p className="text-xs text-slate-600">has successfully completed the verified curriculum and cognitive assessments for</p>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {activeCertModal.course.title}
                </h3>
                <p className="text-[11px] text-slate-500">
                  demonstrating mastery in {activeCertModal.course.skillsGained.join(', ')}.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 max-w-md mx-auto">
                <div className="text-left">
                  <p className="font-bold text-slate-900">{activeCertModal.course.instructor.name}</p>
                  <p className="text-[10px] text-slate-500">Lead Course Instructor</p>
                </div>

                <div className="w-14 h-14 rounded-full border-2 border-indigo-900 flex items-center justify-center text-indigo-900 font-bold text-[9px] uppercase tracking-tighter">
                  JOBSPHERE<br/>VERIFIED
                </div>

                <div className="text-right">
                  <p className="font-bold text-slate-900">{activeCertModal.completedDate}</p>
                  <p className="text-[10px] font-mono text-slate-500">{activeCertModal.certId}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden">
              <span className="text-xs text-slate-500 font-mono">Certificate Checksum: SHA-256 Verified</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
