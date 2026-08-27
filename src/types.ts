export type EducationLevel = 'school' | 'intermediate' | 'undergraduate' | 'postgraduate';

export interface EducationEntry {
  id: string;
  level: EducationLevel;
  institutionName: string;
  degreeOrGrade: string;
  fieldOfStudy?: string;
  startYear: string;
  endYear: string;
  location: string;
  scoreOrGpa: string;
  highlights: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  employmentType: 'Full-time' | 'Internship' | 'Part-time' | 'Contract' | 'Freelance';
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  description: string;
  skillsUsed: string[];
  achievements: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  location: string;
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  educationTimeline: EducationEntry[];
  experienceTimeline: ExperienceEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  skills: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; category: string }[];
  isDataEncrypted: boolean;
  encryptionAlgorithm: string;
  encryptionKeyFingerprint: string;
  lastEncryptedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  content: string;
  keyTakeaways: string[];
  isCompleted?: boolean;
}

export interface LogicChallenge {
  id: string;
  title: string;
  category: string;
  scenario: string;
  question: string;
  codeSnippet?: string;
  options: { id: string; text: string; rationale: string }[];
  correctOptionId: string;
  hint: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rewardPoints: number;
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'AI & Data Science' | 'System Design' | 'Cybersecurity' | 'Programming Languages' | 'Career & Professional';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  rating: number;
  totalStudents: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  thumbnail: string;
  overview: string;
  modules: CourseModule[];
  skillsGained: string[];
  logicChallenge: LogicChallenge;
}

export interface EnrolledCourse {
  courseId: string;
  enrolledAt: string;
  completedModuleIds: string[];
  progressPercent: number;
  isCompleted: boolean;
  completedAt?: string;
  certificateId?: string;
}

export interface JobListing {
  id: string;
  company: string;
  companyLogo: string;
  role: string;
  department: string;
  industry?: string;
  location: string;
  workplaceType: 'Remote' | 'Hybrid' | 'On-site';
  employmentType: 'Full-time' | 'Contract' | 'Internship';
  salaryRange: string;
  experienceLevel: 'Entry Level (0-2 yrs)' | 'Mid Level (2-5 yrs)' | 'Senior Level (5+ yrs)' | 'Lead / Architect';
  postedDaysAgo: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredSkills: string[];
  benefits: string[];
  urgency: 'Hot' | 'Urgent' | 'Regular';
  logicChallenge: LogicChallenge;
}

export interface JobApplication {
  id: string;
  jobId: string;
  company: string;
  role: string;
  appliedAt: string;
  status: 'Applied' | 'Under Review' | 'Logic Assessment Passed' | 'Interview Scheduled' | 'Offer Extended' | 'Archived';
  customCoverNote: string;
  tailoredSkills: string[];
  matchScore: number;
}

export interface InterviewQuestion {
  id: string;
  domain: string;
  skillTag: string;
  courseId?: string;
  type: 'Technical Concept' | 'System Architecture' | 'Coding Logic' | 'Behavioral (STAR)';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  context: string;
  keyConceptsToCover: string[];
  idealAnswer: string;
  proTips: string[];
}

export interface CompletedInterview {
  id: string;
  domain: string;
  sessionTitle: string;
  completedAt: string;
  scorePercent: number;
  questionsAttempted: number;
  feedbackSummary: string;
  topStrengths: string[];
  growthAreas: string[];
}

export interface UserStats {
  logicPoints: number;
  logicStreakDays: number;
  challengesSolvedCount: number;
  coursesEnrolledCount: number;
  coursesCompletedCount: number;
  jobsAppliedCount: number;
  interviewsPracticedCount: number;
}
