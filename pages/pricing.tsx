import React from "react";
import type { NextPage } from "next";
import { Check, Minus, Sparkles, ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
];

const featureGroups = [
  {
    title: "Core Apps",
    features: [
      { name: "Contacts", starter: "✓", plus: "✓", pro: "✓" },
      { name: "Leads", starter: "✓", plus: "✓", pro: "✓" },
      { name: "Links", starter: "✓", plus: "✓", pro: "✓" },
      { name: "Catalogues", starter: "✓", plus: "1", pro: "Unlimited" },
      { name: "Surveys", starter: "✓", plus: "4", pro: "Unlimited" },
      { name: "Tasks", starter: "✓", plus: "✓", pro: "✓" },
      { name: "Feeds", starter: "x", plus: "10", pro: "100" },
      { name: "Bookings", starter: "x", plus: "✓", pro: "Unlimited" },
      { name: "Waitlists", starter: "x", plus: "✓", pro: "Unlimited" },
      { name: "Referrals", starter: "x", plus: "✓", pro: "Unlimited" },
      { name: "Rewards", starter: "x", plus: "x", pro: "Unlimited" },
    ],
  },
  {
    title: "Platform Features",
    features: [
      { name: "AI Support Agent", starter: "x", plus: "x", pro: "✓" },
      { name: "Managed AI", starter: "x", plus: "50k tokens", pro: "100k tokens" },
      { name: "Automations", starter: "x", plus: "10", pro: "Unlimited" },
      { name: "AI Reports", starter: "x", plus: "5", pro: "Unlimited" },
      { name: "Initial Set Up", starter: "✓", plus: "✓", pro: "✓" },
      { name: "Team Management", starter: "2 members", plus: "10 members", pro: "Unlimited" },
    ],
  },
  {
    title: "Add-Ons",
    features: [
      { name: "Custom Website", starter: "Coming Soon", plus: "Coming Soon", pro: "Coming Soon" },
      { name: "Custom Data connectors", starter: "Coming Soon", plus: "Coming Soon", pro: "Coming Soon" },
      { name: "On-Premise", starter: "x", plus: "x", pro: "x" },
      { name: "Service Management", starter: "Coming Soon", plus: "Coming Soon", pro: "Coming Soon" },
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
          <Card className="mt-16 border shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 border-b">
                      <TableHead className="font-bold text-foreground text-base py-6 pl-8">Features</TableHead>
                      {tiers.map((tier) => (
                        <TableHead 
                          key={tier.name} 
                          className={`text-center py-6 px-8 ${tier.popular ? 'bg-primary/10' : ''}`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {tier.popular && (
                              <Badge className="bg-primary text-primary-foreground border-0 shadow-md px-3 py-1">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                            <div className="text-lg font-bold text-foreground">
                              {tier.name}
                            </div>
                            <Badge variant="outline" className="text-xs font-semibold">
                              {tier.price}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {featureGroups.map((group) => (
                      <React.Fragment key={group.title}>
                        <TableRow className="bg-muted/20">
                          <TableCell
                            colSpan={4}
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
                            <TableCell className="text-center py-4 px-8 bg-primary/5">{renderCell(feature.pro)}</TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    {/* Footer Row with CTAs */}
                    <TableRow className="bg-muted/30 border-t">
                      <TableCell className="py-6" />
                      {tiers.map((tier) => (
                        <TableCell 
                          key={tier.name} 
                          className={`text-center py-8 px-8 ${tier.popular ? 'bg-primary/10' : ''}`}
                        >
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
          <Card className="mt-16 max-w-4xl mx-auto border-2 border-primary/20 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-foreground">Enterprise</h3>
                    <Badge variant="outline" className="text-xs font-semibold">Custom</Badge>
                  </div>
                  <p className="text-muted-foreground text-lg mb-4">
                    Everything in Pro plus custom website development, unlimited usage, on-premise deployment options, and dedicated service management.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 text-left inline-block">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Unlimited everything</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Custom website included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>On-premise deployment (coming soon)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500" />
                      <span>Dedicated service management</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <Button size="lg" disabled className="whitespace-nowrap">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Custom pricing based on your needs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
