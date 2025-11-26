import { useState } from "react";
import HabitCard from "../HabitCard";

export default function HabitCardExample() {
  const [completedDays, setCompletedDays] = useState([true, true, false, true, false, false, false]);
  const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  const weekDates = [18, 19, 20, 21, 22, 23, 24];

  const handleToggle = (habitId: number, dayIndex: number) => {
    const newDays = [...completedDays];
    newDays[dayIndex] = !newDays[dayIndex];
    setCompletedDays(newDays);
  };

  return (
    <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
      <div className="grid grid-cols-[2fr_repeat(7,1fr)_80px_50px] py-4 px-5 bg-muted/50 border-b border-border">
        <div className="text-muted-foreground font-semibold text-sm">Habito</div>
        {days.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-muted-foreground font-medium text-sm">{day}</div>
            <div className="text-muted-foreground/60 text-xs">{weekDates[index]}</div>
          </div>
        ))}
        <div className="text-center text-muted-foreground font-semibold text-sm">Progreso</div>
        <div></div>
      </div>
      <HabitCard
        id={1}
        name="Ejercicio"
        completedDays={completedDays}
        days={days}
        weekDates={weekDates}
        onToggleDay={handleToggle}
        onDelete={() => console.log('Delete habit')}
      />
    </div>
  );
}
