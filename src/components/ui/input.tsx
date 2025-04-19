"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "password";
}

function Input({ className, type, variant = "default", ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType =
    variant === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-foreground selection:text-primary-foreground dark:bg-input/30 border-foreground/10 flex h-auto w-full min-w-0 rounded-xl border bg-transparent px-4.5 py-4 text-base font-normal shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          variant === "password" && "pr-12",
          className
        )}
        {...props}
      />
      {variant === "password" && (
        <button
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground/70 hover:text-foreground",
            "transition-colors duration-200"
          )}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
