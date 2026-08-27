import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Course,
  JobListing,
  InterviewQuestion,
  CompletedInterview,
  EnrolledCourse,
  JobApplication,
  UserStats,
  LogicChallenge
} from '../types';
import {
  INITIAL_USER_PROFILE,
  DEMO_COURSES,
  DEMO_JOBS,
  DEMO_INTERVIEW_QUESTIONS,
  INITIAL_COMPLETED_INTERVIEWS,
  INITIAL_ENROLLED_COURSES,
  INITIAL_APPLICATIONS,
  INITIAL_USER_STATS
} from '../data/mockData';

export type NavigationTab = 'home' | 'profile' | 'skills' | 'jobs' | 'interview' | 'logic-gym';

interface AppContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  courses: Course[];
  enrolledCourses: EnrolledCourse[];
  jobs: JobListing[];
  applications: JobApplication[];
  interviewQuestions: InterviewQuestion[];
  completedInterviews: CompletedInterview[];
  stats: UserStats;
  
  // Logic booster trigger state
  activeLogicChallenge: {
    challenge: LogicChallenge;
    source: 'course' | 'job' | 'gym';
    relatedTitle: string;
  } | null;
  openLogicChallengeModal: (challenge: LogicChallenge, source: 'course' | 'job' | 'gym', relatedTitle: string) => void;
  closeLogicChallengeModal: () => void;
  submitLogicAnswer: (optionId: string) => { isCorrect: boolean; pointsAwarded: number; explanation: string };

  // Course actions
  enrollInCourse: (courseId: string) => void;
  completeCourseModule: (courseId: string, moduleId: string) => void;
  selectedCourseForPlayer: Course | null;
  setSelectedCourseForPlayer: (course: Course | null) => void;

  // Job actions & resume builder
  applyForJob: (jobId: string, customNote?: string, tailoredSkills?: string[]) => void;
  selectedJobForDetail: JobListing | null;
  setSelectedJobForDetail: (job: JobListing | null) => void;
  resumeBuilderOpen: boolean;
  setResumeBuilderOpen: (open: boolean) => void;
  targetJobForResume: JobListing | null;
  setTargetJobForResume: (job: JobListing | null) => void;

  // Interview actions
  recordCompletedInterview: (interview: Omit<CompletedInterview, 'id' | 'completedAt'>) => void;

  // Profile and Security actions
  updateProfile: (updated: Partial<UserProfile>) => void;
  reEncryptVault: () => void;
  login: (emailOrPhone: string, password?: string, extra?: { fullName?: string; phone?: string; loginMethod?: 'gmail' | 'phone' | 'email' }) => boolean;
  loginWithGmail: (gmailAddress: string, fullName?: string) => boolean;
  loginWithPhone: (phoneNumber: string, fullName?: string) => boolean;
  signup: (name: string, email: string, password?: string, phone?: string) => boolean;
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'jobshpere_user_profile_v1',
  ENROLLED_COURSES: 'jobshpere_enrolled_courses_v1',
  APPLICATIONS: 'jobshpere_applications_v1',
  COMPLETED_INTERVIEWS: 'jobshpere_completed_interviews_v1',
  STATS: 'jobshpere_stats_v1',
  AUTH: 'jobshpere_auth_state_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    return saved ? JSON.parse(saved) : true;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [courses] = useState<Course[]>(DEMO_COURSES);
  const [jobs] = useState<JobListing[]>(DEMO_JOBS);
  const [interviewQuestions] = useState<InterviewQuestion[]>(DEMO_INTERVIEW_QUESTIONS);

  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENROLLED_COURSES);
    return saved ? JSON.parse(saved) : INITIAL_ENROLLED_COURSES;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [completedInterviews, setCompletedInterviews] = useState<CompletedInterview[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_INTERVIEWS);
    return saved ? JSON.parse(saved) : INITIAL_COMPLETED_INTERVIEWS;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : INITIAL_USER_STATS;
  });

  // Modal / Interaction states
  const [activeLogicChallenge, setActiveLogicChallenge] = useState<{
    challenge: LogicChallenge;
    source: 'course' | 'job' | 'gym';
    relatedTitle: string;
  } | null>(null);

  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState<Course | null>(null);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobListing | null>(null);
  const [resumeBuilderOpen, setResumeBuilderOpen] = useState<boolean>(false);
  const [targetJobForResume, setTargetJobForResume] = useState<JobListing | null>(null);

  // Synchronize state with LocalStorage for persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENROLLED_COURSES, JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_INTERVIEWS, JSON.stringify(completedInterviews));
  }, [completedInterviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const openLogicChallengeModal = (challenge: LogicChallenge, source: 'course' | 'job' | 'gym', relatedTitle: string) => {
    setActiveLogicChallenge({ challenge, source, relatedTitle });
  };

  const closeLogicChallengeModal = () => {
    setActiveLogicChallenge(null);
  };

  const submitLogicAnswer = (optionId: string) => {
    if (!activeLogicChallenge) return { isCorrect: false, pointsAwarded: 0, explanation: '' };
    const { challenge } = activeLogicChallenge;
    const isCorrect = optionId === challenge.correctOptionId;
    const selectedOpt = challenge.options.find(o => o.id === optionId);
    const explanation = selectedOpt?.rationale || '';

    if (isCorrect) {
      setStats(prev => ({
        ...prev,
        logicPoints: prev.logicPoints + challenge.rewardPoints,
        challengesSolvedCount: prev.challengesSolvedCount + 1,
        logicStreakDays: prev.logicStreakDays + 1
      }));
    }

    return {
      isCorrect,
      pointsAwarded: isCorrect ? challenge.rewardPoints : 0,
      explanation
    };
  };

  const enrollInCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Check if already enrolled
    const exists = enrolledCourses.find(ec => ec.courseId === courseId);
    if (!exists) {
      const newEnrollment: EnrolledCourse = {
        courseId,
        enrolledAt: new Date().toISOString(),
        completedModuleIds: [],
        progressPercent: 0,
        isCompleted: false
      };
      setEnrolledCourses(prev => [newEnrollment, ...prev]);
      setStats(prev => ({ ...prev, coursesEnrolledCount: prev.coursesEnrolledCount + 1 }));
    }

    // Trigger the course's logical question booster immediately!
    openLogicChallengeModal(
      course.logicChallenge,
      'course',
      `Enrolled in "${course.title}"`
    );
  };

  const completeCourseModule = (courseId: string, moduleId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setEnrolledCourses(prev => prev.map(ec => {
      if (ec.courseId !== courseId) return ec;
      
      const newCompleted = ec.completedModuleIds.includes(moduleId)
        ? ec.completedModuleIds
        : [...ec.completedModuleIds, moduleId];
      
      const progressPercent = Math.round((newCompleted.length / course.modules.length) * 100);
      const isCompleted = progressPercent === 100;
      const certificateId = isCompleted && !ec.certificateId
        ? `JS-CERT-${course.category.substring(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
        : ec.certificateId;

      if (isCompleted && !ec.isCompleted) {
        setStats(s => ({ ...s, coursesCompletedCount: s.coursesCompletedCount + 1, logicPoints: s.logicPoints + 200 }));
      }

      return {
        ...ec,
        completedModuleIds: newCompleted,
        progressPercent,
        isCompleted,
        completedAt: isCompleted ? (ec.completedAt || new Date().toISOString()) : undefined,
        certificateId
      };
    }));
  };

  const applyForJob = (jobId: string, customNote?: string, tailoredSkills?: string[]) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Check if already applied
    const exists = applications.find(a => a.jobId === jobId);
    if (!exists) {
      const newApp: JobApplication = {
        id: `app_${Date.now()}`,
        jobId,
        company: job.company,
        role: job.role,
        appliedAt: new Date().toISOString(),
        status: 'Applied',
        customCoverNote: customNote || `Excited to bring deep technical expertise in ${job.preferredSkills.slice(0, 3).join(', ')} to ${job.company}.`,
        tailoredSkills: tailoredSkills || job.preferredSkills,
        matchScore: 94
      };
      setApplications(prev => [newApp, ...prev]);
      setStats(prev => ({ ...prev, jobsAppliedCount: prev.jobsAppliedCount + 1 }));
    }

    // Trigger the job application logical assessment test immediately!
    openLogicChallengeModal(
      job.logicChallenge,
      'job',
      `Application for ${job.role} at ${job.company}`
    );
  };

  const recordCompletedInterview = (interviewData: Omit<CompletedInterview, 'id' | 'completedAt'>) => {
    const newInterview: CompletedInterview = {
      ...interviewData,
      id: `int_session_${Date.now()}`,
      completedAt: new Date().toISOString()
    };
    setCompletedInterviews(prev => [newInterview, ...prev]);
    setStats(prev => ({
      ...prev,
      interviewsPracticedCount: prev.interviewsPracticedCount + 1,
      logicPoints: prev.logicPoints + Math.round(interviewData.scorePercent * 1.5)
    }));
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser(prev => {
      const next = { ...prev, ...updated };
      next.lastEncryptedAt = new Date().toISOString();
      return next;
    });
  };

  const reEncryptVault = () => {
    const mockFingerprint = `SHA256:${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    setUser(prev => ({
      ...prev,
      isDataEncrypted: true,
      encryptionAlgorithm: 'AES-256-GCM (Hardware Salted Key Derivation)',
      encryptionKeyFingerprint: mockFingerprint,
      lastEncryptedAt: new Date().toISOString()
    }));
  };

  const login = (
    emailOrPhone: string,
    _password?: string,
    extra?: { fullName?: string; phone?: string; loginMethod?: 'gmail' | 'phone' | 'email' }
  ) => {
    setIsAuthenticated(true);
    const isEmail = emailOrPhone.includes('@');
    const isPhone = !isEmail && emailOrPhone.replace(/\D/g, '').length >= 6;

    setUser(prev => {
      const derivedName = extra?.fullName || (isEmail ? emailOrPhone.split('@')[0].replace(/[._-]/g, ' ') : prev.fullName);
      const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
      return {
        ...prev,
        email: isEmail ? emailOrPhone : (extra?.phone ? prev.email : prev.email),
        phone: isPhone ? emailOrPhone : (extra?.phone || prev.phone),
        fullName: formattedName || prev.fullName
      };
    });
    setAuthModalOpen(false);
    return true;
  };

  const loginWithGmail = (gmailAddress: string, fullName?: string) => {
    setIsAuthenticated(true);
    const cleanEmail = gmailAddress.includes('@') ? gmailAddress : `${gmailAddress}@gmail.com`;
    const derivedName = fullName || cleanEmail.split('@')[0].replace(/[._-]/g, ' ');
    const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    setUser(prev => ({
      ...prev,
      email: cleanEmail,
      fullName: formattedName || prev.fullName
    }));
    setAuthModalOpen(false);
    return true;
  };

  const loginWithPhone = (phoneNumber: string, fullName?: string) => {
    setIsAuthenticated(true);
    const derivedName = fullName || 'Mobile User';
    setUser(prev => ({
      ...prev,
      phone: phoneNumber,
      fullName: fullName || prev.fullName || derivedName
    }));
    setAuthModalOpen(false);
    return true;
  };

  const signup = (name: string, email: string, _password?: string, phone?: string) => {
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      fullName: name || 'Alex Morgan',
      email: email || 'user@jobshpere.dev',
      phone: phone || prev.phone
    }));
    setAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        activeTab,
        setActiveTab,
        courses,
        enrolledCourses,
        jobs,
        applications,
        interviewQuestions,
        completedInterviews,
        stats,
        activeLogicChallenge,
        openLogicChallengeModal,
        closeLogicChallengeModal,
        submitLogicAnswer,
        enrollInCourse,
        completeCourseModule,
        selectedCourseForPlayer,
        setSelectedCourseForPlayer,
        applyForJob,
        selectedJobForDetail,
        setSelectedJobForDetail,
        resumeBuilderOpen,
        setResumeBuilderOpen,
        targetJobForResume,
        setTargetJobForResume,
        recordCompletedInterview,
        updateProfile,
        reEncryptVault,
        login,
        loginWithGmail,
        loginWithPhone,
        signup,
        logout,
        authModalOpen,
        setAuthModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
