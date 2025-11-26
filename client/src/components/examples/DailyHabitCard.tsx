import { useState } from "react";
import DailyHabitCard from "../DailyHabitCard";

export default function DailyHabitCardExample() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Ejercicio", completed: false, streak: 5 },
    { id: 2, name: "Leer 30 min", completed: true, streak: 12 },
    { id: 3, name: "Beber 2L agua", completed: false, streak: 0 },
  ]);

  const handleToggle = (id: number) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  return (
    <div className="flex flex-col gap-3 p-4 max-w-md">
      {habits.map(habit => (
        <DailyHabitCard
          key={habit.id}
          {...habit}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
