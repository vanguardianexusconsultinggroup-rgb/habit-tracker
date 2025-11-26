import { useState } from "react";
import DailyHabitCard from "@/components/DailyHabitCard";
import TodaySummary from "@/components/TodaySummary";
import EmptyState from "@/components/EmptyState";
import AddHabitInput from "@/components/AddHabitInput";

interface Habit {
  id: number;
  name: string;
  completed: boolean;
  streak: number;
}

interface DailyViewProps {
  habits: Habit[];
  onToggleHabit: (id: number) => void;
  onAddHabit: (name: string) => void;
}

export default function DailyView({ habits, onToggleHabit, onAddHabit }: DailyViewProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const completedToday = habits.filter(h => h.completed).length;
  const currentStreak = Math.max(...habits.map(h => h.streak), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Habitos de Hoy
        </h1>
        <p className="text-muted-foreground capitalize" data-testid="text-today-date">
          {formattedDate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <AddHabitInput onAdd={onAddHabit} />
          
          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-3">
              {habits.map(habit => (
                <DailyHabitCard
                  key={habit.id}
                  id={habit.id}
                  name={habit.name}
                  completed={habit.completed}
                  streak={habit.streak}
                  onToggle={onToggleHabit}
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <TodaySummary
            completedToday={completedToday}
            totalHabits={habits.length}
            currentStreak={currentStreak}
          />
        </div>
      </div>
    </div>
  );
}
