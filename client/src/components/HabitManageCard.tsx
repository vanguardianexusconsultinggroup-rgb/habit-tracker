import { useState } from "react";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HabitManageCardProps {
  id: number;
  name: string;
  streak?: number;
  totalCompletions?: number;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

export default function HabitManageCard({ 
  id, 
  name, 
  streak = 0,
  totalCompletions = 0,
  onUpdate, 
  onDelete 
}: HabitManageCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(name);
    setIsEditing(false);
  };

  return (
    <Card className="p-4" data-testid={`card-manage-habit-${id}`}>
      <div className="flex items-center justify-between gap-4">
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              autoFocus
              data-testid={`input-edit-habit-${id}`}
            />
            <Button size="icon" variant="ghost" onClick={handleSave} data-testid={`button-save-habit-${id}`}>
              <Check className="w-4 h-4 text-chart-2" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel} data-testid={`button-cancel-edit-${id}`}>
              <X className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <div className="font-medium text-foreground" data-testid={`text-manage-habit-name-${id}`}>
                {name}
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                <span>Racha: {streak} dias</span>
                <span>Total: {totalCompletions} completados</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditing(true)}
                data-testid={`button-edit-habit-${id}`}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => onDelete(id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                data-testid={`button-delete-manage-habit-${id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
