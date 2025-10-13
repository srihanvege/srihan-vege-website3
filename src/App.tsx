import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Briefcase, GraduationCap, FileText, Download, Sun, Moon, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

const INFO = {
  name: "Srihan Vege",
  role: "Computer Science & Mathematics Student",
  location: "West Lafayette, IN",
  email: "svege@purdue.edu",
  headline: "Purdue CS + Math · interests in ML reliability, medical imaging, and RAG systems.",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/srihanvege",
  linkedin: "https://www.linkedin.com/in/srihan-vege/",
};

const PROJECTS = [
  {
    title: "RAG Sports Bot",
    description: "Retrieval-augmented chatbot that answers NFL stat questions using a Python backend (FAISS) and a SwiftUI front end.",
    tags: ["Python", "FAISS", "RAG", "SwiftUI"],
    links: { code: "https://github.com/srihanvege" },
  },
  {
    title: "ContrastIQ",
    description: "CNN + pharmacokinetic priors to predict arterial-phase aortic peak enhancement timing in CT (mode error ~0.3s; ~97% improvement).",
    tags: ["PyTorch", "Medical Imaging", "CNN", "MONAI"],
  },
  {
    title: "TRUTH DECAY",
    description: "Benchmark + mitigation study on multi-turn sycophancy in LLMs; accepted to NAACL SRW 2025.",
    tags: ["LLM Eval", "NLP", "Prompting"],
    links: { paper: "https://arxiv.org/abs/2503.11656" },
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
  "Python", "Java", "JavaScript", "HTML", "CSS", "Swift", "PyTorch", "NumPy", "Pandas", "Matplotlib", "MONAI", "Git", "Linux", "LLMs", "FAISS"
];

type Mode = "light" | "dark" | "system";

function ThemeToggle() {
  const [mode, setMode] = React.useState<Mode>("system");

  React.useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const toDark = mode === "dark" || (mode === "system" && prefersDark);
    root.classList.toggle("dark", toDark);
  }, [mode]);

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <Button variant="ghost" className={`h-8 px-2 rounded-md ${mode === "light" ? "ring-1 ring-sky-600" : ""}`} onClick={() => setMode("light")}>
        <Sun className="w-4 h-4 mr-1" /> Light
      </Button>
      <Button variant="ghost" className={`h-8 px-2 rounded-md ${mode === "dark" ? "ring-1 ring-sky-600" : ""}`} onClick={() => setMode("dark")}>
        <Moon className="w-4 h-4 mr-1" /> Dark
      </Button>
      <Button variant="ghost" className={`h-8 px-2 rounded-md ${mode === "system" ? "ring-1 ring-sky-600" : ""}`} onClick={() => setMode("system")}>
        <Monitor className="w-4 h-4 mr-1" /> Auto
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
  <section id={id} className="scroll-mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 text-slate-900 dark:text-white"
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
    className="inline-flex items-center gap-2 text-sm text-sky-700 hover:underline dark:text-sky-400"
  >
    {children}
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/70 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold text-base sm:text-lg tracking-tight">{INFO.name}</a>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">Biography</a>
            <a href="#skills" className="hover:opacity-80">Interests</a>
            <a href="#notes" className="hover:opacity-80">Notes</a>
            <a href="#projects" className="hover:opacity-80">Past Projects</a>
            <a href="#writings" className="hover:opacity-80">Writings</a>
            <a href="#education" className="hover:opacity-80">Education</a>
            <Button asChild className="rounded-md">
              <a href={INFO.resumeUrl} target="_blank" rel="noreferrer">
                <Download className="w-4 h-4 mr-2" /> Resume
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <section id="home" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-[1fr,220px] gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            >
              {INFO.name}
            </motion.h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">{INFO.role}</p>
            <p className="text-slate-600 dark:text-slate-300">{INFO.location}</p>
            <p className="mt-5 max-w-2xl text-slate-700 dark:text-slate-200 leading-relaxed">{INFO.headline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="secondary" className="rounded-md"><a href={INFO.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" /> GitHub</a></Button>
              <Button asChild variant="secondary" className="rounded-md"><a href={INFO.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</a></Button>
              <Button asChild className="rounded-md"><a href={`mailto:${INFO.email}`}><Mail className="w-4 h-4 mr-2" /> Email me</a></Button>
            </div>
          </div>
          <div className="justify-self-center md:justify-self-end">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-inner border border-slate-200 dark:border-slate-700">
              <span className="text-4xl font-bold text-slate-500 dark:text-slate-300 select-none">{INFO.name.split(" ").map((n) => n[0]).join("")}</span>
            </div>
          </div>
        </div>
      </section>

      <Section id="about" title="Biography">
        <Card className="rounded-xl border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 text-slate-700 dark:text-slate-200 leading-relaxed">
            I recently started at Purdue University (CS & Math). I enjoy building things at the intersection of ML reliability and usable products. Recent projects include a sports Q&A bot with retrieval-augmented generation and research on mitigating multi-turn sycophancy in LLMs. If any of this connects to your work, feel free to reach out at <a className="text-sky-700 hover:underline dark:text-sky-400" href={`mailto:${INFO.email}`}>{INFO.email}</a>.
          </CardContent>
        </Card>
      </Section>

      <Section id="notes" title="Notes & Publications">
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="rounded-xl hover:shadow-sm transition-shadow border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">TRUTH DECAY: Quantifying Multi-Turn Sycophancy in Language Models</CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400">Liu, Jain, Takuri, <strong>Vege</strong>, Akalin, Zhu, O'Brien, Sharma. NAACL SRW 2025.</p>
            </CardHeader>
            <CardContent className="pt-0 flex flex-wrap gap-3">
              <Button asChild variant="secondary" className="rounded-md"><a href="https://arxiv.org/abs/2503.11656" target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2"/>arXiv</a></Button>
              <Button asChild variant="secondary" className="rounded-md"><a href="https://openreview.net/forum?id=GHUh9O5Im8" target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2"/>OpenReview</a></Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="writings" title="Writings & Pieces">
        <Card className="rounded-xl border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 text-sm text-slate-700 dark:text-slate-200 space-y-3">
            <p className="italic">Some cool things I’ve been thinking about:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Lyapunov functions & stability (notes draft)</li>
              <li>RAG UX patterns for sports analytics users</li>
              <li>Measuring prompt-strategy robustness over multi-turn dialogues</li>
            </ul>
          </CardContent>
        </Card>
      </Section>

      <Section id="projects" title="Past Projects">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, idx) => (
            <Card key={idx} className="rounded-xl hover:shadow-sm transition-shadow border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3"><span>{p.title}</span><Badge>Project</Badge></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 min-h-[48px]">{p.description}</p>
                <div className="flex flex-wrap gap-2">{p.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">{t}</span>
                ))}</div>
                <div className="flex flex-wrap gap-3">
                  {p.links?.code && (
                    <Button asChild variant="secondary" className="rounded-md"><a href={p.links.code} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" /> Code</a></Button>
                  )}
                  {p.links?.demo && (
                    <Button asChild className="rounded-md"><a href={p.links.demo} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2" /> Live</a></Button>
                  )}
                  {p.links?.paper && (
                    <Button asChild className="rounded-md"><a href={p.links.paper} target="_blank" rel="noreferrer"><FileText className="w-4 h-4 mr-2" /> Paper</a></Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Experience">
        <div className="space-y-4">
          {EXPERIENCE.map((e, idx) => (
            <Card key={idx} className="rounded-xl border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg"><Briefcase className="w-5 h-5" /><span>{e.role} · {e.org}</span></CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">{e.date}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-200">{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Interests">
        <Card className="rounded-xl border-slate-200 dark:border-slate-800">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">{SKILLS.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-sm dark:bg-slate-800 dark:text-slate-100">{s}</span>
            ))}</div>
          </CardContent>
        </Card>
      </Section>

      <Section id="education" title="Education">
        <Card className="rounded-xl border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg"><GraduationCap className="w-5 h-5" />B.S. in Computer Science & Mathematics · Purdue University (Aug 2025 – May 2029)</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-700 dark:text-slate-200">
            <p>Relevant coursework: Linear Algebra, Programming I, CS Tools, Multivariable Calculus, AP CS A/Principles, AP Calculus BC, AP Physics C, Neural Network Architecture, ML Theory, Deep Learning Theory.</p>
          </CardContent>
        </Card>
      </Section>

      <Section id="contact" title="Contact">
        <Card className="rounded-xl border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-slate-700 dark:text-slate-200">Interested in collaborating or have a role that fits?</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">I'm open to internships, research, and product work.</p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="rounded-md"><a href={`mailto:${INFO.email}`}><Mail className="w-4 h-4 mr-2" /> Email</a></Button>
              <Button asChild variant="secondary" className="rounded-md"><a href={INFO.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4 mr-2" /> LinkedIn</a></Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LinkIcon href={INFO.github} title="GitHub"><Github className="w-4 h-4" /><span>GitHub</span></LinkIcon>
            <LinkIcon href={INFO.linkedin} title="LinkedIn"><Linkedin className="w-4 h-4" /><span>LinkedIn</span></LinkIcon>
            <LinkIcon href={`mailto:${INFO.email}`} title="Email"><Mail className="w-4 h-4" /><span>Email</span></LinkIcon>
          </div>
          <p>© {new Date().getFullYear()} {INFO.name}. This site is inspired by clean academic profiles.</p>
        </div>
      </footer>
    </div>
  );
}
