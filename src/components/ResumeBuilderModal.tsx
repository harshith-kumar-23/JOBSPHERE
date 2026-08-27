import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Download,
  Printer,
  ChevronRight,
  Briefcase,
  Layers,
  GraduationCap,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { JobListing } from '../types';

interface ResumeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetJob?: JobListing | null;
  onApplyWithResume?: (customNote: string, tailoredSkills: string[]) => void;
}

export const ResumeBuilderModal: React.FC<ResumeBuilderModalProps> = ({
  isOpen,
  onClose,
  targetJob,
  onApplyWithResume
}) => {
  const { user } = useApp();

  const [customSummary, setCustomSummary] = useState(
    targetJob
      ? `Results-driven software architect targeting the ${targetJob.role} role at ${targetJob.company}. Bringing deep background in ${targetJob.preferredSkills.slice(0, 3).join(', ')}, distributed fault-tolerance, and high-performance engineering.`
      : user.bio
  );

  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    if (targetJob) {
      // Prioritize target job skills that match user skills
      return Array.from(new Set([...targetJob.preferredSkills, ...user.skills.map(s => s.name).slice(0, 6)]));
    }
    return user.skills.map(s => s.name);
  });

  const [coverNote, setCoverNote] = useState(
    targetJob
      ? `I am thrilled to submit my candidacy for the ${targetJob.role} position at ${targetJob.company}. My background in large-scale cloud infrastructure directly aligns with your team's objectives.`
      : ''
  );

  const [activeTab, setActiveTab] = useState<'preview' | 'tailor'>('preview');

  if (!isOpen) return null;

  // Calculate ATS match score against target job
  const calculateAtsScore = () => {
    if (!targetJob) return 92;
    const required = targetJob.preferredSkills;
    const matched = required.filter(s => selectedSkills.some(userSkill => userSkill.toLowerCase().includes(s.toLowerCase())));
    const ratio = matched.length / Math.max(1, required.length);
    return Math.min(99, Math.round(75 + ratio * 24));
  };

  const atsScore = calculateAtsScore();

  const handlePrint = () => {
    window.print();
  };

  const handleApply = () => {
    if (onApplyWithResume) {
      onApplyWithResume(coverNote, selectedSkills);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-5xl my-6 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 flex flex-col max-h-[90vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Top Header (Hidden on print) */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  JOBSPHERE Resume Optimizer
                </span>
                {targetJob && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-800">
                    ATS Score: {atsScore}% Match
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {targetJob ? `Tailoring for ${targetJob.role} at ${targetJob.company}` : 'Standard Verified Master Resume'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'preview' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Resume Preview
            </button>
            <button
              onClick={() => setActiveTab('tailor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'tailor' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tailor & Keywords
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors ml-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 print:p-0 print:bg-white">
          {activeTab === 'tailor' && targetJob ? (
            <div className="max-w-3xl mx-auto space-y-6 text-xs print:hidden">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Target Role Keyword Alignment ({targetJob.company})
                </h3>
                <p className="text-slate-600">
                  Select and emphasize skills directly matching the company's job requirements to boost your automated ATS ranking.
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-semibold text-slate-700 block">Required Job Skills:</span>
                  <div className="flex flex-wrap gap-2">
                    {targetJob.preferredSkills.map(skill => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedSkills(selectedSkills.filter(s => s !== skill));
                            } else {
                              setSelectedSkills([...selectedSkills, skill]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <label className="text-sm font-bold text-slate-900 block">
                  Tailored Executive Summary
                </label>
                <textarea
                  rows={3}
                  value={customSummary}
                  onChange={e => setCustomSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <label className="text-sm font-bold text-slate-900 block">
                  Cover Note / Engineering Pitch to Recruiter
                </label>
                <textarea
                  rows={3}
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>
            </div>
          ) : (
            /* Printable Clean Paper Resume Preview */
            <div className="max-w-3xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-xl space-y-6 font-sans border border-slate-200 print:border-none print:shadow-none print:p-0">
              {/* Resume Header */}
              <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
                    {user.fullName}
                  </h1>
                  <p className="text-sm font-bold text-indigo-700 mt-0.5">
                    {targetJob ? targetJob.role : user.headline}
                  </p>
                </div>
                <div className="text-xs text-slate-600 text-right space-y-0.5">
                  <p>{user.location}</p>
                  <p>{user.email} • {user.phone}</p>
                  <p>{user.portfolioUrl} • {user.githubUrl}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {customSummary}
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5">
                  Technical Core Competencies
                </h2>
                <p className="text-xs text-slate-800 font-medium pt-1">
                  {selectedSkills.join(' • ')}
                </p>
              </div>

              {/* Professional Experience */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5">
                  Professional Experience
                </h2>
                <div className="space-y-3 pt-1">
                  {user.experienceTimeline.map(exp => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>{exp.role} — <span className="text-indigo-800">{exp.company}</span></span>
                        <span className="text-slate-500 font-normal">{exp.startDate} – {exp.endDate} | {exp.location}</span>
                      </div>
                      <p className="text-xs text-slate-700">{exp.description}</p>
                      {exp.achievements.map((ach, i) => (
                        <p key={i} className="text-[11px] text-slate-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-indigo-700">
                          {ach}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Timeline: School to University */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5">
                  Education & Academic Timeline
                </h2>
                <div className="space-y-2 pt-1">
                  {user.educationTimeline.map(edu => (
                    <div key={edu.id} className="text-xs space-y-0.5">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{edu.degreeOrGrade} — <span className="font-semibold text-slate-700">{edu.institutionName}</span></span>
                        <span className="text-slate-500 font-normal">{edu.startYear} – {edu.endYear} | {edu.scoreOrGpa}</span>
                      </div>
                      {edu.highlights && edu.highlights[0] && (
                        <p className="text-[11px] text-slate-600 italic">
                          Honors: {edu.highlights[0]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Projects & Certifications */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5">
                    Featured Projects
                  </h2>
                  {user.projects.slice(0, 2).map(p => (
                    <div key={p.id} className="text-xs pt-1">
                      <p className="font-bold text-slate-900">{p.title}</p>
                      <p className="text-[11px] text-slate-600">{p.description}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5">
                    Certifications
                  </h2>
                  {user.certifications.slice(0, 2).map(c => (
                    <div key={c.id} className="text-xs pt-1">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-[11px] text-slate-600">{c.issuingOrg} ({c.issueDate})</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print / Save PDF</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium shadow-xs"
            >
              Close
            </button>

            {targetJob && onApplyWithResume && (
              <button
                type="button"
                id="submit-tailored-application-btn"
                onClick={handleApply}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Submit Application & Take Logic Test</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
