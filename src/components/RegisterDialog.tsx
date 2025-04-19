import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RegisterDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const RegisterDialog = ({ isOpen, setIsOpen }: RegisterDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-5">
        <DialogTitle className="text-4xl">Registration</DialogTitle>
        <DialogDescription className="text-md">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </DialogDescription>
        <form className="flex flex-col gap-4.5 mt-5">
          <Input type="text" placeholder="Name" required />
          <Input type="email" placeholder="Email" required />
          <Input
            type="password"
            variant="password"
            placeholder="Password"
            required
          />
          <Button
            type="submit"
            variant="default"
            className="w-full py-4 h-auto mt-5"
          >
            Sign Up
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
