"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { ensureArray, ensureString } from "@/lib/utils";
import { toast } from "sonner";

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

      console.log("response: ", data.response);

      const normalizedResponse = {
        job_title: ensureString(
          data.response.job_title || data.response.properties?.job_title
        ),
        company_name: ensureString(
          data.response.company_name || data.response.properties?.company_name
        ),
        location: ensureString(
          data.response.location || data.response.properties?.location
        ),
        skills: ensureArray(
          data.response.skills || data.response.properties?.skills
        ),
        responsibilities: ensureArray(
          data.response.responsibilities ||
            data.response.properties?.responsibilities
        ),
        qualifications: ensureArray(
          data.response.qualifications ||
            data.response.properties?.qualifications
        ),
      };

      setResponse(normalizedResponse);
    } catch (error) {
      console.error("Failed to fetch job description:", error);
      toast.error("Failed to fetch job description.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 w-full items-center justify-center">
      <div className="flex gap-x-2 items-end justify-center w-1/5">
        <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
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
            {response.skills.map((skill: any, index: number) => (
              <li key={index} className="ml-2">
                {`${index + 1}. `}
                {typeof skill === "object"
                  ? `${skill.name} (${skill.level})`
                  : skill}
              </li>
            ))}
          </ul>

          <h2 className="mt-4 font-semibold text-lg">Responsibilities:</h2>
          <ul>
            {response.responsibilities.map((resp: any, index: number) => (
              <li key={index} className="ml-2">
                {`${index + 1}. `}
                {typeof resp === "object" ? resp.description : resp}
              </li>
            ))}
          </ul>

          <h2 className="mt-4 font-semibold text-lg">Qualifications:</h2>
          <ul>
            {response.qualifications.map((qual: any, index: number) => (
              <li key={index} className="ml-2">
                {`${index + 1}. `}
                {typeof qual === "object" ? qual.description : qual}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionGenerator;
