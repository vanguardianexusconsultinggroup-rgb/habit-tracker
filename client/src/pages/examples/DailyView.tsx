import { useState } from "react";
import DailyView from "../DailyView";

export default function DailyViewExample() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Ejercicio", completed: false, streak: 5 },
    { id: 2, name: "Leer 30 min", completed: true, streak: 12 },
    { id: 3, name: "Beber 2L agua", completed: false, streak: 3 },
    { id: 4, name: "Meditar 10 min", completed: true, streak: 7 },
    { id: 5, name: "Estudiar idiomas", completed: false, streak: 0 },
  ]);

  const handleToggle = (id: number) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  const handleAddHabit = (name: string) => {
    setHabits([...habits, {
      id: Date.now(),
      name,
      completed: false,
      streak: 0
    }]);
  };

  return (
    <DailyView
      habits={habits}
      onToggleHabit={handleToggle}
      onAddHabit={handleAddHabit}
    />
  );
}
