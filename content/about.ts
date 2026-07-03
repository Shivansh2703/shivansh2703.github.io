export const about = {
  name: "Shivansh Singh",
  role: "Robotics software engineer · hardware to autonomy",
  // The five disciplines shown as the hero's breadth statement.
  disciplines: ["Software", "Hardware", "Controls", "Electrical", "Mechanical"],
  // Hero one-liner — kept short; the breadth lives in the chips + the loop diagram.
  blurb: "I build software that works in the real world — and I like helping people with it.",
  // About-section paragraph — distinct from the hero blurb; the point is versatility.
  bio:
    "The range is the point. I like owning a problem end to end — laying out the board, writing the " +
    "firmware, closing the control loop, and building the software on top — and I pick up whatever " +
    "the problem needs. That's taken me from bare-metal rovers to autonomous quadrupeds to " +
    "distributed systems, and I learn the next thing fast. What keeps me hooked is building things " +
    "that work in the real world — software I can point at and watch actually do something — and " +
    "using it to help people.",
  athletics:
    "Varsity wrestling and rowing at UofT, national-level MMA/BJJ (Canadian nationals bronze), and a " +
    "national-level swimmer in India. The through-line: I seek out environments with a high bar.",
  hackathons: ["UofTHacks X — 1st / 150+", "UTEK — 2nd", "HackTheNorth 2023", "NSBEHacks"],
  // Tech breadth across the disciplines (shown in the About section).
  stack: ["Modern C++", "ROS2", "STM32 / bare-metal", "PX4 / control", "PCB / FPGA", "PyTorch / CUDA"],
  links: {
    email: "shivansh.sonit@gmail.com", // contact = mailto: link (no form service)
    github: "https://github.com/Shivansh2703",
    linkedin: "https://www.linkedin.com/in/shivansh-singh-b51a74218/",
    resume: "/shivansh_singh_resume.pdf",
  },
} as const;
