import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Code2,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const LogicChallengeModal: React.FC = () => {
  const {
    activeLogicChallenge,
    closeLogicChallengeModal,
    submitLogicAnswer,
    setActiveTab
  } = useApp();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{
    isCorrect: boolean;
    pointsAwarded: number;
    explanation: string;
  } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [scratchpad, setScratchpad] = useState<string>('');
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);

  if (!activeLogicChallenge) return null;

  const { challenge, source, relatedTitle } = activeLogicChallenge;

  const handleSubmit = () => {
    if (!selectedOptionId || hasSubmitted) return;

    const result = submitLogicAnswer(selectedOptionId);
    setSubmissionResult(result);
    setHasSubmitted(true);

    if (result.isCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleContinue = () => {
    closeLogicChallengeModal();
    if (source === 'course') {
      setActiveTab('skills');
    } else if (source === 'job') {
      setActiveTab('jobs');
    }
  };

  const getSourceBadge = () => {
    switch (source) {
      case 'course':
        return {
          label: 'Course Enrollment Logic Booster',
          desc: 'Triggered upon course registration to calibrate domain fundamentals.',
          color: 'bg-indigo-50 border-indigo-200 text-indigo-800'
        };
      case 'job':
        return {
          label: 'Job Application Problem-Solving Assessment',
          desc: 'Triggered upon submitting your job application to evaluate technical acumen.',
          color: 'bg-emerald-50 border-emerald-200 text-emerald-800'
        };
      default:
        return {
          label: 'Daily Logic Gym Challenge',
          desc: 'Sharpening problem solving & architectural logic.',
          color: 'bg-amber-50 border-amber-200 text-amber-800'
        };
    }
  };

  const sourceMeta = getSourceBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Highlight Banner */}
        <div className={`px-6 py-3.5 border-b flex items-center justify-between gap-4 ${sourceMeta.color}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-200 shadow-2xs">
              <BrainCircuit className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider">{sourceMeta.label}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-slate-700 border border-slate-200 shadow-2xs">
                  +{challenge.rewardPoints} Logic Points
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium truncate max-w-md">
                {relatedTitle}
              </p>
            </div>
          </div>
          <button
            onClick={closeLogicChallengeModal}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200/50 transition-colors text-sm"
          >
            ✕
          </button>
        </div>

        {/* Challenge Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Header & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                {challenge.category}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">{challenge.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  challenge.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : challenge.difficulty === 'Medium'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {challenge.difficulty}
              </span>
            </div>
          </div>

          {/* Scenario Context */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Scenario & Architectural Dilemma
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{challenge.scenario}</p>

            {challenge.codeSnippet && (
              <div className="mt-3 rounded-lg overflow-hidden border border-slate-200 bg-slate-900 shadow-2xs">
                <div className="bg-slate-800 px-3 py-1.5 border-b border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-indigo-400" /> Code / Architecture Context
                  </span>
                </div>
                <pre className="p-3 text-xs font-mono text-indigo-200 overflow-x-auto">
                  <code>{challenge.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Problem Statement */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              {challenge.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {challenge.options.map((opt, idx) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrectOption = opt.id === challenge.correctOptionId;

                let stateClasses = 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800 shadow-2xs';

                if (hasSubmitted) {
                  if (isCorrectOption) {
                    stateClasses = 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs';
                  } else if (isSelected && !isCorrectOption) {
                    stateClasses = 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs';
                  } else {
                    stateClasses = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  stateClasses = 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600 shadow-xs';
                }

                return (
                  <div
                    key={opt.id}
                    id={`logic-option-${opt.id}`}
                    onClick={() => {
                      if (!hasSubmitted) setSelectedOptionId(opt.id);
                    }}
                    className={`p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${stateClasses}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'bg-white border-slate-300 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-relaxed">{opt.text}</p>
                        {hasSubmitted && (isSelected || isCorrectOption) && (
                          <div className="mt-2 text-xs pt-2 border-t border-slate-200 flex items-start gap-1.5">
                            {isCorrectOption ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-rose-600 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={isCorrectOption ? 'text-emerald-800 font-medium' : 'text-rose-800 font-medium'}>
                              {opt.rationale}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hint & Scratchpad Utilities */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowScratchpad(!showScratchpad)}
                className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{showScratchpad ? 'Hide Scratchpad' : 'Reasoning Scratchpad'}</span>
              </button>
            </div>

            {hasSubmitted && (
              <div className="flex items-center gap-2">
                {submissionResult?.isCorrect ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <Award className="w-4 h-4" />
                    <span>+{submissionResult.pointsAwarded} Logic Points Earned!</span>
                  </div>
                ) : (
                  <div className="text-rose-700 font-medium">
                    Review explanation above to improve your reasoning!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hint Box */}
          {showHint && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs animate-in fade-in shadow-2xs">
              <span className="font-bold">Logic Clue:</span> {challenge.hint}
            </div>
          )}

          {/* Scratchpad Box */}
          {showScratchpad && (
            <div className="space-y-1.5 animate-in fade-in">
              <label className="text-[11px] font-mono text-slate-500">Working / Thought Notes:</label>
              <textarea
                value={scratchpad}
                onChange={(e) => setScratchpad(e.target.value)}
                placeholder="Draft your algorithmic steps or reasoning here..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-indigo-500 shadow-2xs"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Logic score contributes to your JOBSPHERE Talent Index</span>
          </div>

          <div className="flex items-center gap-3">
            {!hasSubmitted ? (
              <button
                id="submit-logic-answer-btn"
                disabled={!selectedOptionId}
                onClick={handleSubmit}
                className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
                  selectedOptionId
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Submit Reasoning</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="continue-after-logic-btn"
                onClick={handleContinue}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 shadow-xs transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
