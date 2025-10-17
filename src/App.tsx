import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Download,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

const INFO = {
  name: "Srihan Vege",
  role: "Computer Science & Mathematics Student",
  location: "West Lafayette, IN",
  email: "svege@purdue.edu",
  headline:
    "Purdue CS + Math · interests in ML reliability and high-powered computing.",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

type ProjectLinks = { code?: string; demo?: string; paper?: string };
interface Project {
  title: string;
  description: string;
  tags: string[];
  links?: ProjectLinks;
}

const PROJECTS: Project[] = [
  {
    title: "RAG Sports Bot",
    description:
      "Retrieval-augmented chatbot that answers NFL stat questions using a Python backend (FAISS) and a SwiftUI front end.",
    tags: ["Python", "FAISS", "RAG", "SwiftUI"],
    links: { code: "https://github.com/srihanvege/RAG-Bot" },
  },
  {
    title: "ContrastIQ",
    description:
      "CNN + pharmacokinetic priors to predict arterial-phase aortic peak enhancement timing in CT (mode error ~0.3s; ~97% improvement).",
    tags: ["PyTorch", "Medical Imaging", "CNN", "MONAI"],
  },
  {
    title: "TRUTH DECAY",
    description:
      "Benchmark + mitigation study on multi-turn sycophancy in LLMs; accepted to NAACL SRW 2025.",
    tags: ["LLM Eval", "NLP", "Prompting"],
    links: { paper: "https://arxiv.org/abs/2503.11656" },
  },
  {
    title: "REALestate.ai",
    description:
      "AI-driven real estate valuation and insight system built to automate and optimize property value estimation.",
    tags: ["Machine Learning", "Real Estate", "Automation"],
    links: { code: "https://github.com/S-K-23/REALestate.ai" },
  },
];

const EXPERIENCE = [
  {
    org: "Algoverse AI Research",
    role: "Machine Learning Researcher",
    date: "Aug 2024 – Apr 2025",
    bullets: [
      "Built multi-turn LLM evaluation harness; reduced accuracy degradation from sycophancy by ~43% via prompt strategies.",
      "Co-first authored TRUTH DECAY; accepted to NAACL SRW 2025; presented results to research audience.",
    ],
  },
  {
    org: "Northwestern University · Bagci Lab (MHIL)",
    role: "Machine Learning Engineer",
    date: "Jun 2024 – Feb 2025",
    bullets: [
      "Developed CT imaging model to determine aortic peak enhancement timing; mode timing error ~0.3s (≈97% improvement).",
      "Improved prediction accuracy on 272 scans; reduced error from ~200 HU to ~100 HU; EMBC paper submitted; patent pending.",
    ],
  },
  {
    org: "FireFly EDU (501c3)",
    role: "Co-Founder & Vice President",
    date: "Jun 2023 – Aug 2024",
    bullets: [
      "Built and led education nonprofit serving under-resourced youth; recruited exec team across marketing and finance.",
      "Taught CS, Math, Biology, English, Physics to students aged 5–15 at Heal Paradise school.",
    ],
  },
  {
    org: "Stanford ML/Molecular Imaging Fellowship",
    role: "Research Student",
    date: "Jun 2023 – Aug 2023",
    bullets: [
      "Studied AI/deep learning applications in PET/MRI/SPECT under Dr. Frezghi Habte; surveyed CNN/RNN imaging tools.",
    ],
  },
];

const SKILLS = [
  "Python",
  "Java",
  "JavaScript",
  "HTML",
  "CSS",
  "Swift",
  "PyTorch",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "MONAI",
  "Git",
  "Linux",
  "LLMs",
  "FAISS",
];

const PANEL =
  "rounded-xl border bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 shadow-sm";
const PANEL_TEXT = "text-slate-800 dark:text-slate-100 text-lg sm:text-xl";
const MUTED = "text-slate-600 dark:text-slate-300 text-base sm:text-lg";
const SUBTLE = "text-slate-500 dark:text-slate-400 text-base";

type Mode = "light" | "dark" | "system";

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>("system");

  React.useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const toDark = mode === "dark" || (mode === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", toDark);
  }, [mode]);

  const btn = "h-8 px-3 rounded-md text-base";

  return (
    <div className="inline-flex items-center gap-3 text-base">
      <Button
        variant="secondary"
        className={`${btn} ${mode === "light" ? "ring-2 ring-sky-600" : ""}`}
        onClick={() => setMode("light")}
      >
        <Sun className="w-5 h-5 mr-1" /> Light
      </Button>
      <Button
        variant="secondary"
        className={`${btn} ${mode === "dark" ? "ring-2 ring-sky-600" : ""}`}
        onClick={() => setMode("dark")}
      >
        <Moon className="w-5 h-5 mr-1" /> Dark
      </Button>
      <Button
        variant="secondary"
        className={`${btn} ${mode === "system" ? "ring-2 ring-sky-600" : ""}`}
        onClick={() => setMode("system")}
      >
        <Monitor className="w-5 h-5 mr-1" /> Auto
      </Button>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section
    id={id}
    className="scroll-mt-20 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-6"
  >
    <motion.h2
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className={`text-3xl sm:text-4xl font-semibold tracking-tight mb-4 ${PANEL_TEXT}`}
    >
      {title}
    </motion.h2>
    {children}
  </section>
);

interface LinkIconProps {
  href: string;
  title?: string;
  children: React.ReactNode;
}

