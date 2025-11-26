import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddHabitInputProps {
  onAdd: (name: string) => void;
}

export default function AddHabitInput({ onAdd }: AddHabitInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(value.trim());
      setValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Agregar nuevo habito..."
        className="flex-1"
        data-testid="input-new-habit"
      />
      <Button 
        onClick={handleSubmit}
        className="gap-2"
        data-testid="button-add-habit"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </Button>
    </div>
  );
}
