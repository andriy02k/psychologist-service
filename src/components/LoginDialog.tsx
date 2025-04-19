import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const LoginDialog = ({ isOpen, setIsOpen }: LoginDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-5">
        <DialogTitle className="text-4xl">Log In</DialogTitle>
        <DialogDescription className="text-md">
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </DialogDescription>
        <form className="flex flex-col gap-4.5 mt-5">
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
            Log In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
