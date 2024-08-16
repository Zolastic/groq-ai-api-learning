import { jobDescriptionSchema } from "@/schemas/job-description-schema";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const jsonSchema = JSON.stringify(jobDescriptionSchema, null, 4);

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a job description generator that outputs job descriptions in JSON format. Ensure that the JSON strictly adheres to this schema: ${jsonSchema}`,
      },
      {
        role: "user",
        content: `Generate a job description based on the following information: ${prompt}. Ensure that all fields conform to the schema and avoid duplications or omissions. The JSON should be a valid object that matches the schema exactly.`,
      },
    ],
    model: "llama3-70b-8192",
    temperature: 0.2,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });

  let messageContent = chatCompletion.choices[0].message.content;

  if (messageContent === null) {
    throw new Error("The AI response content is null.");
  }

  // To extract the JSON from the response.
  const jsonMatch = messageContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);

  if (!jsonMatch) {
    throw new Error("Failed to extract JSON from the response.");
  }

  const jsonResponse = JSON.parse(jsonMatch[1]) as JobDescription;

  return NextResponse.json({ response: jsonResponse });
}
