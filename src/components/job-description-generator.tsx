"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { ensureArray, ensureString } from "@/lib/utils";

const JobDescriptionGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<JobDescription | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrompt = async () => {
    setIsLoading(true);

    const groqApiResponse = await fetch("/api/job-description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await groqApiResponse.json();

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
        data.response.qualifications || data.response.properties?.qualifications
      ),
    };

    setResponse(normalizedResponse);
    setIsLoading(false);
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
          <h1 className="text-lg">Job Title: {response.job_title}</h1>
          <p>
            <strong>Company:</strong> {response.company_name}
          </p>
          <p>
            <strong>Location:</strong> {response.location}
          </p>

          <h2 className="text-md mt-4">Skills Required:</h2>
          <ul>
            {response.skills.map((skill: any, index: number) => (
              <li key={index}>
                {typeof skill === "object"
                  ? `${skill.name} (${skill.level})`
                  : skill}
              </li>
            ))}
          </ul>

          <h2 className="text-md mt-4">Responsibilities:</h2>
          <ul>
            {response.responsibilities.map((resp: any, index: number) => (
              <li key={index}>
                {typeof resp === "object"
                  ? `${index + 1}. ${resp.description}`
                  : resp}
              </li>
            ))}
          </ul>

          <h2 className="text-md mt-4">Qualifications:</h2>
          <ul>
            {response.qualifications.map((qual: any, index: number) => (
              <li key={index}>
                {typeof qual === "object"
                  ? `${index + 1}. ${qual.description}`
                  : qual}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDescriptionGenerator;
