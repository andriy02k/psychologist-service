import { Banner } from "@/components/banner";
import { Header } from "@/components/header";

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
