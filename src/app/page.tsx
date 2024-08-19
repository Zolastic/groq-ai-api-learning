import GroqComponent from "@/components/groq-component";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-24">
      <h1 className="text-4xl font-bold text-center">Groq Chat</h1>
      <GroqComponent />
      <div className="flex items-center gap-4 justify-center w-full">
        <Link href="/job-description-generator" target="_blank">
          <Button>Create a Job Description</Button>
        </Link>
        <Link href="/resume-analyser" target="_blank">
          <Button>Resume Analyser</Button>
        </Link>
      </div>
    </main>
  );
}
