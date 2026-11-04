/* Single source of truth for every word on jackle.dev.
   Numbers here are taken from project READMEs, benchmark docs and commit
   history — keep them that way. If a figure can't be traced, it doesn't go in. */

export const PROFILE = {
  name: 'Jack Le',
  legalName: 'Tiep Le',
  role: 'CTO · Solutions & Technical Architect',
  email: 'lktiep@gmail.com',
  github: 'https://github.com/lktiep',
  site: 'https://jackle.dev',
  since: 2008,
  headline: 'I architect platforms that stay correct under load — and lead the teams that ship them.',
  summary:
    'Eighteen years across telecom, enterprise SaaS, gaming, Web3 and AgriTech — from a 300-engineer delivery division to the CTO seat. Today I design AI-native systems: agent memory over MCP, server-authoritative economies, deterministic real-time simulation.',
};

export const PROOF = [
  { value: 18, suffix: '', label: 'years shipping production systems', note: 'since 2008' },
  { value: 300, suffix: '', label: 'engineer division I was Technical Architect for', note: 'TMA Solutions · DG1' },
  { value: 96.0, decimals: 1, suffix: '%', label: 'recall@5 on LongMemEval-S, 500 questions', note: 'Cortex Hub benchmark' },
  { value: 1.6, decimals: 1, suffix: ' ms', label: 'sim tick p50 with 64 players, 718 units', note: 'RA2 Studio server' },
  { value: 4000, suffix: '', label: 'CCU ceiling, up from 2,500 after one optimisation pass', note: 'Xóm Nông Trại load test' },
  { value: 4, suffix: '', label: 'countries on-site with enterprise clients', note: 'Vietnam · USA · UK · Australia' },
];

