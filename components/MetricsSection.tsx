import { TrendingUp, Users, Clock, BarChart3, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  {
    label: "Hours Saved Weekly",
    value: "8+",
    change: "per team member",
    icon: Clock,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50"
  },
  {
    label: "Tasks Automated",
    value: "50+",
    change: "recurring workflows",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50"
  },
  {
    label: "Response Time",
    value: "<1m",
    change: "for lead follow-ups",
    icon: Target,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50"
  },
  {
    label: "Customer Retention",
    value: "+23%",
    change: "with automated rewards",
    icon: TrendingUp,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50"
  }
];

export default function MetricsSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card 
          key={metric.label}
          className="group overflow-hidden border-border/50 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground/50 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-foreground">
                {metric.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {metric.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
