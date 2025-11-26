import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
}

export default function HabitCheckbox({ checked, onChange, size = "md" }: HabitCheckboxProps) {
  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <button
      data-testid="button-habit-checkbox"
      onClick={() => onChange(!checked)}
      className={cn(
        sizeClasses[size],
        "rounded-lg flex items-center justify-center transition-all duration-200",
        checked 
          ? "bg-chart-2 text-white" 
          : "border-2 border-muted-foreground/30 hover:border-primary/50"
      )}
    >
      {checked && <Check className={iconSizes[size]} strokeWidth={3} />}
    </button>
  );
}
