import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Zap,
  ArrowRight,
  ChevronRight,
  Filter,
  Check,
  Building2,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobListing } from '../types';
import { ResumeBuilderModal } from './ResumeBuilderModal';

export const JobsSection: React.FC = () => {
  const {
    jobs,
    applications,
    applyForJob,
    user,
    openLogicChallengeModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'applications'>('listings');
  const [searchQuery, setSearchQuery] = useState('');
  const [workplaceFilter, setWorkplaceFilter] = useState<string>('All');
  const [experienceFilter, setExperienceFilter] = useState<string>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  // Resume builder tailored modal state
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [jobForResume, setJobForResume] = useState<JobListing | null>(null);

  const workplaceTypes = ['All', 'Remote', 'Hybrid', 'On-site'];
  const experienceLevels = [
    'All',
    'Entry Level (0-2 yrs)',
    'Mid Level (2-5 yrs)',
    'Senior Level (5+ yrs)',
    'Lead / Architect'
  ];
  const industries = [
    'All',
    'Cloud & Infrastructure',
    'FinTech',
    'AI & Research',
    'DevTools & SaaS',
    'Gaming & Interactive',
    'HealthTech & Biotech',
    'Cybersecurity',
    'CleanTech & Renewable Energy',
    'EdTech',
    'E-commerce & SaaS'
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.industry && job.industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.preferredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesWorkplace = workplaceFilter === 'All' || job.workplaceType === workplaceFilter;
    const matchesExperience = experienceFilter === 'All' || job.experienceLevel === experienceFilter;
    const matchesIndustry = industryFilter === 'All' || job.industry === industryFilter;
    return matchesSearch && matchesWorkplace && matchesExperience && matchesIndustry;
  });

  const handleOpenResumeBuilder = (job: JobListing) => {
    setJobForResume(job);
    setResumeModalOpen(true);
  };

  const handleDirectApply = (job: JobListing) => {
    applyForJob(job.id);
  };

  const handleApplyWithCustomResume = (customNote: string, tailoredSkills: string[]) => {
    if (jobForResume) {
      applyForJob(jobForResume.id, customNote, tailoredSkills);
    }
  };

  // Calculate match percentage for user against a specific job
  const getMatchScore = (job: JobListing) => {
    const required = job.preferredSkills;
    const userSkillNames = user.skills.map(s => s.name.toLowerCase());
    const matchedCount = required.filter(s => userSkillNames.some(u => u.includes(s.toLowerCase()) || s.toLowerCase().includes(u))).length;
    const score = Math.round(75 + (matchedCount / Math.max(1, required.length)) * 23);
    return Math.min(98, score);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
            <span>Curated Career Openings & ATS Resume Synchronization</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Targeted Job Opportunities & Smart Application Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Apply to top technology leaders with verified resumes tailored directly from your educational and work milestones. Every submission triggers a role-specific <strong>Logical Problem-Solving Assessment</strong>.
          </p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'listings'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4 text-indigo-600" />
          <span>Available Job Offers ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'applications'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span>My Applications Tracker ({applications.length})</span>
        </button>
      </div>

      {/* TAB 1: Available Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  id="job-search-input"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by role title, company (Google, Stripe, Tesla), or skill..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                {workplaceTypes.map(wp => (
                  <button
                    key={wp}
                    onClick={() => setWorkplaceFilter(wp)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      workplaceFilter === wp
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {wp}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-Filters: Experience Level and Industry */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500">Experience:</span>
                <select
                  value={experienceFilter}
                  onChange={e => setExperienceFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-500 shadow-xs"
                >
                  {experienceLevels.map(exp => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500">Industry:</span>
                <select
                  value={industryFilter}
                  onChange={e => setIndustryFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 font-medium focus:outline-none focus:border-indigo-500 shadow-xs"
                >
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {(workplaceFilter !== 'All' || experienceFilter !== 'All' || industryFilter !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setWorkplaceFilter('All');
                    setExperienceFilter('All');
                    setIndustryFilter('All');
                    setSearchQuery('');
                  }}
                  className="text-[11px] text-indigo-600 hover:underline font-semibold ml-auto"
                >
                  Reset Filters ({filteredJobs.length} results)
                </button>
              )}
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {filteredJobs.map(job => {
              const hasApplied = applications.some(a => a.jobId === job.id);
              const matchScore = getMatchScore(job);

              return (
                <div
                  key={job.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
                >
                  {/* Left info */}
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {job.role}
                        </h3>
                        {job.urgency === 'Hot' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 border border-rose-200 text-rose-700 uppercase tracking-wider">
                            Hot Role
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-800">
                          {matchScore}% Profile Match
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                        <span className="font-semibold text-slate-900">{job.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location} ({job.workplaceType})
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-700">
                          {job.salaryRange}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Required skills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.preferredSkills.map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Embedded Logic Assessment Banner */}
                      <div
                        onClick={() => openLogicChallengeModal(job.logicChallenge, 'job', `${job.role} at ${job.company}`)}
                        className="p-2 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/70 flex items-center justify-between text-xs cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="text-[11px] font-semibold text-indigo-900">
                            Role Assessment: {job.logicChallenge.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-600 font-bold flex items-center gap-0.5">
                          <span>Preview Riddle</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2.5 flex-shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <button
                      id={`tailor-resume-btn-${job.id}`}
                      onClick={() => handleOpenResumeBuilder(job)}
                      className="py-2 px-3.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Optimize Resume</span>
                    </button>

                    {hasApplied ? (
                      <span className="py-2 px-4 rounded-xl text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-1.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        id={`apply-job-btn-${job.id}`}
                        onClick={() => handleDirectApply(job)}
                        className="py-2 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 shadow-xs transition-all hover:scale-[1.02]"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>Apply & Solve Riddle</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Applications Tracker */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Submitted Applications & Stage Tracker
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time tracking of candidate status, cognitive assessment verifications, and recruiter schedules.
              </p>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-800">No applications submitted yet</p>
              <p className="text-xs text-slate-500">Explore open roles above, tailor your ATS resume, and take the logic test.</p>
              <button
                onClick={() => setActiveTab('listings')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
              >
                Browse Job Offers
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map(app => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{app.role}</h3>
                      <p className="text-xs font-semibold text-indigo-600">{app.company}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{app.status}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    "{app.customCoverNote}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      ATS Resume Score: {app.matchScore}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tailored Resume Builder Modal */}
      <ResumeBuilderModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        targetJob={jobForResume}
        onApplyWithResume={handleApplyWithCustomResume}
      />
    </div>
  );
};
