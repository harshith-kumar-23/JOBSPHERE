import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Flame,
  User as UserIcon,
  BookOpen,
  Briefcase,
  MessagesSquare,
  Compass,
  Lock,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useApp, NavigationTab } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    user,
    stats,
    isAuthenticated,
    setAuthModalOpen,
    logout
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'home', label: 'Overview', icon: <Compass className="w-4 h-4" /> },
    { id: 'profile', label: 'Career Profile', icon: <UserIcon className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Courses', icon: <BookOpen className="w-4 h-4" />, badge: stats.coursesEnrolledCount },
    { id: 'jobs', label: 'Job Applications', icon: <Briefcase className="w-4 h-4" />, badge: stats.jobsAppliedCount },
    { id: 'interview', label: 'Interview Prep', icon: <MessagesSquare className="w-4 h-4" />, badge: stats.interviewsPracticedCount },
    { id: 'logic-gym', label: 'Logic Gym', icon: <Zap className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">JOBSPHERE</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Career OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                School-to-Career & Skill Acceleration Platform
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && Number(item.badge) > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            {/* Logic Score & Streak Badge */}
            <div
              id="logic-streak-badge"
              onClick={() => setActiveTab('logic-gym')}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer transition-colors"
              title="Logic Points & Daily Streak"
            >
              <div className="flex items-center gap-1 text-amber-600">
                <Flame className="w-4 h-4 fill-amber-500/20" />
                <span className="text-xs font-bold text-slate-800">{stats.logicStreakDays}d</span>
              </div>
              <div className="w-px h-3.5 bg-slate-300" />
              <div className="flex items-center gap-1 text-indigo-600">
                <Zap className="w-3.5 h-3.5 fill-indigo-600/20" />
                <span className="text-xs font-bold text-slate-800">{stats.logicPoints} pts</span>
              </div>
            </div>

            {/* Privacy & Encryption Assurance Pill */}
            <div
              id="encryption-vault-indicator"
              onClick={() => setActiveTab('profile')}
              className="hidden lg:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-800 text-xs font-medium cursor-pointer transition-colors"
              title="AES-256 Client-Side Encrypted Profile"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-semibold">AES-256 Vault</span>
            </div>

            {/* Profile Avatar / Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-lg object-cover border border-indigo-300"
                    referrerPolicy="no-referrer"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.fullName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                        <Lock className="w-3 h-3" />
                        <span>Encrypted Session Active</span>
                      </div>
                    </div>
                    <div className="py-1">
                      <button
                        id="dropdown-profile-link"
                        onClick={() => {
                          setActiveTab('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Manage School-to-Career Profile</span>
                      </button>
                      <button
                        id="dropdown-logic-gym-link"
                        onClick={() => {
                          setActiveTab('logic-gym');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Daily Logic Gym & Puzzles</span>
                      </button>
                    </div>
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        id="logout-btn"
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out Securely</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="sign-in-btn"
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 space-x-1 scrollbar-none border-t border-slate-200">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
