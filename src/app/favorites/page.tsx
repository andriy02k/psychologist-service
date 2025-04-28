"use client";

import { Header } from "@/components/Header";
import { PsychologistList } from "@/components/PsychologistList";
import { type Psychologist } from "@/types";
import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app, auth } from "../../../firebase";
import { toast } from "sonner";

export default function Psychologist() {
  const [favoritesPsychologists, setFavoritesPsychologists] = useState<
    Psychologist[]
  >([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          toast.error("User not authenticated");
          return;
        }
        const db = getDatabase(app);
        const favoritesRef = ref(db, `users/${user.uid}/favorites`);
        const snapshot = await get(favoritesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const favoritesArray = Object.values(data) as Psychologist[];
          console.log(favoritesArray);
          setFavoritesPsychologists(favoritesArray);
        } else {
          toast.error("No data available");
        }
      } catch (error) {
        toast.error("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchFavorites();
  }, []);
  return (
    <main className="bg-secondary-background flex flex-col min-h-screen">
      <Header />
      <div className="container flex-1 py-16 px-4 sm:px-6 lg:px-10">
        <PsychologistList psychologists={favoritesPsychologists} />
      </div>
    </main>
  );
}
