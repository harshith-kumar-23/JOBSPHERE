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

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_jobshpere_9941',
  fullName: 'Alex Morgan',
  email: 'alex.morgan@domain.dev',
  phone: '+1 (555) 234-8921',
  headline: 'Senior Full-Stack & Distributed Systems Engineer',
  bio: 'Passionate software architect with a track record of scaling high-throughput cloud microservices, mastering modern frontend stacks, and mentoring engineering talent. Lifelong learner advancing system design and AI workflows.',
  location: 'San Francisco, CA (Open to Remote)',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  githubUrl: 'https://github.com/alexmorgan-dev',
  linkedinUrl: 'https://linkedin.com/in/alexmorgan-engineer',
  portfolioUrl: 'https://alexmorgan.tech',
  isDataEncrypted: true,
  encryptionAlgorithm: 'AES-256-GCM (Hardware Salted Key Derivation)',
  encryptionKeyFingerprint: 'SHA256:8f4b29c9e01d8a4365dfb12e8790b503ac92e104f',
  lastEncryptedAt: '2026-08-27T08:14:00Z',
  
  educationTimeline: [
    {
      id: 'edu_school_01',
      level: 'school',
      institutionName: 'St. Jude International Academy & High School',
      degreeOrGrade: 'Secondary School Education (High School Diploma)',
      fieldOfStudy: 'Science & Advanced Mathematics Stream',
      startYear: '2014',
      endYear: '2018',
      location: 'Seattle, WA',
      scoreOrGpa: '3.94 / 4.0 GPA (Valedictorian Honors)',
      highlights: [
        'National Science Olympiad State Gold Medalist in Algorithmic Problem Solving',
        'Founded the high school robotics club & organized regional STEM codeathons',
        'AP Computer Science & Calculus BC with perfect score of 5/5'
      ]
    },
    {
      id: 'edu_inter_02',
      level: 'intermediate',
      institutionName: 'Pacific Northwest Pre-University Institute',
      degreeOrGrade: 'Higher Secondary / Intermediate Certificate',
      fieldOfStudy: 'Physics, Chemistry, Pure Math & Computing',
      startYear: '2018',
      endYear: '2020',
      location: 'Seattle, WA',
      scoreOrGpa: '96.8% Aggregate Distinction',
      highlights: [
        'President of the Competitive Coding Guild',
        'Published student whitepaper on data structures & sorting algorithms',
        'Dean’s Commendation for Academic Excellence & Peer Tutoring'
      ]
    },
    {
      id: 'edu_ug_03',
      level: 'undergraduate',
      institutionName: 'University of Washington - Paul G. Allen School',
      degreeOrGrade: 'Bachelor of Science in Computer Science & Engineering',
      fieldOfStudy: 'Software Engineering & Distributed Systems',
      startYear: '2020',
      endYear: '2024',
      location: 'Seattle, WA',
      scoreOrGpa: '3.88 / 4.0 Magna Cum Laude',
      highlights: [
        'Capstone: Built a peer-to-peer decentralized cache invalidation network',
        'Head Teaching Assistant for Data Structures & Algorithms (CSE 373)',
        'ACM International Collegiate Programming Contest (ICPC) Regional Finalist'
      ]
    },
    {
      id: 'edu_pg_04',
      level: 'postgraduate',
      institutionName: 'Stanford University (Continuing Executive Studies)',
      degreeOrGrade: 'Professional Graduate Specialization',
      fieldOfStudy: 'Cloud Systems Architecture & AI Scalability',
      startYear: '2024',
      endYear: '2025',
      location: 'Stanford, CA / Remote',
      scoreOrGpa: 'Honors Grade A+',
      highlights: [
        'Advanced research on vector retrieval indices & GPU memory scheduling',
        'Presented seminar on zero-downtime database partition migrations'
      ]
    }
  ],

  experienceTimeline: [
    {
      id: 'exp_intern_01',
      company: 'Amazon Web Services (AWS)',
      role: 'Cloud Infrastructure Engineering Intern',
      employmentType: 'Internship',
      startDate: 'Jun 2022',
      endDate: 'Sep 2022',
      isCurrent: false,
      location: 'Seattle, WA',
      description: 'Worked with the DynamoDB storage engine team to analyze hot partition metrics and automate failover testing scripts.',
      skillsUsed: ['Go', 'Distributed Databases', 'AWS Lambda', 'CloudWatch', 'Docker'],
      achievements: [
        'Engineered an internal latency tracing dashboard reducing incident triage time by 28%',
        'Authored 45 unit/integration test suites ensuring zero regressions in replication pipelines'
      ]
    },
    {
      id: 'exp_early_02',
      company: 'Stripe',
      role: 'Associate Software Engineer',
      employmentType: 'Full-time',
      startDate: 'Jul 2024',
      endDate: 'Aug 2025',
      isCurrent: false,
      location: 'San Francisco, CA',
      description: 'Developed high-reliability webhook delivery engines and payment gateway connectors processing over 12M daily transactions.',
      skillsUsed: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes'],
      achievements: [
        'Reduced p99 webhook dispatch latency from 420ms down to 85ms via asynchronous batching',
        'Implemented idempotency key verification preventing duplicate payment submissions'
      ]
    },
    {
      id: 'exp_current_03',
      company: 'CloudSphere Technologies',
      role: 'Senior Software Engineer & Distributed Systems Lead',
      employmentType: 'Full-time',
      startDate: 'Sep 2025',
      endDate: 'Present',
      isCurrent: true,
      location: 'San Francisco, CA (Hybrid)',
      description: 'Architecting modern cloud-native developer tooling platforms, real-time analytics streaming pipelines, and microservice governance architectures.',
      skillsUsed: ['React', 'TypeScript', 'Node.js', 'Go', 'GraphQL', 'gRPC', 'PostgreSQL', 'Docker'],
      achievements: [
        'Led architecture redesign that scaled platform concurrency to 250,000 active WebSocket connections',
        'Mentored 6 junior engineers and streamlined the company CI/CD release cadence to multiple daily deployments'
      ]
    }
  ],

  projects: [
    {
      id: 'proj_01',
      title: 'HyperScale Queue Engine',
      description: 'Open-source distributed message broker with Raft consensus, capable of handling 500,000 ops/sec with sub-millisecond persistence.',
      technologies: ['Go', 'Raft Consensus', 'gRPC', 'LevelDB', 'Docker'],
      liveUrl: 'https://github.com/alexmorgan-dev/hyperscale-queue',
      githubUrl: 'https://github.com/alexmorgan-dev/hyperscale-queue',
      featured: true
    },
    {
      id: 'proj_02',
      title: 'AI ATS Resume Auditor & Optimizer',
      description: 'Interactive resume parsing and semantic ATS scoring tool that compares candidate bullet points against real-world job specifications.',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vector Embeddings'],
      liveUrl: 'https://ats-auditor.dev',
      githubUrl: 'https://github.com/alexmorgan-dev/ats-auditor',
      featured: true
    },
    {
      id: 'proj_03',
      title: 'Zero-Trust Secure Auth Vault',
      description: 'Client-side cryptographic credential manager featuring AES-256-GCM encryption, biometric WebAuthn verification, and zero-knowledge proofs.',
      technologies: ['Web Crypto API', 'TypeScript', 'IndexedDB', 'Tailwind'],
      liveUrl: 'https://vault.dev',
      githubUrl: 'https://github.com/alexmorgan-dev/secure-vault',
      featured: false
    }
  ],

  certifications: [
    {
      id: 'cert_01',
      name: 'AWS Certified Solutions Architect - Professional',
      issuingOrg: 'Amazon Web Services',
      issueDate: 'Jan 2025',
      credentialId: 'AWS-PSA-9981204',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert_02',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuingOrg: 'Cloud Native Computing Foundation (CNCF)',
      issueDate: 'May 2025',
      credentialId: 'CKA-8841-209',
      credentialUrl: 'https://www.cncf.io/certification/cka/'
    },
    {
      id: 'cert_03',
      name: 'Meta Certified Senior Front-End Developer',
      issuingOrg: 'Meta / Coursera',
      issueDate: 'Oct 2024',
      credentialId: 'META-FED-7712'
    }
  ],

  skills: [
    { name: 'TypeScript & JavaScript', level: 'Expert', category: 'Frontend & Backend' },
    { name: 'Python', level: 'Advanced', category: 'Backend & Data' },
    { name: 'React 19 & Next.js', level: 'Expert', category: 'Frontend' },
    { name: 'Node.js & Express', level: 'Expert', category: 'Backend' },
    { name: 'Distributed Systems & Microservices', level: 'Advanced', category: 'Architecture' },
    { name: 'Go (Golang)', level: 'Advanced', category: 'Backend' },
    { name: 'PostgreSQL & Database Indexing', level: 'Advanced', category: 'Database' },
    { name: 'Redis & Caching Strategies', level: 'Expert', category: 'Database' },
    { name: 'Docker & Kubernetes', level: 'Advanced', category: 'DevOps' },
    { name: 'GraphQL & REST APIs', level: 'Expert', category: 'API Design' },
    { name: 'System Design & Scalability', level: 'Advanced', category: 'Architecture' },
    { name: 'AES-256 & Application Security', level: 'Advanced', category: 'Security' }
  ]
};

