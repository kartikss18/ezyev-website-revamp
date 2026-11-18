/*
  Open roles — preserves every detail from live ezyev.in/career and
  /career/software-engineer-intern.
*/
export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  duration: string;
  type: string;
  summary: string;
  techStack: string[];
  youWill: string[];
  lookingFor: string[];
  bonus: string[];
  perks: string[];
  applySubject: string;
};

export const roles: Role[] = [
  {
    slug: "software-engineer-intern",
    title: "Software Engineer Intern",
    team: "Engineering",
    location: "Pune",
    duration: "3 months (with potential to convert into Full-Time)",
    type: "Internship Opportunity – (Full-Time Conversion Potential)",
    summary:
      "At EzyEV, we’re on a mission to redefine how India moves with electric vehicle battery swapping. We’re building a smart IoT + cloud platform that powers EV charging, real-time telemetry, and data-driven energy solutions. This is your chance to get in early with a fast-growing startup, work on real-world challenges, and potentially join us full-time as we scale.",
    techStack: ["TypeScript", "Node.js", "Go", "React Native", "Kafka", "MQTT", "Supabase"],
    youWill: [
      "Build and test scalable APIs & microservices in TypeScript / Node.js",
      "Support our React Native / Expo mobile app (Android-first, with custom UI & OTP login flows)",
      "Work on IoT data pipelines (Kafka, MQTT, Supabase) to manage real-time EV telemetry",
      "Collaborate on database design (Postgres / TimescaleDB) for time-series EV data",
      "Get hands-on with DevOps basics including GitHub Actions, Docker, and AWS EC2",
      "Contribute ideas, write clean code, and learn from experienced engineers",
    ],
    lookingFor: [
      "Final-year student or recent graduate in Computer Science / IT / related field",
      "Solid programming fundamentals with React Native or other frontend frameworks",
      "Curious about APIs, cloud, and distributed systems",
      "Familiarity with Git & databases",
      "Eagerness to learn, experiment, and build real-world systems",
    ],
    bonus: [
      "TypeScript / JavaScript",
      "Kafka, MQTT, or any IoT projects",
      "CI/CD tools or Docker",
    ],
    perks: [
      "Stipend during internship",
      "Direct mentorship from senior engineers & founders",
      "Work on real EV + IoT projects with real-world impact",
      "Flexible, startup-style work culture (output-driven, not clock-ins)",
      "A clear path to a Full-Time Software Engineer role",
    ],
    applySubject: "Application – Software Engineer Intern",
  },
];
