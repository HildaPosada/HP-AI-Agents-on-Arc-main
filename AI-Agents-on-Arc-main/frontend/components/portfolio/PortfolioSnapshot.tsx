"use client";

import { useState, useEffect, useCallback } from "react";
import { PortfolioSnapshotData } from "@/lib/types/portfolio";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "./PortfolioCard";
import { ActivitiesList } from "../spending/ActivitiesList";
import { InsightsCard } from "../spending/InsightsCard";

interface PortfolioSnapshotProps {
  userId: string;
  onDataLoaded?: (data: PortfolioSnapshotData) => void;
  onLoadingStateChange?: (isLoading: boolean) => void;
}

export function PortfolioSnapshot({
  userId,
  onDataLoaded,
  onLoadingStateChange,
}: PortfolioSnapshotProps) {
  const [data, setData] = useState<PortfolioSnapshotData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = useCallback(async () => {
    setIsLoading(true);
    onLoadingStateChange?.(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Use dummy data directly
    console.log("[FRONTEND] 📊 Loading demo data for presentation");
    const dummyData: PortfolioSnapshotData = {
      debts: [
        "Home Mortgage: $245,000",
        "Car Loan: $18,500",
        "Student Loan: $12,300",
      ],
      investments: [
        "401(k) Retirement: $127,500",
        "Stock Portfolio: $45,800",
        "Crypto Holdings (USDC): $8,200",
        "Emergency Fund: $15,000",
      ],
      networth: [
        "Total Assets: $196,500",
        "Total Liabilities: -$275,800",
        "Net Worth: -$79,300",
      ],
      cashflow: ["Monthly Cashflow: $2,266"],
      average_cashflow: ["Average Cashflow: $1,850"],
      insights: "Your portfolio is performing well with a 14.2% YTD return! Your 401(k) is your strongest asset at $127,500. Consider increasing crypto allocation - USDC provides stable settlement options. Your monthly cashflow ($2,266) exceeds your average ($1,850), showing improvement. Focus on paying down the car loan first (highest interest rate). Emergency fund goal achieved at $15,000 (3 months expenses). Stock portfolio is well-diversified across tech, healthcare, and energy sectors."
    };
    
    setData(dummyData);
    setIsLoading(false);
    onLoadingStateChange?.(false);
    onDataLoaded?.(dummyData);
  }, [userId, onLoadingStateChange, onDataLoaded]);

  useEffect(() => {
    if (userId) {
      fetchPortfolioData();
    }
  }, [userId, fetchPortfolioData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent relative">
        {/* Glass loading card */}
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            {/* Animated ArcFi logo */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white font-bold text-lg">ArcFi</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
            </div>

            {/* Loading spinner */}
            <Loader2 className="h-8 w-8 animate-spin text-primary" />

            <div className="text-center space-y-2">
              <p className="text-foreground font-semibold">
                Analyzing Portfolio Data
              </p>
              <p className="text-muted-foreground text-sm">
                AI is processing your investments and financial health...
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full p-6 flex items-center justify-center bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="w-full max-w-md">
          <Alert
            variant="destructive"
            className="bg-card/90 backdrop-blur-md border-destructive/20 shadow-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
            <div className="relative">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex flex-col space-y-4 pt-2">
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">
                    Unable to load portfolio data
                  </p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchPortfolioData}
                  className="self-start bg-background/50 hover:bg-background border-destructive/30 hover:border-destructive/50 text-destructive hover:text-destructive"
                >
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4" />
                    Retry Analysis
                  </div>
                </Button>
              </AlertDescription>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  // Success state - render the dashboard
  console.log("[FRONTEND] 🎨 Rendering portfolio dashboard with data:");
  console.log("[FRONTEND] 🎨 Debts:", data?.debts);
  console.log("[FRONTEND] 🎨 Investments:", data?.investments);
  console.log("[FRONTEND] 🎨 Networth:", data?.networth);
  console.log("[FRONTEND] 🎨 Cashflow:", data?.cashflow);
  console.log("[FRONTEND] 🎨 Average Cashflow:", data?.average_cashflow);
  console.log("[FRONTEND] 🎨 Insights length:", data?.insights?.length);
  console.log(
    "[FRONTEND] 🎨 Insights preview:",
    data?.insights?.substring(0, 100)
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          <div className="relative space-y-8">
            {/* Portfolio Cards Grid */}
            <div className="grid grid-cols-1 gap-6 transform hover:scale-[1.01] transition-transform duration-300">
              <PortfolioCard
                title="Debts"
                items={data?.debts || []}
                variant="destructive"
              />
              <PortfolioCard
                title="Investments"
                items={data?.investments || []}
                variant="success"
              />
              <PortfolioCard
                title="Net Worth"
                items={data?.networth || []}
                variant="default"
              />
            </div>

            {/* Financial Insights */}
            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <InsightsCard insights={data?.insights || ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
