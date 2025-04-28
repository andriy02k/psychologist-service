"use client";

import { useState } from "react";
import { PsychologistCard } from "@/components/PsychologistCard";
import { PsychologistFilter } from "@/components/PsychologistFilter";
import { usePsychologistFilter } from "@/hooks/useFilter";
import { Psychologist } from "@/types";
import { Button } from "./ui/button";

interface PsychologistListProps {
  psychologists: Psychologist[];
}

export const PsychologistList = ({ psychologists }: PsychologistListProps) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);

  const sortedPsychologists = usePsychologistFilter(psychologists, filter);

  const paginatedPsychologists = sortedPsychologists.slice(
    0,
    currentPage * itemsPerPage
  );

  const toggleCard = (id: string) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 sm:mb-8">
        <PsychologistFilter onFilterChange={handleFilterChange} />
      </div>
      {paginatedPsychologists.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No psychologists found matching your criteria.
        </div>
      ) : (
        <div className="flex flex-col gap-6 sm:gap-8">
          {paginatedPsychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
              isExpanded={expandedCardId === psychologist.id}
              toggleCard={toggleCard}
            />
          ))}
        </div>
      )}

      {paginatedPsychologists.length < sortedPsychologists.length && (
        <div className="text-center mt-8">
          <Button
            onClick={handleLoadMore}
            className="w-full sm:w-auto h-auto px-12 py-3.5 text-base font-medium"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
