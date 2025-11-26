import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle, Calendar, TrendingUp, ArrowRight } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Mi Habit Tracker</span>
            </div>
            <Button onClick={handleLogin} data-testid="button-login-header">
              Iniciar sesion
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Construye mejores habitos, un dia a la vez
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Una aplicacion simple y elegante para rastrear tus habitos diarios, 
              visualizar tu progreso y mantener tu racha.
            </p>
            <Button size="lg" onClick={handleLogin} className="gap-2" data-testid="button-login-hero">
              Comenzar ahora
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              Caracteristicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-card-border">
                <CardHeader>
                  <CheckCircle className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Vista Diaria</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Marca tus habitos completados cada dia con un solo clic.
                    Visualiza tu progreso de manera clara y simple.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <Calendar className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Vista Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Observa tu progreso a lo largo de la semana.
                    Identifica patrones y mantente motivado.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-card-border">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 text-primary mb-2" />
                  <CardTitle>Estadisticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Rastrea tu racha actual y total de dias completados.
                    Mantente motivado con tus logros.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Listo para comenzar?
            </h2>
            <p className="text-muted-foreground mb-8">
              Crea tu cuenta gratis y empieza a construir mejores habitos hoy.
            </p>
            <Button size="lg" onClick={handleLogin} className="gap-2" data-testid="button-login-cta">
              Crear cuenta gratis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          Mi Habit Tracker - Tu compañero para construir mejores habitos
        </div>
      </footer>
    </div>
  );
}
