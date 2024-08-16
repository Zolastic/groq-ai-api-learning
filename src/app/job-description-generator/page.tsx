import JobDescriptionGenerator from "@/components/job-description-generator";
import React from "react";

const JobDescriptionGeneratorPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-24">
      <h1 className="text-4xl font-bold text-center">
        Job Description Generator
      </h1>
      <JobDescriptionGenerator />
    </main>
  );
};

export default JobDescriptionGeneratorPage;
