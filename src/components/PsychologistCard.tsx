import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatKey, safeDisplay } from "@/lib/utils";
import { Icon } from "./ui/Icon";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Psychologist } from "@/types";

interface PsychologistCardProps {
  psychologist: Psychologist;
  isExpanded: boolean;
  toggleCard: (id: string) => void;
}

const badgeKeys: (keyof Psychologist)[] = [
  "experience",
  "license",
  "specialization",
  "initial_consultation",
];

export const PsychologistCard = ({
  psychologist,
  isExpanded,
  toggleCard,
}: PsychologistCardProps) => {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start bg-background rounded-3xl shadow-sm">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="p-2 sm:p-3 border-2 border-emerald-600/20 rounded-[20px] sm:rounded-[30px]">
          <div className="relative">
            <Image
              src={psychologist.avatar_url}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-2xl sm:w-[96px] sm:h-[96px]"
            />
            <div className="absolute -top-1 right-1 w-3 h-3 sm:w-4.5 sm:h-4.5 bg-green-500 border-2 sm:border-4 border-background rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center sm:justify-between mb-2">
          <p className="text-gray-500 font-medium text-sm sm:text-md">
            Psychologist
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center text-foreground/20 mt-2 sm:mt-0">
            <div className="flex items-center gap-2 sm:mr-4">
              <Icon icon="star" size={14} className="sm:w-16 sm:h-16" />
              <p className="text-foreground text-sm sm:text-md font-medium">
                Rating: {psychologist.rating}
              </p>
            </div>
            <span className="hidden sm:inline">|</span>
            <div className="flex items-center gap-2 sm:ml-4 sm:mr-7 text-foreground text-sm sm:text-md font-medium mt-2 sm:mt-0">
              Price / 1 hour:{" "}
              <span className="text-green-500">
                {psychologist.price_per_hour}$
              </span>
            </div>
            <Icon
              icon="follow"
              size={20}
              className="fill-background stroke-foreground sm:w-26 sm:h-26"
            />
          </div>
        </div>

        <div className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">
          {psychologist.name}
        </div>

        <div className="flex flex-wrap gap-2">
          {badgeKeys.map((key) => (
            <Badge
              key={key}
              variant="secondary"
              className="text-sm sm:text-md font-medium whitespace-break-spaces md:whitespace-nowrap"
            >
              {formatKey(key)}:{" "}
              <span className="text-foreground">
                {safeDisplay(psychologist[key])}
              </span>
            </Badge>
          ))}
        </div>

        <p className="mt-4 sm:mt-6 text-sm sm:text-md text-foreground/50">
          {psychologist.about}
        </p>

        {!isExpanded && (
          <Button
            variant="ghost"
            className="text-sm sm:text-md font-medium text-foreground w-fit p-0 mt-3 underline-offset-8 underline"
            onClick={() => toggleCard(psychologist.avatar_url)}
          >
            Read more
          </Button>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-4 sm:gap-6 mt-8 sm:mt-12">
                {psychologist.reviews.map((review, idx) => (
                  <div key={idx} className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 sm:p-3 h-9 sm:h-11 aspect-square flex items-center justify-center rounded-full bg-primary-soft text-primary text-lg sm:text-xl font-medium">
                        {review.reviewer.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-1">
                        <h6 className="text-sm sm:text-md text-foreground font-medium">
                          {review.reviewer}
                        </h6>
                        <div className="flex gap-2 items-center font-medium text-foreground">
                          <Icon
                            icon="star"
                            size={14}
                            className="sm:w-16 sm:h-16"
                          />
                          {review.rating}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm sm:text-md text-foreground/50">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="default"
                className="w-full sm:w-auto py-2 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-md font-medium h-auto mt-6 sm:mt-10"
              >
                Make an appointment
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
