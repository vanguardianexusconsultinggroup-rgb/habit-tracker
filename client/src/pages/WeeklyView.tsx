import { useState } from "react";
import WeekNavigation from "@/components/WeekNavigation";
import HabitCard from "@/components/HabitCard";
import StatCard from "@/components/StatCard";
import EmptyState from "@/components/EmptyState";
import { Target, CheckCircle, TrendingUp } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  completedDays: boolean[];
}

interface WeeklyViewProps {
  habits: Habit[];
  currentWeekStart: Date;
  onNavigateWeek: (direction: number) => void;
  onToggleDay: (habitId: number, dayIndex: number) => void;
  onDeleteHabit: (habitId: number) => void;
}

const DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

export default function WeeklyView({ 
  habits, 
  currentWeekStart, 
  onNavigateWeek, 
  onToggleDay,
  onDeleteHabit 
}: WeeklyViewProps) {
  const getWeekDates = () => {
    return DAYS.map((_, index) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + index);
      return date.getDate();
    });
  };

  const formatMonth = () => {
    return currentWeekStart.toLocaleDateString('es-ES', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getProgress = (habit: Habit) => {
    const completed = habit.completedDays.filter(Boolean).length;
    return Math.round((completed / 7) * 100);
  };

  const totalCompleted = habits.reduce(
    (acc, h) => acc + h.completedDays.filter(Boolean).length, 
    0
  );

  const avgProgress = habits.length > 0
    ? Math.round(habits.reduce((acc, h) => acc + getProgress(h), 0) / habits.length)
    : 0;

  const weekDates = getWeekDates();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Vista Semanal
        </h1>
        <p className="text-muted-foreground">
          Rastrea tu progreso durante la semana
        </p>
      </div>

      <WeekNavigation
        currentDate={currentWeekStart}
        onPrevWeek={() => onNavigateWeek(-1)}
        onNextWeek={() => onNavigateWeek(1)}
        formatMonth={formatMonth}
      />

      <div className="mt-8 bg-card rounded-2xl border border-card-border overflow-hidden">
        <div className="grid grid-cols-[2fr_repeat(7,1fr)_80px_50px] py-4 px-5 bg-muted/50 border-b border-border">
          <div className="text-muted-foreground font-semibold text-sm">Habito</div>
          {DAYS.map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-muted-foreground font-medium text-sm">{day}</div>
              <div className="text-muted-foreground/60 text-xs">{weekDates[index]}</div>
            </div>
          ))}
          <div className="text-center text-muted-foreground font-semibold text-sm">Progreso</div>
          <div></div>
        </div>

        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          habits.map(habit => (
            <HabitCard
              key={habit.id}
              id={habit.id}
              name={habit.name}
              completedDays={habit.completedDays}
              days={DAYS}
              weekDates={weekDates}
              onToggleDay={onToggleDay}
              onDelete={onDeleteHabit}
            />
          ))
        )}
      </div>

      {habits.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <StatCard
            title="Habitos activos"
            value={habits.length}
            icon={Target}
            variant="primary"
          />
          <StatCard
            title="Dias completados"
            value={totalCompleted}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Promedio semanal"
            value={`${avgProgress}%`}
            icon={TrendingUp}
            variant="warning"
          />
        </div>
      )}
    </div>
  );
}
