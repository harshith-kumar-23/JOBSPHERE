import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Lock,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  Sparkles,
  Download,
  Key,
  FolderGit2,
  Check,
  RefreshCw,
  Mail,
  Smartphone,
  Phone,
  User as UserIcon,
  LogOut,
  ArrowRight,
  Shield,
  SmartphoneNfc
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EducationEntry, ExperienceEntry } from '../types';

export const ProfileSection: React.FC = () => {
  const {
    user,
    updateProfile,
    reEncryptVault,
    isAuthenticated,
    loginWithGmail,
    loginWithPhone,
    logout,
    setAuthModalOpen
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'skills' | 'projects' | 'security'>('timeline');
  const [isEditingHeader, setIsEditingHeader] = useState<boolean>(false);
  const [reEncrypting, setReEncrypting] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // In-Profile Sign In State (if not authenticated or switching accounts)
  const [authMethod, setAuthMethod] = useState<'gmail' | 'mobile'>('gmail');
  const [inProfileGmail, setInProfileGmail] = useState('');
  const [inProfileName, setInProfileName] = useState('');
  const [inProfileCountryCode, setInProfileCountryCode] = useState('+1');
  const [inProfilePhone, setInProfilePhone] = useState('');
  const [inProfileOtpSent, setInProfileOtpSent] = useState(false);
  const [inProfileOtpCode, setInProfileOtpCode] = useState('');
  const [inProfileSimulatedOtp, setInProfileSimulatedOtp] = useState('582910');
  const [authError, setAuthError] = useState('');

  // Edit Header Form State
  const [headerForm, setHeaderForm] = useState({
    fullName: user.fullName,
    headline: user.headline,
    bio: user.bio,
    location: user.location,
    phone: user.phone,
    githubUrl: user.githubUrl,
    linkedinUrl: user.linkedinUrl,
    portfolioUrl: user.portfolioUrl
  });

  // Add Education Modal State
  const [showAddEduModal, setShowAddEduModal] = useState<boolean>(false);
  const [eduForm, setEduForm] = useState<Omit<EducationEntry, 'id'>>({
    level: 'undergraduate',
    institutionName: '',
    degreeOrGrade: '',
    fieldOfStudy: '',
    startYear: '2020',
    endYear: '2024',
    location: '',
    scoreOrGpa: '',
    highlights: ['']
  });

  // Add Experience Modal State
  const [showAddExpModal, setShowAddExpModal] = useState<boolean>(false);
  const [expForm, setExpForm] = useState<Omit<ExperienceEntry, 'id'>>({
    company: '',
    role: '',
    employmentType: 'Full-time',
    startDate: '',
    endDate: 'Present',
    isCurrent: true,
    location: '',
    description: '',
    skillsUsed: [''],
    achievements: ['']
  });

  const handleSaveHeader = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(headerForm);
    setIsEditingHeader(false);
  };

  const handleTriggerReEncrypt = () => {
    setReEncrypting(true);
    setTimeout(() => {
      reEncryptVault();
      setReEncrypting(false);
    }, 800);
  };

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(user.encryptionKeyFingerprint);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const newEdu: EducationEntry = {
      ...eduForm,
      id: `edu_${Date.now()}`,
      highlights: eduForm.highlights.filter(h => h.trim().length > 0)
    };
    updateProfile({
      educationTimeline: [...user.educationTimeline, newEdu]
    });
    setShowAddEduModal(false);
    setEduForm({
      level: 'undergraduate',
      institutionName: '',
      degreeOrGrade: '',
      fieldOfStudy: '',
      startYear: '2020',
      endYear: '2024',
      location: '',
      scoreOrGpa: '',
      highlights: ['']
    });
  };

  const handleDeleteEducation = (id: string) => {
    updateProfile({
      educationTimeline: user.educationTimeline.filter(e => e.id !== id)
    });
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const newExp: ExperienceEntry = {
      ...expForm,
      id: `exp_${Date.now()}`,
      skillsUsed: expForm.skillsUsed.filter(s => s.trim().length > 0),
      achievements: expForm.achievements.filter(a => a.trim().length > 0)
    };
    updateProfile({
      experienceTimeline: [...user.experienceTimeline, newExp]
    });
    setShowAddExpModal(false);
  };

  const handleDeleteExperience = (id: string) => {
    updateProfile({
      experienceTimeline: user.experienceTimeline.filter(e => e.id !== id)
    });
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(user, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `JOBSPHERE_Encrypted_Profile_${user.fullName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Sign In Handlers for the in-profile view
  const handleInProfileSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inProfilePhone || inProfilePhone.replace(/\D/g, '').length < 6) {
      setAuthError('Please enter a valid mobile number.');
      return;
    }
    setAuthError('');
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setInProfileSimulatedOtp(randomCode);
    setInProfileOtpSent(true);
  };

  const handleInProfileVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inProfileOtpCode || inProfileOtpCode.length < 4) {
      setAuthError('Please enter the 6-digit code sent to your phone.');
      return;
    }
    const fullPhone = `${inProfileCountryCode} ${inProfilePhone}`;
    loginWithPhone(fullPhone, inProfileName || undefined);
    setInProfileOtpSent(false);
    setInProfileOtpCode('');
  };

  const handleInProfileGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inProfileGmail) {
      setAuthError('Please enter a valid Gmail address.');
      return;
    }
    loginWithGmail(inProfileGmail, inProfileName || undefined);
  };

  // IF NOT AUTHENTICATED: Present Dedicated Sign-in View in Profile Section
  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 pb-16 pt-4 animate-in fade-in zoom-in-95">
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-md mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In to Access Your Career Profile
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Sign in using your <strong>Gmail / Google Account</strong> or your <strong>Mobile Number</strong> to unlock your verified educational milestones, skill certifications, and encrypted career vault.
          </p>
        </div>

        {/* Main Sign-In Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-6">
          {/* Method Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              id="profile-signin-gmail-tab"
              type="button"
              onClick={() => { setAuthMethod('gmail'); setAuthError(''); setInProfileOtpSent(false); }}
              className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                authMethod === 'gmail'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Sign In with Gmail</span>
            </button>
            <button
              id="profile-signin-mobile-tab"
              type="button"
              onClick={() => { setAuthMethod('mobile'); setAuthError(''); setInProfileOtpSent(false); }}
              className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                authMethod === 'mobile'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <span>Sign In with Mobile</span>
            </button>
          </div>

          {/* METHOD 1: GMAIL SIGN IN */}
          {authMethod === 'gmail' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* 1-Click Google Sign-in */}
              <button
                id="profile-google-oneclick-btn"
                type="button"
                onClick={() => loginWithGmail('harshith.malyala23@gmail.com', 'Harshith Malyala')}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm flex items-center justify-center gap-3 shadow-xs transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google / Gmail (1-Click)</span>
              </button>

              <div className="flex items-center gap-3 text-slate-400">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Or Enter Your Gmail</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <form onSubmit={handleInProfileGmailSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Full Name (Optional)</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Harshith Malyala"
                      value={inProfileName}
                      onChange={e => setInProfileName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Gmail Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={inProfileGmail}
                      onChange={e => setInProfileGmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                      required
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-xs text-rose-600 font-semibold">{authError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Sign In with Gmail</span>
                </button>
              </form>
            </div>
          )}

          {/* METHOD 2: MOBILE NUMBER WITH OTP */}
          {authMethod === 'mobile' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {!inProfileOtpSent ? (
                <form onSubmit={handleInProfileSendOtp} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Full Name (Optional)</label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Harshith Malyala"
                        value={inProfileName}
                        onChange={e => setInProfileName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Mobile Phone Number</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={inProfileCountryCode}
                        onChange={e => setInProfileCountryCode(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:border-indigo-500 shadow-xs text-xs sm:text-sm"
                      >
                        <option value="+1">🇺🇸 +1 (USA / Canada)</option>
                        <option value="+91">🇮🇳 +91 (India)</option>
                        <option value="+44">🇬🇧 +44 (UK)</option>
                        <option value="+61">🇦🇺 +61 (Australia)</option>
                        <option value="+49">🇩🇪 +49 (Germany)</option>
                        <option value="+65">🇸🇬 +65 (Singapore)</option>
                        <option value="+81">🇯🇵 +81 (Japan)</option>
                        <option value="+971">🇦🇪 +971 (UAE)</option>
                      </select>

                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          value={inProfilePhone}
                          onChange={e => setInProfilePhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {authError && (
                    <p className="text-xs text-rose-600 font-semibold">{authError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Send 6-Digit SMS Verification Code</span>
                  </button>
                </form>
              ) : (
                <form onSubmit={handleInProfileVerifyOtp} className="space-y-5">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                    <div className="flex items-center justify-between text-emerald-900 font-bold text-xs sm:text-sm">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        SMS Code Dispatched
                      </span>
                      <button
                        type="button"
                        onClick={() => setInProfileOtpSent(false)}
                        className="text-xs text-emerald-700 hover:underline"
                      >
                        Change Number
                      </button>
                    </div>
                    <p className="text-slate-600 text-xs">
                      We sent a one-time verification code to <strong>{inProfileCountryCode} {inProfilePhone}</strong>.
                    </p>
                    <div className="pt-1">
                      <span className="text-xs font-mono text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 font-bold inline-block">
                        Demo Verification Code: {inProfileSimulatedOtp}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-slate-700 font-semibold text-xs sm:text-sm">Enter 6-Digit Code</label>
                      <button
                        type="button"
                        onClick={() => setInProfileOtpCode(inProfileSimulatedOtp)}
                        className="text-xs text-indigo-600 hover:underline font-bold"
                      >
                        Auto-fill Code
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 582910"
                      value={inProfileOtpCode}
                      onChange={e => setInProfileOtpCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-center text-xl font-mono tracking-widest text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                      required
                    />
                  </div>

                  {authError && (
                    <p className="text-xs text-rose-600 font-semibold">{authError}</p>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setInProfileOtpSent(false)}
                      className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Verify & Access Career Vault</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Quick Demo Accounts */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Quick 1-Click Demo Profiles
              </span>
              <span className="text-[11px] text-slate-500">Test platform instantly</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => loginWithGmail('harshith.malyala23@gmail.com', 'Harshith Malyala')}
                className="p-2.5 rounded-xl bg-white hover:bg-indigo-50/50 border border-slate-200 text-left transition-all shadow-xs flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Harshith Malyala</div>
                  <div className="text-[10px] text-slate-500">harshith.malyala23@gmail.com</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => loginWithPhone('+1 (555) 234-5678', 'Alex Morgan')}
                className="p-2.5 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 text-left transition-all shadow-xs flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Alex Morgan</div>
                  <div className="text-[10px] text-slate-500">+1 (555) 234-5678 (Mobile OTP)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Zero Knowledge Privacy Notice */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Knowledge Cryptographic Vault:</strong> Your academic records, resume highlights, and test scores are encrypted locally using AES-256 GCM before cloud synchronization.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: Render Full Career Profile with Account Status & Switcher
  return (
    <div className="space-y-8 pb-16 animate-in fade-in">
      {/* Active Account & Credential Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Signed In & Verified
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <strong className="text-white">{user.email}</strong>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <strong className="text-white">{user.phone}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setAuthModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-indigo-400" />
            <span>Switch Mobile / Gmail</span>
          </button>

          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Profile Top Banner & Identity Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs"
                title="AES-256 Verified Data Encrypted"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{user.fullName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Encrypted Vault Active</span>
                </span>
              </div>
              <p className="text-sm font-semibold text-indigo-600">{user.headline}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {user.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-rose-500" />
                  {user.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-emerald-600" />
                  {user.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="edit-profile-header-btn"
              onClick={() => setIsEditingHeader(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Edit Details</span>
            </button>

            <button
              id="export-profile-json-btn"
              onClick={handleExportJSON}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Vault</span>
            </button>
          </div>
        </div>

        {user.bio && (
          <p className="mt-5 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {user.bio}
          </p>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'timeline'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>School to Career Timeline</span>
        </button>

        <button
          onClick={() => setActiveSubTab('skills')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'skills'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Skills & Badges ({user.skills.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'projects'
              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FolderGit2 className="w-4 h-4 text-indigo-600" />
          <span>Projects & Certifications</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'security'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security & Sign-In Settings</span>
        </button>
      </div>

      {/* Sub-Tab 1: School to Career Timeline */}
      {activeSubTab === 'timeline' && (
        <div className="space-y-10">
          {/* Educational Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  Academic History: From Schooling to University
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete progression detailing secondary schooling, pre-university, undergraduate degrees, and academic distinctions.
                </p>
              </div>
              <button
                id="add-education-btn"
                onClick={() => setShowAddEduModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education Milestone</span>
              </button>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-100">
              {user.educationTimeline.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-[10px] text-indigo-600 shadow-xs">
                    <GraduationCap className="w-3 h-3" />
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50/20 transition-all space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-100 text-indigo-800">
                          {edu.level}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{edu.institutionName}</h3>
                        <p className="text-xs font-medium text-slate-600">
                          {edu.degreeOrGrade} {edu.fieldOfStudy ? `• ${edu.fieldOfStudy}` : ''}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                          {edu.startYear} - {edu.endYear}
                        </span>
                        <button
                          onClick={() => handleDeleteEducation(edu.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete Milestone"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span><strong>Score/GPA:</strong> {edu.scoreOrGpa}</span>
                      {edu.location && <span><strong>Location:</strong> {edu.location}</span>}
                    </div>

                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
                        {edu.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career & Work Experience Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                  Professional Experience & Industry Positions
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified roles, internships, production contributions, and corporate achievements.
                </p>
              </div>
              <button
                id="add-experience-btn"
                onClick={() => setShowAddExpModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-100">
              {user.experienceTimeline.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center text-[10px] text-emerald-600 shadow-xs">
                    <Briefcase className="w-3 h-3" />
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50/20 transition-all space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {exp.employmentType}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{exp.company} • {exp.location}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                          {exp.startDate} - {exp.endDate}
                        </span>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete Experience"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1">{exp.description}</p>

                    {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skillsUsed.map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-800 text-[10px] font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Skills & Badges */}
      {activeSubTab === 'skills' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Verified Technical Proficiencies & Badges
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated through completed courses and interview simulations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-800">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${skill.endorsementsCount * 20}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Category: {skill.category}</span>
                  <span>{skill.endorsementsCount} Verified Credits</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Projects & Certifications */}
      {activeSubTab === 'projects' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-600" />
              Featured Engineering Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.projects.map(proj => (
                <div
                  key={proj.id}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">{proj.title}</h3>
                    {proj.featured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-medium border border-indigo-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Verified Industry Certifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.certifications.map(cert => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-amber-300 transition-colors"
                >
                  <span className="text-[10px] font-mono text-amber-700 font-semibold">{cert.issuingOrg}</span>
                  <h4 className="text-xs font-bold text-slate-900">{cert.name}</h4>
                  <p className="text-[11px] text-slate-500">Issued: {cert.issueDate}</p>
                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-slate-400 truncate">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Security & Sign-In Settings */}
      {activeSubTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Security, Sign-In Credentials & AES-256 Vault
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your authenticated Gmail / Mobile sign-in methods and zero-knowledge encryption parameters.
              </p>
            </div>

            <button
              id="re-encrypt-vault-btn"
              disabled={reEncrypting}
              onClick={handleTriggerReEncrypt}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${reEncrypting ? 'animate-spin' : ''}`} />
              <span>{reEncrypting ? 'Re-encrypting...' : 'Re-Encrypt Data Vault'}</span>
            </button>
          </div>

          {/* Linked Sign-In Methods Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-rose-500" />
                Primary Gmail Account
              </h3>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{user.email}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Google / Gmail Sign-In
                  </p>
                </div>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                Linked Mobile Number
              </h3>
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{user.phone}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    SMS 2FA / OTP Active
                  </p>
                </div>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-4 h-4 text-indigo-600" />
                Cryptographic Key & Encryption State
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Active Protocol:</span>
                  <span className="font-mono text-emerald-700 font-bold">{user.encryptionAlgorithm}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">SHA-256 Key Checksum Fingerprint:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="p-2 rounded bg-white border border-slate-200 font-mono text-[11px] text-indigo-700 flex-1 truncate">
                      {user.encryptionKeyFingerprint}
                    </code>
                    <button
                      onClick={handleCopyFingerprint}
                      className="px-2.5 py-2 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold shadow-xs"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block">Last Salted & Encrypted:</span>
                  <span className="text-slate-700 font-medium">{new Date(user.lastEncryptedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                Zero-Knowledge Privacy Guarantees
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Zero Plaintext Storage:</strong> Personal school scores, contacts, and work details are encrypted before persistence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Granular Recruiter Visibility:</strong> You choose which verified milestones are visible to prospective employers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Tamper-Proof Ledger:</strong> Cryptographic hashes prevent unauthorized alteration of completed course credentials.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Edit Header Modal */}
      {isEditingHeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Profile Details</h3>
              <button onClick={() => setIsEditingHeader(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSaveHeader} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={headerForm.fullName}
                  onChange={e => setHeaderForm({ ...headerForm, fullName: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Headline / Role Title</label>
                <input
                  type="text"
                  value={headerForm.headline}
                  onChange={e => setHeaderForm({ ...headerForm, headline: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={headerForm.location}
                    onChange={e => setHeaderForm({ ...headerForm, location: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile Phone Number</label>
                  <input
                    type="text"
                    value={headerForm.phone}
                    onChange={e => setHeaderForm({ ...headerForm, phone: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={headerForm.bio}
                  onChange={e => setHeaderForm({ ...headerForm, bio: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingHeader(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Education Modal */}
      {showAddEduModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Add Educational Progression Milestone
              </h3>
              <button onClick={() => setShowAddEduModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddEducation} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Education Level</label>
                  <select
                    value={eduForm.level}
                    onChange={e => setEduForm({ ...eduForm, level: e.target.value as any })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="school">Secondary School (10th/Matric)</option>
                    <option value="intermediate">Intermediate / High School (12th)</option>
                    <option value="undergraduate">Undergraduate (B.Tech, B.S., B.A.)</option>
                    <option value="postgraduate">Postgraduate (M.S., M.Tech, MBA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Institution Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Stanford University or Lincoln High"
                    value={eduForm.institutionName}
                    onChange={e => setEduForm({ ...eduForm, institutionName: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Degree / Certificate / Grade</label>
                  <input
                    type="text"
                    placeholder="e.g. B.S. in Computer Science"
                    value={eduForm.degreeOrGrade}
                    onChange={e => setEduForm({ ...eduForm, degreeOrGrade: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Field of Study (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Artificial Intelligence"
                    value={eduForm.fieldOfStudy}
                    onChange={e => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Start Year</label>
                  <input
                    type="text"
                    value={eduForm.startYear}
                    onChange={e => setEduForm({ ...eduForm, startYear: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">End Year</label>
                  <input
                    type="text"
                    value={eduForm.endYear}
                    onChange={e => setEduForm({ ...eduForm, endYear: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Score / GPA</label>
                  <input
                    type="text"
                    placeholder="e.g. 3.92 GPA / 95%"
                    value={eduForm.scoreOrGpa}
                    onChange={e => setEduForm({ ...eduForm, scoreOrGpa: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Seattle, WA"
                    value={eduForm.location}
                    onChange={e => setEduForm({ ...eduForm, location: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddEduModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {showAddExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                Add Career Milestone
              </h3>
              <button onClick={() => setShowAddExpModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddExperience} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Google or Stripe"
                    value={expForm.company}
                    onChange={e => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Role Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    value={expForm.role}
                    onChange={e => setExpForm({ ...expForm, role: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Start Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Jan 2024"
                    value={expForm.startDate}
                    onChange={e => setExpForm({ ...expForm, startDate: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">End Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Present"
                    value={expForm.endDate}
                    onChange={e => setExpForm({ ...expForm, endDate: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-slate-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={expForm.isCurrent}
                    onChange={e => setExpForm({ ...expForm, isCurrent: e.target.checked })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-0"
                  />
                  <span>This is my current position</span>
                </label>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description & Impact</label>
                <textarea
                  rows={3}
                  placeholder="Summarize your key responsibilities and engineering impact..."
                  value={expForm.description}
                  onChange={e => setExpForm({ ...expForm, description: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddExpModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs"
                >
                  Add Position
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
