import { Header } from "@/components/Header";
import { PsychologistList } from "@/components/PsychologistList";

export default function Psychologist() {
  return (
    <main className="bg-secondary-background flex flex-col min-h-screen">
      <Header />
      <div className="container flex-1 py-16 px-4 sm:px-6 lg:px-10">
        <PsychologistList />
      </div>
    </main>
  );
}
