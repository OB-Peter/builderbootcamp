export const DEFAULT_COURSES = [
  {
    id: 1,
    name: "Backend Engineering with Node.js",
    slug: "backend-engineering",
    category: "Backend",
    shortDescription: "Build scalable server architectures, secure authentication, relational database pipelines, and robust REST APIs.",
    level: "Beginner Friendly",
    duration: "8 Weeks",
    price_kobo: 1500000,
    priceFormatted: "₦15,000",
    badge: "Core Engineering",
    icon: "terminal",
    highlights: [
      "RESTful API design & architecture",
      "Authentication & JWT security",
      "Database querying & indexing",
      "Payment gateway integration (Paystack)"
    ],
  },
  {
    id: 2,
    name: "Cloud & DevOps Fundamentals",
    slug: "cloud-devops",
    category: "DevOps",
    shortDescription: "Learn containerization with Docker, CI/CD automation pipelines, cloud deployments, and production server management.",
    level: "Intermediate",
    duration: "8 Weeks",
    price_kobo: 1500000,
    priceFormatted: "₦15,000",
    badge: "In Demand",
    icon: "layers",
    highlights: [
      "Linux terminal & server administration",
      "Docker containers & microservices",
      "CI/CD workflows with GitHub Actions",
      "Cloud hosting & monitoring"
    ],
  },
  {
    id: 3,
    name: "Frontend Development with React",
    slug: "frontend-react",
    category: "Frontend",
    shortDescription: "Craft responsive, interactive, and high-performance user interfaces with modern React, hooks, and clean CSS.",
    level: "Beginner",
    duration: "8 Weeks",
    price_kobo: 1500000,
    priceFormatted: "₦15,000",
    badge: "Student Favorite",
    icon: "laptop",
    highlights: [
      "Modern JavaScript (ES6+) foundations",
      "Component architecture & state management",
      "Responsive layout & accessible design",
      "API consumption & async data loading"
    ],
  },
];

export const TRUST_INDICATORS = [
  { label: "Hands-on Learning", description: "Build real apps from week one" },
  { label: "Real Projects", description: "Graduate with deployable software" },
  { label: "Beginner Friendly", description: "No prior experience required" },
  { label: "Practical Tutorials", description: "Zero fluff, direct application" },
  { label: "Student Focused", description: "Designed for ambitious learners" },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Choose a Track",
    description: "Select the software discipline that fits your career aspirations, from full-stack to backend and cloud.",
  },
  {
    step: "02",
    title: "Register Your Spot",
    description: "Fill in your student information in under two minutes with no complicated paperwork.",
  },
  {
    step: "03",
    title: "Secure Checkout",
    description: "Complete your enrollment smoothly and safely with Paystack card, bank transfer, or USSD checkout.",
  },
  {
    step: "04",
    title: "Start Building",
    description: "Join live cohort sessions, get repository access, write real code, and push your first project live.",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Learn by Building",
    description: "Instead of getting stuck in passive tutorial loops, you write code every day and solve practical technical problems.",
    icon: "code",
  },
  {
    title: "Simple Explanations",
    description: "We break down intimidating software engineering concepts into relatable, crystal-clear real-world metaphors.",
    icon: "book",
  },
  {
    title: "Real Project Practice",
    description: "Develop portfolio-ready applications that you can showcase to employers, clients, or graduate programs.",
    icon: "laptop",
  },
  {
    title: "Support When You're Stuck",
    description: "Get prompt feedback and debugging guidance so you never spend days blocked by a missing semicolon or syntax bug.",
    icon: "users",
  },
  {
    title: "Modern Industry Tools",
    description: "Master the exact tools professionals use: Git, GitHub, VS Code, Linux terminal, and modern deployment platforms.",
    icon: "terminal",
  },
  {
    title: "Community & Peer Growth",
    description: "Collaborate with fellow ambitious students, review each other's code, and grow your professional network.",
    icon: "sparkles",
  },
];

