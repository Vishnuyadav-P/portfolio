export const projects = [
  {
    num: '01 — Featured',
    name: 'Answer Evaluation System',
    desc: 'AI-driven system that evaluates handwritten answer sheets via OCR, document layout detection, and semantic deep learning. EasyOCR + Tesseract fallback with a full React + Node.js pipeline.',
    tags: ['React', 'Node.js', 'EasyOCR', 'Python', 'AI/ML'],
    bg: 'proj-bg-1',
    url: 'https://answer-evaluation-system.vercel.app/',
    featured: true,
    category: 'ai-ml',
  },
  {
    num: '02',
    name: 'Leave Management System',
    desc: 'Full-stack leave management app with Vue.js 3 and Vercel serverless functions. Employees submit and track requests; employers approve or reject with custom reasons. Auto-scaling, zero-config.',
    tags: ['Vue.js 3', 'Node.js', 'Vercel', 'Serverless'],
    bg: 'proj-bg-2',
    url: 'https://leave-management-three-phi.vercel.app/',
    featured: false,
    category: 'fullstack',
  },
  {
    num: '03',
    name: 'Avinya 2.0 Hackathon',
    desc: 'Official website for Avinya 2.0 — a national-level hackathon with 300+ participants. Built with TypeScript and React for a scalable event platform with registration and schedule management.',
    tags: ['TypeScript', 'React', 'Vite'],
    bg: 'proj-bg-3',
    url: 'http://avinya2k26.vercel.app/',
    featured: false,
    category: 'webdev',
  },
  {
    num: '04',
    name: 'Personal Portfolio',
    desc: 'Responsive personal portfolio with React, Vite, and shadcn/ui. Features dynamic animations, project showcases, certificates, extracurriculars, and a contact section. Deployed on Vercel.',
    tags: ['React', 'TypeScript', 'Vite', 'shadcn/ui'],
    bg: 'proj-bg-4',
    url: 'https://github.com/Vishnuyadav-P/portfolio',
    featured: false,
    category: 'webdev',
  },
];

export const activities = [
  {
    num: '01',
    name: 'AVINYA-2K25',
    role: 'Lead Event Organizer',
    org: 'Chaitanya Bharathi Institute of Technology',
    date: 'Feb 2025',
    desc: 'Led the planning, resource management, and execution of AVINYA-2K25, a premier two-day national-level technical symposium.',
    bullets: [
      'Managed a cross-functional team of 40+ student organizers and technical staff.',
      'Coordinated across 5 engineering departments to orchestrate 12+ parallel coding, hackathon, and design events.',
      'Administered scheduling pipelines and participant registration portals supporting 1,200+ attendees.'
    ],
    tags: ['Leadership', 'Event Planning', 'Budgeting', 'Team Collaboration'],
    impact: 'Secured over ₹50,000 in local sponsorships, increased student participation by 60% compared to the previous one, and successfully delivered all 12 events on schedule.',
    bg: 'proj-bg-1',
    url: '#',
    featured: false,
  },
  {
    num: '02',
    name: 'NEXUS Swarm',
    role: 'Strategy & Tool Researcher',
    org: 'CBIT Developer Student Community',
    date: '2024 — Present',
    desc: 'Lead technical researcher and mentor at NEXUS Swarm, a student-focused community driving practical software and AI engineering literacy.',
    bullets: [
      'Researched and integrated modern development tools, AI frameworks, and project deployment strategies.',
      'Designed and ran hands-on student workshops on Git/GitHub, local AI/LLM integration, and web app building.',
      'Created learning curriculums for machine learning concepts and code-scaffold templates for student hackathons.'
    ],
    tags: ['Technical Mentoring', 'Curriculum Design', 'Community Building', 'AI Tools'],
    bg: 'proj-bg-2',
    url: '#',
    featured: false,
  }
];
