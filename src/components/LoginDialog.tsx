"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormData = z.infer<typeof formSchema>;

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const LoginDialog = ({ isOpen, setIsOpen }: LoginDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setIsOpen(false);
      toast.success("Log in successfully");
    } catch (error: any) {
      console.error("Login error:", error.message);
      setIsOpen(false);
      toast.error("Something went wrong, try again");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-5">
        <DialogTitle className="text-4xl">Log In</DialogTitle>
        <DialogDescription className="text-md">
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </DialogDescription>

        <form
          className="flex flex-col gap-4.5 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              required
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              required
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

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
