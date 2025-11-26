import { Card } from "@/components/ui/card";
import { Flame, Target, Trophy } from "lucide-react";

interface TodaySummaryProps {
  completedToday: number;
  totalHabits: number;
  currentStreak: number;
}

export default function TodaySummary({ 
  completedToday, 
  totalHabits, 
  currentStreak 
}: TodaySummaryProps) {
  const percentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
  const allComplete = completedToday === totalHabits && totalHabits > 0;

  return (
    <Card className="p-6" data-testid="card-today-summary">
      <h3 className="text-lg font-semibold mb-4">Resumen de Hoy</h3>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {completedToday}/{totalHabits}
            </div>
            <div className="text-sm text-muted-foreground">Habitos completados</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
            <Flame className="w-5 h-5 text-chart-3" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Dias de racha</div>
          </div>
        </div>

        {allComplete && (
          <div className="flex items-center gap-3 mt-2 p-3 rounded-lg bg-chart-2/10">
            <Trophy className="w-5 h-5 text-chart-2" />
            <span className="text-sm font-medium text-chart-2">
              Todos los habitos completados hoy
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
