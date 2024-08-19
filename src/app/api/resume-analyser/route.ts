import { processDocs, chat } from "@/lib/pdf-analyser-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt, lcDocs } = await request.json();

  await processDocs(lcDocs);

  const chatResponse = await chat(prompt);

  if (!chatResponse) {
    return NextResponse.error();
  }

  const { response } = chatResponse;

  return NextResponse.json({ response });
}
