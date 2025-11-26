import { Sprout } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({ 
  title = "No hay habitos aun", 
  description = "Agrega tu primer habito para comenzar a construir mejores rutinas" 
}: EmptyStateProps) {
  return (
    <div className="py-16 text-center" data-testid="empty-state">
      <Sprout className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground/70">{description}</p>
    </div>
  );
}
