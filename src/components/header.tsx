import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export const Header = () => {
  return (
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
        <div className="hidden md:flex gap-2">
          <Link href="/login">
            <Button
              variant="outline"
              className="py-2.5 px-6 lg:py-3.5 lg:px-10 text-md font-medium h-auto"
            >
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="default"
              className="py-2.5 px-6 lg:py-3.5 lg:px-10 text-md font-medium h-auto"
            >
              Registration
            </Button>
          </Link>
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
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="py-3.5 px-10 text-md font-medium h-auto w-full max-w-xs"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="default"
                      className="py-3.5 px-10 text-md font-medium h-auto w-full max-w-xs"
                    >
                      Registration
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
