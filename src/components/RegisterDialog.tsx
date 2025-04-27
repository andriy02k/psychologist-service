import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "The name must be at least 2 characters long."),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type RegisterFormData = z.infer<typeof formSchema>;

interface RegisterDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const RegisterDialog = ({ isOpen, setIsOpen }: RegisterDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: data.name });
      }
      setIsOpen(false);
      reset();
      toast.success("Registrition successfully");
    } catch (error) {
      console.error("Registration error:", error);
      setIsOpen(false);
      toast.error("Something went wrong, try again");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="gap-5">
        <DialogTitle className="text-4xl">Registration</DialogTitle>
        <DialogDescription className="text-md">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </DialogDescription>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4.5 mt-5"
        >
          <Input {...register("name")} placeholder="Name" required />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <Input {...register("email")} placeholder="Email" required />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <Input
            {...register("password")}
            variant="password"
            placeholder="Password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
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
