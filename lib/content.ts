// Every fact carries its source. No source, no claim.
export const person = {
  name: "Viren Singh",
  headline: "Data Scientist & AI Engineer",
  location: "Gurugram, India",
  email: "viren.singh.email@gmail.com", // public by the owner's choice (2026-10-08)
  links: {
    github: "https://github.com/Vizdumb2005",
    gitlab: "https://gitlab.com/viren.singh.email",
    linkedin: "https://www.linkedin.com/in/vizdumb",
  },
};

export type Project = {
  slug: string;
  name: string;
  status: "shipped-open-source" | "concept" | "work-in-progress";
  summary: string;
  stack: string[];
  href?: string;
  source: string;
};

export const projects: Project[] = [
  {
    slug: "stratum-rag",
    name: "Stratum RAG",
    status: "shipped-open-source",
    summary:
      "Hybrid retrieval engine. Dense search plus BM25, reciprocal rank fusion, cross-encoder rerank. A CI gate fails the build when quality drops more than 3%.",
    stack: ["Qdrant", "FastAPI", "Prometheus", "Docker", "GitLab CI"],
    href: "https://gitlab.com/viren.singh.email/stratum-rag",
    source: "README at gitlab.com/viren.singh.email/stratum-rag (read, not run)",
  },
  {
    slug: "kratos-engine",
    name: "Kratos Engine",
    status: "shipped-open-source",
    summary:
      "Async local-LLM inference and tool-execution daemon. THINK, CALL, VERIFY, FINAL agent loop with sandboxed Python and read-only DuckDB.",
    stack: ["vLLM", "llama.cpp", "Pydantic", "DuckDB"],
    href: "https://gitlab.com/viren.singh.email/kratos-engine",
    source: "README at gitlab.com/viren.singh.email/kratos-engine (read, not run)",
  },
  {
    slug: "forge-data",
    name: "FORGE-Data",
    status: "concept",
    summary:
      "An idea in progress: SQL, Python notebooks and an AI copilot on one canvas, with DuckDB underneath. Self-hosted, bring your own key.",
    stack: ["DuckDB", "Jupyter", "LLMs"],
    href: "https://github.com/Vizdumb2005/FORGE-Data",
    source: "Owner: incomplete project, include as an idea (2026-10-08)",
  },
  {
    slug: "loki",
    name: "LOKI",
    status: "work-in-progress",
    summary:
      "A digital mentalist, work in progress. Entropy-based question selection over a Bayesian engine. The research direction has moved toward gaze detection with a focus on cards.",
    stack: ["Python", "FastAPI", "React"],
    href: "https://github.com/Vizdumb2005/LOKI",
    source: "Repo README plus owner note (2026-10-08)",
  },
];

export const founder = {
  company: "NeuraFinix",
  role: "Founder & AI Solutions Architect",
  since: "Feb 2025",
  // Owner's words, tidied. Spelled NeuraFinix.
  line: "A B2B service provider that helps brands build AI agents and systems that raise workplace productivity, streamline team workflows, and give teams solutions tailored to their needs.",
};

export const fixidesk = [
  { name: "vigil-stream", href: "https://gitlab.com/fixidesk/vigil-stream" },
  { name: "VERIGRPO", href: "https://gitlab.com/fixidesk/verigrpo" },
];

export const certs = [
  "CS50's Introduction to AI with Python, Harvard",
  "DataCamp Data Scientist",
  "DataCamp AI Engineer for Data Scientists Associate",
  "IBM SkillsBuild Data Analytics",
  "NASSCOM AI & ML, IT-ITeS Sector Skills Council",
  "Deloitte Australia Data Analytics job simulation, Forage",
];

export const education = [
  "Mangalayatan University, BCA Computer Science, 2026 to 2028 (in progress)",
  "IIT Madras, BS Data Science (coursework), 2024 to 2026",
];

export const experiment = {
  name: "Continual AI 2B",
  tag: "Experiment, proof of concept",
  summary:
    "An open-weights language model I'm building to explore continual learning. Early and unfinished, developed on a laptop with no budget, and published so others can try it or build on it. The final model is targeted for January 2028.",
  claim:
    "The model card describes it as 1.83B parameters with dual-key memory and low-rank plasticity adapters, and claims zero catastrophic forgetting. Those are the card's claims, not independently benchmarked.",
  links: [
    { label: "Model", href: "https://huggingface.co/Vir007/continual-ai-2b" },
    { label: "Live Space", href: "https://huggingface.co/spaces/Vir007/continual-ai" },
  ],
  source: "HF model card read 2026-10-08; framing from owner (2026-10-08). Separate from LOKI.",
};