export const OUTCOME_PROJECTS = [
  {
    title: "Production SaaS Web Application",
    type: "Full-Stack Project",
    description: "A full-featured responsive web platform with user authentication, database models, dashboard metrics, and interactive forms.",
    tags: ["React", "Node.js", "Express", "MySQL", "JWT Auth"],
    metrics: "Production Architecture",
  },
  {
    title: "Secure Checkout & Payment Gateway",
    type: "Backend Integration",
    description: "An end-to-end e-commerce billing pipeline with Paystack checkout, webhook listeners, idempotency, and automated email confirmation.",
    tags: ["Node.js", "Paystack API", "Webhooks", "MySQL Transactions"],
    metrics: "Real Financial Workflows",
  },
  {
    title: "Developer Portfolio & Interactive Showcase",
    type: "Frontend Engineering",
    description: "A lightning-fast, accessible portfolio site highlighting personal case studies, dynamic project filters, and contact handling.",
    tags: ["Modern React", "Responsive CSS", "SEO Meta", "Performance Opt"],
    metrics: "Portfolio Ready",
  },
];

export const TESTIMONIAL_PLACEHOLDERS = [
  {
    quote: "BuilderBootcamp completely changed how I look at coding. Instead of copy-pasting tutorials, I actually understood how the frontend talks to the database.",
    name: "Alex O.",
    role: "Computer Science Undergraduate",
    track: "Full-Stack Web Development",
    initials: "AO",
  },
  {
    quote: "The practical focus made all the difference. In 8 weeks, I built my first working backend API and integrated it with a live payment gateway.",
    name: "Fatima B.",
    role: "Recent Graduate & Aspiring Engineer",
    track: "Backend Engineering",
    initials: "FB",
  },
  {
    quote: "The mentorship and supportive community kept me consistent. Whenever I was stuck, there was always help to understand the error and move forward.",
    name: "Chinedu E.",
    role: "Self-Taught Student Builder",
    track: "Cloud & DevOps Fundamentals",
    initials: "CE",
  },
];

export const FAQS = [
  {
    question: "Who can join BuilderBootcamp?",
    answer: "BuilderBootcamp is built specifically for university and college students, secondary-school graduates, self-taught beginners, and anyone eager to acquire practical, hands-on software development skills.",
  },
  {
    question: "Do I need previous programming experience?",
    answer: "No prior coding experience is necessary for our beginner tracks. We start from ground zero—explaining foundational concepts, setting up your development environment, and gradually building up to production-grade applications.",
  },
  {
    question: "What courses are available?",
    answer: "We offer tracks in Full-Stack Web Development, Backend Engineering with Node.js, Cloud & DevOps Fundamentals, Frontend React, Python Automation, and UI/UX Design for Software Builders.",
  },
  {
    question: "How long does each course take?",
    answer: "Our cohorts typically run between 6 to 12 weeks depending on the selected track. Sessions are structured into weekly modules featuring interactive live lessons, guided coding labs, and milestone projects.",
  },
  {
    question: "How do I register?",
    answer: "Simply click 'Join Now' or 'Choose Your Stack', select your desired course from the catalog, fill in your name and email, and proceed to secure checkout. You'll receive instant onboarding details upon confirmation.",
  },
  {
    question: "What payment methods are available?",
    answer: "All payments are securely processed via Paystack. You can pay via debit/credit card (Mastercard, Visa, Verve), direct bank transfer, USSD, or supported mobile money options.",
  },
  {
    question: "Can I learn with a phone or laptop?",
    answer: "While you can watch video lectures and participate in cohort discussions on a smartphone or tablet, a laptop or desktop computer (Windows, Mac, or Linux) is strongly recommended for running development tools like VS Code, Git, and Node.js.",
  },
  {
    question: "Will I receive a certificate or completion recognition?",
    answer: "Students who successfully complete all course milestone projects and attend required review sessions receive an official BuilderBootcamp Certificate of Completion and a verified digital credential for their portfolio and LinkedIn profile.",
  },
];
