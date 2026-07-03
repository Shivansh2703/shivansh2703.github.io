export type Metric = { label: string; value: string };
export type Media = { type: "video" | "image"; src: string; alt: string };
export type CodeSnippet = { lang: string; caption: string; code: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  role?: string;
  tier: "hero" | "grid";
  tags: string[];
  metrics?: Metric[];
  repo?: string | null;
  media?: Media[];
  // hero-only case-study fields (safe to omit on grid):
  problem?: string;
  approach?: string[];
  results?: string[];
  codeSnippet?: CodeSnippet;
  architecture?: string;
};

export const projects: Project[] = [
  // ─────────────────────────── HERO ───────────────────────────
  {
    slug: "velox-lob",
    name: "Velox-LOB",
    tagline: "A sub-microsecond limit order book in pure C++20.",
    year: "2026",
    tier: "hero",
    tags: ["C++20", "Data-Oriented Design", "lock-free", "AVX-512 SIMD", "custom allocator"],
    metrics: [
      { label: "order updates / sec", value: "1,000,000+" },
      { label: "matching latency", value: "4× lower (SIMD)" },
      { label: "order processing", value: "sub-µs" },
    ],
    repo: null,
    problem:
      "Matching engines live and die by tail latency: heap fragmentation and cache misses cause " +
      "non-deterministic spikes that are unacceptable in a hot trading path.",
    approach: [
      "Data-Oriented Design of the book for L1 cache-hit maximization and memory alignment",
      "Custom fixed-size block pool allocator replacing std::allocator — eliminates latency spikes from heap fragmentation",
      "Lock-free single-producer/single-consumer (SPSC) queue via std::atomic",
      "AVX-512 SIMD intrinsics to parallelize price-level updates",
    ],
    results: [
      "1M+ order updates/sec sustained",
      "4× reduction in matching latency via SIMD",
      "sub-microsecond order processing",
    ],
    // codeSnippet: uncomment once a real ~15-line excerpt is pasted from the repo
    // (SPSC push or pool allocator). A "// TODO" body must never ship — the block
    // stays absent until real code exists, same convention as the media arrays.
    // codeSnippet: {
    //   lang: "cpp",
    //   caption: "Lock-free SPSC enqueue on the hot path",
    //   code: `...`,
    // },
    architecture:
      "Ingress → lock-free SPSC queue → matching core (DOD book, pool allocator) → SIMD price-level update.",
  },
  {
    slug: "robotic-service-dog",
    name: "Robotic Service Dog",
    tagline: "An autonomous quadruped that follows and monitors Alzheimer's patients.",
    year: "2025–present",
    role: "Lead Architect · Engineering Capstone",
    tier: "hero",
    tags: ["ROS2", "C++", "Python", "OpenCV", "Inverse Kinematics", "visual servoing", "Docker"],
    metrics: [
      { label: "leg actuation", value: "3-DOF IK" },
      { label: "control loop", value: "closed-loop visual servoing" },
    ],
    repo: null,
    // media: uncomment in Phase 5 once the files exist in public/media/robotic-service-dog/
    // (shipping paths to missing files renders broken elements):
    // media: [
    //   { type: "video", src: "/media/robotic-service-dog/follow-demo.mp4", alt: "Quadruped autonomously following a person" },
    //   { type: "image", src: "/media/robotic-service-dog/robot.jpg", alt: "The robotic service dog platform" },
    // ],
    problem:
      "Assistive robotics for dementia care needs reliable person-following and health monitoring on a " +
      "legged platform — many interacting subsystems that must stay in sync in real time.",
    approach: [
      "Distributed ROS2 stack integrating perception, planning, and control",
      "Closed-loop visual servoing: OpenCV state estimates → velocity commands → adaptive human tracking",
      "IK solver + 3-DOF leg actuation for smooth locomotion from task-space trajectories",
      "Custom ROS2 QoS profiles for deterministic multi-node communication",
      "C++ camera + actuator drivers integrated with the full stack; Dockerized team dev environment",
    ],
    results: [
      "End-to-end person-following on a physical quadruped",
      "Led the system architecture across the capstone team",
    ],
    architecture: "Perception (OpenCV) → Planning → Control (IK, servo) over a ROS2 graph with custom QoS.",
  },
  {
    slug: "rescue-ranger",
    name: "Rescue Ranger",
    tagline: "Autonomous search-and-rescue rover — 1st of 150+ teams at UofTHacks X.",
    year: "2023",
    role: "UofTHacks X · 1st Place",
    tier: "hero",
    tags: ["C++", "OpenCV", "React", "Google Maps API", "Arduino", "3D printing", "REST"],
    metrics: [
      { label: "result", value: "1st / 150+ teams" },
      { label: "build time", value: "24 hr hackathon" },
    ],
    repo: null,
    // media: uncomment in Phase 5 once the files exist in public/media/rescue-ranger/:
    // media: [
    //   { type: "image", src: "/media/rescue-ranger/rover.jpg", alt: "3D-printed autonomous rover" },
    //   { type: "image", src: "/media/rescue-ranger/team.jpg", alt: "Team receiving 1st place at UofTHacks X" },
    // ],
    problem:
      "Disaster response needs cheap, deployable rovers that can locate survivors and stream their " +
      "positions back to responders — end-to-end, hardware to web, in one night.",
    approach: [
      "3D-printed chassis integrating sensors, motors, and an Arduino microcontroller",
      "Obstacle-avoidance algorithm in C++",
      "OpenCV survivor-identification pipeline",
      "Real-time web visualization with React + Google Maps API over REST APIs",
    ],
    results: ["1st place out of 150+ teams", "Full hardware→software system delivered in 24 hours"],
    architecture: "Rover (Arduino + C++ avoidance + OpenCV) → REST → React + Google Maps live view.",
  },
  {
    slug: "black-scholes-engine",
    name: "Black-Scholes Quant Engine",
    tagline: "High-throughput options pricing with SIMD-vectorized Greeks.",
    year: "2024–2025",
    tier: "hero",
    tags: ["C++", "AVX-512 SIMD", "CRTP", "Monte Carlo"],
    metrics: [{ label: "Greek calculations", value: "6× speedup (SIMD)" }],
    repo: null,
    problem:
      "Pricing options and their sensitivities (Greeks) at throughput means fighting virtual-call " +
      "overhead and scalar math in the hot kernel.",
    approach: [
      "Black-Scholes + Monte Carlo pricing",
      "AVX-512 SIMD vectorization for Greek sensitivities (Delta, Gamma, Vega)",
      "CRTP to eliminate virtual-function overhead in the simulation kernel",
    ],
    results: ["6× speedup on Greek calculations via SIMD"],
    // codeSnippet: uncomment once a real CRTP kernel / SIMD Greek excerpt is pasted
    // from the repo. A "// TODO" body must never ship — stays absent until real code exists.
    // codeSnippet: {
    //   lang: "cpp",
    //   caption: "CRTP kernel — zero-cost static dispatch",
    //   code: `...`,
    // },
    architecture: "CRTP pricing kernel → SIMD-vectorized Greek pass → aggregation.",
  },
  {
    slug: "aether-flow",
    name: "Aether-Flow",
    tagline: "A distributed, low-latency engine that orchestrates agentic inference.",
    year: "2026–present",
    tier: "hero",
    tags: ["C++23", "Go", "gRPC", "Docker", "PyTorch", "lock-free"],
    metrics: [{ label: "hardware utilization", value: "+40% (dynamic batching)" }],
    repo: null,
    problem:
      "Serving agentic workflows across decoupled vision-language and LLM services wastes accelerator " +
      "time when requests aren't batched intelligently.",
    approach: [
      "Distributed low-latency execution engine in C++23 orchestrating agentic workflows across decoupled VLM/LLM services",
      "High-throughput async gRPC streaming backend in Go with a custom lock-free priority queue that dynamically batches incoming state requests",
    ],
    results: ["40% increase in hardware utilization via dynamic batching"],
    architecture:
      "Go gRPC front (lock-free priority queue, dynamic batching) → C++23 orchestrator → decoupled VLM/LLM inference services.",
  },

  // ─────────────────────────── GRID ───────────────────────────
  {
    slug: "utat-uav",
    name: "UTAT — VTOL Flight Software",
    tagline: "Event-driven IPC + PX4 flight control for a hybrid VTOL UAV.",
    year: "2025–present",
    role: "Software Lead",
    tier: "grid",
    tags: ["Modern C++", "PX4", "Simulink", "PID", "event-driven IPC"],
    repo: null,
  },
  {
    slug: "kuka-kr6",
    name: "KUKA KR6 Waste-Segregation Arm",
    tagline: "6-DOF arm — DH kinematics + jerk-limited trajectory planning.",
    year: "2025",
    tier: "grid",
    tags: ["Simulink", "DH parameters", "FK/IK", "trajectory planning"],
    repo: null,
  },
  {
    slug: "stm32-ble-rover",
    name: "STM32 BLE Rover",
    tagline: "Bare-metal C firmware — obstacle avoidance + BLE camera streaming.",
    year: "2024",
    tier: "grid",
    tags: ["C (bare-metal)", "STM32", "UART", "BLE", "FPGA", "Assembly"],
    metrics: [{ label: "camera stream latency", value: "<500 ms" }],
    repo: null,
  },
  {
    slug: "pvz-arm",
    name: "Plants vs. Zombies — ARM Engine",
    tagline: "PvZ clone rendered to a raw framebuffer, no graphics library.",
    year: "2023",
    tier: "grid",
    tags: ["C++", "ARM", "raw framebuffer", "collision detection"],
    repo: null,
  },
  {
    slug: "bird-animation-gan",
    name: "Bird Animation Model",
    tagline: "GAN that synthesizes bird-flight sequences from real images.",
    year: "2023",
    tier: "grid",
    tags: ["PyTorch", "YOLOv5", "CNN", "GAN", "CUDA"],
    metrics: [
      { label: "images processed", value: "18,000+" },
      { label: "training time", value: "3× faster (CUDA)" },
    ],
    repo: null,
  },
  {
    slug: "tourguide-pro",
    name: "TourGuide Pro",
    tagline: "High-performance C++ mapping engine over OpenStreetMap data.",
    year: "2023",
    tier: "grid",
    tags: ["C++", "multithreading", "Dijkstra", "A*", "OpenStreetMap"],
    metrics: [
      { label: "query latency", value: "200 ms" },
      { label: "startup time", value: "10× faster (parallel parse)" },
    ],
    repo: null,
  },
  {
    slug: "roboprenr",
    name: "Roboprenr",
    tagline: "Pseudo-humanoid with vision, face recognition, and a ROS2 stack.",
    year: "2023",
    tier: "grid",
    tags: ["ROS2 Humble", "Raspberry Pi 4", "OpenCV", "PyTorch", "PCB design"],
    repo: null,
  },
  {
    slug: "vscode-extension",
    name: "VS Code Extension",
    tagline: "Streaming AI feedback in-editor — local-first, latency-focused.",
    year: "2025",
    tier: "grid",
    tags: ["TypeScript", "VS Code API", "Anthropic API", "streaming"],
    repo: null,
  },
  {
    slug: "daisy",
    name: "Daisy + Odysseus",
    tagline: "A personal OS — Obsidian knowledge graph + autonomous research agent.",
    year: "2026",
    tier: "grid",
    tags: ["agent", "Claude", "Obsidian", "automation"],
    repo: null,
  },
];

// Build-time guard: a duplicate slug silently collides in generateStaticParams
// and one case-study page swallows the other. Fail the build instead.
const seen = new Set<string>();
for (const p of projects) {
  if (seen.has(p.slug)) {
    throw new Error(`Duplicate project slug: "${p.slug}" — slugs must be unique.`);
  }
  seen.add(p.slug);
}

// Derived views so pages never re-filter.
export const heroProjects = projects.filter((p) => p.tier === "hero");
export const gridProjects = projects.filter((p) => p.tier === "grid");
