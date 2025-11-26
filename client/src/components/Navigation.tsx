import { Link, useLocation } from "wouter";
import { CalendarDays, Calendar, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Hoy", icon: CalendarDays },
  { path: "/semanal", label: "Semanal", icon: Calendar },
  { path: "/gestionar", label: "Gestionar", icon: Settings },
];

interface NavigationProps {
  username?: string;
  onLogout?: () => void;
}

export default function Navigation({ username, onLogout }: NavigationProps) {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-foreground">Mi Habit Tracker</span>
          </div>

          <nav className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} href={path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "gap-2",
                    location === path && "bg-accent text-accent-foreground"
                  )}
                  data-testid={`link-nav-${label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {username && (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {username}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onLogout}
                  data-testid="button-logout"
                >
                  Salir
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
