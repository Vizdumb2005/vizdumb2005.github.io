// Case-study copy. Every line comes from the project README (read, not run).
export type Case = {
  slug: string;
  meta: string;
  headline: string;
  tags: string[];
  problem: string;
  built: string;
  decisions: { title: string; body: string }[];
  repo: string;
  source: string;
  note?: string;
};

export const cases: Case[] = [
  {
    slug: "stratum-rag",
    meta: "Retrieval engine / Open source",
    headline: "A retrieval service that fails the build when answers get worse",
    tags: ["Hybrid search", "FastAPI", "CI evaluation gate"],
    problem:
      "Retrieval quality usually degrades without anyone noticing: a chunking change here, a model swap there. Stratum treats quality as something CI has to prove on every merge request.",
    built:
      "Dense search in Qdrant and incremental BM25 run together. Reciprocal Rank Fusion (k=60) merges the lists and a bge-reranker-base cross-encoder rescores the top results. Ingestion reads Markdown structure, keeps tables as single chunks and cuts the rest into 400 to 512 token pieces with a 50 token overlap.",
    decisions: [
      { title: "Quality is a gate, not a promise", body: "A deterministic eval checks context precision, recall, faithfulness and answer relevance. A drop of more than 3% blocks the merge." },
      { title: "Tables stay whole", body: "Markdown tables become atomic chunks, so rows are never split across results." },
      { title: "Observable by default", body: "JSON logs with per-query tracing, and Prometheus histograms for each pipeline stage." },
    ],
    repo: "https://gitlab.com/viren.singh.email/stratum-rag",
    source: "README at gitlab.com/viren.singh.email/stratum-rag, fetched 2026-10-08",
  },
  {
    slug: "kratos-engine",
    meta: "Agent runtime / Open source",
    headline: "An agent loop that has to verify before it answers",
    tags: ["Local LLM inference", "Tool execution", "Async Python"],
    problem:
      "Agents that call tools need guard rails: bounded code execution, safe data access and a way to check a result before trusting it. Kratos puts those in the loop itself.",
    built:
      "A strict THINK, CALL, VERIFY, FINAL loop. Inference goes through vLLM, with an in-process llama.cpp fallback and JSON grammar constraints on output. Tools run in a subprocess sandbox with OS resource limits, and a read-only DuckDB tool rejects any statement that changes data.",
    decisions: [
      { title: "Verify is a step, not an afterthought", body: "A tool result must pass VERIFY before the loop is allowed to reach FINAL." },
      { title: "Untrusted code stays boxed in", body: "Python runs in a separate process with CPU, memory, process and file-size limits." },
      { title: "Analytics can look, not touch", body: "The DuckDB tool blocks DROP, DELETE, INSERT, ALTER, ATTACH and similar commands." },
    ],
    repo: "https://gitlab.com/viren.singh.email/kratos-engine",
    source: "README at gitlab.com/viren.singh.email/kratos-engine, fetched 2026-10-08",
  },
  {
    slug: "forge-data",
    meta: "Data platform / Concept, in progress",
    headline: "An AI-first, agentic data science platform you host yourself",
    tags: ["Agentic data science", "Bring your own key", "Postgres + DuckDB"],
    problem:
      "Analysts bounce between a BI tool, a notebook and a chat window, and sending company data to a third-party service is often not an option. FORGE Data is my attempt at one self-hosted, AI-first place for all three, an agentic data science platform rather than a notebook with a chatbot bolted on.",
    built:
      "A spreadsheet-style grid where cells run Python or SQL through Jupyter kernels, with a chat that analyses your data using the LLM provider you choose. The stack in the README is a Next.js web app, a FastAPI backend with REST and WebSockets, Jupyter kernel gateway, PostgreSQL, Redis, MinIO and MLflow, all started with Docker Compose behind Nginx. Postgres runs the app itself, and DuckDB is available inside it for analytical queries.",
    decisions: [
      { title: "Your keys, your database", body: "Bring your own key. LLM keys are encrypted at rest in your own database, never on an outside server. OpenAI, Anthropic, Google AI, Azure OpenAI and local Ollama are supported." },
      { title: "Data stays on your infrastructure", body: "Self-hosted by design, with connectors for PostgreSQL, MySQL, BigQuery, Snowflake, CSV, Parquet and REST APIs." },
      { title: "Analysis you can take with you", body: "Workbooks keep a version history and export as Jupyter notebooks or shareable reports. MLflow tracks model runs." },
    ],
    repo: "https://github.com/Vizdumb2005/FORGE-Data",
    source: "README at github.com/Vizdumb2005/FORGE-Data, fetched 2026-10-08",
    note: "Honest status: incomplete and not actively developed right now. The figure is a sketch of the idea, not a working demo.",
  },
  {
    slug: "loki",
    meta: "Research prototype / Work in progress",
    headline: "A mind-reading illusion that asks the best next question",
    tags: ["Bayesian inference", "Information gain", "FastAPI + React"],
    problem:
      "A good mentalist never knows the answer. They know what to ask next. LOKI explores that as an engineering problem: keep an explicit set of hypotheses, update beliefs after every answer and pick the question that removes the most uncertainty.",
    built:
      "Effects are declarative state machines with a hypothesis space, questions and reliability. A Bayesian engine tracks the posterior and entropy in bits, and a policy picks the question with the highest expected information gain. A FastAPI service and a React and TypeScript web app sit on top, with a panel that shows the live posterior and the entropy dropping.",
    decisions: [
      { title: "Transparency as a feature", body: "The web app has a peek-behind-the-curtain panel with the live posterior and an entropy sparkline, so the method is visible, not hidden." },
      { title: "Consent first", body: "Sessions live in memory. A session is saved to the local ledger only if the participant opts in, and every record can be deleted." },
      { title: "Measure before you trust it", body: "A simulator and evaluation CLI score each effect. README baselines are simulated sessions only. Human trials are built and still pending, so there are no human results yet." },
    ],
    repo: "https://github.com/Vizdumb2005/LOKI",
    source: "README at github.com/Vizdumb2005/LOKI, fetched 2026-10-08",
    note: "Work in progress. The research direction is moving toward gaze detection with a focus on cards.",
  },
  {
    slug: "vaani",
    meta: "Civic platform / Prototype",
    headline: "A citizen voice-to-policy pipeline, designed around Google Cloud",
    tags: ["Google Cloud", "Multilingual voice and vision", "Geospatial analytics"],
    problem:
      "People report broken roads and water lines in their own language, by message or voice call, and those reports rarely become something a decision-maker can rank. VAANI is a design for turning raw citizen requests into prioritised, explainable public investment.",
    built:
      "A stateless FastAPI gateway on Cloud Run takes requests from WhatsApp, SMS through RapidPro, Telegram, phone IVR and the web, and queues the heavy work on Pub/Sub. Vertex AI handles Indian-language speech and Gemini vision on citizen photos. BigQuery GIS places requests on district boundaries and groups them into demand clusters. A Next.js cockpit ranks priorities with an explainable multi-criteria model, and the repo ships Terraform for the whole stack and a GitLab CI pipeline.",
    decisions: [
      { title: "Built for Google Cloud from the start", body: "Cloud Run, Pub/Sub, Cloud Tasks, Vertex AI, BigQuery and Secret Manager, defined as Terraform, with deploys through GitLab CI." },
      { title: "Privacy as a rule, not a setting", body: "The design keeps no audio: buffers are converted in memory and wiped. Small groups of requests are suppressed in the analytics views." },
      { title: "Explainable prioritisation", body: "A multi-criteria ranking with live sliders, so a planner can see how the order changes when the weights change." },
    ],
    repo: "https://gitlab.com/viren.singh.email/vani",
    source: "README at gitlab.com/viren.singh.email/vani, fetched 2026-10-08",
    note: "Honest status: a prototype. It has the design, but it has not been deployed or tested.",
  },
];
