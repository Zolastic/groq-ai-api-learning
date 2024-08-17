import GroqComponent from "@/components/groq-component";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-24">
      <h1 className="text-4xl font-bold text-center">Groq Chat</h1>
      <GroqComponent />
      <div>
        <Link href="/job-description-generator" target="_blank">
          <Button>Create a Job Description</Button>
        </Link>
      </div>
    </main>
  );
}
