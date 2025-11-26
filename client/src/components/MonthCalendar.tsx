import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendarDay from "./CalendarDay";

interface DayData {
  date: number;
  isCurrentMonth: boolean;
  completedCount: number;
}

interface MonthCalendarProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  days: DayData[];
  totalHabits: number;
  todayDate: number;
}

const WEEKDAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

export default function MonthCalendar({ 
  currentMonth, 
  onPrevMonth, 
  onNextMonth, 
  days, 
  totalHabits,
  todayDate
}: MonthCalendarProps) {
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-card rounded-2xl border border-card-border p-6">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={onPrevMonth} data-testid="button-prev-month">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold capitalize" data-testid="text-month-name">{monthName}</h2>
        <Button variant="ghost" size="icon" onClick={onNextMonth} data-testid="button-next-month">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <CalendarDay
            key={index}
            date={day.date}
            isCurrentMonth={day.isCurrentMonth}
            isToday={day.isCurrentMonth && day.date === todayDate}
            completedCount={day.completedCount}
            totalHabits={totalHabits}
          />
        ))}
      </div>
    </div>
  );
}
