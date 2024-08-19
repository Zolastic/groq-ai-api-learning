"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import ReactMarkdown from "react-markdown";
import { LoaderCircle } from "lucide-react";

const ResumeAnalyser = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setFile(file);
  };

  const handlePrompt = async () => {
    if (!file) {
      toast.error("Please upload a file first.");
      return;
    }

    setIsLoading(true);

    try {
      const loader = new WebPDFLoader(file, {
        parsedItemSeparator: " ",
      });

      const loadedDocs = await loader.load();

      const lcDocs = loadedDocs.map((item) => ({
        pageContent: item.pageContent,
        metadata: item.metadata,
      }));

      const response = await fetch("/api/resume-analyser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "Analyze this resume.",
          lcDocs: lcDocs,
        }),
      });

      const data = await response.json();

      console.log("Resume analysis response:", data.response);

      setResponse(data.response);
      toast.success("Resume processed successfully!");
    } catch (error) {
      console.error("Failed to process resume:", error);
      toast.error("Failed to process resume.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <Input type="file" onChange={handleFileUpload} />
      </div>
      <Button onClick={handlePrompt} disabled={isLoading}>
        {isLoading ? (
          <LoaderCircle size={16} className="animate-spin" />
        ) : (
          "Analyze Resume"
        )}
      </Button>
      {response && (
        <div className="mt-4">
          <h2 className="font-bold text-lg tracking-tight mb-4">
            Analysis Result:
          </h2>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyser;
