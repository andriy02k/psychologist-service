"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { LoginDialog } from "./LoginDialog";
import { RegisterDialog } from "./RegisterDialog";
import { auth } from "../../firebase";
import { Icon } from "./ui/Icon";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "sonner";

export const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Log out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Something went wrong, try again");
    }
  };

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
          <nav className="hidden md:flex gap-5 lg:gap-10 text-base font-normal text-foreground">
            <Link href="/">Home</Link>
            <Link href="/psychologists">Psychologists</Link>
            {currentUser && <Link href="/favorites">Favorites</Link>}
          </nav>

          {/* Desktop Buttons */}
          {currentUser ? (
            <div className="hidden md:flex md:text-base items-center gap-3 lg:gap-7 ml-6">
              <div className="flex items-center gap-2 lg:gap-3.5">
                <div className="bg-primary rounded-[10px] w-10 h-10 p-2 flex items-center justify-center">
                  <Icon icon="user" width={16} height={16} />
                </div>
                <p className="text-sm lg:text-base lg:text-nowrap">
                  {currentUser.displayName}
                </p>
              </div>
              <Button
                variant="outline"
                className="py-2 lg:py-3.5 px-6 lg:px-9 text-md font-medium h-auto max-w-xs w-auto"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>
          ) : (
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
          )}

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
                  {currentUser ? (
                    <div className="flex flex-col gap-4 w-full items-center">
                      <div className="flex items-center gap-2 lg:gap-3.5">
                        <div className="bg-primary rounded-[10px] w-10 h-10 p-2 flex items-center justify-center">
                          <Icon icon="user" width={16} height={16} />
                        </div>
                        <p className="text-sm lg:text-base lg:text-nowrap">
                          {currentUser.displayName}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="py-2 lg:py-3.5 px-6 lg:px-9 text-md font-medium h-auto max-w-xs w-auto"
                        onClick={handleLogout}
                      >
                        Log out
                      </Button>
                    </div>
                  ) : (
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
                  )}
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
