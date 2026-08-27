import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { ProfileSection } from './components/ProfileSection';
import { SkillsCoursesSection } from './components/SkillsCoursesSection';
import { JobsSection } from './components/JobsSection';
import { InterviewSection } from './components/InterviewSection';
import { LogicGymSection } from './components/LogicGymSection';
import { LogicChallengeModal } from './components/LogicChallengeModal';
import { AuthModal } from './components/AuthModal';
import {
  ShieldCheck,
  Sparkles,
  Lock,
  Zap,
  GraduationCap,
  Briefcase,
  BookOpen,
  MessagesSquare
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab, user } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'profile' && <ProfileSection />}
        {activeTab === 'skills' && <SkillsCoursesSection />}
        {activeTab === 'jobs' && <JobsSection />}
        {activeTab === 'interview' && <InterviewSection />}
        {activeTab === 'logic-gym' && <LogicGymSection />}
      </main>

      {/* Global Modals */}
      <LogicChallengeModal />
      <AuthModal />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
                JS
              </div>
              <div>
                <span className="font-bold text-slate-900 tracking-tight">JOBSPHERE</span>
                <span className="block text-[11px] text-slate-500">
                  School-to-Career & Cognitive Readiness Platform
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
              <button onClick={() => setActiveTab('home')} className="hover:text-indigo-600 transition-colors">Overview</button>
              <button onClick={() => setActiveTab('profile')} className="hover:text-indigo-600 transition-colors">Career Profile</button>
              <button onClick={() => setActiveTab('skills')} className="hover:text-indigo-600 transition-colors">Courses</button>
              <button onClick={() => setActiveTab('jobs')} className="hover:text-indigo-600 transition-colors">Job Applications</button>
              <button onClick={() => setActiveTab('interview')} className="hover:text-indigo-600 transition-colors">Interview Prep</button>
              <button onClick={() => setActiveTab('logic-gym')} className="hover:text-indigo-600 transition-colors">Logic Gym</button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>User profile data encrypted with hardware-salted AES-256-GCM for maximum privacy.</span>
            </div>
            <div>
              <span>© {new Date().getFullYear()} JOBSPHERE Platform. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
