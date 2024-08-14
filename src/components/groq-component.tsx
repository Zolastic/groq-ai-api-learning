"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Groq from "groq-sdk";

const GroqComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handlePrompt = async () => {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    const response = chatCompletion.choices[0].message.content ?? "No response";

    setResponse(response.replace(/\n/g, "<br />"));
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
