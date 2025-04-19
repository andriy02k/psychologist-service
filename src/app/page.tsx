import { Banner } from "@/components/Banner";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="h-screen custom-gradient flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <Banner />
      </div>
    </main>
  );
}
