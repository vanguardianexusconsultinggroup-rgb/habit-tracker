import { cn } from "@/lib/utils";

interface CalendarDayProps {
  date: number;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  completedCount: number;
  totalHabits: number;
  onClick?: () => void;
}

export default function CalendarDay({ 
  date, 
  isToday = false, 
  isCurrentMonth = true,
  completedCount,
  totalHabits,
  onClick 
}: CalendarDayProps) {
  const allCompleted = completedCount === totalHabits && totalHabits > 0;
  const hasProgress = completedCount > 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square rounded-lg p-2 flex flex-col items-center justify-center gap-1 transition-all",
        isCurrentMonth ? "hover-elevate" : "opacity-40",
        isToday && "ring-2 ring-primary",
        allCompleted && "bg-chart-2/20"
      )}
      data-testid={`button-calendar-day-${date}`}
    >
      <span className={cn(
        "text-sm font-medium",
        isToday ? "text-primary font-bold" : "text-foreground"
      )}>
        {date}
      </span>
      {totalHabits > 0 && (
        <div className="flex gap-0.5">
          {Array.from({ length: Math.min(totalHabits, 5) }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                i < completedCount ? "bg-chart-2" : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      )}
    </button>
  );
}
