/**
 * EventIQ - Comprehensive Realistic Tech Event Dataset
 * Contains 32 curated technology events across 10 major technical domains
 */

export const CATEGORIES = [
  { id: 'ai-ml', name: 'AI & Machine Learning', icon: 'Brain', count: 6, color: 'from-blue-500 to-indigo-600', description: 'LLMs, Neural Networks, Agentic AI, Computer Vision, MLOps' },
  { id: 'web-dev', name: 'Web Development', icon: 'Code', count: 5, color: 'from-cyan-500 to-blue-600', description: 'Fullstack, React, Next.js, TypeScript, WebAssembly, Performance' },
  { id: 'cloud', name: 'Cloud Computing', icon: 'Cloud', count: 4, color: 'from-sky-500 to-indigo-500', description: 'AWS, Azure, GCP, Serverless, Distributed Architecture, Edge' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: 'ShieldCheck', count: 3, color: 'from-red-500 to-rose-600', description: 'AppSec, Penetration Testing, Zero Trust, Cloud Security, Cryptography' },
  { id: 'devops', name: 'DevOps & SRE', icon: 'Terminal', count: 3, color: 'from-emerald-500 to-teal-600', description: 'Kubernetes, Docker, CI/CD, Terraform, Observability, Platform Eng' },
  { id: 'data-science', name: 'Data Science & Big Data', icon: 'Database', count: 3, color: 'from-amber-500 to-orange-600', description: 'Data Pipelines, Apache Spark, Snowflake, Analytics, Statistics' },
  { id: 'startups', name: 'Startups & Tech Founders', icon: 'Rocket', count: 3, color: 'from-purple-500 to-pink-600', description: 'Fundraising, Venture Capital, MVP Building, Growth Engineering' },
  { id: 'open-source', name: 'Open Source', icon: 'GitFork', count: 2, color: 'from-green-500 to-emerald-600', description: 'Community Projects, Linux Kernel, Open Standards, OS Contributor Summits' },
  { id: 'blockchain', name: 'Blockchain & Web3', icon: 'Layers', count: 2, color: 'from-violet-500 to-indigo-600', description: 'Smart Contracts, Ethereum, Solana, Zero-Knowledge Proofs, DeFi' },
  { id: 'ui-ux', name: 'UI/UX & Product Design', icon: 'Palette', count: 2, color: 'from-fuchsia-500 to-pink-500', description: 'Design Systems, Human-Computer Interaction, Figma, Motion UI' }
];

export const POPULAR_SKILLS = [
  'React', 'Python', 'Java', 'Node.js', 'AWS', 'Docker',
  'Machine Learning', 'TypeScript', 'Kubernetes', 'Go',
  'Rust', 'GraphQL', 'Next.js', 'PostgreSQL', 'Tailwind CSS',
  'TensorFlow', 'PyTorch', 'Solidity', 'Figma', 'Linux'
];

export const EVENT_TYPES = ['Hackathon', 'Conference', 'Workshop', 'Meetup', 'Webinar'];

export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const MODES = ['Online', 'Offline', 'Both'];

