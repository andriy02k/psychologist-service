"use client";

import { Header } from "@/components/Header";
import { PsychologistList } from "@/components/PsychologistList";
import { type Psychologist } from "@/types";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../../firebase";
import { toast } from "sonner";

export default function Psychologist() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase(app);
        const dataRef = ref(db, "psychologists");
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          setPsychologists(snapshot.val());
        } else {
          toast.error("No data available");
        }
      } catch (error) {
        toast.error("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-secondary-background flex flex-col min-h-screen">
      <Header />
      <div className="container flex-1 py-16 px-4 sm:px-6 lg:px-10">
        <PsychologistList psychologists={psychologists} />
      </div>
    </main>
  );
}
