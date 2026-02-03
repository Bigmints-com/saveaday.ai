import { useState } from "react";
import { 
  Calendar, 
  CheckCircle2, 
  Users, 
  Mail, 
  Gift, 
  ShoppingBag,
  UserPlus,
  ClipboardCheck,
  Database,
  Zap,
  Clock,
  ArrowRight
} from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const categories = ["All", "Experience", "Operations", "Growth"];

const automations = [
  {
    id: "loyalty",
    title: "Award loyalty points after booking completion",
    category: "Experience",
    timeSaved: "15 mins",
    apps: [
      { name: "Bookings", icon: Calendar, color: "from-blue-500 to-blue-600" },
      { name: "Rewards", icon: Gift, color: "from-pink-500 to-pink-600" }
    ]
  },
  {
    id: "crm-sync",
    title: "Sync survey feedback directly into CRM profiles",
    category: "Operations",
    timeSaved: "10 mins",
    apps: [
      { name: "Surveys", icon: ClipboardCheck, color: "from-amber-500 to-amber-600" },
      { name: "Contacts", icon: Database, color: "from-emerald-500 to-emerald-600" }
    ]
  },
  {
    id: "lead-reply",
    title: "Instantly respond to enquiries via lead forms",
    category: "Growth",
    timeSaved: "20 mins",
    apps: [
      { name: "Leads", icon: Users, color: "from-orange-500 to-orange-600" },
      { name: "Comm", icon: Mail, color: "from-purple-500 to-purple-600" }
    ]
  },
  {
    id: "reminders",
    title: "Schedule follow-up tasks after appointment visits",
    category: "Operations",
    timeSaved: "15 mins",
    apps: [
      { name: "Bookings", icon: Calendar, color: "from-blue-500 to-blue-600" },
      { name: "Tasks", icon: CheckCircle2, color: "from-green-500 to-green-600" }
    ]
  },
  {
    id: "catalog-booking",
    title: "Transform catalogue picks into confirmed bookings",
    category: "Experience",
    timeSaved: "30 mins",
    apps: [
      { name: "Catalog", icon: ShoppingBag, color: "from-indigo-500 to-indigo-600" },
      { name: "Bookings", icon: Calendar, color: "from-blue-500 to-blue-600" }
    ]
  },
  {
    id: "referral-rewards",
    title: "Generate referral credits for successful invites",
    category: "Growth",
    timeSaved: "10 mins",
    apps: [
      { name: "Referrals", icon: UserPlus, color: "from-cyan-500 to-cyan-600" },
      { name: "Rewards", icon: Gift, color: "from-pink-500 to-pink-600" }
    ]
  }
];

export default function AutomationFlows() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredAutomations = automations.filter(
    (a) => activeCategory === "All" || a.category === activeCategory
  );

  return (
    <div className="space-y-10">
      {/* Category Filter */}
      <div className="flex justify-center">
        <ToggleGroup 
          type="single" 
          value={activeCategory} 
          onValueChange={(value) => value && setActiveCategory(value)}
          className="bg-muted/50 p-1.5 rounded-xl border border-border/50"
        >
          {categories.map((cat) => (
            <ToggleGroupItem 
              key={cat} 
              value={cat}
              className="px-5 py-2.5 text-sm font-medium rounded-lg data-[state=on]:bg-white data-[state=on]:shadow-md data-[state=on]:text-foreground transition-all"
            >
              {cat}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Automation Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAutomations.map((item) => (
          <Card 
            key={item.id} 
            className="group cursor-pointer border-border/50 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
          >
            <CardHeader className="space-y-0 pb-4">
              {/* App Icons with gradient backgrounds */}
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  {item.apps.map((app) => (
                    <div 
                      key={app.name} 
                      title={app.name} 
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${app.color} shadow-lg border-2 border-white`}
                    >
                      <app.icon className="h-5 w-5 text-white" />
                    </div>
                  ))}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <Zap className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
              <Badge className="gap-1.5 font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                <Clock className="h-3 w-3" />
                Saves {item.timeSaved}
              </Badge>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
