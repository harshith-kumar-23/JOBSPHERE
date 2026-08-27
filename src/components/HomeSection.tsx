import React from 'react';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Briefcase,
  BookOpen,
  MessagesSquare,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Flame,
  Layers,
  BarChart3,
  Award,
  ChevronRight,
  Lock,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeSection: React.FC = () => {
  const {
    setActiveTab,
    stats,
    user,
    jobs,
    courses,
    enrolledCourses
  } = useApp();

  const careerSteps = [
    {
      step: '01',
      title: 'School-to-Career Verified Profile',
      desc: 'Build an unbroken timeline from your secondary schooling to your current senior position. Every milestone, GPA, and project is secured with AES-256 client-side cryptographic encryption.',
      icon: <GraduationCap className="w-5 h-5 text-indigo-400" />,
      actionLabel: 'Build Timeline',
      tab: 'profile' as const
    },
    {
      step: '02',
      title: 'High-Impact Skill Courses & Logic Boosters',
      desc: 'Enroll in deep technical courses taught by industry veterans. Every enrollment triggers a domain-specific logical reasoning challenge to improve cognitive problem-solving instantly.',
      icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
      actionLabel: 'Browse Courses',
      tab: 'skills' as const
    },
    {
      step: '03',
      title: 'Job Offers & Dynamic ATS Resume Builder',
      desc: 'Explore curated roles at top tech giants (Google, Stripe, Microsoft). Tailor your resume specifically for each posting with instant ATS score optimization and role-specific assessments.',
      icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
      actionLabel: 'Explore Jobs',
      tab: 'jobs' as const
    },
    {
      step: '04',
      title: 'Interactive Interview Simulator & Archive',
      desc: 'Practice high-frequency technical, system architecture, and behavioral STAR questions. Maintain a verifiable ledger of completed mock interviews and accredited course certificates.',
      icon: <MessagesSquare className="w-5 h-5 text-amber-400" />,
      actionLabel: 'Practice Interviews',
      tab: 'interview' as const
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>The Unified Career & Cognitive Readiness Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Accelerate Your Journey From <span className="text-indigo-600">Classroom Foundation</span> to <span className="text-slate-800">Dream Career</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            <strong className="text-slate-900">JOBSPHERE</strong> unites continuous school-to-career profile management, high-impact skill masterclasses, instant logical problem-solving boosters, smart ATS resume building, and realistic interview simulators into one cohesive career operating system.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              id="hero-explore-jobs-btn"
              onClick={() => setActiveTab('jobs')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all hover:scale-[1.01]"
            >
              <span>Explore Available Jobs & Apply</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-view-courses-btn"
              onClick={() => setActiveTab('skills')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-250 font-semibold text-sm flex items-center gap-2 transition-all hover:border-slate-300"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Learn Skills & Take Logic Tests</span>
            </button>

            <button
              id="hero-view-profile-btn"
              onClick={() => setActiveTab('profile')}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 font-medium text-sm flex items-center gap-2 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>School-to-Career Profile</span>
            </button>
          </div>

          {/* Key Trust & Privacy Highlights */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong className="text-slate-800">Encrypted Data Vault:</strong> AES-256 protocol ensures privacy.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Zap className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span><strong className="text-slate-800">Logic Boosters:</strong> Auto-triggered on course enroll & apply.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span><strong className="text-slate-800">Verifiable Ledger:</strong> Completed interviews & certificates.</span>
            </div>
          </div>
        </div>
      </section>

      {/* User Career Pulse & Quick Status */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Your Career Acceleration Dashboard
            </h2>
            <p className="text-xs text-slate-500">
              Live snapshot of your profile completeness, active course enrollments, job applications, and cognitive logic score.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Logged in as:</span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              {user.fullName}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => setActiveTab('logic-gym')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Logic Score</span>
              <Flame className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">{stats.logicPoints}</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">{stats.logicStreakDays} Day Streak Active</p>
          </div>

          <div
            onClick={() => setActiveTab('skills')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Courses Enrolled</span>
              <BookOpen className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">{stats.coursesEnrolledCount}</p>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">{stats.coursesCompletedCount} Completed & Certified</p>
          </div>

          <div
            onClick={() => setActiveTab('jobs')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Jobs Applied</span>
              <Briefcase className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">{stats.jobsAppliedCount}</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">ATS Resume Tailored</p>
          </div>

          <div
            onClick={() => setActiveTab('interview')}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-400 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Interviews Mastered</span>
              <MessagesSquare className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">{stats.interviewsPracticedCount}</p>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Avg 96% Performance</p>
          </div>
        </div>
      </section>

      {/* Importance of JOBSPHERE & How it Helps User Search for a Job */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why JOBSPHERE is Crucial for Modern Job Seekers
          </h2>
          <p className="text-sm text-slate-600">
            Tech hiring has evolved beyond simple resume submissions. Discover how JOBSPHERE systematically transforms candidate readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-slate-300 shadow-xs transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              The Comprehensive Educational-to-Career Ledger
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Standard resumes omit the rich progression of how you developed your intellect. JOBSPHERE captures your complete trajectory from school achievements, pre-university distinctions, college engineering capstones, to professional senior roles. Recruiters see your proven growth curve.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Full High School, Intermediate, Degree, & Experience Milestones</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-slate-300 shadow-xs transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Instant Cognitive Logic Calibration
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whenever you enroll in a course or submit a job application, JOBSPHERE triggers a targeted logical problem-solving challenge. This immediate cognitive reinforcement ensures you understand core concepts, edge cases, and algorithmic dilemmas before stepping into high-stakes interviews.
            </p>
            <div className="flex items-center gap-2 text-xs text-cyan-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              <span>Live Scenario Assessments on Every Course & Job Application</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-slate-300 shadow-xs transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Targeted Job Matching & Resume Optimization
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Don’t send generic resumes. JOBSPHERE lets you inspect job listings from top companies (Google, Stripe, Microsoft) and use the built-in Resume Optimizer to tailor bullet points, align core skills, and maximize ATS keyword compatibility before submitting your application.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Live ATS Score Preview & Skill Match Diagnostics</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-slate-300 shadow-xs transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Military-Grade Privacy & Hardware-Salted Security
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your career history and personal data are strictly protected. JOBSPHERE implements client-side AES-256-GCM encryption with cryptographic SHA-256 key fingerprints. You retain full control over data visibility, tamper-proof logs, and exportable JSON vaults.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              <span>Industry-Standard AES-256 Protocol & Zero-Knowledge Architecture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Career Acceleration Roadmap */}
      <section className="bg-slate-100/70 rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Systematic Roadmap
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              How JOBSPHERE Guides You Step-by-Step
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-800 flex items-center gap-1 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs"
          >
            <span>Start With Your Profile</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerSteps.map((item, idx) => (
            <div
              key={item.step}
              className="relative p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 hover:border-indigo-300 shadow-xs transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-slate-400 font-mono">
                    PHASE {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>

              <button
                onClick={() => setActiveTab(item.tab)}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-50 group-hover:bg-indigo-600 text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>{item.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Preview of Available Jobs & Mastercourses */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hot Jobs Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Hot Tech Job Openings</h3>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All ({jobs.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {jobs.slice(0, 2).map(job => (
              <div
                key={job.id}
                onClick={() => setActiveTab('jobs')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{job.role}</h4>
                    <p className="text-[11px] text-slate-500">{job.company} • {job.location}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-[11px] font-bold text-emerald-600">{job.salaryRange.split('+')[0]}</span>
                  <span className="block text-[10px] text-slate-500">{job.workplaceType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-Yield Courses Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">High-Yield Skill Masterclasses</h3>
            </div>
            <button
              onClick={() => setActiveTab('skills')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View Courses ({courses.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {courses.slice(0, 2).map(course => {
              const isEnrolled = enrolledCourses.some(ec => ec.courseId === course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => setActiveTab('skills')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-12 h-10 rounded-lg object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 truncate max-w-xs">{course.title}</h4>
                      <p className="text-[11px] text-slate-500">{course.category} • {course.durationHours}h • ⭐ {course.rating}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                        isEnrolled
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {isEnrolled ? 'Enrolled' : 'Enroll & Test'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
