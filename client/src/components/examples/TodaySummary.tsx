import TodaySummary from "../TodaySummary";

export default function TodaySummaryExample() {
  return (
    <div className="p-4 max-w-xs">
      <TodaySummary
        completedToday={3}
        totalHabits={5}
        currentStreak={7}
      />
    </div>
  );
}