export const PRACTICE = [
  {
    id: 'frame',
    step: '01',
    title: 'Frame the problem with the people who own it',
    body:
      'Solution workshops and pre-sales with insurers, banks and hospitals. I turn a business outcome into constraints a system can be judged against: volumes, latency budgets, data residency, audit and compliance.',
    points: ['Stakeholder discovery', 'Non-functional requirements', 'Build vs. buy', 'Cost envelope'],
    artifact: {
      kind: 'brief',
      title: 'example · solution-brief.md',
      lines: [
        ['goal', 'cut claim turnaround from days to hours'],
        ['load', 'many insurers · month-end bursts'],
        ['latency', 'p95 < 500 ms on submit'],
        ['data', 'PII stays in-region, audit every read'],
        ['ai', 'model drafts · human decides'],
      ],
    },
  },
  {
    id: 'model',
    step: '02',
    title: 'Model it so everyone can argue with it',
    body:
      'C4 context → container → component diagrams, ADRs for every irreversible decision, explicit data contracts. Diagrams that a COO and a junior engineer read the same way.',
    points: ['C4 diagrams', 'Architecture Decision Records', 'Data contracts', 'Threat model'],
    artifact: {
      kind: 'adr',
      title: 'adr-0007-ledger.md',
      lines: [
        ['status', 'accepted'],
        ['context', 'every currency change must be explainable'],
        ['decision', 'append-only ledger + idempotency keys'],
        ['also', 'transactional outbox for side effects'],
        ['tradeoff', 'more rows, zero silent drift'],
      ],
    },
  },
  {
    id: 'build',
    step: '03',
    title: 'Build the platform, not just the feature',
    body:
      'Service boundaries, golden paths and shared rule libraries so the client predicts and the server decides. LLM, OCR and agent workflows wired in behind approval gates — the model proposes, a human signs off.',
    points: ['Microservices & APIs', 'LLM / OCR / agent integration', 'Human-in-the-loop', 'GCP · AWS · Kubernetes'],
    artifact: {
      kind: 'flow',
      title: 'ops-agent.flow',
      lines: [
        ['read', '26 tools · no DB, no SSH, no SQL'],
        ['write', '3 capped tools · daily quota'],
        ['propose', '11 tools → admin_approvals'],
        ['approve', 'human, never the requester'],
        ['audit', 'every action, with a reason'],
      ],
    },
  },
  {
    id: 'prove',
    step: '04',
    title: 'Prove it with numbers, then operate it',
    body:
      'Load tests with interleaved A/B runs, parity gates that fail the build on a single bit of drift, p99 budgets wired into dashboards. A change ships when the benchmark says so.',
    points: ['Load & soak testing', 'SLOs & observability', 'Profiling', 'Capacity planning'],
    artifact: {
      kind: 'bench',
      title: 'ra2-bench · 64 players',
      lines: [
        ['tick p50', '1.6 ms'],
        ['tick worst', '8.7 ms · none > 15 ms'],
        ['bandwidth', '0.8 KB/s per player'],
        ['dropped', '0'],
        ['parity', 'native ≡ wasm to 1e-9'],
      ],
    },
  },
] as const;

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  architecture: string[];
  evidence: { value: string; label: string }[];
  stack: string[];
  link?: { href: string; label: string };
  status: string;
  image?: { src: string; alt: string };
  spec?: { file: string; big: string; bigLabel: string; rows: [string, string][] };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'xom-nong-trai',
    index: '01',
    title: 'Xóm Nông Trại',
    kicker: 'Server-authoritative social platform with a real economy',
    period: '2026',
    role: 'Architect & lead engineer',
    summary:
      'A social farming game whose hardest problems are financial: every coin is money-like, players act concurrently, and live-ops staff need power without risk.',
    problem:
      'Concurrent players, a currency that must never drift, and operators (human and AI) who need to change prices and issue refunds safely.',
    architecture: [
      'Fastify + WebSocket server is the single source of truth; a shared rules package lets the client predict while the server decides.',
      'Append-only ledger for every gold/xu change, idempotency key on every mutation, transactional outbox for quests, analytics and notifications.',
      'Versioned config bundles with sha256 checksums — running jobs keep the version they started with.',
      'Ops MCP: AI agents read through the admin API only and can only file proposals; refunds above a threshold need a second, different approver.',
    ],
    evidence: [
      { value: '2.5k → 4k', label: 'CCU ceiling after one server pass' },
      { value: '−12%', label: 'CPU per request (930 → 818 µs)' },
      { value: '171', label: 'Playwright end-to-end specs' },
      { value: '40', label: 'ops tools · 11 proposal-only' },
    ],
    stack: ['TypeScript', 'Fastify', 'PostgreSQL 16', 'Redis · BullMQ', 'Three.js', 'MCP', 'OpenTelemetry'],
    status: 'Private repository',
    spec: {
      file: 'xom-nong-trai / architecture',
      big: '4,000',
      bigLabel: 'CCU ceiling on 4 shards, up from 2,500',
      rows: [
        ['server', 'Fastify · WebSocket · authoritative'],
        ['rules', 'shared package · client predicts'],
        ['money', 'append-only ledger · idempotency keys'],
        ['effects', 'transactional outbox → BullMQ'],
        ['config', 'versioned bundles · sha256'],
        ['ops', 'MCP · 26 read · 3 capped · 11 propose'],
        ['tests', '171 Playwright end-to-end specs'],
      ],
    },
  },
  {
    slug: 'cortex-hub',
    index: '02',
    title: 'Cortex Hub',
    kicker: 'One MCP endpoint for AI agent memory and code intelligence',
    period: '2026',
    role: 'Creator',
    summary:
      'Self-hosted platform that gives every AI coding agent on a team the same persistent memory, AST-aware code search, shared knowledge and quality gates.',
    problem:
      'Agents forget everything between sessions and every tool reinvents context. Teams need one governed memory layer that works across clients, repos and machines.',
    architecture: [
      'MCP gateway with API-key auth and telemetry in front of Qdrant vectors, an AST code graph and SQLite in WAL mode.',
      'Knowledge store with temporal validity and supersession chains; recipes ranked 0.6 vector + 0.3 success rate + 0.1 recency.',
      'LLM gateway with fallback chains, budgets and complexity routing; local embeddings via Ollama.',
      'Conductor dispatches work across agents and machines with leases, file locks, review gates and escalation.',
    ],
    evidence: [
      { value: '96.0%', label: 'recall@5 · LongMemEval-S (500 q)' },
      { value: '97.8%', label: 'recall@10 on the same set' },
      { value: '~10 ms', label: 'local embedding vs ~600 ms API' },
      { value: '890+', label: 'commits · MIT licensed' },
    ],
    stack: ['TypeScript', 'MCP', 'Qdrant', 'SQLite', 'Ollama', 'Next.js', 'Docker', 'Cloudflare Tunnel'],
    link: { href: 'https://github.com/lktiep/cortex-hub', label: 'github.com/lktiep/cortex-hub' },
    status: 'Open source · live at hub.jackle.dev',
    image: { src: '/projects/cortex-hub.png', alt: 'Cortex Hub dashboard showing projects, memory and agent sessions' },
  },
  {
    slug: 'ra2-studio',
    index: '03',
    title: 'RA2 Studio',
    kicker: 'Deterministic real-time simulation, native and WebAssembly',
    period: '2026',
    role: 'Sole engineer',
    summary:
      'A clean-room, web-native RTS engine: one Rust simulation core compiled to native and WASM, an authoritative multiplayer server and a WebGL2 client.',
    problem:
      'Thousands of units, dozens of players, a browser client — and results that must be bit-identical everywhere so replays and anti-cheat can trust them.',
    architecture: [
      'Dependency-free Rust sim core; a parity gate replays golden traces natively and in WASM and fails on drift beyond 1e-9.',
      'Authoritative 30 Hz server streaming binary delta snapshots, filtered per player by camera and line of sight.',
      'Room supervisor runs one process per match and restarts crashed rooms with backoff.',
      'Edge security on Cloudflare Workers: Turnstile, single-use IP-bound HMAC join tickets, per-IP caps, pseudonymous identity.',
    ],
    evidence: [
      { value: '1.6 ms', label: 'tick p50 · 64 players, 718 units' },
      { value: '0.8 KB/s', label: 'bandwidth per player · 0 dropped' },
      { value: '26 → 4.4 ms', label: 'client frame p99 after one fix' },
      { value: '60 fps', label: '64 × 500 units, frame p99 2.7 ms' },
    ],
    stack: ['Rust', 'WebAssembly', 'tokio', 'WebGL2', 'Cloudflare Workers', 'Durable Objects', 'WebRTC'],
    status: 'Private repository',
    spec: {
      file: 'ra2-studio / bench',
      big: '1.6 ms',
      bigLabel: 'server tick p50 · 64 players · 0 dropped',
      rows: [
        ['core', 'Rust · zero deps · fixed step'],
        ['targets', 'native + wasm32 · parity 1e-9'],
        ['net', '30 Hz · delta snapshots 15/s'],
        ['interest', 'per-player camera + line of sight'],
        ['render', 'WebGL2 · batched sprites'],
        ['edge', 'Workers · Durable Objects · Turnstile'],
        ['20k units', 'step p50 3.5 ms · p99 8.3 ms'],
      ],
    },
  },
  {
    slug: 'shrimp-farm',
    index: '04',
    title: 'Shrimp Farm Platform',
    kicker: 'Multi-tenant AgriTech SaaS for commercial aquaculture',
    period: '2024 — present',
    role: 'CTO & lead engineer',
    summary:
      'Farm management for operators running dozens of farms with thousands of ponds: real-time monitoring, water-quality analytics and AI camera detection.',
    problem:
      'Field data arrives from sensors and phones in poor connectivity, while owners need one trustworthy view across every farm they run.',
    architecture: [
      'Tenant-scoped data model across farms, ponds and crop cycles.',
      'On-device TFLite detection with Gemini Vision as cloud fallback.',
      'Real-time dashboards and alerting over the water-quality pipeline.',
    ],
    evidence: [
      { value: 'Dozens', label: 'farms managed per operator' },
      { value: '1000s', label: 'ponds under monitoring' },
    ],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'TFLite', 'Gemini', 'GCP', 'IoT'],
    link: { href: 'https://farms.shrimpfarm.vn', label: 'farms.shrimpfarm.vn' },
    status: 'In production',
    image: { src: '/projects/shrimp-farm.png', alt: 'Shrimp Farm Platform dashboard with pond monitoring' },
  },
  {
    slug: 'keo-thom',
    index: '05',
    title: 'Kèo Thơm',
    kicker: 'Real-time auction marketplace with escrowed wallets',
    period: '2025',
    role: 'Architect & full-stack engineer',
    summary:
      'Social marketplace for group-buy deals and live auctions, with an integrated wallet, frozen funds during bidding, seller verification and automated payouts.',
    problem: 'Bids land concurrently in the last seconds; money must be reserved, released or paid out exactly once.',
    architecture: [
      'Wallet with frozen-funds holds so a bid is only valid while backed by reserved balance.',
      'Real-time bid stream with server-side ordering; seller verification and automated payout jobs.',
    ],
    evidence: [],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Cloudflare Pages', 'TypeScript'],
    link: { href: 'https://keothom.bid', label: 'keothom.bid' },
    status: 'In production',
    image: { src: '/projects/keothom.png', alt: 'Kèo Thơm marketplace with live auctions' },
  },
];

