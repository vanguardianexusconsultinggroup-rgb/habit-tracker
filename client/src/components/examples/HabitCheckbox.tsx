import { useState } from "react";
import HabitCheckbox from "../HabitCheckbox";

export default function HabitCheckboxExample() {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <div className="flex items-center gap-4 p-4">
      <HabitCheckbox checked={checked} onChange={setChecked} size="sm" />
      <HabitCheckbox checked={checked2} onChange={setChecked2} size="md" />
      <HabitCheckbox checked={true} onChange={() => {}} size="lg" />
    </div>
  );
}
