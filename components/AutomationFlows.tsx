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
  Clock
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
      { name: "Bookings", icon: Calendar, color: "text-blue-600" },
      { name: "Rewards", icon: Gift, color: "text-pink-600" }
    ]
  },
  {
    id: "crm-sync",
    title: "Sync survey feedback directly into CRM profiles",
    category: "Operations",
    timeSaved: "10 mins",
    apps: [
      { name: "Surveys", icon: ClipboardCheck, color: "text-amber-600" },
      { name: "Contacts", icon: Database, color: "text-emerald-600" }
    ]
  },
  {
    id: "lead-reply",
    title: "Instantly respond to enquiries via lead forms",
    category: "Growth",
    timeSaved: "20 mins",
    apps: [
      { name: "Leads", icon: Users, color: "text-orange-600" },
      { name: "Comm", icon: Mail, color: "text-purple-600" }
    ]
  },
  {
    id: "reminders",
    title: "Schedule follow-up tasks after appointment visits",
    category: "Operations",
    timeSaved: "15 mins",
    apps: [
      { name: "Bookings", icon: Calendar, color: "text-blue-600" },
      { name: "Tasks", icon: CheckCircle2, color: "text-green-600" }
    ]
  },
  {
    id: "catalog-booking",
    title: "Transform catalogue picks into confirmed bookings",
    category: "Experience",
    timeSaved: "30 mins",
    apps: [
      { name: "Catalog", icon: ShoppingBag, color: "text-indigo-600" },
      { name: "Bookings", icon: Calendar, color: "text-blue-600" }
    ]
  },
  {
    id: "referral-rewards",
    title: "Generate referral credits for successful invites",
    category: "Growth",
    timeSaved: "10 mins",
    apps: [
      { name: "Referrals", icon: UserPlus, color: "text-cyan-600" },
      { name: "Rewards", icon: Gift, color: "text-pink-600" }
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
      {/* Category Filter using ToggleGroup */}
      <div className="flex justify-center">
        <ToggleGroup 
          type="single" 
          value={activeCategory} 
          onValueChange={(value) => value && setActiveCategory(value)}
          className="bg-muted p-1 rounded-lg"
        >
          {categories.map((cat) => (
            <ToggleGroupItem 
              key={cat} 
              value={cat}
              className="px-4 py-2 text-sm font-medium data-[state=on]:bg-background data-[state=on]:shadow-sm rounded-md"
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
            className="group cursor-pointer hover:border-primary transition-colors"
          >
            <CardHeader className="space-y-0 pb-4">
              {/* App Icons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  {item.apps.map((app) => (
                    <div 
                      key={app.name} 
                      title={app.name} 
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted border-2 border-background"
                    >
                      <app.icon className={`h-5 w-5 ${app.color}`} />
                    </div>
                  ))}
                </div>
                <div className="h-px flex-1 bg-border" />
                <Zap className="h-4 w-4 text-primary fill-primary" />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-4 border-t">
              <Badge variant="secondary" className="gap-1.5 font-semibold">
                <Clock className="h-3 w-3" />
                Saves {item.timeSaved}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                Automated
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Footer Message */}
      <p className="text-center text-sm text-muted-foreground">
        Quantifiable time recovery from the <span className="text-primary font-medium">SaveADay</span> internal ecosystem.
      </p>
    </div>
  );
}
