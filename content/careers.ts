/*
  Open roles. Add or remove entries here; the careers page shows a
  "no open roles" view automatically when this list is empty.
  The intern role is the one currently listed on ezyev.in/career.
*/
export type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  youWill: string[];
};

export const roles: Role[] = [
  {
    slug: "software-engineer-intern",
    title: "Software Engineer Intern",
    team: "Engineering",
    location: "Pune",
    type: "Internship, 3 months, with potential to convert to full time",
    summary:
      "Work with our engineering team on the software that runs every swap: the rider app, station firmware integrations and the cloud backend behind the fleet dashboard.",
    youWill: [
      "Ship features to the rider app and partner dashboard",
      "Work on APIs that talk to IoT connected swap stations",
      "Help build reporting on battery health, swaps and energy use",
    ],
  },
];
