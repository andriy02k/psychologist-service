import Image from "next/image";
import { Icon } from "./ui/Icon";
import Link from "next/link";
import { Button } from "./ui/button";

export const Banner = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
      {/* Left side */}
      <div className="w-full sm:w-[50%] flex flex-col items-start">
        <h1 className="text-foreground text-[32px]/[36px] sm:text-[48px]/[52px] lg:text-[64px]/[68px] xl:text-[80px]/[82px] font-semibold mb-4 sm:mb-5">
          The road to the <span className="text-primary italic">depths</span> of
          the human soul
        </h1>
        <p className="text-foreground font-medium text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10">
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <Link href="/psychologists">
          <Button
            variant="default"
            className="py-4 px-10 md:py-3 md:px-8 lg:py-4.5 lg:px-12 h-auto text-base sm:text-lg lg:text-xl font-medium flex items-center gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-4.5">
              <span>Get started</span>
              <Icon icon="arrow" size={20} />
            </div>
          </Button>
        </Link>
      </div>

      {/* Right side - hidden on small screens */}
      <div className="hidden sm:block w-full sm:w-[50%] md:flex justify-center sm:justify-end">
        <div className="relative w-full max-w-[464px] aspect-[464/526]">
          <Image
            src="/images/hero.jpg"
            alt="Banner image"
            fill
            className="rounded-[10px] object-cover"
            sizes="(max-width: 1024px) 50vw, 464px"
            priority
          />
          {/* Block "check" */}
          <div className="absolute bottom-[15%] left-[-10%] lg:left-[-15%] bg-primary flex gap-2 sm:gap-3 lg:gap-4 rounded-[20px] p-3 sm:p-4 lg:p-6 min-w-[180px] sm:min-w-[200px] lg:min-w-[240px]">
            <div className="py-1.5 px-1.5 sm:py-2 sm:px-2 lg:py-3 lg:px-3 rounded-xl bg-background">
              <Icon
                icon="check"
                size={25}
                className="sm:w-[20px] lg:w-[25px]"
              />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs lg:text-sm text-background/50">
                Experienced psychologists
              </p>
              <p className="text-base sm:text-lg lg:text-2xl font-bold text-background">
                15,000
              </p>
            </div>
          </div>
          {/* Green block */}
          <div className="absolute top-[35%] -left-[5%] px-4 py-2 text-background text-xl bg-emerald-500 rounded-xl -rotate-12">
            ?
          </div>
          {/* Orange block "users" */}
          <div className="absolute top-[10%] right-[-3%] p-3 text-background text-xl bg-amber-400 rounded-xl rotate-20">
            <Icon icon="users" size={25} className="-rotate-16" />
          </div>
        </div>
      </div>
    </section>
  );
};
