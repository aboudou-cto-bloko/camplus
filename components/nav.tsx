"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-campus-black/90 backdrop-blur-xl border-b border-white/8"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Real logo — icon version */}
        <div className="flex items-center gap-2.5">
          <Image
            src="/assets/icon-dark.jpeg"
            alt="Campus+"
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="font-heading text-[18px] tracking-tight uppercase leading-none">
            CAMPUS<span className="text-campus-green">+</span>
          </span>
        </div>

        <a
          href="#voix"
          className="inline-flex items-center gap-2 bg-campus-green text-campus-black font-bold text-sm px-5 py-2.5 rounded-2xl hover:bg-campus-deep transition-colors duration-200"
        >
          Donner ma voix
        </a>
      </div>
    </header>
  );
}
