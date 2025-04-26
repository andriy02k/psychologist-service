"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Ім'я повинно бути мінімум 2 символи"),
  phone: z.string().min(10, "Номер телефону занадто короткий"),
  time: z.string().nonempty("Оберіть час"),
  email: z.string().email("Некоректний email"),
  comments: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export function AppointmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log("Submitted Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input {...register("name")} className="w-full" placeholder="Name" />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}

      <div className="flex gap-2">
        <Input {...register("phone")} className="w-full" placeholder="+380" />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
        <input
          type="time"
          step="1800"
          {...register("time")}
          className="w-full rounded-xl border border-foreground/10 px-4.5 py-4 outline-none"
        />
        {errors.time && (
          <p className="text-red-500 text-sm">{errors.time.message}</p>
        )}
      </div>

      <Input
        type="email"
        {...register("email")}
        className="w-full"
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <textarea
        {...register("comments")}
        cols={5}
        className="w-full rounded-xl border border-foreground/10 px-4.5 py-4 outline-none resize-none overflow-y-auto placeholder:text-foreground"
        placeholder="Comment"
      />

      <Button type="submit" className="w-full p-4 h-auto mt-6">
        Send
      </Button>
    </form>
  );
}
