"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { AutosizeTextarea } from "./ui/autosize-textarea";

const JobDescriptionGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<JobDescription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrompt = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/job-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      const normalizedResponse: JobDescription = {
        job_title: data.response.job_title,
        company_name: data.response.company_name,
        location: data.response.location,
        skills: data.response.skills,
        responsibilities: data.response.responsibilities,
        qualifications: data.response.qualifications,
      };

      setResponse(normalizedResponse);
      toast.success("Job description generated successfully!");
    } catch (error) {
      console.error("Failed to fetch job description:", error);
      toast.error("Failed to fetch job description.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 w-full items-center justify-center">
      <div className="flex gap-x-2 items-end justify-center w-1/2">
        <AutosizeTextarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What information do you have for the job description?"
          maxHeight={200}
        />
        <Button
          onClick={handlePrompt}
          className="flex justify-center items-center"
        >
          {!isLoading ? (
            <Send size={16} />
          ) : (
            <LoaderCircle size={16} className="animate-spin" />
          )}
        </Button>
      </div>
      {response && (
        <div className="flex flex-col gap-x-2 w-4/5">
          <h1 className="tracking-tight">
            <span className="font-bold text-lg">Job Title:</span>{" "}
            {response.job_title}
          </h1>
          <p className="tracking-tight">
            <span className="font-bold text-lg">Company:</span>{" "}
            {response.company_name}
          </p>
          <p className="tracking-tight">
            <span className="font-bold text-lg">Location:</span>{" "}
            {response.location}
          </p>

          <h2 className="mt-4 font-semibold text-lg">Skills Required:</h2>
          <ul>
            {response.skills.map((skill, index) => (
              <li key={index} className="ml-2">
                {`${index + 1}. ${skill.name} (${skill.level})`}
              </li>
            ))}
          </ul>

          <h2 className="mt-4 font-semibold text-lg">Responsibilities:</h2>
          <ul>
            {response.responsibilities.map((resp, index) => (
              <li key={index} className="ml-2">
                {`${index + 1}. ${resp.description}`}
              </li>
            ))}
          </ul>

          <h2 className="mt-4 font-semibold text-lg">Qualifications:</h2>
          <ul>
            {response.qualifications.map((qual, index) => (
              <li key={index} className="ml-2">
                {`${index + 1}. ${qual.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionGenerator;
