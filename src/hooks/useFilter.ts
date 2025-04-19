import { Psychologist } from "@/types";
import { useMemo } from "react";

export const usePsychologistFilter = (
  data: Psychologist[],
  filter: string
): Psychologist[] => {
  const filteredPsychologists = useMemo(() => {
    return data.filter((psychologist) => {
      if (filter === "all") return true;
      if (filter === "atoz") return true;
      if (filter === "ztoa") return true;
      if (filter === "less10") return psychologist.price_per_hour < 10;
      if (filter === "great10") return psychologist.price_per_hour > 10;
      if (filter === "pop") return psychologist.rating >= 4.75;
      if (filter === "notpop") return psychologist.rating < 4.75;
      return true;
    });
  }, [data, filter]);

  const sortedPsychologists = useMemo(() => {
    return [...filteredPsychologists].sort((a, b) => {
      if (filter === "atoz") return a.name.localeCompare(b.name);
      if (filter === "ztoa") return b.name.localeCompare(a.name);
      if (filter === "pop") return b.rating - a.rating;
      if (filter === "notpop") return a.rating - b.rating;
      if (filter === "less10") return a.price_per_hour - b.price_per_hour;
      if (filter === "great10") return b.price_per_hour - a.price_per_hour;
      return 0;
    });
  }, [filteredPsychologists, filter]);

  return sortedPsychologists;
};
