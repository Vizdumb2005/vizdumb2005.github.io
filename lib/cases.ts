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
];
