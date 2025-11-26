import { useState } from "react";
import HabitManageCard from "../HabitManageCard";

export default function HabitManageCardExample() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Ejercicio", streak: 5, totalCompletions: 42 },
    { id: 2, name: "Leer 30 min", streak: 12, totalCompletions: 89 },
    { id: 3, name: "Beber 2L agua", streak: 0, totalCompletions: 15 },
  ]);

  const handleUpdate = (id: number, name: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, name } : h));
  };

  const handleDelete = (id: number) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="flex flex-col gap-3 p-4 max-w-lg">
      {habits.map(habit => (
        <HabitManageCard
          key={habit.id}
          {...habit}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
