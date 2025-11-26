import { useState } from "react";
import MonthCalendar from "../MonthCalendar";

export default function MonthCalendarExample() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    
    const days = [];
    
    const prevMonth = new Date(year, month, 0);
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        completedCount: 0
      });
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        completedCount: Math.floor(Math.random() * 4)
      });
    }
    
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        completedCount: 0
      });
    }
    
    return days;
  };

  return (
    <div className="p-4 max-w-lg">
      <MonthCalendar
        currentMonth={currentMonth}
        onPrevMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
        onNextMonth={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
        days={generateDays()}
        totalHabits={3}
        todayDate={new Date().getDate()}
      />
    </div>
  );
}
