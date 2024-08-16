interface Skill {
  name: string;
  level: string;
}

interface Responsibility {
  description: string;
}

interface Qualification {
  description: string;
}

interface JobDescription {
  job_title: string;
  company_name: string;
  location: string;
  skills: Skill[];
  responsibilities: Responsibility[];
  qualifications: Qualification[];
}
