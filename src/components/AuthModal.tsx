import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  Key,
  Mail,
  User,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Phone,
  Smartphone,
  Check,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { authModalOpen, setAuthModalOpen, loginWithGmail, loginWithPhone, login, signup } = useApp();

  const [authMethod, setAuthMethod] = useState<'gmail' | 'mobile'>('gmail');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  
  // Gmail State
  const [gmailAddress, setGmailAddress] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Mobile Phone State
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [simulatedOtp, setSimulatedOtp] = useState('789456');

  const [errorMessage, setErrorMessage] = useState('');

  if (!authModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 7) {
      setErrorMessage('Please enter a valid mobile phone number.');
      return;
    }
    setErrorMessage('');
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(randomOtp);
    setOtpSent(true);
    setCountdown(30);
  };

  const handleVerifyMobileOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }
    const fullPhone = `${countryCode} ${phoneNumber}`;
    loginWithPhone(fullPhone, fullName || 'Mobile User');
    setOtpSent(false);
    setOtpCode('');
  };

  const handleGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmailAddress) {
      setErrorMessage('Please provide a valid Gmail address.');
      return;
    }
    loginWithGmail(gmailAddress, fullName || undefined);
  };

  const handleOneClickGoogle = () => {
    loginWithGmail('harshith.malyala23@gmail.com', 'Harshith Malyala');
  };

  const handleDemoLogin = () => {
    loginWithGmail('alex.morgan@gmail.com', 'Alex Morgan');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md my-8 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-900 p-6 space-y-5 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Sign In to JOBSPHERE
              </h2>
              <p className="text-[11px] text-slate-500">Choose Gmail or Mobile Number Authentication</p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Method Switcher: Gmail vs Mobile Number */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setAuthMethod('gmail'); setErrorMessage(''); setOtpSent(false); }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              authMethod === 'gmail' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span>Gmail / Google</span>
          </button>
          <button
            type="button"
            onClick={() => { setAuthMethod('mobile'); setErrorMessage(''); setOtpSent(false); }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              authMethod === 'mobile' ? 'bg-white text-indigo-700 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mobile Number</span>
          </button>
        </div>

        {/* GMAIL METHOD */}
        {authMethod === 'gmail' && (
          <div className="space-y-4 text-xs">
            {/* 1-Click Google / Gmail Button */}
            <button
              type="button"
              onClick={handleOneClickGoogle}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center gap-3 shadow-xs transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Continue with Google / Gmail</span>
            </button>

            <div className="flex items-center gap-2 text-slate-400">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] uppercase font-semibold">Or enter Gmail address</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <form onSubmit={handleGmailSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Full Name (Optional)</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Harshith Malyala"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Gmail Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={gmailAddress}
                    onChange={e => setGmailAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-[11px] text-rose-600 font-medium">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-all text-xs"
              >
                Sign In with Gmail
              </button>
            </form>
          </div>
        )}

        {/* MOBILE NUMBER METHOD */}
        {authMethod === 'mobile' && (
          <div className="space-y-4 text-xs">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Full Name (Optional)</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Harshith Malyala"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile Phone Number</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-900 font-medium focus:outline-none focus:border-indigo-500 shadow-xs text-xs"
                    >
                      <option value="+1">🇺🇸 +1 (US)</option>
                      <option value="+91">🇮🇳 +91 (IN)</option>
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+61">🇦🇺 +61 (AU)</option>
                      <option value="+49">🇩🇪 +49 (DE)</option>
                      <option value="+65">🇸🇬 +65 (SG)</option>
                      <option value="+81">🇯🇵 +81 (JP)</option>
                      <option value="+971">🇦🇪 +971 (AE)</option>
                    </select>

                    <div className="relative flex-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                        required
                      />
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-[11px] text-rose-600 font-medium">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Send 6-Digit SMS Verification Code</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyMobileOtp} className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between text-emerald-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      SMS OTP Sent Successfully
                    </span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[10px] text-emerald-700 hover:underline"
                    >
                      Change Number
                    </button>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    We sent a verification code to <strong>{countryCode} {phoneNumber}</strong>.
                  </p>
                  <p className="text-[11px] font-mono text-emerald-800 bg-white/80 px-2 py-1 rounded border border-emerald-200 inline-block mt-1">
                    Demo Code: <strong>{simulatedOtp}</strong>
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-700 font-semibold">Enter 6-Digit Code</label>
                    <button
                      type="button"
                      onClick={() => setOtpCode(simulatedOtp)}
                      className="text-[10px] text-indigo-600 hover:underline font-bold"
                    >
                      Auto-fill Code
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 789456"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-center text-lg font-mono tracking-widest text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    required
                  />
                </div>

                {errorMessage && (
                  <p className="text-[11px] text-rose-600 font-medium">{errorMessage}</p>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Verify & Enter Career Vault</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Demo Quick Access */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Quick Demo Access
            </span>
            <span className="text-[10px] text-slate-500">Pre-configured profiles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => loginWithGmail('alex.morgan@gmail.com', 'Alex Morgan')}
              className="py-1.5 px-2.5 rounded-lg text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Mail className="w-3 h-3 text-rose-500" />
              <span>Alex Morgan (Gmail)</span>
            </button>
            <button
              type="button"
              onClick={() => loginWithPhone('+1 (555) 234-5678', 'Alex Morgan')}
              className="py-1.5 px-2.5 rounded-lg text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Smartphone className="w-3 h-3 text-emerald-600" />
              <span>+1 (555) 234-5678</span>
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-[11px] text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span>
            Zero-knowledge security. Your career records are encrypted using <strong>AES-256-GCM</strong>.
          </span>
        </div>
      </div>
    </div>
  );
};
