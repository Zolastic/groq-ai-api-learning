"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const GroqComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePrompt = async () => {
    const groqApiResponse = await fetch("/api/groq-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const response = await groqApiResponse.json();

    setResponse(
      response.response
        .replace(/(?:\r\n|\r|\n)/g, "<br>")
        .replace(/  /g, "&nbsp;&nbsp;")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    );
  };

  return (
    <div className="flex flex-col gap-y-4 w-full items-center justify-center">
      <div className="flex gap-x-2 items-center justify-center w-1/5">
        <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <Button onClick={handlePrompt}>Submit</Button>
      </div>
      {response && (
        <div className="flex flex-col gap-x-2 w-4/5">
          <h1 className="text-lg">Groq Response:</h1>
          <p>
            <span dangerouslySetInnerHTML={{ __html: response }} />
          </p>
        </div>
      )}
    </div>
  );
};

export default GroqComponent;
