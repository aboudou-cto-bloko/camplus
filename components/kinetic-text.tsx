"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Shared: IntersectionObserver trigger ─────────────────────────────── */
function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  onReveal: () => void,
  threshold = 0.2
) {
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          onReveal();
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onReveal, threshold, ref]);
}

/* ─── MaskReveal — word slides up from overflow:hidden mask ─────────────── */
interface MaskRevealProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  staggerMs?: number;
  duration?: number;
  fromDirection?: "bottom" | "top";
}

export function MaskReveal({
  text,
  className,
  as: Tag = "p",
  delay = 0,
  staggerMs = 55,
  duration = 650,
  fromDirection = "bottom",
}: MaskRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const initial = fromDirection === "bottom" ? "110%" : "-110%";

  const reveal = () => {
    import("animejs").then(({ animate, stagger }) => {
      const el = ref.current;
      if (!el) return;
      animate(el.querySelectorAll(".ki-word"), {
        translateY: [initial, "0%"],
        easing: "easeOutExpo",
        duration,
        delay: stagger(staggerMs, { start: delay }),
      });
    });
  };

  useReveal(ref as React.RefObject<HTMLElement>, reveal);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ paddingBottom: "0.08em", verticalAlign: "bottom" }}
        >
          <span
            className="ki-word inline-block"
            style={{ transform: `translateY(${initial})` }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Comp>
  );
}

/* ─── ScrambleReveal — characters randomize then snap to final text ─────── */
interface ScrambleRevealProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  chars?: string;
}

export function ScrambleReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  duration = 1200,
  chars = "uppercase",
}: ScrambleRevealProps) {
  const ref = useRef<HTMLElement>(null);

  const reveal = () => {
    import("animejs").then(({ animate, scrambleText }) => {
      const el = ref.current;
      if (!el) return;
      setTimeout(() => {
        animate(el, {
          innerHTML: scrambleText({ chars }),
          duration,
          easing: "linear",
        });
      }, delay);
    });
  };

  useReveal(ref as React.RefObject<HTMLElement>, reveal, 0.4);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className}>
      {text}
    </Comp>
  );
}

/* ─── LineReveal — element slides in from left or right ─────────────────── */
interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
}

export function LineReveal({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 700,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const reveal = () => {
    import("animejs").then(({ animate }) => {
      const el = ref.current;
      if (!el) return;
      animate(el, {
        translateX: [direction === "left" ? "-60px" : "60px", "0px"],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration,
        delay,
      });
    });
  };

  useReveal(ref as React.RefObject<HTMLDivElement>, reveal);

  return (
    <div
      ref={ref}
      className={cn("opacity-0", className)}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}

/* ─── StaggerLines — multiple children stagger in from below ────────────── */
interface StaggerLinesProps {
  children: React.ReactNode[];
  className?: string;
  staggerMs?: number;
  delay?: number;
  duration?: number;
  distance?: number;
}

export function StaggerLines({
  children,
  className,
  staggerMs = 80,
  delay = 0,
  duration = 600,
  distance = 40,
}: StaggerLinesProps) {
  const ref = useRef<HTMLDivElement>(null);

  const reveal = () => {
    import("animejs").then(({ animate, stagger }) => {
      const el = ref.current;
      if (!el) return;
      animate(el.querySelectorAll(".ki-line"), {
        translateY: [`${distance}px`, "0px"],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration,
        delay: stagger(staggerMs, { start: delay }),
      });
    });
  };

  useReveal(ref as React.RefObject<HTMLDivElement>, reveal);

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className="ki-line"
          style={{ opacity: 0, transform: `translateY(${distance}px)` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* ─── KineticCounter — number counts up when visible ───────────────────── */
interface KineticCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function KineticCounter({
  target,
  suffix = "",
  prefix = "",
  className,
  duration = 1800,
}: KineticCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const reveal = () => {
    import("animejs").then(({ animate }) => {
      const el = ref.current;
      if (!el) return;
      const obj = { val: 0 };
      animate(obj, {
        val: target,
        duration,
        easing: "easeOutExpo",
        onUpdate: () => {
          if (el) el.textContent = prefix + Math.round(obj.val) + suffix;
        },
      });
    });
  };

  useReveal(ref as React.RefObject<HTMLSpanElement>, reveal, 0.5);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ─── BigStatement — animated big text block ─────────────────────────────── */
export function BigStatement({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reveal = () => {
    import("animejs").then(({ animate }) => {
      const el = ref.current;
      if (!el) return;
      animate(el, {
        translateY: ["60px", "0px"],
        opacity: [0, 1],
        scale: [0.95, 1],
        easing: "easeOutExpo",
        duration: 900,
      });
    });
  };

  useReveal(ref as React.RefObject<HTMLDivElement>, reveal, 0.15);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(60px) scale(0.95)" }}
    >
      {children}
    </div>
  );
}
