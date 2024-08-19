import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

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

  return NextResponse.json({ response });
}
