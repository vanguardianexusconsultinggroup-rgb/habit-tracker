import HabitCheckbox from "./HabitCheckbox";
import { Card } from "@/components/ui/card";

interface DailyHabitCardProps {
  id: number;
  name: string;
  completed: boolean;
  streak?: number;
  onToggle: (id: number) => void;
}

export default function DailyHabitCard({ 
  id, 
  name, 
  completed, 
  streak = 0,
  onToggle 
}: DailyHabitCardProps) {
  return (
    <Card 
      className="p-4 flex items-center justify-between hover-elevate cursor-pointer"
      onClick={() => onToggle(id)}
      data-testid={`card-daily-habit-${id}`}
    >
      <div className="flex items-center gap-4">
        <HabitCheckbox 
          checked={completed} 
          onChange={() => onToggle(id)}
          size="md"
        />
        <div>
          <div className="font-medium text-foreground" data-testid={`text-daily-habit-name-${id}`}>
            {name}
          </div>
          {streak > 0 && (
            <div className="text-xs text-muted-foreground">
              Racha: {streak} dias
            </div>
          )}
        </div>
      </div>
      {completed && (
        <span className="text-chart-2 text-sm font-medium">Completado</span>
      )}
    </Card>
  );
}
