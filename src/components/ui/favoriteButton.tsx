import { getDatabase, ref, set, remove, get } from "firebase/database";
import { auth } from "../../../firebase";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Psychologist } from "@/types";

interface FavoriteButtonProps {
  psychologist: Psychologist;
}

export const FavoriteButton = ({ psychologist }: FavoriteButtonProps) => {
  const user = auth.currentUser;
  const db = getDatabase();
  const favoriteRef = ref(
    db,
    `users/${user?.uid}/favorites/${psychologist.id}`
  );

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (user) {
        const snapshot = await get(favoriteRef);
        setIsFavorite(snapshot.exists());
      }
    };

    checkFavorite();
  }, [user, psychologist]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.success("You must be logged in to follow a psychologist.");
      return;
    }

    if (isFavorite) {
      await remove(favoriteRef);
      setIsFavorite(false);
    } else {
      await set(favoriteRef, psychologist);
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
