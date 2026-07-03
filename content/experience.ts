export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
};

export const experience: Experience[] = [
  // Reverse-chronological. Movira intentionally excluded; UTAT backfills.
  {
    company: "UTAT — University of Toronto Aerospace Team",
    role: "Software Lead, UAV Multicopter",
    period: "Sep 2025 – present",
    summary:
      "Flight software for a hybrid VTOL UAV (multi-copter + fixed-wing). Two workstreams: a Modern C++ " +
      "event-driven IPC framework for the autonomous flight nodes, and the PX4/Simulink flight-control stack.",
    highlights: [
      "Architected a resilient event-driven IPC framework in Modern C++ — fault-tolerant crash resilience, asynchronous state synchronization across mission-critical cycles",
      "Defined the test strategy and integration test suite for flight-node protocols, reducing field-failure rates",
      "PX4 flight control for multi-copter/fixed-wing mode transitions; closed-loop attitude + rate controllers in Simulink; PID gain tuning from flight-log analysis",
    ],
  },
  {
    company: "Ribbit",
    role: "SWE Intern, Robotics",
    period: "Sep 2024 – Aug 2025",
    summary:
      "Distributed autonomy software for a cargo aircraft in remote environments — part of North " +
      "America's first peer-to-peer heterogeneous autonomous aircraft search-and-rescue mission (with NRC).",
    highlights: [
      "Embedded C++17 drivers for safety-critical sensors/actuators via template metaprogramming (zero runtime overhead)",
      "Zero-copy data passing for deterministic sub-100ms telemetry cycles",
      "XPlane11 sim bridge for HITL/SITL testing; multi-threaded RF audio streaming with custom buffer management",
    ],
    metrics: [
      { label: "telemetry latency", value: "sub-100 ms" },
      { label: "availability", value: "99.9%" },
    ],
  },
  {
    company: "aUToronto",
    role: "Software Developer, DL Acceleration",
    period: "Sep 2023 – Apr 2024",
    summary:
      "UofT's self-driving team. Led refactoring the deep-learning perception pipeline from Python into " +
      "optimized C++ ROS2 nodes.",
    highlights: [
      "Refactored latency-critical perception modules Python → C++ ROS2 nodes",
      "Profiled with Intel VTune + Valgrind; fixed cache misses and heap bottlenecks",
      "CUDA-accelerated inference on vehicle-grade GPUs; Dockerized CV pipelines on live vehicle hardware",
    ],
    metrics: [
      { label: "throughput", value: "+140%" },
      { label: "inference", value: ">5× via memory-efficient ops" },
      { label: "CPU overhead", value: "−27% at peak load" },
    ],
  },
];