const LinkIcon: React.FC<LinkIconProps> = ({ href, children, title }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={title}
    className="inline-flex items-center gap-2 text-base text-sky-700 hover:underline dark:text-sky-400"
  >
    {children}
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 text-lg">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <nav className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 h-16 flex items-center justify-between text-lg">
          <a href="#home" className="font-semibold text-xl tracking-tight">
            {INFO.name}
          </a>
          <div className="hidden sm:flex items-center gap-6 text-base">
            <a href="#about" className="hover:opacity-80">Biography</a>
            <a href="#skills" className="hover:opacity-80">Skills</a>
            <a href="#notes" className="hover:opacity-80">Notes</a>
            <a href="#projects" className="hover:opacity-80">Past Projects</a>
            <a href="#experience" className="hover:opacity-80">Experience</a>
            <Button asChild className="rounded-md text-base px-3 py-1.5">
              <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="w-5 h-5 mr-2" /> Resume
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-8"
        >
          <div className="grid md:grid-cols-[1fr,220px] gap-6 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-5xl sm:text-6xl font-extrabold tracking-tight"
              >
                {INFO.name}
              </motion.h1>
              <p className={`mt-2 text-2xl ${MUTED}`}>{INFO.role}</p>
              <p className={`text-xl ${MUTED}`}>{INFO.location}</p>
              <p className={`mt-3 max-w-3xl leading-relaxed ${PANEL_TEXT}`}>
                {INFO.headline}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button asChild variant="secondary" className="rounded-md text-lg px-4 py-2">
                  <a href={INFO.github} target="_blank" rel="noreferrer">
                    <Github className="w-5 h-5 mr-2" /> GitHub
                  </a>
                </Button>
                <Button asChild variant="secondary" className="rounded-md text-lg px-4 py-2">
                  <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                  </a>
                </Button>
                <Button asChild className="rounded-md text-lg px-4 py-2">
                  <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                  <Download className="w-5 h-5 mr-2" /> Resume
                    </a>
                </Button>
              </div>
              <div className="mt-3 text-lg flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <GraduationCap className="w-5 h-5" />
                <span>
                  B.S. in Computer Science &amp; Mathematics · Purdue University (Aug 2025 – May 2029)
                </span>
              </div>
            </div>
            <div className="justify-self-center md:justify-self-end">
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
                <img
                  src="/1753369044349.jpeg"
                  alt="Srihan Vege"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <Section id="about" title="Biography">
          <Card className={PANEL}>
            <CardContent className={`p-4 leading-relaxed ${PANEL_TEXT}`}>
              I recently started at Purdue University (CS & Math). I enjoy building
              things at the intersection of ML reliability and usable products. Recent
              projects include a sports Q&A bot with retrieval-augmented generation and
              research on mitigating multi-turn sycophancy in LLMs. If any of this
              connects to your work, feel free to reach out at <a className="text-sky-700 hover:underline dark:text-sky-400" href={`mailto:${INFO.email}`}>{INFO.email}</a>.
            </CardContent>
          </Card>
        </Section>

        <Section id="notes" title="Publications">
          <div className="grid sm:grid-cols-2 gap-3">
            <Card className={PANEL}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-xl sm:text-2xl ${PANEL_TEXT}`}>
                  TRUTH DECAY: Quantifying Multi-Turn Sycophancy in Language Models
                </CardTitle>
                <p className={`text-base ${SUBTLE}`}>
                  Liu, Jain, Takuri, <strong>Vege</strong>, Akalin, Zhu, O&apos;Brien, Sharma. NAACL SRW 2025.
                </p>
              </CardHeader>
              <CardContent className="pt-1">
                <a
                  className="inline-flex items-center gap-2 text-base text-sky-700 hover:underline dark:text-sky-400"
                  href="https://arxiv.org/abs/2503.11656"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="w-5 h-5" /> arXiv
                </a>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section id="projects" title="Past Projects">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROJECTS.map((p, idx) => (
              <Card key={idx} className={PANEL}>
                <CardHeader className="pb-2">
                  <CardTitle className={`flex items-start justify-between gap-2 ${PANEL_TEXT}`}>
                    <a
                      href={p.links?.demo || p.links?.code || p.links?.paper || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline text-sky-700 dark:text-sky-400"
                    >
                      {p.title}
                    </a>
                    <Badge>Project</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className={`text-base ${MUTED}`}>{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-sm px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="space-y-2">
            {EXPERIENCE.map((e, idx) => (
              <Card key={idx} className={PANEL}>
                <CardHeader className="pb-2">
                  <CardTitle className={`flex items-center gap-2 text-xl ${PANEL_TEXT}`}>
                    <Briefcase className="w-5 h-5" />
                    <span>
                      {e.role} · {e.org}
                    </span>
                  </CardTitle>
                  <p className={`text-base ${SUBTLE}`}>{e.date}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className={`list-disc pl-6 space-y-1 ${PANEL_TEXT}`}>
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <Card className={PANEL}>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-base dark:bg-slate-700 dark:text-slate-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section id="contact" title="Contact">
          <Card className={PANEL}>
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className={PANEL_TEXT}>Interested in collaborating or have a role that fits?</p>
                <p className={`text-base ${MUTED}`}>I'm open to internships, research, and product work.</p>
              </div>
              <div className="flex gap-3">
                <Button asChild className="rounded-md text-base px-4 py-2">
                  <a href={`mailto:${INFO.email}`}>
                    <Mail className="w-5 h-5 mr-2" /> Email
                  </a>
                </Button>
                <Button asChild variant="secondary" className="rounded-md text-base px-4 py-2">
                  <a href={INFO.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 mt-6">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-6 text-base text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LinkIcon href={INFO.github} title="GitHub">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </LinkIcon>
            <LinkIcon href={INFO.linkedin} title="LinkedIn">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </LinkIcon>
            <LinkIcon href={`mailto:${INFO.email}`} title="Email">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </LinkIcon>
          </div>
          <p>
            © {new Date().getFullYear()} {INFO.name}. This site is inspired by clean academic profiles.
          </p>
        </div>
      </footer>
    </div>
  );
}
