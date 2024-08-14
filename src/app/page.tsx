import GroqComponent from "@/components/groq-component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-8 p-24">
      <h1 className="text-4xl font-bold text-center">Groq Chat</h1>
      <GroqComponent />
    </main>
  );
}
