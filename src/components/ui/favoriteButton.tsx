import { getDatabase, ref, set, remove, get } from "firebase/database";
import { auth } from "../../../firebase";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  psychologistId: string;
}

export const FavoriteButton = ({ psychologistId }: FavoriteButtonProps) => {
  const user = auth.currentUser;
  const db = getDatabase();
  const favoriteRef = ref(db, `users/${user?.uid}/favorites/${psychologistId}`);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        const snapshot = await get(favoriteRef);
        setIsFavorite(snapshot.exists());
      }
    };

    checkFavorite();
  }, [user, psychologistId]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("You must be logged in to follow a psychologist.");
      return;
    }

    if (isFavorite) {
      await remove(favoriteRef);
      setIsFavorite(false);
    } else {
      await set(favoriteRef, true);
      setIsFavorite(true);
    }
  };

  return (
    <Icon
      icon="follow"
      size={20}
      onClick={toggleFavorite}
      className={cn(
        "sm:w-26 sm:h-26 cursor-pointer",
        isFavorite
          ? "fill-primary stroke-primary"
          : "fill-background stroke-foreground"
      )}
    />
  );
};
