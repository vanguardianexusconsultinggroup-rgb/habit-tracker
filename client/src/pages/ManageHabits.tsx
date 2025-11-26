import HabitManageCard from "@/components/HabitManageCard";
import AddHabitInput from "@/components/AddHabitInput";
import EmptyState from "@/components/EmptyState";

interface Habit {
  id: number;
  name: string;
  streak: number;
  totalCompletions: number;
}

interface ManageHabitsProps {
  habits: Habit[];
  onAddHabit: (name: string) => void;
  onUpdateHabit: (id: number, name: string) => void;
  onDeleteHabit: (id: number) => void;
}

export default function ManageHabits({ 
  habits, 
  onAddHabit, 
  onUpdateHabit, 
  onDeleteHabit 
}: ManageHabitsProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Gestionar Habitos
        </h1>
        <p className="text-muted-foreground">
          Agrega, edita o elimina tus habitos
        </p>
      </div>

      <div className="space-y-6">
        <AddHabitInput onAdd={onAddHabit} />

        {habits.length === 0 ? (
          <EmptyState 
            title="Sin habitos todavia"
            description="Crea tu primer habito usando el campo de arriba"
          />
        ) : (
          <div className="flex flex-col gap-3">
            {habits.map(habit => (
              <HabitManageCard
                key={habit.id}
                id={habit.id}
                name={habit.name}
                streak={habit.streak}
                totalCompletions={habit.totalCompletions}
                onUpdate={onUpdateHabit}
                onDelete={onDeleteHabit}
              />
            ))}
          </div>
        )}

        {habits.length > 0 && (
          <div className="text-center text-sm text-muted-foreground pt-4">
            {habits.length} {habits.length === 1 ? 'habito' : 'habitos'} en total
          </div>
        )}
      </div>
    </div>
  );
}
