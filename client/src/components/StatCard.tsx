import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: "primary" | "success" | "warning";
}

export default function StatCard({ title, value, icon: Icon, variant = "primary" }: StatCardProps) {
  const variantClasses = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    success: "bg-chart-2/10 border-chart-2/20 text-chart-2",
    warning: "bg-chart-3/10 border-chart-3/20 text-chart-3"
  };

  return (
    <div 
      className={cn(
        "rounded-2xl p-6 text-center border",
        variantClasses[variant]
      )}
      data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {Icon && (
        <div className="flex justify-center mb-2">
          <Icon className="w-5 h-5 opacity-80" />
        </div>
      )}
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">{title}</div>
    </div>
  );
}
