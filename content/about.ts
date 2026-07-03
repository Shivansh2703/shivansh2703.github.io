export const about = {
  name: "Shivansh Singh",
  role: "Robotics Software Engineer · hardware to autonomy",
  // The five disciplines shown as the hero's breadth statement.
  disciplines: ["Software", "Hardware", "Controls", "Electrical", "Mechanical"],
  // Hero one-liner — kept short; the breadth lives in the chips + the loop diagram.
  // The machines are the hero's beat; the people are the bio's closing beat — don't merge them.
  blurb: "I build software for the real world — machines you can watch do their job.",
  // About-section paragraph — distinct from the hero blurb; the point is versatility.
  bio:
    "Most engineers pick a layer of the stack and stay there. The problems I like refuse to: the " +
    "board shapes the firmware, the firmware constrains the control loop, and the software on top " +
    "inherits every decision made beneath it. Following that thread has taken me from bare-metal " +
    "rovers to an autonomous quadruped to distributed systems — each new discipline learned " +
    "because the problem demanded it. The reward is always the same: watching something I built " +
    "hold up in the real world — a quadruped keeping pace with a person, a rover finding one — " +
    "and knowing exactly who it's working for.",
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
