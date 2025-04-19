"use client";

import { useState } from "react";
import data from "../data/psychologists.json";
import { PsychologistCard } from "@/components/PsychologistCard";
import { PsychologistFilter } from "@/components/PsychologistFilter";
import { usePsychologistFilter } from "@/hooks/useFilter";

export const PsychologistList = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const sortedPsychologists = usePsychologistFilter(data, filter);

  const toggleCard = (id: string) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <PsychologistFilter onFilterChange={handleFilterChange} />
      </div>
      {sortedPsychologists.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No psychologists found matching your criteria.
        </div>
      ) : (
        <div className="flex flex-col gap-6 sm:gap-8">
          {sortedPsychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.avatar_url}
              psychologist={psychologist}
              isExpanded={expandedCardId === psychologist.avatar_url}
              toggleCard={toggleCard}
            />
          ))}
        </div>
      )}
    </div>
  );
};