export const ALSO_BUILT = [
  { title: 'Cortex bench harness', note: 'Five-arm controlled experiment measuring what an AI agent still remembers on day two.' },
  { title: '3D Character Lab', note: 'Image → Blender → WebGPU pipeline scored by silhouette IoU, SSIM and per-region ΔE.' },
  { title: 'game-dev skills', note: 'Claude Code plugin with 7 skills distilled from shipping a live game: perf, content, monetisation guardrails.' },
  { title: 'CUGF Render Bench', note: 'Local-GPU exploded-view renderer; WebP export cut each 96-frame set from 69 MB to 3.6 MB.' },
  { title: 'Spiral Studio', note: 'Profile curve → spiral toolpath → G-code for five printer profiles, in the browser.' },
  { title: 'ZaloX', note: 'CLI and REST API for Zalo messaging with webhooks, published on npm.' },
];

export const EXPERIENCE = [
  {
    period: '2023 — now',
    role: 'Principal Engineer & Architect',
    org: 'Independent · AI & platform engineering',
    summary: 'Design and build production platforms end to end, from the first stakeholder conversation to the on-call runbook.',
    highlights: [
      'Architected Xóm Nông Trại: ledger-backed economy, idempotent mutations, outbox, and AI ops agents limited to proposals that humans approve.',
      'Created Cortex Hub, an open-source MCP platform for agent memory and code intelligence (96.0% recall@5 on LongMemEval-S).',
      'Built a deterministic Rust/WASM simulation and authoritative multiplayer server, benchmarked to 1.6 ms tick p50 at 64 players.',
      'Delivered a multi-tenant AgriTech platform and the Kèo Thơm real-time auction marketplace.',
    ],
    stack: ['TypeScript', 'Node.js', 'Rust', 'PostgreSQL', 'Redis', 'GCP', 'Cloudflare', 'MCP', 'LLM'],
  },
  {
    period: '2022 — 2023',
    role: 'Chief Technology Officer',
    org: 'High-tech agriculture company',
    summary: 'Led architecture for a platform running thousands of hectares of production.',
    highlights: [
      'Big-data pipelines processing millions of field data points for real-time monitoring and analytics.',
      'Crop lifecycle, export-compliance traceability and live operational dashboards on distributed services.',
      'Kept the system scalable and reliable under continuous data growth.',
    ],
    stack: ['Microservices', 'Kubernetes', 'PostgreSQL', 'Big data', 'Real-time'],
  },
  {
    period: '2021 — 2022',
    role: 'Chief Technology Officer',
    org: 'D2 Solutions',
    summary: 'Founded and led the team behind a cross-platform 3D multiplayer game with a Web3 economy.',
    highlights: [
      'Distributed real-time backend built to scale to millions of users with elastic micro-clusters of ~20 players per room.',
      'Custom low-latency TCP networking layer that removed the dependency on Photon.',
      'gRPC, Kafka and Redis on Kubernetes (HPA/VPA) with CI/CD and a full observability stack.',
      'Auditable on-chain / off-chain token economy.',
    ],
    stack: ['C++', 'Unity', 'gRPC', 'Kafka', 'Redis', 'Kubernetes', 'AWS', 'GCP'],
  },
  {
    period: '2018 — 2021',
    role: 'Technical Architect',
    org: 'Enterprise platforms',
    summary: 'Architecture for ERP, logistics and e-commerce platforms serving 100K+ users.',
    highlights: ['Microservices on Kubernetes with PostgreSQL and CI/CD on AWS.'],
    stack: ['Microservices', 'Kubernetes', 'PostgreSQL', 'AWS', 'CI/CD'],
  },
  {
    period: '2016 — 2018',
    role: 'Senior Software Engineer',
    org: 'Ansarada',
    summary: 'Enterprise SaaS for deal management and virtual data rooms.',
    highlights: [
      'Clean code, automated testing and CI/CD as the default, in a top-16 best-workplace engineering culture.',
      'Moved from outsourcing to product engineering: features measured by customer value.',
    ],
    stack: ['.NET', 'SaaS', 'CI/CD', 'Clean Architecture'],
  },
  {
    period: '2008 — 2016',
    role: 'Technical Architect · Senior Engineer',
    org: 'TMA Solutions',
    summary: 'Grew from engineer to Technical Architect for the DG1 division (~300 engineers), serving global telecom clients.',
    highlights: [
      'Owned architecture, technical direction and mentoring across the division.',
      'High-performance multi-threaded C/C++ on Windows, Linux and Solaris; led Windows → Linux and 32 → 64-bit ports down to drivers.',
      'On-site with customers in the USA (twice, six months each), the UK and Australia (twice).',
    ],
    stack: ['C/C++', 'Telecom', 'Linux', 'Solaris', 'Multi-threading'],
  },
];

