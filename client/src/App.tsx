import { Switch, Route } from "wouter";
import { queryClient, apiRequest } from "./lib/queryClient";
import { QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navigation from "@/components/Navigation";
import DailyView from "@/pages/DailyView";
import WeeklyView from "@/pages/WeeklyView";
import ManageHabits from "@/pages/ManageHabits";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/not-found";
import type { Habit, User } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface HabitWithStats extends Habit {
  streak: number;
  totalCompletions: number;
}

interface CompletionRecord {
  habitId: number;
  completedDate: string;
}

function getWeekStartDate(): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(today.getFullYear(), today.getMonth(), diff);
}

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

function getWeekDateStrings(weekStart: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date.toISOString().split("T")[0];
  });
}

function HabitTrackerApp() {
  const { user, isLoading: isAuthLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const { data: habits = [], isLoading: isHabitsLoading } = useQuery<HabitWithStats[]>({
    queryKey: ["/api/habits"],
    enabled: isAuthenticated,
  });

  const currentWeekStart = getWeekStartDate();
  const weekDates = getWeekDateStrings(currentWeekStart);
  const startDate = weekDates[0];
  const endDate = weekDates[6];

  const { data: completions = [] } = useQuery<CompletionRecord[]>({
    queryKey: ["/api/completions", startDate, endDate],
    queryFn: async () => {
      const response = await fetch(`/api/completions?startDate=${startDate}&endDate=${endDate}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const addHabitMutation = useMutation({
    mutationFn: async (name: string) => {
      return await apiRequest("POST", "/api/habits", { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
      toast({ title: "Habito creado", description: "Tu nuevo habito ha sido agregado" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Sesion expirada", description: "Iniciando sesion...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Error", description: "No se pudo crear el habito", variant: "destructive" });
    },
  });

  const updateHabitMutation = useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      return await apiRequest("PATCH", `/api/habits/${id}`, { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
      toast({ title: "Habito actualizado" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Sesion expirada", description: "Iniciando sesion...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Error", description: "No se pudo actualizar el habito", variant: "destructive" });
    },
  });

  const deleteHabitMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/habits/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/completions"] });
      toast({ title: "Habito eliminado" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Sesion expirada", description: "Iniciando sesion...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Error", description: "No se pudo eliminar el habito", variant: "destructive" });
    },
  });

  const toggleCompletionMutation = useMutation({
    mutationFn: async ({ habitId, date }: { habitId: number; date: string }) => {
      return await apiRequest("POST", `/api/habits/${habitId}/toggle`, { date });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/completions"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({ title: "Sesion expirada", description: "Iniciando sesion...", variant: "destructive" });
        setTimeout(() => { window.location.href = "/api/login"; }, 500);
        return;
      }
      toast({ title: "Error", description: "No se pudo actualizar el habito", variant: "destructive" });
    },
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleAddHabit = (name: string) => {
    addHabitMutation.mutate(name);
  };

  const handleUpdateHabit = (id: number, name: string) => {
    updateHabitMutation.mutate({ id, name });
  };

  const handleDeleteHabit = (id: number) => {
    deleteHabitMutation.mutate(id);
  };

  const handleToggleDailyHabit = (id: number) => {
    const today = getTodayString();
    toggleCompletionMutation.mutate({ habitId: id, date: today });
  };

  const handleToggleWeeklyDay = (habitId: number, dayIndex: number) => {
    const date = weekDates[dayIndex];
    toggleCompletionMutation.mutate({ habitId, date });
  };

  const getDailyHabits = () => {
    const today = getTodayString();
    return habits.map((h) => ({
      id: h.id,
      name: h.name,
      completed: completions.some((c) => c.habitId === h.id && c.completedDate === today),
      streak: h.streak,
    }));
  };

  const getWeeklyHabits = () => {
    return habits.map((h) => ({
      id: h.id,
      name: h.name,
      completedDays: weekDates.map((date) =>
        completions.some((c) => c.habitId === h.id && c.completedDate === date)
      ),
    }));
  };

  const getManageHabits = () => {
    return habits.map((h) => ({
      id: h.id,
      name: h.name,
      streak: h.streak,
      totalCompletions: h.totalCompletions,
    }));
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  const username = user?.email || user?.firstName || "Usuario";

  return (
    <div className="min-h-screen bg-background">
      <Navigation username={username} onLogout={handleLogout} />
      {isHabitsLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Switch>
          <Route path="/">
            <DailyView
              habits={getDailyHabits()}
              onToggleHabit={handleToggleDailyHabit}
              onAddHabit={handleAddHabit}
            />
          </Route>
          <Route path="/semanal">
            <WeeklyView
              habits={getWeeklyHabits()}
              currentWeekStart={currentWeekStart}
              onNavigateWeek={() => {}}
              onToggleDay={handleToggleWeeklyDay}
              onDeleteHabit={handleDeleteHabit}
            />
          </Route>
          <Route path="/gestionar">
            <ManageHabits
              habits={getManageHabits()}
              onAddHabit={handleAddHabit}
              onUpdateHabit={handleUpdateHabit}
              onDeleteHabit={handleDeleteHabit}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HabitTrackerApp />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
