import StatCard from "../StatCard";
import { Target, CheckCircle, TrendingUp } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <StatCard 
        title="Habitos activos" 
        value={5} 
        icon={Target}
        variant="primary" 
      />
      <StatCard 
        title="Dias completados" 
        value={12} 
        icon={CheckCircle}
        variant="success" 
      />
      <StatCard 
        title="Promedio semanal" 
        value="85%" 
        icon={TrendingUp}
        variant="warning" 
      />
    </div>
  );
}
