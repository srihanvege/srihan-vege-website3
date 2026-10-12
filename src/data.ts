// ─────────────────────────────────────────────────────────────
//  Site data. Single source of truth for the page and the game.
// ─────────────────────────────────────────────────────────────

export const INFO = {
  name: "Srihan Vege",
  email: "svege@purdue.edu",
  resumeUrl: "/srihan_vege_resume.pdf",
  cvUrl: "/srihan_vege_cv.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

export interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "TRUTH DECAY",
    description:
      "Joint first author of a study on multiturn sycophancy in LLMs. Built the evaluation harness; reduced accuracy degradation by ~43%. NAACL SRW 2025.",
    tags: ["LLM Eval", "NLP", "Python"],
    year: "2025",
    link: "https://arxiv.org/abs/2503.11656",
  },
  {
    title: "Vela · YC W26",
    description:
      "Built and deployed GA4 event tracking infrastructure across Vela's website to measure user workflows, conversion funnels, and retention.",
    tags: ["TypeScript", "GA4", "Analytics"],
    year: "2026",
  },
  {
    title: "ContrastIQ",
    description:
      "CT imaging model combining a CNN with pharmacokinetic priors to predict aortic peak enhancement timing. ~97% improvement on 272 patient scans. EMBC submitted, patent pending.",
    tags: ["PyTorch", "Medical Imaging", "MONAI"],
    year: "2024",
  },
  {
    title: "REALestate.ai",
    description:
      "AI powered real estate valuation system that automates property value estimation by combining tabular features with location and market signals.",
    tags: ["Machine Learning", "Real Estate"],
    year: "2024",
    link: "https://github.com/S-K-23/REALestate.ai",
  },
  {
    title: "Credit Card Fraud Detection",
    description:
      "Binary classification pipeline for fraudulent transactions, with feature engineering and model evaluation for reliable risk scoring.",
    tags: ["Python", "XGBoost", "Pandas"],
    year: "2026",
    link: "https://github.com/srihanvege/Credit-Card-Fraud-Detection",
  },
];

export const EXPERIENCE = [
  {
    org: "Microsoft",
    role: "Data Science Researcher",
    date: "Aug 2026 to Present",
    bullets: [
      "Researching through Purdue's Data Mine Corporate Partners Learning Community.",
    ],
  },
  {
    org: "Bioqore",
    role: "Software Engineering Intern",
    date: "Jun 2026 to Aug 2026",
    bullets: [
      "Built a synthetic biomanufacturing data framework in Python using SDV's Gaussian Copula and CTGAN models, achieving 85% fidelity against real process data.",
      "Designed a biological validity rule engine and model bake-off harness enforcing domain plausibility constraints; flagged 93% of implausible synthetic records across 8 validation rules.",
    ],
  },
  {
    org: "NuStudio.AI",
    role: "AI/ML Intern",
    date: "May 2026 to Sep 2026",
    bullets: [
      "Engineered an LLM-powered agent for automated cross-language code migration under the Apex team, reaching 95% translation accuracy on test conversions.",
      "Designed and implemented REST endpoints for Sarvos's Action Broker, covering typed action proposal contracts and validate/execute flows across billing, document, and matter-intake domains.",
      "Refined agent behavior, tested edge cases, and validated outputs across Cortava AI's credit union AI product suite, improving tool reliability and surfacing failure modes across core platform workflows.",
    ],
  },
  {
    org: "Algoverse AI Research",
    role: "Machine Learning Researcher",
    date: "Aug 2024 to Apr 2025",
    bullets: [
      "Built multiturn LLM evaluation harness; reduced accuracy degradation from sycophancy by ~43% via prompt strategies.",
      "Joint first author of TRUTH DECAY, presented at NAACL SRW 2025; 25+ citations, including work from Harvard and Google DeepMind.",
    ],
  },
  {
    org: "Northwestern University · Bagci Lab (MHIL)",
    role: "Machine Learning Engineer",
    date: "Jun 2024 to Feb 2025",
    bullets: [
      "Developed CT imaging model for aortic peak enhancement timing; mode timing error ~0.3s (≈97% improvement).",
      "Improved prediction accuracy on 272 scans; reduced error from ~200 HU to ~100 HU; EMBC submitted; patent pending.",
    ],
  },
  {
    org: "FireFly EDU (501c3)",
    role: "Cofounder & Vice President",
    date: "Jun 2023 to Aug 2024",
    bullets: [
      "Built and led education nonprofit serving underserved youth; recruited exec team across marketing and finance.",
      "Taught CS, Math, Biology, English, Physics to students aged 5 to 15 at Heal Paradise school.",
    ],
  },
  {
    org: "Stanford ML/Molecular Imaging Fellowship",
    role: "Research Student",
    date: "Jun 2023 to Aug 2023",
    bullets: [
      "Studied AI/deep learning applications in PET/MRI/SPECT under Dr. Frezghi Habte; surveyed CNN/RNN imaging tools.",
    ],
  },
];

export interface Tool {
  name: string;
  level: number; // 0-100
}

export interface ToolboxGroup {
  group: string;
  items: Tool[];
}

export const TOOLBOX: ToolboxGroup[] = [
  {
    group: "languages",
    items: [
      { name: "Python", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "Java", level: 70 },
      { name: "C", level: 65 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    group: "ml & agents",
    items: [
      { name: "PyTorch", level: 80 },
      { name: "scikit-learn", level: 85 },
      { name: "Pandas · NumPy", level: 90 },
      { name: "LLM agents · tool use", level: 85 },
      { name: "SDV · CTGAN · Copula", level: 75 },
    ],
  },
  {
    group: "web & infra",
    items: [
      { name: "React · Next.js", level: 80 },
      { name: "Tailwind", level: 85 },
      { name: "Node.js", level: 75 },
      { name: "API design", level: 85 },
      { name: "MongoDB", level: 65 },
      { name: "Git · Linux", level: 85 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
//  Shared animation variants
// ─────────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─────────────────────────────────────────────────────────────
//  Career milestones, mapped onto a 100 yard field.
//  Own goal line = earliest, end zone = present.
// ─────────────────────────────────────────────────────────────
export interface Milestone {
  yard: number; // 0-100, distance downfield
  org: string;
  role: string;
  date: string;
  note: string;
}

export const MILESTONES: Milestone[] = [
  {
    yard: 20,
    org: "Stanford",
    role: "Research Student",
    date: "Summer 2023",
    note: "ML for PET, MRI and SPECT molecular imaging.",
  },
  {
    yard: 40,
    org: "Northwestern · Bagci Lab",
    role: "Machine Learning Engineer",
    date: "Jun 2024 — Feb 2025",
    note: "ContrastIQ: CT timing model, ~97% error reduction. Patent pending.",
  },
  {
    yard: 60,
    org: "Algoverse",
    role: "Machine Learning Researcher",
    date: "Aug 2024 — Apr 2025",
    note: "TRUTH DECAY at NAACL SRW. 25+ citations.",
  },
  {
    yard: 80,
    org: "Bioqore · NuStudio.AI",
    role: "SWE Intern · AI/ML Intern",
    date: "May — Sep 2026",
    note: "Synthetic biomanufacturing data, and LLM agents that call real APIs.",
  },
  {
    yard: 100,
    org: "Microsoft",
    role: "Data Science Researcher",
    date: "Aug 2026 — Present",
    note: "ML pipelines for content classification on the Minecraft Marketplace.",
  },
];
