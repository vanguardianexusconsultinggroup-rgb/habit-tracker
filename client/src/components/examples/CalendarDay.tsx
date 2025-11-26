import CalendarDay from "../CalendarDay";

export default function CalendarDayExample() {
  return (
    <div className="flex gap-2 p-4">
      <CalendarDay date={15} completedCount={0} totalHabits={3} />
      <CalendarDay date={16} completedCount={2} totalHabits={3} />
      <CalendarDay date={17} completedCount={3} totalHabits={3} isToday />
      <CalendarDay date={18} completedCount={1} totalHabits={3} />
      <CalendarDay date={1} isCurrentMonth={false} completedCount={0} totalHabits={3} />
    </div>
  );
}
