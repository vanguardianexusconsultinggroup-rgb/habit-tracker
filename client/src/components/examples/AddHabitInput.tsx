import AddHabitInput from "../AddHabitInput";

export default function AddHabitInputExample() {
  return (
    <div className="p-4 max-w-xl">
      <AddHabitInput onAdd={(name) => console.log('Adding habit:', name)} />
    </div>
  );
}