export const DEMO_COURSES: Course[] = [
  {
    id: 'course_python_01',
    title: 'Introduction to Python for Software & Data Engineering',
    tagline: 'Master Python syntax, memory management, generators, data structures, and production-grade automation.',
    category: 'Programming Languages',
    level: 'Beginner',
    durationHours: 16,
    rating: 4.96,
    totalStudents: 22400,
    instructor: {
      name: 'Dr. Alistair Ross',
      role: 'Former Core Python Contributor & Staff Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    overview: 'This comprehensive course starts with Python primitives and advances through object-oriented design, custom iterators, memory-efficient generators, and modern package development with poetry and pytest.',
    skillsGained: ['Python 3.12 Idioms', 'Generators & Yield Semantics', 'Memory Management & GIL', 'Decorators & Metaprogramming', 'Unit Testing with Pytest'],
    modules: [
      {
        id: 'mod_py_1',
        title: '1. Python Foundations, Memory References & Mutability',
        durationMinutes: 40,
        content: 'Understand Python variable binding, mutable vs immutable types, id() memory addresses, and deep vs shallow copying mechanisms.',
        keyTakeaways: ['Pass-by-assignment mechanics', 'Avoid default mutable arguments in functions', 'Tuple immutability and hashability rules']
      },
      {
        id: 'mod_py_2',
        title: '2. Functional Patterns, Comprehensions & Custom Generators',
        durationMinutes: 50,
        content: 'Construct lazy iterables with yield, calculate memory savings of generator expressions over lists, and implement custom iterator protocols (__iter__, __next__).',
        keyTakeaways: ['Stream processing of multi-gigabyte files with O(1) RAM', 'Comprehension readability vs map/filter', 'itertools & functools power utilities']
      },
      {
        id: 'mod_py_3',
        title: '3. Advanced Decorators, Context Managers & OOP',
        durationMinutes: 55,
        content: 'Craft parameterized function & class decorators, preserve metadata using functools.wraps, and build custom __enter__/__exit__ resource managers.',
        keyTakeaways: ['Closure scopes and nonlocal variables', 'Dunder methods for clean API design', 'Contextlib contextmanager decorator']
      },
      {
        id: 'mod_py_4',
        title: '4. Concurrency Essentials: Multiprocessing, Threading & AsyncIO',
        durationMinutes: 60,
        content: 'Analyze the Global Interpreter Lock (GIL), choose between threads for I/O bounds versus process pools for CPU bounds, and write asynchronous coroutines.',
        keyTakeaways: ['async/await event loop scheduling', 'Preventing race conditions with threading.Lock', 'Multiprocessing memory overhead trade-offs']
      }
    ],
    logicChallenge: {
      id: 'logic_course_py_01',
      title: 'Course Enrollment Logic Test: Python Mutable Default Argument Trap',
      category: 'Python Memory & Evaluation Semantics',
      scenario: 'You define a Python function with a default parameter: `def append_item(val, target_list=[]): target_list.append(val); return target_list`. You invoke `append_item(1)` followed immediately by `append_item(2)` without passing a second argument.',
      question: 'What is the return value of the second invocation `append_item(2)` and why?',
      codeSnippet: `def append_item(val, target_list=[]):
    target_list.append(val)
    return target_list

result1 = append_item(1)
result2 = append_item(2) # What is result2?`,
      options: [
        {
          id: 'opt_1',
          text: 'Returns [1, 2] because default argument expressions are evaluated once when the function is defined, creating a shared persistent list across all calls',
          rationale: 'Correct! Python creates default parameter objects at function definition time (def statement), not at call time. Therefore, mutable defaults like [] or {} persist state across invocations.'
        },
        {
          id: 'opt_2',
          text: 'Returns [2] because a fresh empty list is instantiated on every function invocation',
          rationale: 'Incorrect: Default expressions are evaluated only once at definition time, not on every function call.'
        },
        {
          id: 'opt_3',
          text: 'Raises a TypeError because default arguments cannot be mutable lists',
          rationale: 'Incorrect: Python allows mutable default arguments, although it is an anti-pattern.'
        },
        {
          id: 'opt_4',
          text: 'Returns None because lists are modified in-place without returning a new pointer',
          rationale: 'Incorrect: The function explicitly executes `return target_list`.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Remember when Python evaluates function default arguments: is it at definition time (def) or execution time?',
      difficulty: 'Easy',
      rewardPoints: 100
    }
  },
  {
    id: 'course_js_02',
    title: 'Advanced JavaScript: Deep Engine Internals, Concurrency & Async Patterns',
    tagline: 'Unpack the V8 runtime, Call Stack, Microtask queue, Closures, Prototypal Chain, and Memory Leaks.',
    category: 'Programming Languages',
    level: 'Advanced',
    durationHours: 22,
    rating: 4.98,
    totalStudents: 18700,
    instructor: {
      name: 'Kavita Sundaram',
      role: 'Principal Web Architect & TC39 Committee Delegate',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop&q=80',
    overview: 'Master the mechanics under JavaScript syntax. Explore Hidden Classes in V8, inline caching, JIT deoptimizations, microtask vs macrotask interleaving, and memory leak profiling with heap snapshots.',
    skillsGained: ['V8 Engine & Hidden Classes', 'Event Loop & Task Scheduling', 'Scope Chains & Lexical Closures', 'Prototypal Inheritance Mechanics', 'Heap Allocation Profiling'],
    modules: [
      {
        id: 'mod_js_1',
        title: '1. V8 Execution Pipeline: Ignition Interpreter to TurboFan JIT',
        durationMinutes: 50,
        content: 'Understand Abstract Syntax Trees (AST), bytecode generation, hidden classes, and avoiding polymorphic inline cache deoptimizations.',
        keyTakeaways: ['Maintaining uniform object shapes', 'Avoiding delete operator on hot objects', 'Monomorphic vs Megamorphic calls']
      },
      {
        id: 'mod_js_2',
        title: '2. The Event Loop, Microtasks (Promises) vs Macrotasks (Timers)',
        durationMinutes: 55,
        content: 'Analyze execution order between Promise.then, queueMicrotask, MutationObserver, setTimeout, and requestAnimationFrame.',
        keyTakeaways: ['Microtask queue starvation risks', 'Rendering phase synchronization', 'Async stack traces and unhandled rejections']
      },
      {
        id: 'mod_js_3',
        title: '3. Prototypal Chains, Symbols & Memory Leak Forensics',
        durationMinutes: 60,
        content: 'Inspect __proto__ vs prototype, Symbol.iterator, WeakMap/WeakSet garbage collector ergonomics, and detecting detached DOM leaks.',
        keyTakeaways: ['Closure scope retention leaks', 'WeakRefs for ephemeral caches', 'Profiling retainer trees in DevTools']
      }
    ],
    logicChallenge: {
      id: 'logic_course_js_02',
      title: 'Course Enrollment Logic Test: Event Loop Microtask vs Macrotask Interleaving',
      category: 'JavaScript Concurrency & Runtime',
      scenario: 'You execute a script containing synchronous logs, a setTimeout(..., 0), a Promise.resolve().then(...), and queueMicrotask(...).',
      question: 'In what exact sequence will the console outputs 1, 2, 3, 4, 5 be printed to standard output?',
      codeSnippet: `console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
queueMicrotask(() => console.log(4));
console.log(5);`,
      options: [
        {
          id: 'opt_1',
          text: '1, 5, 3, 4, 2 (Synchronous first, then all Microtasks in FIFO order, then Macrotask timer)',
          rationale: 'Correct! Synchronous code runs first (1, 5). Before yielding to the Macrotask queue (setTimeout = 2), the engine drains the entire Microtask queue in FIFO order (Promise = 3, queueMicrotask = 4).'
        },
        {
          id: 'opt_2',
          text: '1, 2, 3, 4, 5 (Strict top-to-bottom line order)',
          rationale: 'Incorrect: setTimeout and Promise handlers are asynchronous callbacks and will never execute synchronously.'
        },
        {
          id: 'opt_3',
          text: '1, 5, 2, 3, 4 (Timers execute before Microtasks)',
          rationale: 'Incorrect: Microtasks always have strict priority and drain completely before the next macrotask executes.'
        },
        {
          id: 'opt_4',
          text: '1, 3, 4, 5, 2 (Promises run inline before subsequent synchronous logs)',
          rationale: 'Incorrect: .then() callbacks are queued as microtasks and execute only after the current synchronous call stack clears.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Synchronous stack empties first -> All Microtasks (Promise/queueMicrotask) drain next -> Macrotasks (timers) run last.',
      difficulty: 'Medium',
      rewardPoints: 110
    }
  },
  {
    id: 'course_resume_03',
    title: 'Resume Building Workshop & High-Impact Career Positioning',
    tagline: 'Craft ATS-optimized resumes, quantify technical impact with STAR metrics, and pass automated candidate screening.',
    category: 'Career & Professional',
    level: 'Beginner',
    durationHours: 10,
    rating: 4.97,
    totalStudents: 16500,
    instructor: {
      name: 'Maya Lin',
      role: 'Executive Tech Recruiter & Career Strategist (Ex-Google, Meta)',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80',
    overview: 'Learn the exact resume architecture and semantic keyword strategies that capture hiring managers’ attention within 6 seconds. Master the Google XYZ formula ("Accomplished [X], measured by [Y], by doing [Z]") and ATS parsing heuristics.',
    skillsGained: ['ATS Keyword Optimization', 'Google XYZ Bullet Formatting', 'Technical Portfolio Curation', 'Recruiter Pitch Construction', 'Salary Negotiation Prep'],
    modules: [
      {
        id: 'mod_res_1',
        title: '1. ATS Parsing Engines & Keyword Semantic Mapping',
        durationMinutes: 35,
        content: 'How Applicant Tracking Systems (Greenhouse, Lever, Workday) extract skills, score keyword density, and parse dates.',
        keyTakeaways: ['Avoiding two-column parsing bugs', 'Strategic placement of hard tech skills', 'Standardizing job titles and date formats']
      },
      {
        id: 'mod_res_2',
        title: '2. The Google XYZ Impact Formula for Engineering Accomplishments',
        durationMinutes: 45,
        content: 'Transforming passive task descriptions ("Built an API") into quantifiable outcome statements ("Architected payment API processing $12M/day with 99.99% uptime").',
        keyTakeaways: ['Quantifying latency, cost, and revenue impact', 'Leading with active technical verbs', 'Highlighting architectural scale and complexity']
      },
      {
        id: 'mod_res_3',
        title: '3. Technical Portfolio, GitHub Proof of Work & Live Demos',
        durationMinutes: 40,
        content: 'Structuring GitHub repositories with clean README files, architecture diagrams, live demo links, and clean commit hygiene.',
        keyTakeaways: ['Writing recruiter-friendly README overviews', 'Demonstrating testing and CI/CD pipelines', 'Showcasing system trade-off writeups']
      }
    ],
    logicChallenge: {
      id: 'logic_course_res_03',
      title: 'Course Enrollment Logic Test: The XYZ Resume Impact Formula',
      category: 'Resume Engineering & Impact Storytelling',
      scenario: 'You are reviewing bullet points for a Senior Engineer resume targeting high-growth tier-1 tech firms. You have 4 candidate descriptions of the exact same distributed caching project.',
      question: 'Which of the following bullet points follows the gold-standard Google XYZ formula ("Accomplished [X], as measured by [Y], by doing [Z]") for maximum ATS scoring and hiring manager impact?',
      options: [
        {
          id: 'opt_1',
          text: '"Reduced p99 API latency by 64% and eliminated database spikes during peak traffic (Y) for 1.2M daily active users (X) by designing a Redis cluster with probabilistic early expiration and consistent hash sharding (Z)."',
          rationale: 'Correct! This clearly states the outcome (X), quantifiable metric (Y), and technical engineering action taken (Z).'
        },
        {
          id: 'opt_2',
          text: '"Responsible for configuring Redis cache instances and writing caching scripts for the backend engineering team."',
          rationale: 'Incorrect: Passive duty description with zero metrics, business outcomes, or technical depth.'
        },
        {
          id: 'opt_3',
          text: '"Helped the company build an awesome caching system that made everything super fast and saved a lot of cloud money."',
          rationale: 'Incorrect: Uses vague conversational adjectives without specific percentages, scale numbers, or architectural tools.'
        },
        {
          id: 'opt_4',
          text: '"Used Redis, Docker, Kubernetes, AWS, Go, Python, Linux, Bash, PostgreSQL to cache database calls."',
          rationale: 'Incorrect: Keyword stuffing without describing what was actually accomplished or measured.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Look for the bullet point with specific quantifiable numbers, clear business impact, and concrete engineering architecture.',
      difficulty: 'Easy',
      rewardPoints: 90
    }
  },
  {
    id: 'course_fullstack_01',
    title: 'Advanced Full-Stack Engineering with React 19 & Node Microservices',
    tagline: 'Master concurrent rendering, server actions, event-driven backends, and zero-downtime deployments.',
    category: 'Frontend',
    level: 'Advanced',
    durationHours: 24,
    rating: 4.95,
    totalStudents: 14200,
    instructor: {
      name: 'Sarah Chen',
      role: 'Principal Staff Engineer at Vercel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    overview: 'This comprehensive masterclass bridges high-performance React UI patterns with robust Node.js and TypeScript microservice architectures. You will build production-grade web systems with strict typing, streaming SSR, and optimized caching.',
    skillsGained: ['React 19 Server Components', 'Node.js Event Loop Tuning', 'State Synchronization', 'Optimistic UI Updates', 'Microservice Resilience'],
    modules: [
      {
        id: 'mod_fs_1',
        title: '1. React 19 Core: Transitions, Actions & Concurrent Optimizations',
        durationMinutes: 45,
        content: 'Deep dive into useActionState, useOptimistic, and how the React 19 fiber scheduler manages asynchronous priority updates without blocking user interactions.',
        keyTakeaways: ['Non-blocking UI updates with useTransition', 'Hydration error prevention in modern SSR', 'Server-side streaming response boundaries']
      },
      {
        id: 'mod_fs_2',
        title: '2. High-Throughput Node.js Microservices & Worker Threads',
        durationMinutes: 55,
        content: 'Explore libuv thread pools, asynchronous I/O backpressure, memory profiling with Chrome DevTools, and clustering across multi-core CPU instances.',
        keyTakeaways: ['Preventing event loop lag under heavy JSON parsing', 'Graceful shutdown handling & socket draining', 'Zero-leak stream pipelines']
      },
      {
        id: 'mod_fs_3',
        title: '3. Real-Time Distributed State & WebSockets at Scale',
        durationMinutes: 60,
        content: 'Design resilient pub/sub synchronization using Redis streams, WebSocket connection multiplexing, and automatic exponential backoff reconnection.',
        keyTakeaways: ['Heartbeat ping-pong mechanisms', 'Handling network partition reconnect storms', 'Conflict resolution for collaborative state']
      },
      {
        id: 'mod_fs_4',
        title: '4. Production Deployment, Observability & OpenTelemetry',
        durationMinutes: 50,
        content: 'Instrumenting distributed traces across services with OpenTelemetry, Prometheus metrics, and automated canary release deployments.',
        keyTakeaways: ['Setting SLOs and error budget alerts', 'Trace propagation across HTTP and gRPC headers', 'Container cold start minimization']
      }
    ],
    logicChallenge: {
      id: 'logic_course_fs_01',
      title: 'Course Enrollment Logic Test: Concurrency & Race Condition Resolution',
      category: 'Frontend & Backend Architecture',
      scenario: 'You have two concurrent users attempting to claim the very last available seat in a popular cohort course at the exact same millisecond. The server receives both POST requests simultaneously.',
      question: 'Which of the following database isolation and concurrency control strategies guarantees that exactly ONE user successfully books the seat while preventing overselling and deadlocks with minimal overhead?',
      codeSnippet: `// Naive implementation:
const seat = await db.seats.find({ courseId, status: 'available' });
if (seat) {
  await db.seats.update({ id: seat.id, status: 'booked', userId });
  return { success: true };
}`,
      options: [
        {
          id: 'opt_1',
          text: 'Use atomic conditional update (e.g. UPDATE seats SET status="booked", user_id=:userId WHERE id=:seatId AND status="available" RETURNING id)',
          rationale: 'Correct! Single atomic CAS (Compare-and-Swap) update at the database row level operates without expensive full table locks and safely guarantees single-winner idempotency.'
        },
        {
          id: 'opt_2',
          text: 'Wrap the entire JavaScript handler in a client-side setTimeout lock with 100ms debounce',
          rationale: 'Incorrect: Client-side debounce does not protect against separate distinct clients making concurrent requests to multiple server instances.'
        },
        {
          id: 'opt_3',
          text: 'Set database isolation level to READ UNCOMMITTED to speed up transaction execution',
          rationale: 'Incorrect: READ UNCOMMITTED allows dirty reads and increases the risk of double booking.'
        },
        {
          id: 'opt_4',
          text: 'Rely solely on an in-memory JavaScript Set on the Node.js master process',
          rationale: 'Incorrect: Multi-instance horizontal scaling invalidates single-process memory state.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Think about atomic database primitives (Compare-And-Swap) that execute at the engine level regardless of horizontal server count.',
      difficulty: 'Medium',
      rewardPoints: 100
    }
  },
  {
    id: 'course_system_design_02',
    title: 'Modern Distributed Systems & Scalable Cloud Architecture',
    tagline: 'Design resilient systems serving 100M+ users: Sharding, Caching, Consensus & Failover.',
    category: 'System Design',
    level: 'Advanced',
    durationHours: 32,
    rating: 4.98,
    totalStudents: 18900,
    instructor: {
      name: 'Marcus Vance',
      role: 'Former VP of Infrastructure at Netflix',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    overview: 'Learn how modern tier-1 tech giants build global fault-tolerant backbones. Covers consistent hashing, database replication lag mitigation, CAP theorem trade-offs, and rate-limiting at edge gateways.',
    skillsGained: ['Consistent Hashing', 'Database Sharding & Partitioning', 'Cache-Aside & Write-Through', 'Idempotent API Design', 'Raft Consensus'],
    modules: [
      {
        id: 'mod_sd_1',
        title: '1. Consistent Hashing & Dynamic Shard Rebalancing',
        durationMinutes: 50,
        content: 'Understand hash ring topologies, virtual nodes to prevent hot spotting, and minimal data migration during node addition or removal.',
        keyTakeaways: ['Virtual node weighting algorithms', 'Replication factor placement across availability zones', 'Gossip protocols for cluster membership']
      },
      {
        id: 'mod_sd_2',
        title: '2. High-Performance Distributed Caching (Redis/Memcached)',
        durationMinutes: 60,
        content: 'Combating cache stampedes, cache penetration (Bloom filters), and multi-region cache invalidation strategies.',
        keyTakeaways: ['Probabilistic early expiration (XFetch)', 'Bloom filter false positive calculations', 'Two-phase commit vs Saga patterns']
      },
      {
        id: 'mod_sd_3',
        title: '3. Message Queues, Kafka Partitioning & Exactly-Once Semantics',
        durationMinutes: 65,
        content: 'Log-structured storage, consumer group rebalancing, write-ahead logs, and achieving end-to-end transactional processing.',
        keyTakeaways: ['Offset commit strategies', 'Dead letter queue triage', 'Idempotent producer sequence numbers']
      }
    ],
    logicChallenge: {
      id: 'logic_course_sd_02',
      title: 'Course Enrollment Logic Test: Consistent Hash Ring Rebalancing',
      category: 'System Design & Algorithms',
      scenario: 'A distributed cache cluster currently has 4 physical nodes (A, B, C, D) mapped on a consistent hash ring with 100 virtual nodes each. A new node E is introduced to increase cluster capacity.',
      question: 'When Node E is added to the ring, approximately what proportion of keys stored across the entire cluster will need to be remapped to different nodes?',
      codeSnippet: `// Ring topology: N = 4 nodes initially.
// New node added: Total nodes = N + 1 = 5.
// Keys uniformly distributed via MurmurHash3.`,
      options: [
        {
          id: 'opt_1',
          text: 'Approximately 1 / (N + 1) = 20% of the total keys',
          rationale: 'Correct! In consistent hashing with virtual nodes, adding the (N+1)th node only claims keys from its immediate successor nodes, reallocating exactly 1/(N+1) = 1/5 = 20% of keys on average.'
        },
        {
          id: 'opt_2',
          text: '100% of the keys because the modulus operator changes (hash % 5)',
          rationale: 'Incorrect: Consistent hashing eliminates the catastrophic 100% reshuffle of standard modulus hashing.'
        },
        {
          id: 'opt_3',
          text: '50% of the keys from the highest loaded node',
          rationale: 'Incorrect: Virtual nodes spread the key migration evenly across all existing nodes.'
        },
        {
          id: 'opt_4',
          text: '0% because keys are lazily duplicated on demand',
          rationale: 'Incorrect: Ownership of specific hash ranges moves to Node E.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Think about how consistent hashing distributes virtual nodes along the 360-degree circle so only neighbors donate slices.',
      difficulty: 'Hard',
      rewardPoints: 120
    }
  },
  {
    id: 'course_ai_ml_03',
    title: 'Generative AI & LLM Systems Engineering: RAG to Production Agents',
    tagline: 'Build production-ready Retrieval Augmented Generation, vector search pipelines, and autonomous agent loops.',
    category: 'AI & Data Science',
    level: 'Intermediate',
    durationHours: 20,
    rating: 4.92,
    totalStudents: 11400,
    instructor: {
      name: 'Dr. Elena Rostova',
      role: 'Principal AI Research Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    overview: 'Move beyond basic prompting. Learn how to architect semantic chunking strategies, vector database indexing (HNSW vs IVF), reranking models, and guardrail validation pipelines.',
    skillsGained: ['Vector Embeddings', 'HNSW Graph Indexing', 'Context Window Optimization', 'Hallucination Mitigation', 'Agentic Tool Calling'],
    modules: [
      {
        id: 'mod_ai_1',
        title: '1. Semantic Chunking & Vector Search Mathematics',
        durationMinutes: 45,
        content: 'Cosine similarity, Euclidean distance, chunk overlap trade-offs, and hybrid sparse-dense search (BM25 + Dense Vectors).',
        keyTakeaways: ['Context preservation during chunk boundary slicing', 'Dimensionality reduction trade-offs', 'Hybrid search reciprocal rank fusion']
      },
      {
        id: 'mod_ai_2',
        title: '2. Multi-Stage RAG: Query Expansion & Cross-Encoder Reranking',
        durationMinutes: 50,
        content: 'HyDE (Hypothetical Document Embeddings), step-back prompting, and cross-encoder precision scoring for top-K context curation.',
        keyTakeaways: ['Mitigating lost-in-the-middle context degradation', 'Token budget minimization', 'Latency overhead budgeting']
      }
    ],
    logicChallenge: {
      id: 'logic_course_ai_03',
      title: 'Course Enrollment Logic Test: Vector Similarity & Cosine Geometry',
      category: 'AI & Machine Learning',
      scenario: 'You have two normalized document embedding vectors A and B with unit length (||A|| = 1, ||B|| = 1). The angle between them in high-dimensional vector space is 60 degrees.',
      question: 'What is the exact Cosine Similarity and Dot Product between vectors A and B?',
      codeSnippet: `// Vector properties:
// ||A|| = 1, ||B|| = 1
// theta = 60 degrees
// Cosine Similarity = (A . B) / (||A|| * ||B||)`,
      options: [
        {
          id: 'opt_1',
          text: 'Cosine Similarity = 0.5, Dot Product = 0.5',
          rationale: 'Correct! cos(60°) = 0.5. Since both vectors have unit magnitude 1, the dot product equals the cosine similarity: 1 * 1 * cos(60°) = 0.5.'
        },
        {
          id: 'opt_2',
          text: 'Cosine Similarity = 0.866 (sqrt(3)/2), Dot Product = 1.0',
          rationale: 'Incorrect: cos(60°) is 0.5, whereas sin(60°) is 0.866.'
        },
        {
          id: 'opt_3',
          text: 'Cosine Similarity = 0.0 because high-dimensional vectors are orthogonal',
          rationale: 'Incorrect: The problem explicitly states the angle is 60 degrees, not 90 degrees.'
        },
        {
          id: 'opt_4',
          text: 'Cosine Similarity = -0.5 due to opposite polarity',
          rationale: 'Incorrect: 60 degrees lies in the first quadrant where cosine is strictly positive.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Recall that for normalized unit vectors, the dot product is directly equal to cos(theta). What is cos(60°)?',
      difficulty: 'Easy',
      rewardPoints: 90
    }
  },
  {
    id: 'course_devops_cloud_04',
    title: 'Production Kubernetes, Terraform & Cloud Security Vaults',
    tagline: 'Automate infrastructure as code, zero-trust network policies, and multi-region Kubernetes clusters.',
    category: 'Cloud & DevOps',
    level: 'Intermediate',
    durationHours: 26,
    rating: 4.88,
    totalStudents: 9800,
    instructor: {
      name: 'David O’Connor',
      role: 'Principal Infrastructure Architect',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    },
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
    overview: 'Deploy production Kubernetes clusters with automated autoscaling (KEDA / Karpenter), declarative GitOps (ArgoCD), and hardware-grade secrets encryption with Vault.',
    skillsGained: ['Terraform State Locking', 'Kubernetes NetworkPolicies', 'GitOps & ArgoCD', 'Vault AES-256 Secrets', 'eBPF Observability'],
    modules: [
      {
        id: 'mod_do_1',
        title: '1. Declarative Infrastructure as Code with Terraform & OpenTofu',
        durationMinutes: 50,
        content: 'State locks with DynamoDB, modular reusability, drift detection, and immutable cloud resource provisioning.',
        keyTakeaways: ['Remote backend state isolation', 'Managing zero-downtime resource recreation', 'Automated security scanning with tfsec']
      },
      {
        id: 'mod_do_2',
        title: '2. Kubernetes Zero-Trust Network Policies & Service Meshes (Istio)',
        durationMinutes: 60,
        content: 'Enforcing mTLS across pod-to-pod communications, ingress canary routing, and default-deny egress policies.',
        keyTakeaways: ['SPIFFE/SPIRE cryptographic workload identities', 'Circuit breaking under upstream cascading failures', 'Traffic shadowing for staging tests']
      }
    ],
    logicChallenge: {
      id: 'logic_course_do_04',
      title: 'Course Enrollment Logic Test: Pod Disruption Budgets & Rolling Updates',
      category: 'Cloud & DevOps',
      scenario: 'A Kubernetes deployment running 5 replicas has a PodDisruptionBudget (PDB) configured with minAvailable: 3. The node autoscaler attempts to drain a node hosting 3 of these 5 pods simultaneously.',
      question: 'How will the Kubernetes eviction API handle this node drain operation?',
      codeSnippet: `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 3
  selector:
    matchLabels:
      app: api-server`,
      options: [
        {
          id: 'opt_1',
          text: 'It will evict at most 2 pods first, wait for new replacements on other nodes to pass readiness probes, and only then evict the 3rd pod',
          rationale: 'Correct! The PDB guarantees at least 3 pods remain in Ready state at all times. Evicting all 3 at once would leave only 2, violating the budget.'
        },
        {
          id: 'opt_2',
          text: 'It immediately terminates all 3 pods since node drain overrides PDB rules',
          rationale: 'Incorrect: Node drain respects PodDisruptionBudgets by default unless forced with --force / --delete-emptydir-data overrides.'
        },
        {
          id: 'opt_3',
          text: 'It crashes the cluster control plane because minAvailable cannot exceed 50%',
          rationale: 'Incorrect: minAvailable can be any integer up to the replica count.'
        },
        {
          id: 'opt_4',
          text: 'It pauses the deployment indefinitely and never drains the node',
          rationale: 'Incorrect: It executes the eviction progressively as new pods become ready on other schedulable nodes.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Notice that 5 total replicas minus minAvailable (3) equals 2 maximum permitted disruptions at any single point in time.',
      difficulty: 'Medium',
      rewardPoints: 110
    }
  }
];

export const DEMO_JOBS: JobListing[] = [
  {
    id: 'job_google_01',
    company: 'Google',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    role: 'Senior Distributed Systems & Cloud Engineer',
    department: 'Google Cloud Platform (GCP Core Infrastructure)',
    industry: 'Cloud & Infrastructure',
    location: 'Mountain View, CA / Hybrid or Remote',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    salaryRange: '$195,000 - $275,000 + Equity + Annual Bonus',
    experienceLevel: 'Senior Level (5+ yrs)',
    postedDaysAgo: 1,
    urgency: 'Hot',
    description: 'We are seeking an experienced Systems Engineer to build next-generation storage orchestration, distributed lock managers, and sub-millisecond RPC pipelines that power billions of cloud workloads globally.',
    responsibilities: [
      'Architect, implement, and benchmark high-reliability distributed control planes and low-latency storage services',
      'Optimize multi-tenant resource isolation, CPU cache affinity, and memory bandwidth utilization',
      'Lead design reviews and establish engineering standards across cross-functional teams'
    ],
    requirements: [
      '5+ years experience building large-scale backend systems in Go, C++, or Rust / TypeScript',
      'Deep understanding of distributed consensus (Raft/Paxos), database isolation levels, and network protocols (gRPC/HTTP2)',
      'Proven track record of operating services with 99.999% availability SLAs'
    ],
    preferredSkills: ['Distributed Consensus', 'Go', 'gRPC', 'Kubernetes', 'High Throughput Storage', 'Linux Kernel Profiling'],
    benefits: [
      'Comprehensive medical, dental & vision insurance (100% employer paid)',
      'Generous 401(k) retirement matching & annual equity grants',
      '$5,000 annual continuous education & conference stipend',
      'Flexible hybrid working schedule with home office setup allowance'
    ],
    logicChallenge: {
      id: 'logic_job_google_01',
      title: 'Job Application Logic Assessment: Distributed Leader Election & Network Split-Brain',
      category: 'Google Cloud Distributed Systems Test',
      scenario: 'You are designing a Raft-based consensus cluster consisting of 5 nodes: [N1, N2, N3, N4, N5]. A temporary network partition isolates the cluster into two disconnected partitions: Partition A containing {N1, N2} and Partition B containing {N3, N4, N5}.',
      question: 'Suppose N1 was the leader before the partition. What happens to write proposals submitted to Partition A versus Partition B?',
      codeSnippet: `// Cluster Configuration:
// Total nodes = 5
// Quorum required = floor(5/2) + 1 = 3 nodes
// Partition A: {N1 (Old Leader), N2} -> Count = 2
// Partition B: {N3, N4, N5} -> Count = 3`,
      options: [
        {
          id: 'opt_1',
          text: 'Partition A cannot commit any writes because 2 < 3 (no quorum). Partition B will elect a new leader and successfully commit writes because 3 >= 3 (majority quorum holds).',
          rationale: 'Correct! Raft requires a strict majority (Quorum = 3 out of 5) to commit any log entry. Partition A lacks majority and must reject/uncommit writes, while Partition B can safely elect a leader and proceed.'
        },
        {
          id: 'opt_2',
          text: 'Both partitions will continue committing writes independently and reconcile with Last-Write-Wins later',
          rationale: 'Incorrect: Raft is a CP (Consistency/Partition-tolerance) system that strictly forbids split-brain divergence.'
        },
        {
          id: 'opt_3',
          text: 'Partition A will keep committing because N1 has the highest term number',
          rationale: 'Incorrect: A leader cannot commit entries without receiving positive acknowledgments from a majority of nodes.'
        },
        {
          id: 'opt_4',
          text: 'The entire cluster shuts down until all 5 nodes rejoin',
          rationale: 'Incorrect: A 5-node cluster is designed specifically to tolerate 2 node failures or isolation without halting the majority.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Recall the Raft Quorum rule: Majorities must strictly exceed N/2. How many nodes does each partition possess?',
      difficulty: 'Hard',
      rewardPoints: 150
    }
  },
  {
    id: 'job_stripe_02',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
    role: 'Staff Full-Stack & Payment Infrastructure Engineer',
    department: 'Financial Infrastructure & Developer Platform',
    industry: 'FinTech',
    location: 'San Francisco, CA / Seattle, WA / Remote',
    workplaceType: 'Remote',
    employmentType: 'Full-time',
    salaryRange: '$210,000 - $290,000 + Equity',
    experienceLevel: 'Senior Level (5+ yrs)',
    postedDaysAgo: 2,
    urgency: 'Hot',
    description: 'Help build the financial infrastructure of the internet. You will develop ultra-reliable API workflows, high-precision ledger systems, and responsive merchant dashboards that handle billions in financial transactions.',
    responsibilities: [
      'Build mission-critical ledger double-entry bookkeeping engines with zero tolerance for floating point drift',
      'Design clean, developer-friendly REST and GraphQL APIs backed by idempotent execution guarantees',
      'Collaborate with global security and fraud prevention teams to enforce real-time anomaly detection'
    ],
    requirements: [
      'Strong proficiency in TypeScript, React, Node.js or Ruby/Java/Go',
      'Deep experience with ACID database transactions, optimistic locking, and distributed caching',
      'Obsession with code cleanliness, documentation, and automated testing'
    ],
    preferredSkills: ['TypeScript', 'React 19', 'PostgreSQL', 'Idempotent APIs', 'Double-Entry Accounting', 'Kafka'],
    benefits: [
      'Full health, dental, and optical insurance coverage with wellness stipends',
      'Generous parental leave and fertility benefit support',
      'Home office furnishing budget ($2,500) and monthly internet reimbursement',
      'Unlimited Paid Time Off (PTO) with minimum required vacation periods'
    ],
    logicChallenge: {
      id: 'logic_job_stripe_02',
      title: 'Job Application Logic Assessment: Financial Precision & Floating Point Safety',
      category: 'Stripe Financial Engineering Test',
      scenario: 'You are calculating sales tax and splitting payments across multi-party payouts. In standard IEEE 754 floating point arithmetic (used by JavaScript numbers), calculating 0.1 + 0.2 produces 0.30000000000000004.',
      question: 'Which of the following designs is the industry gold standard for storing and computing monetary amounts in production financial ledger software?',
      codeSnippet: `// Scenario:
let balance = 0.1 + 0.2; // 0.30000000000000004
// Problem: Rounding errors accumulate across millions of ledgers.`,
      options: [
        {
          id: 'opt_1',
          text: 'Store all monetary amounts as 64-bit integers in the smallest currency sub-unit (e.g., Cents for USD, Yen for JPY) and perform integer arithmetic or use arbitrary-precision Decimal libraries',
          rationale: 'Correct! Representing money as atomic integer units (e.g. $10.50 -> 1050 cents) eliminates binary floating-point representation anomalies completely.'
        },
        {
          id: 'opt_2',
          text: 'Call parseFloat(num.toFixed(2)) after every individual arithmetic operation',
          rationale: 'Incorrect: toFixed introduces string serialization overhead and intermediate rounding bias in complex multi-step multiplications.'
        },
        {
          id: 'opt_3',
          text: 'Store money as standard 32-bit floats and truncate decimals at the database column level',
          rationale: 'Incorrect: 32-bit floats have even lower precision and will cause severe monetary balance discrepancies.'
        },
        {
          id: 'opt_4',
          text: 'Round all intermediate numbers up to the nearest whole integer dollar',
          rationale: 'Incorrect: Artificial rounding creates severe balance sheet discrepancies.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'How do banking systems avoid fractional penny rounding leaks? Think about atomic base units (like cents).',
      difficulty: 'Medium',
      rewardPoints: 130
    }
  },
  {
    id: 'job_microsoft_03',
    company: 'Microsoft',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    role: 'Principal AI Systems Architect',
    department: 'Azure AI & Copilot Foundations',
    industry: 'AI & Cloud Computing',
    location: 'Redmond, WA / Remote',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    salaryRange: '$225,000 - $310,000 + Stock Award',
    experienceLevel: 'Lead / Architect',
    postedDaysAgo: 3,
    urgency: 'Regular',
    description: 'Lead the architecture of enterprise-scale AI runtime orchestration pipelines. Design high-throughput model inference endpoints, semantic memory caches, and multi-agent coordination frameworks for Fortune 500 customers.',
    responsibilities: [
      'Architect GPU-accelerated inference load balancers with dynamic batching and speculative decoding',
      'Design fault-tolerant vector database clusters indexing hundreds of millions of embeddings',
      'Enforce strict enterprise data isolation, RBAC security, and AES-256 data-at-rest encryption'
    ],
    requirements: [
      '8+ years in software architecture with 3+ years dedicated to machine learning or distributed systems',
      'Expertise in Python, C++, or Go, with deep familiarity in ONNX, Triton inference server, or PyTorch',
      'Exceptional communication and technical leadership skills'
    ],
    preferredSkills: ['Azure Cloud', 'Vector Search', 'Triton Inference Server', 'Distributed Cache', 'Security Hardening'],
    benefits: [
      'Top-tier 401(k) matching and annual employee stock purchase discount',
      'World-class healthcare coverage and on-site wellness facilities',
      'Parental leave up to 20 weeks fully paid',
      'Robust internal mobility and sabbatical programs'
    ],
    logicChallenge: {
      id: 'logic_job_msft_03',
      title: 'Job Application Logic Assessment: Inference Token Caching & KV Cache Memory',
      category: 'Microsoft Azure AI Architecture Test',
      scenario: 'In large language model autoregressive generation, each token generated attends to all previous tokens in the sequence via the Key-Value (KV) cache stored in High Bandwidth Memory (HBM) on the GPU.',
      question: 'If sequence length doubles from L to 2L for a given batch size, how does the memory consumed by the KV cache scale?',
      codeSnippet: `// KV Cache Memory Formula:
// Memory = 2 * (num_layers) * (num_heads) * (head_dim) * (seq_len) * (batch_size) * (precision_bytes)`,
      options: [
        {
          id: 'opt_1',
          text: 'Linear scaling: KV cache memory scales linearly O(L), exactly doubling when sequence length doubles from L to 2L',
          rationale: 'Correct! The KV cache stores keys and values for each token generated. Because memory = 2 * layers * heads * dim * L * batch * bytes, doubling L doubles the KV cache storage requirement linearly.'
        },
        {
          id: 'opt_2',
          text: 'Quadratic scaling O(L^2) because attention matrix calculations are quadratic in time',
          rationale: 'Incorrect: While self-attention compute/flops scales quadratically O(L^2), the stored KV cache tensor memory itself scales linearly O(L).'
        },
        {
          id: 'opt_3',
          text: 'Constant O(1) memory because previous tokens are discarded after generation',
          rationale: 'Incorrect: Autoregressive models must retain all prior token keys and values for causal masking.'
        },
        {
          id: 'opt_4',
          text: 'Logarithmic scaling O(log L) due to tree-based positional embeddings',
          rationale: 'Incorrect: Standard Transformer architectures maintain dense per-token KV vectors.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Distinguish between the computational complexity of the attention matrix (FLOPs) versus the storage size of the KV cache vectors.',
      difficulty: 'Medium',
      rewardPoints: 140
    }
  },
  {
    id: 'job_datadog_04',
    company: 'Datadog',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    role: 'Senior Frontend & Data Visualization Engineer',
    department: 'Real-Time Telemetry & Observability UI',
    industry: 'DevTools & SaaS',
    location: 'New York, NY / Remote',
    workplaceType: 'Remote',
    employmentType: 'Full-time',
    salaryRange: '$175,000 - $240,000 + Equity',
    experienceLevel: 'Mid Level (2-5 yrs)',
    postedDaysAgo: 4,
    urgency: 'Hot',
    description: 'We are looking for a UI craftsman to build lightning-fast time-series chart engines, interactive flamegraphs, and distributed trace visualizers rendering 100k+ data points at 60 FPS.',
    responsibilities: [
      'Build custom Canvas/WebGL rendering pipelines for dense time-series metrics dashboards',
      'Optimize React memory footprints and prevent UI thread frame drops during rapid WebSocket telemetry streaming',
      'Design accessible, high-contrast themes and developer-centric data filtering interactions'
    ],
    requirements: [
      '3+ years building high-performance web applications with React, TypeScript, and HTML5 Canvas / WebGL',
      'Strong grasp of browser rendering engine pipelines (paint, layout, compositing)',
      'Experience handling high-frequency binary data feeds (Protobuf/ArrayBuffers)'
    ],
    preferredSkills: ['React', 'TypeScript', 'HTML5 Canvas / WebGL', 'Performance Profiling', 'D3.js', 'Web Workers'],
    benefits: [
      'Competitive compensation package with significant equity upside',
      'Comprehensive medical, dental and vision benefits',
      'Annual continuous learning and equipment stipend',
      'Flexible work-from-home policy with quarterly in-person team offsites'
    ],
    logicChallenge: {
      id: 'logic_job_dd_04',
      title: 'Job Application Logic Assessment: High-Frequency Browser Rendering & Frame Budget',
      category: 'Datadog Frontend Performance Test',
      scenario: 'A browser receives 500 WebSocket metric messages per second from an observability stream. If the UI triggers a React setState re-render for every individual incoming message, the browser tab freezes.',
      question: 'Which architecture pattern achieves a smooth 60 FPS UI update rate without dropping telemetry points or freezing the main thread?',
      codeSnippet: `// Inbound Rate: 500 msgs/sec
// Browser Frame Budget: 16.6ms per frame (60 FPS)
// Challenge: React state updates overwhelm the reconciliation queue.`,
      options: [
        {
          id: 'opt_1',
          text: 'Buffer incoming messages in a Web Worker or fast circular array buffer, and batch flush UI updates to the Canvas/DOM synchronized with requestAnimationFrame (rAF)',
          rationale: 'Correct! By decoupling message ingestion from rendering and scheduling screen updates inside requestAnimationFrame (at 60Hz = ~16.6ms intervals), you guarantee bounded renders while processing all incoming data.'
        },
        {
          id: 'opt_2',
          text: 'Use window.alert() to pause the browser whenever message queues exceed 10 items',
          rationale: 'Incorrect: Blocking alert dialogs freeze the entire browser execution context.'
        },
        {
          id: 'opt_3',
          text: 'Wrap every WebSocket message in a Promise.all() chain with 1-second timeout',
          rationale: 'Incorrect: Promise chaining does not throttle rendering frequency.'
        },
        {
          id: 'opt_4',
          text: 'Disable all hardware acceleration in CSS with transform: none',
          rationale: 'Incorrect: Hardware acceleration is essential for 60 FPS canvas and compositing performance.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Look for the browser native API specifically designed to synchronize frame paints with the monitor refresh rate.',
      difficulty: 'Easy',
      rewardPoints: 100
    }
  },
  {
    id: 'job_spotify_05',
    company: 'Spotify',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&auto=format&fit=crop&q=80',
    role: 'Full Stack Software Engineer, Music Recommendation',
    department: 'Personalization & Audio Discovery',
    industry: 'Consumer Tech & Media',
    location: 'New York, NY / Boston, MA / Hybrid',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    salaryRange: '$160,000 - $215,000 + Equity',
    experienceLevel: 'Mid Level (2-5 yrs)',
    postedDaysAgo: 3,
    urgency: 'Hot',
    description: 'Join the team powering audio recommendation for over 600M listeners. Build low-latency playlist generation microservices, real-time taste profile caching, and seamless web/desktop user experiences.',
    responsibilities: [
      'Develop scalable APIs in Python and Java/TypeScript connecting collaborative filtering models with client apps',
      'Optimize edge caching strategies for high-frequency personalized track feeds',
      'Partner with design and user research to iterate on interactive discovery UI components'
    ],
    requirements: [
      '3+ years full-stack experience with Python, TypeScript/JavaScript, and PostgreSQL/Cassandra',
      'Experience with event-driven architectures (Kafka, Google Pub/Sub)',
      'Passion for audio engineering, music algorithms, and high-quality UX'
    ],
    preferredSkills: ['Python', 'TypeScript', 'React', 'Kafka', 'Cassandra', 'GraphQL'],
    benefits: [
      'Global Spotify All-Access subscription + wellness stipends',
      'Extensive parental leave and flexible work-from-anywhere policy',
      'Retirement savings plan with 100% employer match up to 6%'
    ],
    logicChallenge: {
      id: 'logic_job_spotify_05',
      title: 'Job Application Logic Assessment: Collaborative Filtering Matrix Sparsity',
      category: 'Spotify Recommendation Algorithms Test',
      scenario: 'You have a user-item rating matrix with 100M users and 100M songs. On average, an individual user has listened to only 500 songs.',
      question: 'What percentage of entries in this rating matrix are unobserved/empty (sparse)?',
      codeSnippet: `// Users = 100,000,000
// Songs = 100,000,000
// Total possible matrix cells = 10^16
// Average songs listened per user = 500`,
      options: [
        {
          id: 'opt_1',
          text: '99.9995% sparse (only 0.0005% of entries are filled)',
          rationale: 'Correct! Filled entries per user = 500 / 100,000,000 = 0.000005 = 0.0005%. Hence sparsity is 100% - 0.0005% = 99.9995%.'
        },
        {
          id: 'opt_2',
          text: '50.0% sparse due to uniform song clustering',
          rationale: 'Incorrect: 500 songs out of 100 million is an infinitesimal fraction.'
        },
        {
          id: 'opt_3',
          text: '95.0% sparse',
          rationale: 'Incorrect: 95% would imply each user listened to 5,000,000 songs.'
        },
        {
          id: 'opt_4',
          text: '0% sparse because empty cells are imputed as zeros',
          rationale: 'Incorrect: Mathematical sparsity counts unobserved non-zero data points.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Calculate (500 / 100,000,000) * 100% to find the density, then subtract from 100%.',
      difficulty: 'Easy',
      rewardPoints: 100
    }
  },
  {
    id: 'job_anthropic_06',
    company: 'Anthropic',
    companyLogo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80',
    role: 'AI Alignment & Safety Evaluation Systems Engineer',
    department: 'Model Safety & Automated Red Teaming',
    industry: 'AI & Research',
    location: 'San Francisco, CA',
    workplaceType: 'On-site',
    employmentType: 'Full-time',
    salaryRange: '$240,000 - $340,000 + Equity',
    experienceLevel: 'Senior Level (5+ yrs)',
    postedDaysAgo: 1,
    urgency: 'Hot',
    description: 'Build rigorous, scalable automated red-teaming benchmarks, constitutional AI guardrail evaluators, and interpretability probing tools for frontier language models.',
    responsibilities: [
      'Build distributed test harness clusters running thousands of automated safety probes per second',
      'Implement transformer activation caching and mechanistic interpretability visualizers',
      'Collaborate with research scientists to convert safety policies into programmatic classifiers'
    ],
    requirements: [
      '5+ years software engineering experience in Python and Rust or Go',
      'Solid foundations in linear algebra, probability, and neural network architectures',
      'Dedication to safe and beneficial artificial intelligence deployment'
    ],
    preferredSkills: ['Python', 'PyTorch', 'Distributed Evaluation', 'LLM Alignment', 'Rust', 'Docker'],
    benefits: [
      'Top-tier equity package in frontier AI research lab',
      'Comprehensive health, dental, vision & life insurance (100% covered)',
      'Daily catered gourmet meals and commuter transit benefits'
    ],
    logicChallenge: {
      id: 'logic_job_anthropic_06',
      title: 'Job Application Logic Assessment: Precision vs Recall in Safety Classifiers',
      category: 'Anthropic Safety & Benchmark Test',
      scenario: 'You are deploying an automated guardrail classifier that blocks dangerous prompt injections before reaching production models. In critical high-stakes safety filtering, missing a harmful attack (False Negative) has catastrophic consequences, while falsely flagging a benign prompt (False Positive) causes a slight user retry delay.',
      question: 'Which metric and decision threshold adjustment should your engineering team prioritize?',
      options: [
        {
          id: 'opt_1',
          text: 'Maximize Recall (minimize False Negatives) by lowering the classification decision threshold for flagging harmful prompts',
          rationale: 'Correct! High Recall guarantees that virtually all dangerous attacks are caught. Lowering the threshold captures borderline attacks even if False Positives marginally increase.'
        },
        {
          id: 'opt_2',
          text: 'Maximize Specificity by raising the threshold to 0.99 so no benign prompt is ever blocked',
          rationale: 'Incorrect: Raising the threshold drastically increases False Negatives, allowing harmful injections through.'
        },
        {
          id: 'opt_3',
          text: 'Set the threshold randomly using Monte Carlo dropout',
          rationale: 'Incorrect: Random thresholds undermine deterministic safety validation.'
        },
        {
          id: 'opt_4',
          text: 'Rely solely on raw Accuracy regardless of class imbalance',
          rationale: 'Incorrect: In rare-event attacks (e.g. 0.1% harmful), a naive 99.9% accurate classifier that labels everything benign is completely useless.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Recall = TP / (TP + FN). When False Negatives are unacceptable, which metric must be maximized?',
      difficulty: 'Medium',
      rewardPoints: 130
    }
  },
  {
    id: 'job_epicgames_07',
    company: 'Epic Games',
    companyLogo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&auto=format&fit=crop&q=80',
    role: 'Junior 3D Graphics & Engine Tools Developer',
    department: 'Unreal Engine Core Pipeline',
    industry: 'Gaming & Interactive',
    location: 'Cary, NC / Hybrid',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    salaryRange: '$95,000 - $135,000 + Bonus + Equity',
    experienceLevel: 'Entry Level (0-2 yrs)',
    postedDaysAgo: 5,
    urgency: 'Regular',
    description: 'Jumpstart your career developing real-time interactive tooling, asset ingestion workflows, and shader pipeline utilities for game developers and filmmakers worldwide using Unreal Engine.',
    responsibilities: [
      'Build internal C++ and Python automation tools for texture compression, mesh LOD generation, and asset cooking',
      'Optimize UI response times in Unreal Editor Slate plugins',
      'Write automated unit and regression tests for graphics math libraries'
    ],
    requirements: [
      'Bachelor’s degree in Computer Science or equivalent practical portfolio',
      'Strong grasp of C++, linear algebra (vectors, matrices, quaternions), and memory pointers',
      'Familiarity with modern graphics APIs (DirectX 12, Vulkan, or WebGL)'
    ],
    preferredSkills: ['C++', 'Python', 'Linear Algebra', 'Unreal Engine', 'OpenGL/Vulkan', 'Git'],
    benefits: [
      'Industry-leading 401(k) with company match',
      'Relocation assistance to Cary, NC headquarters',
      'Annual game and console purchase stipend'
    ],
    logicChallenge: {
      id: 'logic_job_epic_07',
      title: 'Job Application Logic Assessment: 3D Coordinate Transformations & Matrix Multiplication',
      category: 'Epic Games Graphics Math Test',
      scenario: 'To transform a 3D vertex from Local Space -> World Space -> View Space -> Clip Space, vertices are multiplied by transformation matrices.',
      question: 'Why must 3D position vectors (x, y, z) be augmented with a 4th component w = 1 (Homogeneous Coordinates) for 4x4 matrix transformations?',
      codeSnippet: `// 3D Vector: [x, y, z] -> Homogeneous: [x, y, z, 1]
// 4x4 Matrix: [ R  R  R  Tx ]
//             [ R  R  R  Ty ]
//             [ R  R  R  Tz ]
//             [ 0  0  0  1  ]`,
      options: [
        {
          id: 'opt_1',
          text: 'To allow Translation (linear offsets) to be computed via standard linear matrix multiplication alongside Rotation and Scaling',
          rationale: 'Correct! 3x3 matrices can only represent linear transformations (rotation, scaling, shear) through the origin. Augmenting to 4x4 homogeneous coordinates allows affine translations to be unified into a single matrix multiplication.'
        },
        {
          id: 'opt_2',
          text: 'To make the vector compatible with 64-bit CPU registers',
          rationale: 'Incorrect: Homogeneous coordinates are a mathematical projective geometry construct, not a CPU hardware constraint.'
        },
        {
          id: 'opt_3',
          text: 'Because GPU floating point units cannot calculate 3-element dot products',
          rationale: 'Incorrect: GPUs natively support 3D and 4D SIMD instructions.'
        },
        {
          id: 'opt_4',
          text: 'To invert the RGB color channels of the rendered pixel',
          rationale: 'Incorrect: Vertex transformations modify spatial positions, not pixel color channels.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Think about why 3x3 matrix multiplication cannot move a point away from (0,0,0) without adding an extra dimension for translation.',
      difficulty: 'Easy',
      rewardPoints: 90
    }
  },
  {
    id: 'job_moderna_08',
    company: 'Moderna Therapeutics',
    companyLogo: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=100&auto=format&fit=crop&q=80',
    role: 'Computational Biology & Cloud Data Pipeline Engineer',
    department: 'Genomics & Digital mRNA Research Platform',
    industry: 'HealthTech & Biotech',
    location: 'Cambridge, MA / Hybrid',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    salaryRange: '$150,000 - $205,000 + Bonus',
    experienceLevel: 'Mid Level (2-5 yrs)',
    postedDaysAgo: 4,
    urgency: 'Regular',
    description: 'Accelerate the next generation of mRNA medicines. Architect high-throughput genomic sequencing pipelines, distributed cloud data warehouses, and automated biological workflow orchestrators.',
    responsibilities: [
      'Build reproducible Nextflow and Python data processing pipelines processing terabytes of nucleotide data daily',
      'Optimize AWS Batch and Kubernetes compute clusters for protein structure prediction models (AlphaFold)',
      'Enforce HIPAA-compliant data encryption and audit logging protocols'
    ],
    requirements: [
      '3+ years experience with Python, SQL, and AWS / Google Cloud infrastructure',
      'Familiarity with distributed data processing (Spark, DuckDB, or Nextflow/Snakemake)',
      'Experience in bioinformatics, genomics, or scientific computing is a plus'
    ],
    preferredSkills: ['Python', 'AWS Batch', 'PostgreSQL', 'Docker', 'Bioinformatics', 'Data Pipelines'],
    benefits: [
      'Comprehensive biotech healthcare plan with zero employee premium options',
      'Employee stock purchase plan (ESPP) with 15% discount',
      'Tuition reimbursement for graduate scientific coursework'
    ],
    logicChallenge: {
      id: 'logic_job_moderna_08',
      title: 'Job Application Logic Assessment: Nucleotide Sequence Matching & String Search',
      category: 'Moderna Computational Biology Test',
      scenario: 'You are searching for a specific 20-base-pair target RNA sequence pattern across a 3-billion-base-pair human genome string.',
      question: 'Which algorithm guarantees O(N + M) linear worst-case search time without degenerate O(N * M) worst-case backtracking?',
      options: [
        {
          id: 'opt_1',
          text: 'Knuth-Morris-Pratt (KMP) or Aho-Corasick using preprocessed Prefix/Failure functions',
          rationale: 'Correct! KMP preprocesses the pattern in O(M) time to build a lookup table of longest proper prefixes that are also suffixes, ensuring the text pointer never moves backward and guaranteeing O(N + M) worst-case runtime.'
        },
        {
          id: 'opt_2',
          text: 'Naive nested double for-loop substring comparison',
          rationale: 'Incorrect: Naive search degenerates to O(N * M) when repetitive substrings occur.'
        },
        {
          id: 'opt_3',
          text: 'Bubble sort the entire 3-billion character genome first',
          rationale: 'Incorrect: Sorting destroys sequential position information.'
        },
        {
          id: 'opt_4',
          text: 'Compute MD5 hash of the entire genome in one step',
          rationale: 'Incorrect: Full string hashes do not identify variable offset substring locations.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Look for the classic string search algorithm that uses precomputed failure tables to skip redundant comparisons.',
      difficulty: 'Medium',
      rewardPoints: 110
    }
  },
  {
    id: 'job_tesla_09',
    company: 'Tesla',
    companyLogo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=100&auto=format&fit=crop&q=80',
    role: 'Autopilot Embedded Software & Real-Time Systems Engineer',
    department: 'Vehicle Software & Full Self-Driving (FSD)',
    industry: 'Autonomous Vehicles & Robotics',
    location: 'Palo Alto, CA / Austin, TX',
    workplaceType: 'On-site',
    employmentType: 'Full-time',
    salaryRange: '$180,000 - $260,000 + Tesla Stock Units',
    experienceLevel: 'Senior Level (5+ yrs)',
    postedDaysAgo: 2,
    urgency: 'Hot',
    description: 'Design and optimize hard real-time safety-critical control loops, camera sensor synchronization pipelines, and low-latency IPC running on custom Tesla FSD silicon hardware.',
    responsibilities: [
      'Write deterministic C++ and C code executing in sub-5ms control loops with zero dynamic memory allocation',
      'Optimize Linux kernel device drivers and PCIe DMA buffers for 8 concurrent 4K camera feeds',
      'Perform hardware-in-the-loop (HIL) simulation validation and failure mode analysis'
    ],
    requirements: [
      '5+ years embedded software engineering experience in C and modern C++',
      'Deep understanding of real-time operating systems (RTOS/PREEMPT_RT), memory barriers, and cache coherence',
      'Experience with safety-critical systems (ISO 26262 or similar standards)'
    ],
    preferredSkills: ['C/C++', 'RTOS / PREEMPT_RT', 'Linux Device Drivers', 'PCIe DMA', 'Real-Time Systems', 'CAN Bus'],
    benefits: [
      'High-impact equity grants with rapid quarterly vesting',
      'Vehicle discount and free Supercharging benefits',
      'Top-tier comprehensive medical and life insurance'
    ],
    logicChallenge: {
      id: 'logic_job_tesla_09',
      title: 'Job Application Logic Assessment: Real-Time Priority Inversion & Priority Ceiling',
      category: 'Tesla Embedded Real-Time Systems Test',
      scenario: 'In a real-time OS, a Low-priority task L acquires a shared mutex. A High-priority task H needs the mutex and blocks. Meanwhile, a Medium-priority task M (which does not need the mutex) preempts task L, preventing L from releasing the mutex and indirectly starving task H indefinitely.',
      question: 'Which operating system scheduling protocol prevents this unbounded Priority Inversion bug?',
      options: [
        {
          id: 'opt_1',
          text: 'Priority Inheritance Protocol: Temporarily elevate task L’s priority to match task H’s priority until L releases the shared mutex',
          rationale: 'Correct! By temporarily elevating L’s priority to the highest blocker (H), task M can no longer preempt L, allowing L to quickly finish its critical section and release the mutex.'
        },
        {
          id: 'opt_2',
          text: 'Increase CPU clock speed by 200%',
          rationale: 'Incorrect: Clock speeds do not resolve synchronization scheduling priority inversions.'
        },
        {
          id: 'opt_3',
          text: 'Disable all hardware interrupts permanently',
          rationale: 'Incorrect: Disabling all interrupts freezes system timers and peripherals.'
        },
        {
          id: 'opt_4',
          text: 'Convert all mutexes to standard sleep timers with 500ms delay',
          rationale: 'Incorrect: Arbitrary sleep delays violate hard real-time sub-5ms deadline requirements.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'How can the task holding the lock be helped to finish quickly when a higher priority task is waiting for it?',
      difficulty: 'Medium',
      rewardPoints: 130
    }
  },
  {
    id: 'job_coursera_10',
    company: 'Coursera',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    role: 'Junior Frontend Engineer & Learning Experience',
    department: 'Learner Growth & Interactive Video Player',
    industry: 'EdTech',
    location: 'Mountain View, CA / Remote',
    workplaceType: 'Remote',
    employmentType: 'Full-time',
    salaryRange: '$90,000 - $125,000 + Equity',
    experienceLevel: 'Entry Level (0-2 yrs)',
    postedDaysAgo: 6,
    urgency: 'Regular',
    description: 'Empower over 140 million global learners. Collaborate on building accessible, responsive video players, interactive code sandboxes, and multilingual peer-review assessment tools.',
    responsibilities: [
      'Develop modern, accessible React and TypeScript UI components adhering to WCAG 2.1 AA standards',
      'Optimize client-side video stream buffering and offline sync mechanisms',
      'Implement A/B test experiments to improve course completion rates'
    ],
    requirements: [
      'Strong grasp of HTML5 semantic tags, CSS Flexbox/Grid, and modern JavaScript (ES6+)',
      'Experience building SPAs with React, state management, and REST APIs',
      'Dedication to accessibility, internationalization, and clean testable code'
    ],
    preferredSkills: ['React', 'TypeScript', 'WCAG Accessibility', 'CSS Modules / Tailwind', 'Jest / React Testing Library'],
    benefits: [
      'Unlimited access to all Coursera degree and certificate programs',
      'Home office setup reimbursement & quarterly health stipend',
      'Flexible remote schedule across all US and Canadian timezones'
    ],
    logicChallenge: {
      id: 'logic_job_coursera_10',
      title: 'Job Application Logic Assessment: Web Accessibility & Focus Trap Traversal',
      category: 'Coursera Frontend Accessibility Test',
      scenario: 'When a modal dialog opens on an e-learning website, a screen reader or keyboard-only user presses the TAB key repeatedly.',
      question: 'Which accessibility (a11y) behavior is required by WAI-ARIA authoring guidelines for accessible modal dialogs?',
      options: [
        {
          id: 'opt_1',
          text: 'Trap keyboard focus inside the active modal (wrapping from last focusable element to first) and restore focus to the opening button upon modal dismissal',
          rationale: 'Correct! WAI-ARIA Modal pattern requires keyboard focus to be contained within the modal so users do not accidentally interact with background elements behind the overlay, and restoring focus on close maintains navigation context.'
        },
        {
          id: 'opt_2',
          text: 'Allow keyboard focus to freely tab through the hidden page behind the modal',
          rationale: 'Incorrect: Allowing focus to wander behind a modal is a severe accessibility violation.'
        },
        {
          id: 'opt_3',
          text: 'Disable all keyboard inputs until mouse click is detected',
          rationale: 'Incorrect: Disabling keyboards makes the website unusable for motor-impaired users.'
        },
        {
          id: 'opt_4',
          text: 'Hide all text with display: none for screen readers',
          rationale: 'Incorrect: Hiding text breaks screen reader accessibility entirely.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Think about where focus should circulate when a dialog overlay covers the screen, and where it goes when dismissed.',
      difficulty: 'Easy',
      rewardPoints: 85
    }
  },
  {
    id: 'job_crowdstrike_11',
    company: 'CrowdStrike',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=80',
    role: 'Security Operations Analyst & Threat Detection Engineer',
    department: 'Falcon OverWatch Managed Threat Hunting',
    industry: 'Cybersecurity',
    location: 'Austin, TX / Remote',
    workplaceType: 'Remote',
    employmentType: 'Full-time',
    salaryRange: '$135,000 - $185,000 + Equity',
    experienceLevel: 'Mid Level (2-5 yrs)',
    postedDaysAgo: 3,
    urgency: 'Hot',
    description: 'Protect world-leading enterprises from sophisticated cyber adversaries. Analyze high-volume telemetry, write automated correlation rules, and uncover stealthy lateral movement tactics.',
    responsibilities: [
      'Investigate endpoint telemetry anomalies across millions of Windows, macOS, and Linux servers',
      'Author real-time detection signatures using YARA, Splunk SPL, and Python scripts',
      'Conduct root cause investigations mapping attacker techniques to the MITRE ATT&CK framework'
    ],
    requirements: [
      '2-4 years experience in security operations (SOC), threat hunting, or malware triage',
      'Strong grasp of network protocols, Windows API internals, and Linux system logging (auditd/eBPF)',
      'Familiarity with MITRE ATT&CK enterprise matrix'
    ],
    preferredSkills: ['Threat Hunting', 'MITRE ATT&CK', 'Python', 'YARA', 'Network Forensics', 'Splunk / SIEM'],
    benefits: [
      'Remote-first culture with generous home office allowances',
      'Annual cybersecurity training and SANS/GIAC certification sponsorship',
      'Competitive 401(k) with company match and wellness subsidies'
    ],
    logicChallenge: {
      id: 'logic_job_crowdstrike_11',
      title: 'Job Application Logic Assessment: MITRE ATT&CK Lateral Movement Detection',
      category: 'CrowdStrike Threat Hunting Test',
      scenario: 'You observe an internal workstation executing `psexec.exe` to connect to a domain controller via SMB (Port 445), followed immediately by `wmic process call create "powershell.exe -enc ..."` with an encoded payload.',
      question: 'Which MITRE ATT&CK tactic and defense evasion technique does this sequence indicate?',
      options: [
        {
          id: 'opt_1',
          text: 'Lateral Movement via Remote Service Execution / Windows Management Instrumentation (WMI) with encoded PowerShell command obfuscation',
          rationale: 'Correct! PsExec and WMI over Port 445 are classic Lateral Movement techniques (T1021 / T1047), and base64 encoded PowerShell is used for Obfuscated Files/Information (T1027).'
        },
        {
          id: 'opt_2',
          text: 'Standard printer driver installation',
          rationale: 'Incorrect: Base64 encoded PowerShell spawned via PsExec on a domain controller is high-severity attacker activity.'
        },
        {
          id: 'opt_3',
          text: 'DNS amplification DDoS attack',
          rationale: 'Incorrect: This is internal host-to-host execution over SMB/WMI, not UDP DNS amplification.'
        },
        {
          id: 'opt_4',
          text: 'Routine browser cookie cleanup',
          rationale: 'Incorrect: PsExec and WMI are administrative/command-line execution tools unrelated to browser cookies.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'PsExec and WMI allow attackers to execute commands on remote systems across the local network.',
      difficulty: 'Easy',
      rewardPoints: 95
    }
  },
  {
    id: 'job_enphase_12',
    company: 'Enphase Energy',
    companyLogo: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=100&auto=format&fit=crop&q=80',
    role: 'IoT & Smart Grid Firmware Systems Engineer',
    department: 'Microinverter & Home Energy Management',
    industry: 'CleanTech & Renewable Energy',
    location: 'Fremont, CA / Austin, TX',
    workplaceType: 'On-site',
    employmentType: 'Full-time',
    salaryRange: '$140,000 - $190,000 + Stock',
    experienceLevel: 'Mid Level (2-5 yrs)',
    postedDaysAgo: 4,
    urgency: 'Regular',
    description: 'Advance clean energy technology by engineering high-reliability embedded firmware for solar microinverters, battery storage systems, and bidirectional grid communications.',
    responsibilities: [
      'Develop embedded C/C++ firmware running on ARM Cortex-M microcontrollers controlling power electronics',
      'Implement secure IoT telemetry protocols (MQTT, Modbus, Zigbee) connecting home batteries to the cloud',
      'Ensure grid compliance (IEEE 1547 and UL 1741 standards) under fluctuating voltage conditions'
    ],
    requirements: [
      '3+ years embedded firmware development in C/C++',
      'Experience with low-level peripherals (SPI, I2C, UART, CAN, PWM) and oscilloscope debugging',
      'Passion for solar technology, electrification, and smart energy grids'
    ],
    preferredSkills: ['Embedded C', 'ARM Cortex-M', 'MQTT / Modbus', 'RTOS', 'Power Electronics', 'Hardware Debugging'],
    benefits: [
      'Significant solar and battery home installation employee discounts',
      'Full healthcare coverage with vision and dental',
      '401(k) matching and annual performance bonuses'
    ],
    logicChallenge: {
      id: 'logic_job_enphase_12',
      title: 'Job Application Logic Assessment: Maximum Power Point Tracking (MPPT)',
      category: 'Enphase Solar Engineering Test',
      scenario: 'A solar photovoltaic panel has a non-linear Current-Voltage (I-V) curve. As voltage increases, current remains steady then drops sharply to zero at Open Circuit Voltage (Voc). Maximum power occurs at a specific point Vmp.',
      question: 'In the classic "Perturb and Observe" (P&O) algorithm, if increasing the operating voltage (dV > 0) results in an increase in measured output power (dP > 0), what should the firmware do in the next control step?',
      options: [
        {
          id: 'opt_1',
          text: 'Continue increasing the operating voltage in the same direction (dV > 0) toward the maximum power peak',
          rationale: 'Correct! In P&O algorithm, if dP/dV is positive, you are on the left slope approaching the maximum power point, so continuing to increment voltage moves closer to the peak.'
        },
        {
          id: 'opt_2',
          text: 'Immediately drop the voltage to zero',
          rationale: 'Incorrect: Dropping voltage to zero produces zero output power.'
        },
        {
          id: 'opt_3',
          text: 'Reverse the voltage perturbation and decrease voltage',
          rationale: 'Incorrect: You only reverse direction when dP/dV is negative (overshot the peak).'
        },
        {
          id: 'opt_4',
          text: 'Shut down the inverter due to thermal overload',
          rationale: 'Incorrect: Positive dP/dV is standard MPPT tracking operation.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'If perturbing voltage up resulted in more power, should you keep going up or turn around?',
      difficulty: 'Easy',
      rewardPoints: 100
    }
  },
  {
    id: 'job_shopify_13',
    company: 'Shopify',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=100&auto=format&fit=crop&q=80',
    role: 'Associate Cloud Infrastructure & SRE Engineer',
    department: 'Global Merchant Reliability & Kubernetes Infrastructure',
    industry: 'E-commerce & SaaS',
    location: 'Ottawa, ON / Toronto, ON / Remote (US/CA)',
    workplaceType: 'Remote',
    employmentType: 'Full-time',
    salaryRange: '$105,000 - $145,000 + Equity',
    experienceLevel: 'Entry Level (0-2 yrs)',
    postedDaysAgo: 2,
    urgency: 'Hot',
    description: 'Help scale the global commerce operating system that powers millions of stores and hundreds of billions in sales. Build automated cloud autoscaling, infrastructure pipelines, and observability monitoring.',
    responsibilities: [
      'Write Terraform modules and Kubernetes configurations provisioning multi-region clusters',
      'Build automated health-check alerting scripts using Python and Prometheus PromQL',
      'Participate in flash-sale readiness testing and disaster recovery drills (Black Friday / Cyber Monday)'
    ],
    requirements: [
      'Degree in Computer Science or equivalent practical cloud engineering experience',
      'Familiarity with Linux systems, networking fundamentals (TCP/IP, DNS, HTTP), and Docker/Kubernetes',
      'Curiosity for automating infrastructure tasks with Python, Go, or Ruby'
    ],
    preferredSkills: ['Kubernetes', 'Docker', 'Linux', 'Terraform', 'Python / Go', 'Prometheus'],
    benefits: [
      'Digital-by-default remote work flexibility with home office stipend',
      'Flexible lifestyle spending account for wellness, books, and hobbies',
      'Comprehensive parental leave and health benefits'
    ],
    logicChallenge: {
      id: 'logic_job_shopify_13',
      title: 'Job Application Logic Assessment: Black Friday Traffic Burst & Thundering Herd',
      category: 'Shopify Cloud Infrastructure Test',
      scenario: 'During a flash sale, 100,000 shoppers access a product page simultaneously. The product data cache expires at 12:00:00 AM, causing all 100,000 requests to miss the cache and hammer the underlying MySQL database at the exact same instant.',
      question: 'Which caching strategy prevents this catastrophic "Thundering Herd / Cache Stampede" failure?',
      options: [
        {
          id: 'opt_1',
          text: 'Use Single-Flight / Mutex Locking (allowing only one thread to regenerate the cache while other requests await or read stale data) combined with Probabilistic Early Expiration (XFetch)',
          rationale: 'Correct! Single-flight ensures only 1 backend query is dispatched to recompute the cache while others await the single result, preventing database exhaustion.'
        },
        {
          id: 'opt_2',
          text: 'Remove the cache completely and let all requests query the database directly',
          rationale: 'Incorrect: Querying the database directly with 100,000 concurrent queries will immediately crash the database.'
        },
        {
          id: 'opt_3',
          text: 'Set cache TTL to 1 millisecond',
          rationale: 'Incorrect: A 1ms TTL exacerbates cache stampedes.'
        },
        {
          id: 'opt_4',
          text: 'Block all shoppers until the server is rebooted',
          rationale: 'Incorrect: Refusing service ruins flash sales and revenue.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Look for the pattern that collapses 100,000 duplicate cache-miss queries into a single database read.',
      difficulty: 'Medium',
      rewardPoints: 110
    }
  },
  {
    id: 'job_jpmorgan_14',
    company: 'JPMorgan Chase & Co.',
    companyLogo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=100&auto=format&fit=crop&q=80',
    role: 'Quantitative Software Engineer & Risk Modeling Systems',
    department: 'Corporate & Investment Bank (CIB) Technology',
    industry: 'FinTech & Banking',
    location: 'New York, NY / Jersey City, NJ / Hybrid',
    workplaceType: 'Hybrid',
    employmentType: 'Full-time',
    salaryRange: '$190,000 - $270,000 + Annual Performance Bonus',
    experienceLevel: 'Senior Level (5+ yrs)',
    postedDaysAgo: 1,
    urgency: 'Hot',
    description: 'Engineer high-throughput pricing engines, real-time risk aggregation pipelines, and Monte Carlo simulation grids executing on distributed cloud compute clusters for global trading desks.',
    responsibilities: [
      'Architect low-latency C++ and Python computing grids calculating Value-at-Risk (VaR) across derivative portfolios',
      'Optimize vector mathematical computations using SIMD AVX-512 and GPU acceleration (CUDA)',
      'Ensure strict regulatory compliance, immutable audit logs, and SOC 2 security governance'
    ],
    requirements: [
      '5+ years software engineering experience in C++, Python, or Java with mathematical rigor',
      'Understanding of financial derivatives, numerical algorithms, or high-performance computing (HPC)',
      'Experience with distributed data streaming and multi-threaded memory synchronization'
    ],
    preferredSkills: ['C++', 'Python', 'High Performance Computing', 'SIMD / CUDA', 'Multithreading', 'Financial Math'],
    benefits: [
      'Significant annual performance-linked cash and equity bonuses',
      'Comprehensive tier-1 healthcare, dental, vision, and retirement matching',
      'On-site state-of-the-art fitness centers and wellness programs'
    ],
    logicChallenge: {
      id: 'logic_job_jpmorgan_14',
      title: 'Job Application Logic Assessment: Monte Carlo Convergence Rate',
      category: 'JPMorgan Quantitative Computing Test',
      scenario: 'You are calculating portfolio credit risk using a Monte Carlo simulation with N stochastic sample paths.',
      question: 'According to the Central Limit Theorem, by what factor must the number of sample paths N be increased to reduce the statistical standard error of the simulation by a factor of 10?',
      codeSnippet: `// Monte Carlo Standard Error Formula:
// Error = sigma / sqrt(N)
// Goal: Reduce Error to (1/10) * Error`,
      options: [
        {
          id: 'opt_1',
          text: 'Increase N by a factor of 100 (because standard error decreases proportional to 1 / sqrt(N), requiring 10^2 = 100x samples)',
          rationale: 'Correct! Standard error scales as O(1/sqrt(N)). To divide the error by 10, sqrt(N_new) must equal 10 * sqrt(N_old), which means N_new = 100 * N_old.'
        },
        {
          id: 'opt_2',
          text: 'Increase N by a factor of 10',
          rationale: 'Incorrect: A 10x increase in N only reduces error by sqrt(10) = ~3.16x.'
        },
        {
          id: 'opt_3',
          text: 'Increase N by a factor of 2',
          rationale: 'Incorrect: A 2x increase only reduces error by sqrt(2) = ~1.41x.'
        },
        {
          id: 'opt_4',
          text: 'No increase in N is needed if random seeds are doubled',
          rationale: 'Incorrect: Changing random seeds does not alter the fundamental convergence rate of Monte Carlo.'
        }
      ],
      correctOptionId: 'opt_1',
      hint: 'Remember: Error ~ 1 / sqrt(N). What number squared equals 100?',
      difficulty: 'Medium',
      rewardPoints: 120
    }
  }
];

export const DEMO_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'int_py_1',
    domain: 'Programming Languages',
    skillTag: 'Python Memory & GIL',
    courseId: 'course_python_01',
    type: 'Technical Concept',
    difficulty: 'Medium',
    question: 'What is the Global Interpreter Lock (GIL) in CPython, why was it implemented, and how do multi-threading, multi-processing, and modern sub-interpreters handle CPU-bound vs. I/O-bound tasks?',
    context: 'Frequently asked by Google, Meta, and Stripe in Python & Backend Engineering rounds.',
    keyConceptsToCover: [
      'CPython reference counting memory management safety (prevents race conditions on PyObject_HEAD refcounts)',
      'GIL allows only one native thread to execute Python bytecode at any given moment',
      'I/O-bound tasks (file/network) release GIL automatically during wait states',
      'CPU-bound tasks require multiprocessing (separate memory space) or C extensions (NumPy/Cython) to utilize multiple cores'
    ],
    idealAnswer: 'The Global Interpreter Lock (GIL) is a mutex used by CPython to prevent multiple native threads from executing Python bytecodes simultaneously. It was designed because CPython uses reference counting for garbage collection—without the GIL, race conditions could corrupt reference count integers across threads. For I/O-bound operations (like reading disk or waiting on sockets), Python threads release the GIL while waiting, making threading effective for I/O concurrency. However, for CPU-bound computation, multi-threading in Python runs on only a single core. To achieve true multi-core parallelism for CPU tasks, developers use the multiprocessing module (which spawns separate processes with independent memory and GILs), Celery worker pools, or offload heavy compute to native C/Rust extensions (like NumPy) that explicitly release the GIL.',
    proTips: [
      'Mention Python 3.13 free-threaded mode (PEP 703) and sub-interpreters with per-interpreter GILs (PEP 684) to demonstrate cutting-edge knowledge.',
      'Contrast threading vs multiprocessing in terms of memory overhead and IPC communication costs.'
    ]
  },
  {
    id: 'int_py_2',
    domain: 'Programming Languages',
    skillTag: 'Python Iterators & Generators',
    courseId: 'course_python_01',
    type: 'Coding Logic',
    difficulty: 'Easy',
    question: 'How do Python generators work under the hood using `yield`, and why are generator expressions preferred over list comprehensions when processing large datasets?',
    context: 'Standard data engineering and Python systems interview question.',
    keyConceptsToCover: [
      'Generators implement the Iterator protocol (__iter__ and __next__)',
      'State preservation in frame objects between successive yield calls',
      'Lazy evaluation: elements produced on-demand (O(1) memory footprint)',
      'List comprehensions construct the entire list in RAM immediately (O(N) memory)'
    ],
    idealAnswer: 'When a Python function contains the `yield` keyword, calling it returns a generator object without executing the function body immediately. The generator object implements the iterator protocol with `__next__()`. When `next()` is called, the execution resumes from the last yield statement, preserving local variables and execution state within its stack frame. When processing a 10GB log file, a list comprehension `[line for line in file]` loads all 10GB into RAM at once, risking an Out-Of-Memory (OOM) crash. In contrast, a generator expression `(line for line in file)` processes one line at a time with O(1) constant memory overhead.',
    proTips: [
      'Provide a quick syntax comparison: `(x*2 for x in data)` vs `[x*2 for x in data]`.',
      'Mention `itertools.islice` and `yield from` for delegating to sub-generators.'
    ]
  },
  {
    id: 'int_js_1',
    domain: 'Programming Languages',
    skillTag: 'JavaScript Event Loop & Microtasks',
    courseId: 'course_js_02',
    type: 'Technical Concept',
    difficulty: 'Medium',
    question: 'Walk through the exact phases of the JavaScript Event Loop. How do the Call Stack, Microtask queue, Macrotask/Task queue, and the Browser Rendering step interact?',
    context: 'Universal frontend interview question asked by Google, Netflix, and Uber.',
    keyConceptsToCover: [
      'Call Stack executes synchronous frames to completion (Run-to-completion)',
      'Microtask queue (Promise.then, queueMicrotask, MutationObserver) executes immediately when Call Stack is empty',
      'Microtask queue drains completely (including newly spawned microtasks) before any Macrotask is picked',
      'Rendering pipeline (requestAnimationFrame, Style, Layout, Paint) runs between task cycles at ~16.6ms intervals (60Hz)',
      'Macrotask queue (setTimeout, setInterval, I/O, UI events) picks exactly ONE task per tick'
    ],
    idealAnswer: 'The JavaScript runtime has a single Call Stack that executes synchronous code to completion. When asynchronous operations trigger callbacks, they are placed in either the Microtask or Macrotask queue. Once the Call Stack is empty, the Event Loop checks the Microtask queue first and drains ALL pending microtasks in FIFO order. If a microtask schedules another microtask, it will also be processed in the current turn before yielding. After the Microtask queue is completely empty, the browser determines if a screen redraw is needed (executing requestAnimationFrame and painting). Finally, the Event Loop takes the oldest Macrotask (e.g. setTimeout callback), pushes it to the Call Stack, and the cycle repeats.',
    proTips: [
      'Warn about microtask recursion starving the event loop and freezing the UI.',
      'Explain why `setTimeout(fn, 0)` is not instantaneous (clamped to minimum 4ms after nested calls).'
    ]
  },
  {
    id: 'int_js_2',
    domain: 'Programming Languages',
    skillTag: 'JavaScript Closures & Memory Leaks',
    courseId: 'course_js_02',
    type: 'Technical Concept',
    difficulty: 'Hard',
    question: 'How do Lexical Closures work in JavaScript engines, and in what scenarios can closures unintentionally create memory leaks in single-page applications?',
    context: 'Core senior UI engineer interview question at Stripe, Airbnb, and Microsoft.',
    keyConceptsToCover: [
      'Lexical Environment record created upon function execution with outer reference pointer',
      'Inner function retains reference to entire lexical environment scope, not just referenced variables',
      'Common leaks: Event listeners not removed on component unmount, setInterval referencing parent scope, detached DOM nodes retained in closures',
      'Debugging via Chrome DevTools Heap Snapshots and Retainer trees'
    ],
    idealAnswer: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, every function maintains a hidden `[[Environment]]` property pointing to the scope where it was created. As long as a reference to the inner function exists, garbage collection cannot reclaim the variables in that lexical environment. Leaks happen when closures outlive their intended lifecycle: for example, registering an event listener or `setInterval` on `window` inside a component without cleaning it up upon unmount, or caching closures that hold references to heavy DOM elements or large arrays. The V8 engine optimizes scope sharing across sibling closures, which can sometimes accidentally retain large unused variables if another closure in the same scope references something else.',
    proTips: [
      'Mention WeakMap and WeakRef as modern tools for attaching ephemeral metadata without preventing GC.',
      'Explain the "Meteor closure memory leak bug" as a famous real-world example of shared context retention.'
    ]
  },
  {
    id: 'int_res_1',
    domain: 'Career & Behavioral',
    skillTag: 'STAR Method & Executive Communication',
    courseId: 'course_resume_03',
    type: 'Behavioral (STAR)',
    difficulty: 'Medium',
    question: 'Tell me about a time when a critical production outage occurred under your watch. How did you diagnose the issue, manage stakeholders, and prevent recurrence?',
    context: 'Essential behavioral evaluation question for Mid & Senior engineering candidates.',
    keyConceptsToCover: [
      'Situation: Clear context, high stakes, business/revenue impact',
      'Task: Your direct ownership and immediate triage responsibility',
      'Action: Systematic debugging, mitigating impact (rollback/circuit breaker), transparent stakeholder communication',
      'Result: Concrete quantifiable outcome, MTTR, blameless post-mortem, and automated guardrails implemented'
    ],
    idealAnswer: 'Situation: During a major merchant promotion at my previous company, our payment webhook service experienced a sudden 400% surge in latency, causing payment confirmation timeouts for ~15,000 active shoppers.\nTask: As the primary engineer on-call, I needed to restore service availability within our 15-minute SLA while keeping support leads updated.\nAction: I immediately inspected our distributed telemetry traces and observed high lock contention on our PostgreSQL transactions due to synchronous third-party fraud scoring API calls. I executed our emergency feature flag to switch fraud evaluation to asynchronous queue processing, dropping latency from 3.2s back to 80ms within 4 minutes. Simultaneously, I broadcast regular status updates to our incident Slack channel.\nResult: We eliminated all timeout errors within 8 minutes total MTTR. The following week, I led a blameless post-mortem, decoupled all third-party sync dependencies into background workers, and added synthetic latency canary alerts.',
    proTips: [
      'Structure strictly as Situation -> Task -> Action -> Result.',
      'Emphasize composure, data-driven diagnostics, and structural long-term prevention.'
    ]
  },
  {
    id: 'int_res_2',
    domain: 'Career & Behavioral',
    skillTag: 'Resume & Portfolio Impact Pitch',
    courseId: 'course_resume_03',
    type: 'Behavioral (STAR)',
    difficulty: 'Easy',
    question: 'Walk me through your most technically challenging software project. How did you choose the technology stack and what trade-offs did you evaluate?',
    context: 'Opening resume review question used by engineering hiring managers.',
    keyConceptsToCover: [
      'Problem statement and technical constraints (latency, throughput, cost)',
      'Architecture design and rationale for tech stack selection',
      'Explicit trade-offs evaluated (e.g. SQL vs NoSQL, Go vs Node, Synchronous vs Event-Driven)',
      'Measurable results and key lessons learned'
    ],
    idealAnswer: 'I architected a distributed message queue engine with Raft consensus in Go. The goal was to achieve sub-millisecond persistence while tolerating node crashes without data loss. I chose Go for its lightweight goroutine concurrency and predictable memory profile, and gRPC with Protobuf for binary wire efficiency. A key architectural trade-off was deciding between write-ahead log fsync on every single message (maximum safety but lower throughput) versus batched group commit (higher throughput with bounded risk window). I implemented configurable group commits that flush to LevelDB in 5ms batches or 1,000 messages, benchmarking over 500,000 ops/sec while maintaining Raft consensus safety.',
    proTips: [
      'Highlight trade-offs: no engineering decision is 100% upside.',
      'Connect technical choices directly to performance or business metrics.'
    ]
  },
  {
    id: 'int_q1',
    domain: 'Frontend Engineering',
    skillTag: 'React 19 & Browser Performance',
    courseId: 'course_fullstack_01',
    type: 'Technical Concept',
    difficulty: 'Medium',
    question: 'How does React 19 Concurrent Rendering prioritize urgent vs. non-urgent UI updates, and how do useTransition and Server Components interact?',
    context: 'Frequently asked by Google, Meta, and Stripe during Senior UI Engineer screens.',
    keyConceptsToCover: [
      'Fiber Tree priority lanes (Urgent vs Non-Urgent)',
      'Interruptible rendering allowing typing/clicks to remain instant',
      'useTransition marks state updates as low priority transitions',
      'Server Components execute exclusively on the server, sending zero JS bundle to the client'
    ],
    idealAnswer: 'React 19 concurrent mode decouples the work of rendering from the screen paint. Updates are categorized into Priority Lanes. Urgent updates (e.g. typing in a search input, click triggers) are scheduled synchronously. Non-urgent updates wrapped in startTransition yield control back to the browser main thread if a user interacts. Server Components complement this by resolving data fetching at build/server time, emitting a lightweight streaming JSON payload rather than shipping bulky JavaScript code to the client bundle.',
    proTips: [
      'Give a concrete real-world example like a heavy data table filtering while a search box remains silky smooth.',
      'Mention how React 19 eliminates memoization boilerplate via the React Compiler.'
    ]
  },
  {
    id: 'int_q2',
    domain: 'System Design',
    skillTag: 'Scalability & Storage',
    courseId: 'course_system_design_02',
    type: 'System Architecture',
    difficulty: 'Hard',
    question: 'Design a globally distributed URL shortener (like Bitly) serving 500M active links and 10 Billion clicks/month with sub-20ms redirection latency.',
    context: 'Core System Design interview question at Google, Amazon, and Uber.',
    keyConceptsToCover: [
      'Base62 encoding of 64-bit unique IDs vs MD5/SHA256 hashing collision handling',
      'Distributed ID Generator (Snowflake / Range Allocation)',
      'Caching hot URLs in Redis / Memcached with LRU eviction (80/20 rule)',
      'Geo-distributed CDN & Anycast DNS routing for 301/302 redirects',
      'Database choice: Key-Value / Wide-column (DynamoDB or Cassandra) with partition key on hash'
    ],
    idealAnswer: '1. Scale Math: 10B clicks/mo = ~3,800 read queries/sec with peak ~10k RPS. 500M links * 500 bytes = 250 GB storage (fits easily in modern databases).\n2. Hash Strategy: Using Base62 ([a-z, A-Z, 0-9]) with a 7-character string yields 62^7 = 3.5 Trillion unique combinations. A distributed Snowflake service generates unique 64-bit IDs, which are converted to Base62.\n3. Storage: Store mappings in DynamoDB or Cassandra with partition key = short_code.\n4. Caching: Cache top 20% hot links in Redis clusters at edge regions. For read queries, hit Redis first. If cache miss, fetch from DB and write to Redis with a 24h TTL.\n5. Redirect: Return HTTP 302 Found (if we want to track click analytics on every request) or HTTP 301 Permanent (if we want the browser to cache redirection).',
    proTips: [
      'Clarify 301 vs 302 redirect trade-offs (caching vs analytics tracking).',
      'Explain how Range Allocation prevents distributed counter coordination bottlenecks.'
    ]
  },
  {
    id: 'int_q3',
    domain: 'Backend & Data',
    skillTag: 'Database Indexing & Transactions',
    courseId: 'course_system_design_02',
    type: 'Technical Concept',
    difficulty: 'Medium',
    question: 'Explain the internal structure of a B+ Tree index in PostgreSQL or MySQL InnoDB. Why is it preferred over a Hash Index or Binary Search Tree for relational databases?',
    context: 'Standard database internals question asked by Microsoft, Oracle, and Stripe.',
    keyConceptsToCover: [
      'B+ Tree high branching factor (Fanout) reduces disk I/O depth',
      'All data records stored strictly at leaf nodes; internal nodes only store navigation keys',
      'Leaf nodes are doubly linked lists enabling rapid O(log N + K) range scans (e.g. BETWEEN, >, <)',
      'Hash indexes are O(1) for exact lookups but cannot perform range queries or ORDER BY'
    ],
    idealAnswer: 'A B+ Tree is a self-balancing N-ary search tree optimized for disk-based storage. Unlike standard BSTs where each node has only 2 children, B+ trees have a fanout of hundreds or thousands per node (e.g., a 4KB disk page holds many keys). This keeps tree height at 3-4 levels for billions of rows, requiring only 3-4 disk block reads. Crucially, in a B+ Tree, all data payloads reside exclusively in the leaf layer, and the leaves are linked horizontally in a doubly-linked list. This makes range scans (e.g., WHERE age BETWEEN 25 AND 35) extremely fast: you find the start key in O(log N) and simply traverse the leaf pointers for K elements without re-traversing tree branches.',
    proTips: [
      'Highlight disk page block alignment and CPU cache line efficiency.',
      'Point out that Hash indexes do not support prefix matching or range operators.'
    ]
  },
  {
    id: 'int_ai_1',
    domain: 'AI & Data Science',
    skillTag: 'Vector Search & RAG Architecture',
    courseId: 'course_ai_ml_03',
    type: 'System Architecture',
    difficulty: 'Hard',
    question: 'How do you design a production-scale Retrieval-Augmented Generation (RAG) system handling 50M documents with sub-200ms latency and high retrieval precision?',
    context: 'Asked in AI Infrastructure interviews at OpenAI, Anthropic, and Microsoft.',
    keyConceptsToCover: [
      'Document chunking strategies (semantic boundary vs fixed sliding window)',
      'Vector indexing algorithms: HNSW (Hierarchical Navigable Small World) vs IVF-PQ',
      'Hybrid search: Dense vector embedding similarity + BM25 keyword search with Reciprocal Rank Fusion (RRF)',
      'Cross-encoder reranking on top-K candidates before injecting into LLM context window'
    ],
    idealAnswer: '1. Ingestion & Chunking: Split documents semantically preserving markdown headings and metadata with 256-512 token chunks and 10% overlap.\n2. Vector Indexing: Store embeddings in a vector database (e.g. Qdrant or Milvus) using an HNSW index (M=16, efConstruction=200) for sub-10ms approximate nearest neighbor search.\n3. Hybrid Retrieval: Execute dense vector cosine similarity and sparse BM25 keyword matching concurrently, merging the results via Reciprocal Rank Fusion (RRF).\n4. Two-Stage Reranking: Retrieve top-50 candidate chunks, pass through a lightweight Cross-Encoder (e.g. Cohere or BGE-Reranker) to score deep contextual relevance, selecting the top 5 chunks.\n5. Context Assembly: Inject top-5 chunks into the prompt template with citation IDs and strict hallucination guardrails.',
    proTips: [
      'Explain why HNSW trade-offs favor higher RAM for extreme query speed.',
      'Discuss context length limits and the "Lost in the Middle" attention phenomenon.'
    ]
  },
  {
    id: 'int_do_1',
    domain: 'Cloud & DevOps',
    skillTag: 'Kubernetes & Container Resilience',
    courseId: 'course_devops_cloud_04',
    type: 'Technical Concept',
    difficulty: 'Medium',
    question: 'How do Kubernetes Readiness Probes, Liveness Probes, and Startup Probes differ, and what happens when they fail during a rolling update deployment?',
    context: 'Standard DevOps and Site Reliability Engineering interview question.',
    keyConceptsToCover: [
      'Startup Probe: Gives slow initialization apps time to boot before other probes start',
      'Liveness Probe: Detects unrecoverable deadlocks; failure causes kubelet to restart the container',
      'Readiness Probe: Detects temporary incapacity (e.g. warm-up cache, db connection); failure removes pod IP from Service endpoints without killing it',
      'Rolling update deployment pauses if new pods never become Ready, preventing downtime'
    ],
    idealAnswer: 'Startup probes protect slow-booting applications (e.g. loading large ML models or warming up JVM) by disabling liveness/readiness checks until the startup probe passes. Once started, Liveness and Readiness probes operate continuously. A Liveness Probe detects hard failures (like thread deadlocks or infinite loops); if it fails consecutive times (threshold), the kubelet kills and restarts the container. In contrast, a Readiness Probe detects whether the container is ready to accept user network traffic. If a readiness probe fails (e.g., during database reconnection), Kubernetes removes the pod’s IP from the Service endpoints so no new HTTP traffic is routed to it, but it does NOT terminate the pod. During a rolling update, Kubernetes waits for replacement pods to pass readiness probes before terminating old replica pods.',
    proTips: [
      'Warn against putting external dependency checks (like database ping) inside Liveness probes, which causes cascading cluster restarts if the DB hiccups.',
      'Emphasize preStop hooks and graceful termination (SIGTERM -> sleep -> exit).'
    ]
  }
];

export const INITIAL_COMPLETED_INTERVIEWS: CompletedInterview[] = [
  {
    id: 'comp_int_01',
    domain: 'System Design',
    sessionTitle: 'High-Throughput Global Microservices & Cache Invalidation',
    completedAt: '2026-08-25T14:30:00Z',
    scorePercent: 94,
    questionsAttempted: 5,
    feedbackSummary: 'Exceptional mastery of distributed consensus, consistent hashing virtual nodes, and cache stampede mitigations. Clear structured communication using the standard System Design framework.',
    topStrengths: ['Accurate back-of-the-envelope capacity estimations', 'Clear trade-off analysis between CP and AP systems', 'Well-defined API boundaries'],
    growthAreas: ['Can expand further on disaster recovery multi-region failover automation']
  },
  {
    id: 'comp_int_02',
    domain: 'Frontend Engineering',
    sessionTitle: 'React 19 Concurrency & Browser Performance Optimization',
    completedAt: '2026-08-20T10:15:00Z',
    scorePercent: 98,
    questionsAttempted: 4,
    feedbackSummary: 'Deep architectural understanding of the React fiber priority lanes, memoization trade-offs, and Web Worker thread offloading for 60 FPS graphics.',
    topStrengths: ['Laser-precise explanation of useTransition vs synchronous state', 'Clear knowledge of SSR streaming boundaries'],
    growthAreas: ['Keep code syntax examples slightly more concise in live verbal formats']
  },
  {
    id: 'comp_int_03',
    domain: 'Programming Languages',
    sessionTitle: 'Python Memory Management & Generator Optimization Mock',
    completedAt: '2026-08-18T16:00:00Z',
    scorePercent: 92,
    questionsAttempted: 3,
    feedbackSummary: 'Demonstrated solid grasp of Python mutable default arguments, iterator protocols, and GIL concurrency trade-offs.',
    topStrengths: ['Accurate explanation of pass-by-assignment', 'Clear breakdown of O(1) memory generator streaming'],
    growthAreas: ['Mention PEP 703 free-threaded mode updates in Python 3.13']
  }
];

export const INITIAL_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    courseId: 'course_fullstack_01',
    enrolledAt: '2026-08-15T09:00:00Z',
    completedModuleIds: ['mod_fs_1', 'mod_fs_2', 'mod_fs_3', 'mod_fs_4'],
    progressPercent: 100,
    isCompleted: true,
    completedAt: '2026-08-22T16:45:00Z',
    certificateId: 'JS-CERT-FS-883921'
  },
  {
    courseId: 'course_python_01',
    enrolledAt: '2026-08-16T10:00:00Z',
    completedModuleIds: ['mod_py_1', 'mod_py_2', 'mod_py_3', 'mod_py_4'],
    progressPercent: 100,
    isCompleted: true,
    completedAt: '2026-08-24T11:20:00Z',
    certificateId: 'JS-CERT-PY-994102'
  },
  {
    courseId: 'course_system_design_02',
    enrolledAt: '2026-08-24T11:00:00Z',
    completedModuleIds: ['mod_sd_1'],
    progressPercent: 33,
    isCompleted: false
  },
  {
    courseId: 'course_js_02',
    enrolledAt: '2026-08-26T14:15:00Z',
    completedModuleIds: ['mod_js_1', 'mod_js_2'],
    progressPercent: 66,
    isCompleted: false
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app_stripe_01',
    jobId: 'job_stripe_02',
    company: 'Stripe',
    role: 'Staff Full-Stack & Payment Infrastructure Engineer',
    appliedAt: '2026-08-26T15:20:00Z',
    status: 'Logic Assessment Passed',
    customCoverNote: 'Deep background scaling distributed payment webhooks and building fault-tolerant idempotent ledger pipelines with TypeScript and PostgreSQL.',
    tailoredSkills: ['TypeScript', 'Idempotent APIs', 'Distributed Systems', 'PostgreSQL', 'Redis'],
    matchScore: 96
  },
  {
    id: 'app_google_02',
    jobId: 'job_google_01',
    company: 'Google',
    role: 'Senior Distributed Systems & Cloud Engineer',
    appliedAt: '2026-08-27T09:30:00Z',
    status: 'Interview Scheduled',
    customCoverNote: 'Extensive hands-on experience designing consensus mechanisms with Raft/Paxos and low-latency storage microservices.',
    tailoredSkills: ['Go', 'Distributed Consensus', 'gRPC', 'Kubernetes', 'High Throughput Storage'],
    matchScore: 98
  }
];

export const INITIAL_USER_STATS: UserStats = {
  logicPoints: 580,
  logicStreakDays: 7,
  challengesSolvedCount: 6,
  coursesEnrolledCount: 4,
  coursesCompletedCount: 2,
  jobsAppliedCount: 2,
  interviewsPracticedCount: 3
};
