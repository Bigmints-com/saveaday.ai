import React from "react";
import type { NextPage } from "next";
import { Check, Minus, Info, Sparkles } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tiers = [
  { name: "Starter", price: "Coming Soon" },
  { name: "Plus", price: "Coming Soon" },
  { name: "Pro", price: "Coming Soon", popular: true },
  { name: "Enterprise", price: "Custom" },
];

const featureGroups = [
  {
    title: "Core Apps",
    features: [
      { name: "Contacts", starter: "✓", plus: "✓", pro: "✓", enterprise: "✓" },
      { name: "Leads", starter: "✓", plus: "✓", pro: "✓", enterprise: "✓" },
      { name: "Links", starter: "✓", plus: "✓", pro: "✓", enterprise: "✓" },
      { name: "Catalogues", starter: "✓", plus: "1", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Surveys", starter: "✓", plus: "4", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Tasks", starter: "✓", plus: "✓", pro: "✓", enterprise: "✓" },
      { name: "Feeds", starter: "x", plus: "10", pro: "100", enterprise: "Unlimited" },
      { name: "Bookings", starter: "x", plus: "✓", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Waitlists", starter: "x", plus: "✓", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Referrals", starter: "x", plus: "✓", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Rewards", starter: "x", plus: "x", pro: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    title: "Platform Features",
    features: [
      { name: "AI Support Agent", starter: "x", plus: "x", pro: "✓", enterprise: "✓" },
      { name: "Managed AI", starter: "x", plus: "50k tokens", pro: "100k tokens", enterprise: "Custom" },
      { name: "Automations", starter: "x", plus: "10", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "AI Reports", starter: "x", plus: "5", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Initial Set Up", starter: "✓", plus: "✓", pro: "✓", enterprise: "✓" },
      { name: "Team Management", starter: "2 members", plus: "10 members", pro: "Unlimited", enterprise: "Unlimited" },
    ],
  },
  {
    title: "Add-Ons",
    features: [
      { name: "Custom Website", starter: "Coming Soon", plus: "Coming Soon", pro: "Coming Soon", enterprise: "Included" },
      { name: "Custom Data connectors", starter: "Coming Soon", plus: "Coming Soon", pro: "Coming Soon", enterprise: "Included" },
      { name: "On-Premise", starter: "x", plus: "x", pro: "x", enterprise: "Coming Soon" },
      { name: "Service Management", starter: "Coming Soon", plus: "Coming Soon", pro: "Coming Soon", enterprise: "Included" },
    ],
  }
];

const PricingPage: NextPage = () => {
  const renderCell = (val: string) => {
    if (val === "✓") return <Check className="h-5 w-5 text-emerald-500 mx-auto" />;
    if (val === "x") return <Minus className="h-5 w-5 text-muted-foreground/30 mx-auto" />;
    if (val === "Unlimited") return (
      <Badge className="bg-primary text-primary-foreground border-0">
        Unlimited
      </Badge>
    );
    return <span className="text-muted-foreground text-sm whitespace-nowrap">{val}</span>;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <Section
          id="pricing-header"
          title="Simple, transparent plans."
          description="Everything you need to automate your business. Prices are coming soon."
          align="center"
        >
          {/* Pricing Table */}
          <Card className="mt-16 overflow-hidden border shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-b">
                      <TableHead className="font-bold text-foreground text-base py-6 pl-8">Features</TableHead>
                      {tiers.map((tier) => (
                        <TableHead key={tier.name} className="text-center py-6 px-8 relative">
                          {tier.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                              <Badge className="bg-primary text-primary-foreground border-0 shadow-md px-3 py-1">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            </div>
                          )}
                          <div className="text-lg font-bold text-foreground mb-2">
                            {tier.name}
                          </div>
                          <Badge variant="outline" className="text-xs font-semibold">
                            {tier.price}
                          </Badge>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featureGroups.map((group) => (
                      <React.Fragment key={group.title}>
                        <TableRow className="bg-muted/20">
                          <TableCell
                            colSpan={5}
                            className="text-xs font-bold text-foreground uppercase tracking-wider py-4 pl-8"
                          >
                            {group.title}
                          </TableCell>
                        </TableRow>
                        {group.features.map((feature) => (
                          <TableRow 
                            key={feature.name} 
                            className="hover:bg-muted/10 transition-colors"
                          >
                            <TableCell className="font-medium text-foreground py-4 pl-8">{feature.name}</TableCell>
                            <TableCell className="text-center py-4 px-8">{renderCell(feature.starter)}</TableCell>
                            <TableCell className="text-center py-4 px-8">{renderCell(feature.plus)}</TableCell>
                            <TableCell className="text-center py-4 px-8">{renderCell(feature.pro)}</TableCell>
                            <TableCell className="text-center py-4 px-8">{renderCell(feature.enterprise)}</TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    {/* Footer Row with CTAs */}
                    <TableRow className="bg-muted/30 border-t">
                      <TableCell className="py-6" />
                      {tiers.map((tier) => (
                        <TableCell key={tier.name} className="text-center py-8 px-8">
                          <Button 
                            variant={tier.popular ? "default" : "outline"}
                            disabled 
                            className="w-full"
                          >
                            Coming Soon
                          </Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Callout */}
          <Alert className="mt-16 max-w-3xl mx-auto border-primary/20 bg-primary/5">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-foreground">Looking for something custom?</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Our Enterprise plan includes everything in Pro plus custom website development, on-premise deployment options, and dedicated service management. Contact us to learn more.
            </AlertDescription>
          </Alert>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
