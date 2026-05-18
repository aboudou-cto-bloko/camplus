"use client";
import { useRef, useEffect, useState, Children } from "react";
import { cn } from "@/lib/utils";

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  baseDelay?: number;
  threshold?: number;
  duration?: number;
  distance?: number;
}

export function StaggerReveal({
  children,
  className,
  stagger = 110,
  baseDelay = 0,
  threshold = 0.1,
  duration = 900,
  distance = 36,
}: StaggerRevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const childArray = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => (
        <div
          key={i}
          className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: visible ? `${baseDelay + i * stagger}ms` : "0ms",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/* Variant for dramatic big text — heavier animation */
export function DramaticReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("transition-all ease-[cubic-bezier(0.16,1,0.3,1)]", className)}
      style={{
        transitionDuration: "1100ms",
        transitionDelay: visible ? `${delay}ms` : "0ms",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.97)",
      }}
    >
      {children}
    </div>
  );
}
