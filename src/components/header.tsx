"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { LoginDialog } from "./LoginDialog";
import { RegisterDialog } from "./RegisterDialog";

export const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  return (
    <>
      <header className="border-b border-foreground/10">
        <div className="container py-6 px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          <Link href="/">
            <h3 className="text-xl font-bold text-foreground mr-7">
              <span className="text-primary">psychologists.</span>services
            </h3>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-7 lg:gap-10 text-md font-normal text-foreground">
            <Link href="/">Home</Link>
            <Link href="/psychologists">Psychologists</Link>
            <Link href="/favorites" className="invisible">
              Favorites
            </Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2 ml-6">
            <Button
              variant="outline"
              onClick={() => setIsLoginOpen(true)}
              className="py-2 px-5 lg:py-3.5 lg:px-10 text-sm lg:text-md font-medium h-auto"
            >
              Log In
            </Button>
            <Button
              variant="default"
              onClick={() => setIsRegisterOpen(true)}
              className="py-2 px-5 lg:py-3.5 lg:px-10 text-sm lg:text-md font-medium h-auto"
            >
              Registration
            </Button>
          </div>

          {/* Mobile Burger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="w-full border-0 py-3 sheet-content"
              >
                <SheetTitle className="text-foreground font-semibold text-lg" />
                <nav className="flex flex-col items-center gap-6 text-md font-normal text-foreground">
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                  <Link href="/psychologists" className="hover:text-primary">
                    Psychologists
                  </Link>
                  <Link href="/favorites" className="hidden">
                    Favorites
                  </Link>
                  <div className="flex flex-col gap-4 w-full items-center">
                    <Button
                      variant="outline"
                      onClick={() => setIsLoginOpen(true)}
                      className="py-3.5 px-10 text-md font-medium h-auto w-full max-w-xs"
                    >
                      Log In
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => setIsRegisterOpen(true)}
                      className="py-3.5 px-10 text-md font-medium h-auto w-full max-w-xs"
                    >
                      Registration
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <LoginDialog isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />

      {/* Register Dialog */}
      <RegisterDialog isOpen={isRegisterOpen} setIsOpen={setIsRegisterOpen} />
    </>
  );
};
