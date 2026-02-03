import React from "react";
import type { NextPage } from "next";
import { Check, Minus, Info } from "lucide-react";

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
  { name: "Pro", price: "Coming Soon" },
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
    if (val === "Unlimited") return <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">Unlimited</Badge>;
    return <span className="text-muted-foreground text-sm whitespace-nowrap">{val}</span>;
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <Section
          id="pricing-header"
          title="Simple, transparent plans."
          description="Everything you need to automate your business. Prices are coming soon."
          align="center"
        >
          {/* Pricing Table */}
          <Card className="mt-12 overflow-hidden border-border/50 bg-white/50 backdrop-blur-sm shadow-xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-border/50">
                      <TableHead className="font-semibold text-foreground">Features</TableHead>
                      {tiers.map((tier) => (
                        <TableHead key={tier.name} className="text-center">
                          <div className="text-base font-bold text-foreground">{tier.name}</div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {tier.price}
                          </Badge>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featureGroups.map((group) => (
                      <React.Fragment key={group.title}>
                        <TableRow className="bg-muted/30">
                          <TableCell
                            colSpan={5}
                            className="text-xs font-bold text-muted-foreground uppercase tracking-widest py-3"
                          >
                            {group.title}
                          </TableCell>
                        </TableRow>
                        {group.features.map((feature) => (
                          <TableRow key={feature.name} className="hover:bg-blue-50/50 transition-colors">
                            <TableCell className="font-medium">{feature.name}</TableCell>
                            <TableCell className="text-center">{renderCell(feature.starter)}</TableCell>
                            <TableCell className="text-center">{renderCell(feature.plus)}</TableCell>
                            <TableCell className="text-center">{renderCell(feature.pro)}</TableCell>
                            <TableCell className="text-center">{renderCell(feature.enterprise)}</TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    {/* Footer Row with CTAs */}
                    <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <TableCell />
                      {tiers.map((tier) => (
                        <TableCell key={tier.name} className="text-center py-6">
                          <Button variant="outline" disabled className="w-full">
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
          <Alert className="mt-12 max-w-3xl mx-auto border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertTitle className="font-semibold text-blue-900">Looking for something custom?</AlertTitle>
            <AlertDescription className="text-blue-800">
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
