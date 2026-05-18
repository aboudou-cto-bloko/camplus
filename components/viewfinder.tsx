import { cn } from "@/lib/utils";

interface ViewfinderProps {
  children?: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export function Viewfinder({
  children,
  className,
  size = 20,
  color = "#8DFF2F",
  opacity = 0.8,
}: ViewfinderProps) {
  const style = {
    width: size,
    height: size,
    borderColor: color,
    opacity,
  };

  return (
    <div className={cn("relative", className)}>
      <span
        className="absolute top-0 left-0 border-t-2 border-l-2 rounded-tl-[4px]"
        style={style}
      />
      <span
        className="absolute top-0 right-0 border-t-2 border-r-2 rounded-tr-[4px]"
        style={style}
      />
      <span
        className="absolute bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[4px]"
        style={style}
      />
      <span
        className="absolute bottom-0 right-0 border-b-2 border-r-2 rounded-br-[4px]"
        style={style}
      />
      {children}
    </div>
  );
}
