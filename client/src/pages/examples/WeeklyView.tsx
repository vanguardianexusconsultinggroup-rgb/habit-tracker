import { useState } from "react";
import WeeklyView from "../WeeklyView";

export default function WeeklyViewExample() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Ejercicio", completedDays: [true, true, false, true, false, false, false] },
    { id: 2, name: "Leer 30 min", completedDays: [true, true, true, true, true, false, false] },
    { id: 3, name: "Beber 2L agua", completedDays: [false, true, true, false, true, false, false] },
    { id: 4, name: "Meditar 10 min", completedDays: [true, false, true, true, false, false, false] },
  ]);

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction * 7));
    setCurrentWeekStart(newDate);
  };

  const handleToggleDay = (habitId: number, dayIndex: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompletedDays = [...habit.completedDays];
        newCompletedDays[dayIndex] = !newCompletedDays[dayIndex];
        return { ...habit, completedDays: newCompletedDays };
      }
      return habit;
    }));
  };

  const handleDeleteHabit = (habitId: number) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  return (
    <WeeklyView
      habits={habits}
      currentWeekStart={currentWeekStart}
      onNavigateWeek={navigateWeek}
      onToggleDay={handleToggleDay}
      onDeleteHabit={handleDeleteHabit}
    />
  );
}
