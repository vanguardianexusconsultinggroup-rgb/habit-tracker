import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeekNavigationProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  formatMonth: () => string;
}

export default function WeekNavigation({ 
  currentDate, 
  onPrevWeek, 
  onNextWeek, 
  formatMonth 
}: WeekNavigationProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-card rounded-2xl border border-card-border">
      <Button 
        variant="secondary" 
        onClick={onPrevWeek}
        data-testid="button-prev-week"
        className="gap-1"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </Button>
      <div className="flex items-center gap-2 text-foreground font-semibold text-lg">
        <Calendar className="w-5 h-5 text-primary" />
        <span className="capitalize" data-testid="text-current-month">{formatMonth()}</span>
      </div>
      <Button 
        variant="secondary" 
        onClick={onNextWeek}
        data-testid="button-next-week"
        className="gap-1"
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
