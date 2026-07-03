export type Experience = {
  org: string;
  role: string;
  period: string; // "" if unknown → the UI omits the date
  kind: "work" | "team";
  url?: string; // org/company site → org name becomes a link
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
};

// One section, two groups (kind). Work = paid/company roles; team = design teams
// & involvement. Movira intentionally excluded. Each group renders reverse-chron.
export const experience: Experience[] = [
  // ─────────────────────────── WORK ───────────────────────────
  {
    org: "Ribbit",
    role: "SWE Intern, Robotics",
    period: "Sep 2024 – Aug 2025",
    kind: "work",
    url: "https://www.flyribbit.com",
    summary:
      "Distributed autonomy software for a cargo aircraft in remote environments — part of North " +
      "America's first peer-to-peer heterogeneous autonomous aircraft search-and-rescue mission (with the NRC).",
    highlights: [
      "Embedded C++17 drivers for safety-critical sensors/actuators via template metaprogramming (zero runtime overhead)",
      "Zero-copy data passing for deterministic sub-100 ms telemetry cycles",
      "X-Plane 11 sim bridge for HITL/SITL testing; multi-threaded RF audio streaming with custom buffer management",
    ],
    metrics: [
      { label: "telemetry latency", value: "sub-100 ms" },
      { label: "availability", value: "99.9%" },
    ],
  },
  {
    org: "Roboprenr",
    role: "Robotics Intern",
    period: "May 2023 – Aug 2023",
    kind: "work",
    summary:
      "Built a pseudo-humanoid robot with computer vision, face recognition, and a ROS2 control stack — " +
      "hardware and software from zero.",
    highlights: [
      "3D-printed chassis + custom PCBs wiring components to a Raspberry Pi 4",
      "ROS2 Humble on embedded Linux for modular robot control",
      "OpenCV computer vision in C++; PyTorch face-recognition models",
    ],
  },

  // ─────────────────── TEAMS & INVOLVEMENT ───────────────────
  {
    org: "UTAT — University of Toronto Aerospace Team",
    role: "Software Lead, UAV Multicopter",
    period: "Sep 2025 – present",
    kind: "team",
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
    org: "aUToronto",
    role: "Software Developer, DL Acceleration",
    period: "Sep 2023 – Apr 2024",
    kind: "team",
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
  {
    org: "UTRA — University of Toronto Robotics Association",
    role: "Project Manager, Autonomous SUMO Robot",
    period: "Sep 2022 – Apr 2023",
    kind: "team",
    summary:
      "Led UTRA's autonomous SUMO robot project — a combat robot that detects an opponent and drives it " +
      "out of the ring while staying inside the edge itself.",
    highlights: [
      "Managed the sub-team through design, build, and competition",
      "Coordinated the mechanical, electrical, and software workstreams — opponent/edge detection, motor control, and match strategy",
    ],
  },
  {
    org: "RSX — Robotics for Space Exploration",
    role: "Robotic Arm Team — Inverse Kinematics",
    period: "Sep 2021 – Apr 2022",
    kind: "team",
    summary:
      "Member of RSX's robotic-arm team, working on the inverse kinematics for a space-robotics manipulator.",
    highlights: [
      "Worked on inverse-kinematics solving to position the arm's end-effector for manipulation tasks",
      "Mapped target poses to joint configurations for controlled, collision-aware arm motion",
    ],
  },
  // NOTE: role/dates below are best-effort from the repos (2022–23) — edit as needed.
  {
    org: "UTHT — University of Toronto Hyperloop Team",
    role: "Electronics & Firmware",
    period: "2022 – 2023",
    kind: "team",
    summary:
      "Worked on the test-track electronics for UofT's Hyperloop pod — sensing and control firmware on Arduino.",
    highlights: [
      "Arduino firmware for the test-track sensing/control electronics",
      "Bring-up and testing of the electronics on the track hardware",
    ],
  },
  {
    org: "UTFO — University of Toronto",
    role: "Web Developer",
    period: "2022",
    kind: "team",
    summary:
      "Built the team's React web application (CSCE) — front-end development for the club's web presence.",
    highlights: ["React front-end for the team's web platform"],
  },
];

// Derived groups so the section renders without re-filtering.
export const workExperience = experience.filter((e) => e.kind === "work");
export const teamExperience = experience.filter((e) => e.kind === "team");
