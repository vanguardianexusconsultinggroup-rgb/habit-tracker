import { Trash2 } from "lucide-react";
import HabitCheckbox from "./HabitCheckbox";
import ProgressBar from "./ProgressBar";
import { Button } from "@/components/ui/button";

interface HabitCardProps {
  id: number;
  name: string;
  completedDays: boolean[];
  days: string[];
  weekDates: number[];
  onToggleDay: (habitId: number, dayIndex: number) => void;
  onDelete: (habitId: number) => void;
}

export default function HabitCard({ 
  id, 
  name, 
  completedDays, 
  days, 
  weekDates, 
  onToggleDay, 
  onDelete 
}: HabitCardProps) {
  const progress = Math.round((completedDays.filter(Boolean).length / 7) * 100);

  return (
    <div 
      className="grid grid-cols-[2fr_repeat(7,1fr)_80px_50px] items-center py-4 px-5 border-b border-border/50 last:border-b-0"
      data-testid={`row-habit-${id}`}
    >
      <div className="font-medium text-foreground" data-testid={`text-habit-name-${id}`}>
        {name}
      </div>
      {completedDays.map((completed, dayIndex) => (
        <div key={dayIndex} className="flex justify-center">
          <HabitCheckbox
            checked={completed}
            onChange={() => onToggleDay(id, dayIndex)}
            size="sm"
          />
        </div>
      ))}
      <div className="flex justify-center">
        <ProgressBar value={progress} className="w-16" />
      </div>
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          data-testid={`button-delete-habit-${id}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