export const CAPABILITIES = [
  {
    area: 'Architecture',
    items: ['Distributed systems', 'Microservices & event-driven', 'Real-time & multiplayer', 'Multi-tenant SaaS', 'C4 · ADRs · data contracts', 'Security & threat modelling'],
  },
  {
    area: 'AI systems',
    items: ['LLM integration (OpenAI, Gemini, Claude)', 'OCR & document pipelines', 'Agents & MCP servers', 'RAG & vector search', 'Human-in-the-loop approval', 'Evaluation & benchmarks'],
  },
  {
    area: 'Cloud & platform',
    items: ['Google Cloud', 'AWS', 'Kubernetes (HPA/VPA)', 'Cloudflare Workers', 'CI/CD & IaC', 'Observability · OpenTelemetry'],
  },
  {
    area: 'Backend & data',
    items: ['Node.js · NestJS · Fastify', 'Rust · Go · C/C++ · .NET', 'PostgreSQL · MySQL', 'Redis · Kafka · BullMQ', 'gRPC · REST · WebSocket', 'Ledgers, idempotency, outbox'],
  },
  {
    area: 'Leadership & clients',
    items: ['Pre-sales & solution workshops', 'Exec & client presentations', 'Teams up to ~300 engineers', 'Delivery across Product · QA · DevOps', 'Code review & standards', 'Mentoring'],
  },
];

export const DOMAINS = [
  'Insurance',
  'Banking',
  'Healthcare',
  'Telecom',
  'Enterprise SaaS',
  'Gaming & real-time',
  'Web3',
  'AgriTech & IoT',
  'AI developer tooling',
];

export const RECOGNITION = [
  { title: 'Winner, CodeProject Visual Studio Extension Contest', note: 'Developer tooling' },
  { title: 'First Vietnamese to solve 300+ Project Euler problems', note: 'Mathematics & algorithms' },
  { title: 'Products reaching 100,000+ users and downloads', note: 'Consumer scale' },
  { title: 'Reverse-engineered a 3D online game client at assembly level', note: 'Protocol reconstruction' },
];
