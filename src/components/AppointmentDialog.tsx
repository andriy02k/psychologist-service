import { Psychologist } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import { AppointmentForm } from "./AppointmentForm";

interface AppointmentDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  psychologist: Psychologist;
}

export const AppointmentDialog = ({
  isOpen,
  setIsOpen,
  psychologist,
}: AppointmentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-5 p-5 max-h-[98%] overflow-y-auto">
        <DialogTitle className="text-4xl">
          Make an appointment with a psychologists
        </DialogTitle>
        <DialogDescription className="text-base">
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </DialogDescription>
        <div className="py-5 flex gap-3.5 items-center">
          <Image
            src={psychologist.avatar_url}
            alt="Avatar"
            width={44}
            height={44}
            className="rounded-2xl"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium text-foreground/50">
              Your psychologists
            </p>
            <p className="text-base font-medium text-foreground">
              {psychologist.name}
            </p>
          </div>
        </div>
        <AppointmentForm />
      </DialogContent>
    </Dialog>
  );
};
