import ResumeAnalyser from "@/components/resume-analyser";
import React from "react";

const ResumeAnalyserPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-24">
      <h1 className="text-4xl font-bold text-center">Resume Analyser</h1>
      <ResumeAnalyser />
    </main>
  );
};

export default ResumeAnalyserPage;
