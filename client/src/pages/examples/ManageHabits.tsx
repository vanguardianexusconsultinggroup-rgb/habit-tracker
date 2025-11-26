import { useState } from "react";
import ManageHabits from "../ManageHabits";

export default function ManageHabitsExample() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Ejercicio", streak: 5, totalCompletions: 42 },
    { id: 2, name: "Leer 30 min", streak: 12, totalCompletions: 89 },
    { id: 3, name: "Beber 2L agua", streak: 3, totalCompletions: 28 },
    { id: 4, name: "Meditar 10 min", streak: 7, totalCompletions: 56 },
    { id: 5, name: "Estudiar idiomas", streak: 0, totalCompletions: 15 },
  ]);

  const handleAddHabit = (name: string) => {
    setHabits([...habits, {
      id: Date.now(),
      name,
      streak: 0,
      totalCompletions: 0
    }]);
  };

  const handleUpdateHabit = (id: number, name: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, name } : h));
  };

  const handleDeleteHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <ManageHabits
      habits={habits}
      onAddHabit={handleAddHabit}
      onUpdateHabit={handleUpdateHabit}
      onDeleteHabit={handleDeleteHabit}
    />
  );
}
