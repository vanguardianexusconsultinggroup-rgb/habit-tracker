import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, className, showLabel = true }: ProgressBarProps) {
  const isComplete = value === 100;
  
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            isComplete ? "bg-chart-2" : "bg-primary"
          )}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span 
          className={cn(
            "text-xs font-semibold",
            isComplete ? "text-chart-2" : "text-muted-foreground"
          )}
          data-testid="text-progress-value"
        >
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
}
