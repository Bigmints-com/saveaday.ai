import { Sparkles, Brain, Users, Lightbulb, Shield, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const capabilities = [
  {
    title: "Your Business Logic",
    description: "You define the rules, triggers, and workflows. Your domain expertise stays at the center.",
    icon: Lightbulb,
    isHuman: true
  },
  {
    title: "AI-Powered Execution",
    description: "AI handles the heavy lifting—scheduling, responses, data sync—without manual intervention.",
    icon: Brain,
    isHuman: false
  },
  {
    title: "Your Customer Relationships",
    description: "You maintain the personal touch. AI amplifies your reach, not replaces your voice.",
    icon: Users,
    isHuman: true
  },
  {
    title: "Intelligent Insights",
    description: "AI surfaces patterns, suggests optimizations, and predicts what needs attention next.",
    icon: Sparkles,
    isHuman: false
  },
  {
    title: "Your Strategic Decisions",
    description: "You set the direction. AI executes the tactics so you can focus on growth.",
    icon: Shield,
    isHuman: true
  },
  {
    title: "Adaptive Automation",
    description: "AI learns from your patterns and continuously improves workflow efficiency.",
    icon: Wand2,
    isHuman: false
  }
];

export default function AISection() {
  return (
    <div className="space-y-8">
      {/* Two column layout for human vs AI */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Human Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
            <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Powered by You</span>
          </div>
          {capabilities.filter(c => c.isHuman).map((item) => (
            <Card 
              key={item.title}
              className="border-border/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600" />
            <span className="text-sm font-semibold text-foreground uppercase tracking-wider">Assisted by AI</span>
          </div>
          {capabilities.filter(c => !c.isHuman).map((item) => (
            <Card 
              key={item.title}
              className="border-border/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
