export const jobDescriptionSchema = {
  $defs: {
    Skill: {
      properties: {
        name: { title: "Name", type: "string" },
        level: { title: "Level", type: "string" },
      },
      required: ["name", "level"],
      title: "Skill",
      type: "object",
    },
    Responsibility: {
      properties: {
        description: { title: "Description", type: "string" },
      },
      required: ["description"],
      title: "Responsibility",
      type: "object",
    },
    Qualification: {
      properties: {
        description: { title: "Description", type: "string" },
      },
      required: ["description"],
      title: "Qualification",
      type: "object",
    },
  },
  properties: {
    job_title: { title: "Job Title", type: "string" },
    company_name: { title: "Company Name", type: "string" },
    location: { title: "Location", type: "string" },
    skills: {
      items: { $ref: "#/$defs/Skill" },
      title: "Skills",
      type: "array",
    },
    responsibilities: {
      items: { $ref: "#/$defs/Responsibility" },
      title: "Responsibilities",
      type: "array",
    },
    qualifications: {
      items: { $ref: "#/$defs/Qualification" },
      title: "Qualifications",
      type: "array",
    },
  },
  required: [
    "job_title",
    "company_name",
    "location",
    "skills",
    "responsibilities",
    "qualifications",
  ],
  title: "Job Description",
  type: "object",
};
