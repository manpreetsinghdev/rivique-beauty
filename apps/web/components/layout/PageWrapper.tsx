import { cn } from "@/lib/cn";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 py-12", className)}>
      {children}
    </div>
  );
}