export const EVENTS = [
  {
    id: 'event-01',
    title: 'Global AI Innovation Hackathon 2026',
    organizer: 'OpenAI Developer Network & TechPulse',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Machine Learning', 'PyTorch', 'OpenAI API', 'Docker'],
    eventType: 'Hackathon',
    date: '2026-10-14',
    endDate: '2026-10-16',
    time: '09:00 AM - 08:00 PM PST',
    location: 'San Francisco, CA',
    venue: 'Moscone Center West & Virtual Stream',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-01',
    popularity: 98,
    price: 'Free',
    attendeesCount: 2450,
    featured: true,
    bannerGradient: 'from-blue-600/30 via-indigo-600/20 to-transparent',
    description: 'The premier global hackathon for autonomous AI agents, multimodal LLMs, and intelligent developer tools. Teams of up to 4 will build working prototypes over 48 hours with direct mentorship from leading AI researchers.',
    schedule: [
      { time: 'Day 1 - 09:00 AM', activity: 'Keynote: The Frontier of Autonomous Agents' },
      { time: 'Day 1 - 11:30 AM', activity: 'Hacking Kickoff & Mentor Matching' },
      { time: 'Day 2 - 02:00 PM', activity: 'Office Hours with PyTorch & GenAI Core Engineers' },
      { time: 'Day 3 - 04:00 PM', activity: 'Final Demos & $100k Prize Ceremony' }
    ],
    speakers: [
      { name: 'Dr. Elena Rostova', role: 'Head of Applied AI', company: 'Neuralis Labs' },
      { name: 'Marcus Chen', role: 'Staff ML Engineer', company: 'OpenAI Partner Network' }
    ]
  },
  {
    id: 'event-02',
    title: 'Next.js & React Fullstack Summit',
    organizer: 'Vercel Community & Frontend Guild',
    category: 'Web Development',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    eventType: 'Conference',
    date: '2026-10-22',
    endDate: '2026-10-23',
    time: '10:00 AM - 06:00 PM EST',
    location: 'New York, NY',
    venue: 'Javits Center & Global Live Stream',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-02',
    popularity: 95,
    price: '$149 (Free Virtual)',
    attendeesCount: 3800,
    featured: true,
    bannerGradient: 'from-cyan-600/30 via-blue-600/20 to-transparent',
    description: 'Deep dive into modern web architecture, Server Components, streaming SSR, Edge runtime optimization, and high-performance UI engineering with React 19 and Next.js.',
    schedule: [
      { time: '10:00 AM', activity: 'Opening Keynote: The Future of Web Performance' },
      { time: '11:45 AM', activity: 'Mastering Server Actions & Partial Prerendering' },
      { time: '02:00 PM', activity: 'Design Systems with Tailwind CSS & Motion' },
      { time: '04:30 PM', activity: 'Fireside Chat: Scaling Frontend to 50M Daily Users' }
    ],
    speakers: [
      { name: 'Sarah Lindqvist', role: 'Principal Architect', company: 'Vercel' },
      { name: 'Kavita Patel', role: 'VP Engineering', company: 'FinTech Cloud' }
    ]
  },
  {
    id: 'event-03',
    title: 'Cloud Native & Kubernetes World 2026',
    organizer: 'Cloud Native Computing Foundation (CNCF)',
    category: 'Cloud Computing',
    technologies: ['Kubernetes', 'AWS', 'Docker', 'Go', 'Linux'],
    eventType: 'Conference',
    date: '2026-11-05',
    endDate: '2026-11-07',
    time: '09:00 AM - 05:30 PM GMT',
    location: 'London, UK',
    venue: 'ExCeL London',
    mode: 'Offline',
    experienceLevel: 'Advanced',
    registrationUrl: 'https://eventiq.demo/register/event-03',
    popularity: 92,
    price: '$299',
    attendeesCount: 4200,
    featured: true,
    bannerGradient: 'from-sky-600/30 via-indigo-600/20 to-transparent',
    description: 'The definitive gathering for engineers building mission-critical distributed systems. Explore multi-cloud mesh networks, eBPF observability, GitOps workflows, and serverless container orchestration.',
    schedule: [
      { time: 'Day 1 - 09:30 AM', activity: 'Keynote: Kubernetes in 2026 and Beyond' },
      { time: 'Day 1 - 01:30 PM', activity: 'Deep Dive: Zero-Downtime Multi-Region Failover' },
      { time: 'Day 2 - 10:00 AM', activity: 'eBPF Kernel Tracing Hands-On' }
    ],
    speakers: [
      { name: 'Alexandre Dubois', role: 'CNCF Ambassador', company: 'CloudWorks' },
      { name: 'Liam O’Connor', role: 'Staff SRE', company: 'Global Stream' }
    ]
  },
  {
    id: 'event-04',
    title: 'Hands-on Agentic AI & RAG Masterclass',
    organizer: 'DeepLearning.AI Community Chapter',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Machine Learning', 'TensorFlow', 'Docker'],
    eventType: 'Workshop',
    date: '2026-10-18',
    endDate: '2026-10-18',
    time: '01:00 PM - 05:00 PM PST',
    location: 'Virtual / Online',
    venue: 'Interactive Zoom Lab & Colab Workspace',
    mode: 'Online',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-04',
    popularity: 96,
    price: 'Free',
    attendeesCount: 5200,
    featured: false,
    bannerGradient: 'from-indigo-600/30 via-purple-600/20 to-transparent',
    description: 'A 4-hour live code-along building production-grade Retrieval-Augmented Generation (RAG) pipelines, evaluation harnesses, and multi-agent workflows using LangGraph and vector search.',
    schedule: [
      { time: '01:00 PM', activity: 'Vector Embeddings & Semantic Search Demystified' },
      { time: '02:15 PM', activity: 'Live Coding: Hybrid Retrieval with Rerankers' },
      { time: '03:45 PM', activity: 'Building Self-Correcting LLM Agents' }
    ],
    speakers: [
      { name: 'Dr. Anita Joshi', role: 'AI Curriculum Lead', company: 'DeepLearning.AI' }
    ]
  },
  {
    id: 'event-05',
    title: 'DevOps & GitOps Pipeline Accelerator',
    organizer: 'DevOps Institute Seattle',
    category: 'DevOps & SRE',
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Go'],
    eventType: 'Workshop',
    date: '2026-10-28',
    endDate: '2026-10-28',
    time: '10:00 AM - 04:00 PM PST',
    location: 'Seattle, WA',
    venue: 'AWS Skills Center Seattle',
    mode: 'Offline',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-05',
    popularity: 88,
    price: 'Free with RSVP',
    attendeesCount: 320,
    featured: false,
    bannerGradient: 'from-emerald-600/30 via-teal-600/20 to-transparent',
    description: 'Accelerate your deployment velocity. Learn automated preview environments, secret management with HashiCorp Vault, and canary rollout automation with ArgoCD.',
    schedule: [
      { time: '10:00 AM', activity: 'Architecture of Modern CI/CD Engines' },
      { time: '01:00 PM', activity: 'Hands-on ArgoCD Canary Deployments' }
    ],
    speakers: [
      { name: 'Devon Miller', role: 'Lead DevOps Consultant', company: 'InfraScale' }
    ]
  },
  {
    id: 'event-06',
    title: 'Zero Trust Cloud Security Summit',
    organizer: 'CyberSec Alliance',
    category: 'Cybersecurity',
    technologies: ['AWS', 'Linux', 'Python', 'Docker'],
    eventType: 'Conference',
    date: '2026-11-12',
    endDate: '2026-11-13',
    time: '09:00 AM - 05:00 PM CST',
    location: 'Austin, TX',
    venue: 'Austin Convention Center',
    mode: 'Both',
    experienceLevel: 'Advanced',
    registrationUrl: 'https://eventiq.demo/register/event-06',
    popularity: 91,
    price: '$199',
    attendeesCount: 1600,
    featured: false,
    bannerGradient: 'from-rose-600/30 via-red-600/20 to-transparent',
    description: 'Explore the latest offensive and defensive cybersecurity methodologies: identity-based microsegmentation, AI-driven threat detection, and software supply chain fortification.',
    schedule: [
      { time: '09:00 AM', activity: 'Keynote: Red Teaming LLM Integrations' },
      { time: '02:00 PM', activity: 'Securing Cloud Infrastructure as Code' }
    ],
    speakers: [
      { name: 'Rachel Vance', role: 'CISO', company: 'Apex Defense' }
    ]
  },
  {
    id: 'event-07',
    title: 'Fullstack TypeScript & GraphQL Meetup',
    organizer: 'Bengaluru Tech Community',
    category: 'Web Development',
    technologies: ['TypeScript', 'GraphQL', 'React', 'Node.js', 'PostgreSQL'],
    eventType: 'Meetup',
    date: '2026-10-17',
    endDate: '2026-10-17',
    time: '05:30 PM - 08:30 PM IST',
    location: 'Bengaluru, India',
    venue: 'WeWork Galaxy, Residency Road',
    mode: 'Offline',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-07',
    popularity: 90,
    price: 'Free',
    attendeesCount: 280,
    featured: false,
    bannerGradient: 'from-cyan-600/30 via-indigo-600/20 to-transparent',
    description: 'Monthly gathering of passionate web engineers. Two technical lightning talks followed by hands-on pairing on end-to-end type safety from database schemas to client state.',
    schedule: [
      { time: '05:30 PM', activity: 'Networking & Chai' },
      { time: '06:15 PM', activity: 'Talk: Type-Safe RPC vs GraphQL in 2026' },
      { time: '07:15 PM', activity: 'Open Source Showcase' }
    ],
    speakers: [
      { name: 'Arjun Rao', role: 'Staff Frontend Engineer', company: 'Swiggy' }
    ]
  },
  {
    id: 'event-08',
    title: 'PyData & Machine Learning Ecosystem 2026',
    organizer: 'NumFOCUS & PyData Berlin',
    category: 'Data Science & Big Data',
    technologies: ['Python', 'Machine Learning', 'PyTorch', 'TensorFlow'],
    eventType: 'Conference',
    date: '2026-11-20',
    endDate: '2026-11-22',
    time: '09:30 AM - 06:00 PM CET',
    location: 'Berlin, Germany',
    venue: 'Berlin Congress Center (bcc)',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-08',
    popularity: 94,
    price: '€180',
    attendeesCount: 1900,
    featured: true,
    bannerGradient: 'from-amber-600/30 via-orange-600/20 to-transparent',
    description: 'Join international data scientists, machine learning engineers, and open-source contributors discussing high-performance Python, Polars vs Pandas, and scalable inference engines.',
    schedule: [
      { time: '10:00 AM', activity: 'Keynote: Modern Data Frames and Accelerated Compute' },
      { time: '02:30 PM', activity: 'Deploying Foundation Models on Kubernetes' }
    ],
    speakers: [
      { name: 'Dr. Henrik Schmidt', role: 'Chief Scientist', company: 'DataScale GmbH' }
    ]
  },
  {
    id: 'event-09',
    title: 'Web3 & Decentralized Systems Hackathon',
    organizer: 'Ethereum Foundation & Devfolio',
    category: 'Blockchain & Web3',
    technologies: ['Solidity', 'Rust', 'TypeScript', 'React'],
    eventType: 'Hackathon',
    date: '2026-11-13',
    endDate: '2026-11-15',
    time: '24 Hours Non-Stop',
    location: 'Virtual / Online',
    venue: 'Discord & Devfolio Platform',
    mode: 'Online',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-09',
    popularity: 87,
    price: 'Free',
    attendeesCount: 1400,
    featured: false,
    bannerGradient: 'from-violet-600/30 via-purple-600/20 to-transparent',
    description: 'Build decentralized applications utilizing Zero-Knowledge proofs, account abstraction, and decentralized storage. $75,000 in sponsor bounties across 6 tracks.',
    schedule: [
      { time: 'Friday 06:00 PM', activity: 'Opening Ceremony & Track Announcement' },
      { time: 'Saturday 02:00 PM', activity: 'ZK-SNARKs Crash Course' },
      { time: 'Sunday 04:00 PM', activity: 'Project Submissions & Judging' }
    ],
    speakers: [
      { name: 'Vitalik Sharma', role: 'Protocol Researcher', company: 'Consensys' }
    ]
  },
  {
    id: 'event-10',
    title: 'Modern UI/UX Design Systems Workshop',
    organizer: 'Design Systems Community',
    category: 'UI/UX & Product Design',
    technologies: ['Figma', 'React', 'Tailwind CSS', 'TypeScript'],
    eventType: 'Workshop',
    date: '2026-10-25',
    endDate: '2026-10-25',
    time: '02:00 PM - 06:00 PM GMT',
    location: 'London, UK',
    venue: 'Barbican Centre & Online Stream',
    mode: 'Both',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-10',
    popularity: 89,
    price: '£45',
    attendeesCount: 650,
    featured: false,
    bannerGradient: 'from-fuchsia-600/30 via-pink-600/20 to-transparent',
    description: 'Bridge the gap between design tokens in Figma and production-ready component libraries in React and Tailwind CSS. Learn accessible color contrast, micro-interactions, and documentation workflows.',
    schedule: [
      { time: '02:00 PM', activity: 'Design Tokens: From Variables to CSS Properties' },
      { time: '04:00 PM', activity: 'Interactive Prototyping and Motion Guidelines' }
    ],
    speakers: [
      { name: 'Claire Morgan', role: 'Staff Product Designer', company: 'Linear Systems' }
    ]
  },
  {
    id: 'event-11',
    title: 'AI Founder & Venture Summit 2026',
    organizer: 'Techstars & Y Combinator Alumni',
    category: 'Startups & Tech Founders',
    technologies: ['Python', 'Machine Learning', 'Next.js'],
    eventType: 'Conference',
    date: '2026-11-18',
    endDate: '2026-11-19',
    time: '08:30 AM - 07:00 PM PST',
    location: 'San Francisco, CA',
    venue: 'Palace of Fine Arts',
    mode: 'Offline',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-11',
    popularity: 97,
    price: '$250',
    attendeesCount: 1800,
    featured: true,
    bannerGradient: 'from-purple-600/30 via-indigo-600/20 to-transparent',
    description: 'Connecting top technical founders building next-generation AI infrastructure with seed and Series A investors. Features 40 live pitch sessions and technical keynote panels.',
    schedule: [
      { time: '09:00 AM', activity: 'Keynote: Finding Moats in Foundation Model Era' },
      { time: '01:30 PM', activity: 'Founder Pitches: Developer Infrastructure' }
    ],
    speakers: [
      { name: 'Samantha Vance', role: 'General Partner', company: 'Founders Horizon' }
    ]
  },
  {
    id: 'event-12',
    title: 'Open Source Software Maintainers Summit',
    organizer: 'GitHub & Open Source Collective',
    category: 'Open Source',
    technologies: ['Linux', 'Rust', 'Go', 'Python', 'TypeScript'],
    eventType: 'Conference',
    date: '2026-10-30',
    endDate: '2026-10-31',
    time: '10:00 AM - 05:00 PM EST',
    location: 'Toronto, Canada',
    venue: 'Metro Toronto Convention Centre',
    mode: 'Both',
    experienceLevel: 'All Levels',
    registrationUrl: 'https://eventiq.demo/register/event-12',
    popularity: 90,
    price: 'Free',
    attendeesCount: 1200,
    featured: false,
    bannerGradient: 'from-emerald-600/30 via-cyan-600/20 to-transparent',
    description: 'Celebrating open-source sustainers. Sessions on governance models, community onboarding, security vulnerability disclosure, and creator sponsorship dynamics.',
    schedule: [
      { time: '10:00 AM', activity: 'Keynote: The Economics of Open Source' },
      { time: '02:00 PM', activity: 'Workshop: Automated Code Signing with Sigstore' }
    ],
    speakers: [
      { name: 'Kasper Thorne', role: 'Open Source Director', company: 'Mozilla Tech' }
    ]
  },
  {
    id: 'event-13',
    title: 'Rust for High-Performance Backend Systems',
    organizer: 'Rust Community Worldwide',
    category: 'Web Development',
    technologies: ['Rust', 'Linux', 'Docker', 'PostgreSQL'],
    eventType: 'Webinar',
    date: '2026-10-15',
    endDate: '2026-10-15',
    time: '04:00 PM - 06:00 PM CET',
    location: 'Virtual / Online',
    venue: 'YouTube Live & Discord Q&A',
    mode: 'Online',
    experienceLevel: 'Advanced',
    registrationUrl: 'https://eventiq.demo/register/event-13',
    popularity: 89,
    price: 'Free',
    attendeesCount: 3100,
    featured: false,
    bannerGradient: 'from-orange-600/30 via-amber-600/20 to-transparent',
    description: 'Learn memory-safe concurrent programming, asynchronous runtime internals with Tokio, and building sub-millisecond REST and gRPC microservices in Rust.',
    schedule: [
      { time: '04:00 PM', activity: 'Borrow Checker & Zero-Cost Abstractions in Real Life' },
      { time: '05:00 PM', activity: 'Benchmarking Actix-Web vs Go Gin under 100k Req/Sec' }
    ],
    speakers: [
      { name: 'Jonas Lind', role: 'Principal Systems Architect', company: 'FastRoute Inc' }
    ]
  },
  {
    id: 'event-14',
    title: 'AWS Serverless Architecture Deep Dive',
    organizer: 'AWS User Group North America',
    category: 'Cloud Computing',
    technologies: ['AWS', 'Node.js', 'Python', 'TypeScript'],
    eventType: 'Workshop',
    date: '2026-11-03',
    endDate: '2026-11-03',
    time: '11:00 AM - 03:00 PM EST',
    location: 'New York, NY',
    venue: 'AWS Loft Manhattan & Live Broadcast',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-14',
    popularity: 91,
    price: 'Free with RSVP',
    attendeesCount: 890,
    featured: false,
    bannerGradient: 'from-amber-600/30 via-yellow-600/20 to-transparent',
    description: 'Step-by-step masterclass constructing event-driven serverless backends using AWS Lambda, EventBridge, DynamoDB single-table design, and CDK infrastructure as code.',
    schedule: [
      { time: '11:00 AM', activity: 'Event-Driven Decoupling with EventBridge' },
      { time: '01:30 PM', activity: 'DynamoDB Modeling for High-Scale Applications' }
    ],
    speakers: [
      { name: 'Chloe Davis', role: 'AWS Serverless Hero', company: 'CloudArch' }
    ]
  },
  {
    id: 'event-15',
    title: 'Practical Ethical Hacking & Web App Penetration',
    organizer: 'OWASP Global Chapter',
    category: 'Cybersecurity',
    technologies: ['Linux', 'Python', 'Docker'],
    eventType: 'Workshop',
    date: '2026-11-08',
    endDate: '2026-11-08',
    time: '10:00 AM - 04:00 PM GMT',
    location: 'London, UK',
    venue: 'King’s College London & Virtual Lab',
    mode: 'Both',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-15',
    popularity: 93,
    price: '£30 (Students Free)',
    attendeesCount: 950,
    featured: false,
    bannerGradient: 'from-red-600/30 via-rose-600/20 to-transparent',
    description: 'Understand vulnerability assessment through the lens of OWASP Top 10 2026. Hands-on Capture The Flag (CTF) environments targeting API flaws, SSRF, and authentication bypasses.',
    schedule: [
      { time: '10:00 AM', activity: 'OWASP Top 10 Attack Vectors Breakdown' },
      { time: '01:30 PM', activity: 'Live CTF Challenge & Guided Walkthrough' }
    ],
    speakers: [
      { name: 'Tariq Al-Mansoor', role: 'Security Researcher', company: 'SecGuard' }
    ]
  },
  {
    id: 'event-16',
    title: 'Big Data Streaming with Apache Kafka & Flink',
    organizer: 'Confluent & Data Engineers Guild',
    category: 'Data Science & Big Data',
    technologies: ['Java', 'Python', 'Docker', 'Linux'],
    eventType: 'Webinar',
    date: '2026-10-21',
    endDate: '2026-10-21',
    time: '01:00 PM - 03:00 PM PST',
    location: 'Virtual / Online',
    venue: 'Confluent Developer Portal',
    mode: 'Online',
    experienceLevel: 'Advanced',
    registrationUrl: 'https://eventiq.demo/register/event-16',
    popularity: 86,
    price: 'Free',
    attendeesCount: 1650,
    featured: false,
    bannerGradient: 'from-amber-600/30 via-orange-600/20 to-transparent',
    description: 'Real-time stateful stream processing at scale. Architectural patterns for exactly-once processing semantics, change data capture (CDC), and streaming SQL analytics.',
    schedule: [
      { time: '01:00 PM', activity: 'Kafka Topic Architecture & Partition Strategies' },
      { time: '02:00 PM', activity: 'Apache Flink Stateful Stream Operations' }
    ],
    speakers: [
      { name: 'Siddharth Nair', role: 'Principal Architect', company: 'StreamIQ' }
    ]
  },
  {
    id: 'event-17',
    title: 'Beginner Friendly: Intro to Web Dev with React 19',
    organizer: 'CodeFirst Community',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    eventType: 'Workshop',
    date: '2026-10-19',
    endDate: '2026-10-19',
    time: '06:00 PM - 08:30 PM IST',
    location: 'Virtual / Online',
    venue: 'Interactive CodeSandbox Live',
    mode: 'Online',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-17',
    popularity: 94,
    price: 'Free',
    attendeesCount: 4100,
    featured: false,
    bannerGradient: 'from-cyan-600/30 via-teal-600/20 to-transparent',
    description: 'Designed specifically for newcomers! Build your first interactive web project using modern React 19 hooks, component composition, and Tailwind styling without complex setup.',
    schedule: [
      { time: '06:00 PM', activity: 'HTML/CSS to React Components Transition' },
      { time: '07:00 PM', activity: 'State, Props, and Handling User Input' },
      { time: '08:00 PM', activity: 'Deploying Your App to the Web' }
    ],
    speakers: [
      { name: 'Pooja Sundaram', role: 'Frontend Educator', company: 'TechLearn' }
    ]
  },
  {
    id: 'event-18',
    title: 'Tokyo AI & Robotics Developer Meetup',
    organizer: 'Tokyo Robotics & AI Enthusiasts',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Machine Learning', 'Go', 'Linux'],
    eventType: 'Meetup',
    date: '2026-11-25',
    endDate: '2026-11-25',
    time: '06:30 PM - 09:00 PM JST',
    location: 'Tokyo, Japan',
    venue: 'Roppongi Hills Mori Tower',
    mode: 'Offline',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-18',
    popularity: 88,
    price: 'Free with RSVP',
    attendeesCount: 220,
    featured: false,
    bannerGradient: 'from-blue-600/30 via-indigo-600/20 to-transparent',
    description: 'Showcasing embodied AI, edge vision models on NVIDIA Jetson, and ROS 2 robotics integration. Networking with Japanese robotics startups and academic researchers.',
    schedule: [
      { time: '06:30 PM', activity: 'Welcome & Lightning Talks' },
      { time: '07:15 PM', activity: 'Demo: Vision-Language Models in Edge Robotics' },
      { time: '08:15 PM', activity: 'Networking & Refreshments' }
    ],
    speakers: [
      { name: 'Kenji Takahashi', role: 'Robotics Engineer', company: 'CyberKinetic Japan' }
    ]
  },
  {
    id: 'event-19',
    title: 'Microservices & Distributed Systems with Go',
    organizer: 'Golang Global Meetup Group',
    category: 'Web Development',
    technologies: ['Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Linux'],
    eventType: 'Webinar',
    date: '2026-11-04',
    endDate: '2026-11-04',
    time: '12:00 PM - 02:00 PM EST',
    location: 'Virtual / Online',
    venue: 'Zoom & Live Code Stream',
    mode: 'Online',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-19',
    popularity: 90,
    price: 'Free',
    attendeesCount: 2300,
    featured: false,
    bannerGradient: 'from-sky-600/30 via-cyan-600/20 to-transparent',
    description: 'Learn how modern tech enterprises structure scalable Go microservices. Topics include goroutine pools, context cancellation, gRPC streaming, and SQL connection tuning.',
    schedule: [
      { time: '12:00 PM', activity: 'Concurrency Idioms and Memory Pitfalls in Go' },
      { time: '01:00 PM', activity: 'Building Production gRPC Services with OpenTelemetry' }
    ],
    speakers: [
      { name: 'Mateo Rossi', role: 'Staff Backend Architect', company: 'FinPlatform' }
    ]
  },
  {
    id: 'event-20',
    title: 'Enterprise Java & Spring Boot Cloud Native',
    organizer: 'Java Developer Association',
    category: 'Web Development',
    technologies: ['Java', 'Docker', 'Kubernetes', 'PostgreSQL', 'AWS'],
    eventType: 'Conference',
    date: '2026-11-28',
    endDate: '2026-11-29',
    time: '09:00 AM - 05:00 PM CET',
    location: 'Berlin, Germany',
    venue: 'Estrel Congress Center Berlin',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-20',
    popularity: 87,
    price: '€120',
    attendeesCount: 1400,
    featured: false,
    bannerGradient: 'from-red-600/30 via-amber-600/20 to-transparent',
    description: 'Modern Java 25 features, GraalVM native images, Virtual Threads (Project Loom), and Spring Boot 3.4 microservices architecture for mission-critical banking and logistics.',
    schedule: [
      { time: '09:30 AM', activity: 'Virtual Threads in High-Throughput I/O' },
      { time: '02:00 PM', activity: 'GraalVM Native Image Deployment in Kubernetes' }
    ],
    speakers: [
      { name: 'Anja Becker', role: 'Java Champion', company: 'Enterprise Systems' }
    ]
  },
  {
    id: 'event-21',
    title: 'Zero-Knowledge Proofs & Cryptography Hack',
    organizer: 'ZK Security Guild',
    category: 'Blockchain & Web3',
    technologies: ['Rust', 'Solidity', 'Python'],
    eventType: 'Hackathon',
    date: '2026-12-04',
    endDate: '2026-12-06',
    time: '48 Hours Weekend Event',
    location: 'London, UK',
    venue: 'Imperial College London & Global Online',
    mode: 'Both',
    experienceLevel: 'Advanced',
    registrationUrl: 'https://eventiq.demo/register/event-21',
    popularity: 91,
    price: 'Free',
    attendeesCount: 820,
    featured: false,
    bannerGradient: 'from-violet-600/30 via-indigo-600/20 to-transparent',
    description: 'Tackle cutting-edge zero-knowledge cryptography challenges: zk-SNARKs circuit optimization, verifiable off-chain compute, and privacy-preserving identity verification.',
    schedule: [
      { time: 'Friday 05:00 PM', activity: 'Welcome & Circuit Design Essentials' },
      { time: 'Sunday 03:00 PM', activity: 'Live Pitching to Cryptography Judges' }
    ],
    speakers: [
      { name: 'Dr. Gregory Thorne', role: 'Cryptographer', company: 'Verifiable Systems' }
    ]
  },
  {
    id: 'event-22',
    title: 'Platform Engineering & Internal Developer Portals',
    organizer: 'Platform Engineering Alliance',
    category: 'DevOps & SRE',
    technologies: ['Kubernetes', 'Docker', 'Go', 'AWS', 'TypeScript'],
    eventType: 'Conference',
    date: '2026-12-08',
    endDate: '2026-12-09',
    time: '09:00 AM - 05:00 PM PST',
    location: 'Seattle, WA',
    venue: 'Bell Harbor International Conference Center',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-22',
    popularity: 89,
    price: '$180',
    attendeesCount: 1100,
    featured: false,
    bannerGradient: 'from-teal-600/30 via-emerald-600/20 to-transparent',
    description: 'Transforming DevOps from ticket-based operations into self-service internal developer platforms (IDP) utilizing Spotify Backstage, Crossplane, and Kubernetes operator patterns.',
    schedule: [
      { time: '09:30 AM', activity: 'Building Self-Service Dev Portals with Backstage' },
      { time: '01:30 PM', activity: 'Crossplane for Cloud Infrastructure as Kubernetes CRDs' }
    ],
    speakers: [
      { name: 'Samantha Wu', role: 'Head of Developer Experience', company: 'FinScale' }
    ]
  },
  {
    id: 'event-23',
    title: 'Design-to-Code: AI-Assisted Frontends in Figma & React',
    organizer: 'Product Design Circle SF',
    category: 'UI/UX & Product Design',
    technologies: ['Figma', 'React', 'Tailwind CSS', 'TypeScript'],
    eventType: 'Meetup',
    date: '2026-11-06',
    endDate: '2026-11-06',
    time: '06:00 PM - 08:30 PM PST',
    location: 'San Francisco, CA',
    venue: 'Figma Community Space, Market St',
    mode: 'Offline',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-23',
    popularity: 92,
    price: 'Free',
    attendeesCount: 310,
    featured: false,
    bannerGradient: 'from-fuchsia-600/30 via-purple-600/20 to-transparent',
    description: 'An interactive evening exploring generative UI tools, design-token sync scripts, and how modern product designers and frontend engineers collaborate seamlessly.',
    schedule: [
      { time: '06:00 PM', activity: 'Figma to React Pipeline Live Demo' },
      { time: '07:15 PM', activity: 'Q&A: The Evolving Role of UI Engineers' }
    ],
    speakers: [
      { name: 'Leo Martinez', role: 'Design Systems Lead', company: 'DesignTech' }
    ]
  },
  {
    id: 'event-24',
    title: 'Cyber Threat Intelligence & Incident Response Hands-on',
    organizer: 'SANS Community Austin',
    category: 'Cybersecurity',
    technologies: ['Python', 'Linux', 'Docker'],
    eventType: 'Workshop',
    date: '2026-11-24',
    endDate: '2026-11-24',
    time: '10:00 AM - 04:30 PM CST',
    location: 'Austin, TX',
    venue: 'Omni Austin Hotel Downtown & Online',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-24',
    popularity: 90,
    price: '$75',
    attendeesCount: 480,
    featured: false,
    bannerGradient: 'from-rose-600/30 via-red-600/20 to-transparent',
    description: 'Simulate a live enterprise ransomware outbreak. Practice memory forensics, PCAP traffic analysis, MITRE ATT&CK framework mapping, and containment scripting with Python.',
    schedule: [
      { time: '10:00 AM', activity: 'Anatomy of Advanced Persistent Threat (APT) Attacks' },
      { time: '01:00 PM', activity: 'Hands-on Blue Team Triage Simulation' }
    ],
    speakers: [
      { name: 'Diana Sterling', role: 'Principal IR Consultant', company: 'Mandiant' }
    ]
  },
  {
    id: 'event-25',
    title: 'Modern Data Warehousing with Snowflake & dbt',
    organizer: 'Data Engineering Global Community',
    category: 'Data Science & Big Data',
    technologies: ['Python', 'PostgreSQL', 'AWS', 'Docker'],
    eventType: 'Webinar',
    date: '2026-10-27',
    endDate: '2026-10-27',
    time: '11:00 AM - 01:00 PM EST',
    location: 'Virtual / Online',
    venue: 'Online Interactive Stream',
    mode: 'Online',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-25',
    popularity: 88,
    price: 'Free',
    attendeesCount: 2900,
    featured: false,
    bannerGradient: 'from-amber-600/30 via-yellow-600/20 to-transparent',
    description: 'Build automated, testable data models using dbt (data build tool) on Snowflake and PostgreSQL. Learn semantic layers, CI testing for data pipelines, and cost optimization.',
    schedule: [
      { time: '11:00 AM', activity: 'Modern Data Stack Fundamentals' },
      { time: '12:00 PM', activity: 'Writing Robust dbt Tests and Incremental Models' }
    ],
    speakers: [
      { name: 'Rahul Sen', role: 'Head of Data Platform', company: 'MetricWorks' }
    ]
  },
  {
    id: 'event-26',
    title: 'Deep Learning with PyTorch 2.5: From Tensors to LLMs',
    organizer: 'Bengaluru AI Research Society',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Machine Learning', 'PyTorch', 'Linux'],
    eventType: 'Workshop',
    date: '2026-11-10',
    endDate: '2026-11-10',
    time: '10:00 AM - 05:00 PM IST',
    location: 'Bengaluru, India',
    venue: 'IISc Bangalore Convention Hall & Online',
    mode: 'Both',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-26',
    popularity: 95,
    price: '₹500 (Free for Students)',
    attendeesCount: 1100,
    featured: false,
    bannerGradient: 'from-blue-600/30 via-indigo-600/20 to-transparent',
    description: 'Intensive deep learning lab exploring PyTorch compile acceleration, distributed data parallel (DDP) training, FlashAttention-3 implementation, and fine-tuning open-weights models.',
    schedule: [
      { time: '10:00 AM', activity: 'PyTorch 2.x Compiler Graph Architecture' },
      { time: '02:00 PM', activity: 'Fine-tuning Llama-3 with LoRA and QLoRA' }
    ],
    speakers: [
      { name: 'Dr. Vikram Chandra', role: 'AI Research Fellow', company: 'IISc' }
    ]
  },
  {
    id: 'event-27',
    title: 'Startup MVP Hackathon: Build in 36 Hours',
    organizer: 'Founders Den & Antler',
    category: 'Startups & Tech Founders',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    eventType: 'Hackathon',
    date: '2026-11-21',
    endDate: '2026-11-22',
    time: '36 Hours Non-Stop',
    location: 'New York, NY',
    venue: 'Civic Hall Union Square',
    mode: 'Offline',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-27',
    popularity: 93,
    price: 'Free',
    attendeesCount: 650,
    featured: false,
    bannerGradient: 'from-purple-600/30 via-pink-600/20 to-transparent',
    description: 'Turn your tech idea into a revenue-capable MVP over one weekend. Mentors from successful SaaS startups help teams scope, build, deploy, and acquire their first test users.',
    schedule: [
      { time: 'Saturday 09:00 AM', activity: 'Ideation Pitch & Team Formation' },
      { time: 'Sunday 04:00 PM', activity: 'Demo Day & Investor Judging Panel' }
    ],
    speakers: [
      { name: 'Alina Popescu', role: 'Partner', company: 'Antler Global' }
    ]
  },
  {
    id: 'event-28',
    title: 'Open Source AI Models: Architecture & Fine-tuning',
    organizer: 'Hugging Face Community & Toronto AI',
    category: 'Open Source',
    technologies: ['Python', 'Machine Learning', 'PyTorch', 'Linux'],
    eventType: 'Meetup',
    date: '2026-11-02',
    endDate: '2026-11-02',
    time: '06:00 PM - 08:30 PM EST',
    location: 'Toronto, Canada',
    venue: 'Vector Institute for AI',
    mode: 'Offline',
    experienceLevel: 'Advanced',
    registrationUrl: 'https://eventiq.demo/register/event-28',
    popularity: 91,
    price: 'Free',
    attendeesCount: 380,
    featured: false,
    bannerGradient: 'from-green-600/30 via-emerald-600/20 to-transparent',
    description: 'Deep technical meetup on open-weight LLMs, quantization techniques (AWQ, GGUF), synthetic data generation, and contributing to open-source Hugging Face libraries.',
    schedule: [
      { time: '06:00 PM', activity: 'Welcome & Community Hugging Face Demos' },
      { time: '07:00 PM', activity: 'Direct Preference Optimization (DPO) in Practice' }
    ],
    speakers: [
      { name: 'Julien Perrot', role: 'Machine Learning Engineer', company: 'Hugging Face' }
    ]
  },
  {
    id: 'event-29',
    title: 'Multi-Cloud Architecture with Terraform & AWS',
    organizer: 'HashiCorp User Group London',
    category: 'Cloud Computing',
    technologies: ['AWS', 'Docker', 'Go', 'Linux'],
    eventType: 'Meetup',
    date: '2026-10-29',
    endDate: '2026-10-29',
    time: '06:00 PM - 08:30 PM GMT',
    location: 'London, UK',
    venue: 'Google Campus London',
    mode: 'Offline',
    experienceLevel: 'Intermediate',
    registrationUrl: 'https://eventiq.demo/register/event-29',
    popularity: 87,
    price: 'Free',
    attendeesCount: 260,
    featured: false,
    bannerGradient: 'from-sky-600/30 via-indigo-600/20 to-transparent',
    description: 'Master Infrastructure as Code (IaC). Discussions cover modular Terraform design patterns, automated drift detection, policy enforcement with Sentinel, and state locking.',
    schedule: [
      { time: '06:00 PM', activity: 'Keynote: Scaling Terraform across 150 AWS Accounts' },
      { time: '07:15 PM', activity: 'Panel: The State of OpenTofu & Terraform' }
    ],
    speakers: [
      { name: 'Oliver Shaw', role: 'Cloud Practice Lead', company: 'Accenture Cloud' }
    ]
  },
  {
    id: 'event-30',
    title: 'Computer Vision & Multimodal AI Conference',
    organizer: 'CVPR Regional Chapter & Silicon Valley AI',
    category: 'AI & Machine Learning',
    technologies: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch'],
    eventType: 'Conference',
    date: '2026-12-14',
    endDate: '2026-12-15',
    time: '09:00 AM - 06:00 PM PST',
    location: 'San Francisco, CA',
    venue: 'Yerba Buena Center for the Arts',
    mode: 'Both',
    experienceLevel: 'Advanced',
    registrationUrl: 'https://eventiq.demo/register/event-30',
    popularity: 96,
    price: '$220',
    attendeesCount: 2100,
    featured: true,
    bannerGradient: 'from-blue-600/30 via-purple-600/20 to-transparent',
    description: 'Covering state-of-the-art vision-language-action models, real-time 3D spatial computing, diffusion models for video generation, and high-efficiency neural architectures.',
    schedule: [
      { time: '09:00 AM', activity: 'Keynote: Spatial Intelligence & Generative Video' },
      { time: '01:30 PM', activity: 'Real-time Object Detection on Edge TPUs' }
    ],
    speakers: [
      { name: 'Prof. Li Wei', role: 'Director of AI Lab', company: 'Stanford Research' }
    ]
  },
  {
    id: 'event-31',
    title: 'Early Stage Tech Founders Bootcamp',
    organizer: 'StartupGrind Global',
    category: 'Startups & Tech Founders',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js'],
    eventType: 'Workshop',
    date: '2026-11-16',
    endDate: '2026-11-16',
    time: '10:00 AM - 03:00 PM CST',
    location: 'Austin, TX',
    venue: 'Capital Factory Austin & Virtual Broadcast',
    mode: 'Both',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-31',
    popularity: 92,
    price: '$50 (Free for Students)',
    attendeesCount: 520,
    featured: false,
    bannerGradient: 'from-purple-600/30 via-indigo-600/20 to-transparent',
    description: 'Essential guidance for engineers transitioning to founders. Financial modeling, legal incorporation, founder equity splits, technical hiring, and building customer feedback loops.',
    schedule: [
      { time: '10:00 AM', activity: 'Avoiding the Fatal Mistakes of First-Time Technical Founders' },
      { time: '01:00 PM', activity: 'Interactive Term Sheet Negotiation Workshop' }
    ],
    speakers: [
      { name: 'Brett Campbell', role: 'Managing Director', company: 'Capital Factory' }
    ]
  },
  {
    id: 'event-32',
    title: 'Beginner Cloud Essentials with AWS & Docker',
    organizer: 'Cloud Newbies Global',
    category: 'Cloud Computing',
    technologies: ['AWS', 'Docker', 'Linux'],
    eventType: 'Webinar',
    date: '2026-10-24',
    endDate: '2026-10-24',
    time: '05:00 PM - 07:00 PM IST',
    location: 'Virtual / Online',
    venue: 'Live Stream & Cloud Playground',
    mode: 'Online',
    experienceLevel: 'Beginner',
    registrationUrl: 'https://eventiq.demo/register/event-32',
    popularity: 94,
    price: 'Free',
    attendeesCount: 3750,
    featured: false,
    bannerGradient: 'from-sky-600/30 via-blue-600/20 to-transparent',
    description: 'No prior cloud experience required! Demystify virtual machines, object storage (S3), Docker containerization, and deploying your first microservice with zero cost.',
    schedule: [
      { time: '05:00 PM', activity: 'What Actually is the Cloud? S3, EC2, and IAM' },
      { time: '06:00 PM', activity: 'Dockerizing and Running Your First App in the Cloud' }
    ],
    speakers: [
      { name: 'Nikhil Mehta', role: 'Cloud Architect', company: 'TechSolutions' }
    ]
  }
];

export default EVENTS;
