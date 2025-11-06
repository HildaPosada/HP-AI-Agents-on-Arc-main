"use client";

import { useState, useEffect, useCallback } from "react";
import { SpendingSnapshotData } from "@/lib/types/spending";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SpendingCard } from "./SpendingCard";
import { ActivitiesList } from "./ActivitiesList";
import { InsightsCard } from "./InsightsCard";

interface SpendingSnapshotProps {
  userId: string;
  onDataLoaded?: (data: SpendingSnapshotData) => void;
  onLoadingStateChange?: (isLoading: boolean) => void;
}

export function SpendingSnapshot({
  userId,
  onDataLoaded,
  onLoadingStateChange,
}: SpendingSnapshotProps) {
  const [data, setData] = useState<SpendingSnapshotData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpendingData = useCallback(async () => {
    setIsLoading(true);
    onLoadingStateChange?.(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    console.log("[FRONTEND] 📊 Loading demo data for presentation");
    const dummyData: SpendingSnapshotData = {
      income: 8500,
      expenses: 6234,
      activities: [
        "Salary Deposit: +$8,500 (Nov 1)",
        "Rent Payment: -$2,400 (Nov 1)",
        "Grocery Shopping - Whole Foods: -$485 (Nov 3)",
        "Restaurant - Sushi Bar: -$125 (Nov 4)",
        "Gas Station: -$68 (Nov 5)",
        "Netflix Subscription: -$15.99 (Nov 5)",
        "Spotify Premium: -$10.99 (Nov 5)",
        "Coffee Shop: -$28.50 (Nov 4)",
        "Online Shopping - Amazon: -$234 (Nov 2)",
        "Utility Bills: -$180 (Nov 1)",
      ],
      insights: "Great financial health! Your income exceeds expenses by $2,266 this month. Top spending categories: Housing (38%), Groceries (8%), and Dining (7%). Consider increasing your emergency fund with this surplus. You're spending 15% less on dining compared to last month - excellent progress! Your subscription services total $27/month across 2 platforms."
    };
    
    setData(dummyData);
    setIsLoading(false);
    onLoadingStateChange?.(false);
    onDataLoaded?.(dummyData);
  }, [userId, onLoadingStateChange, onDataLoaded]);

  useEffect(() => {
    if (userId) {
      fetchSpendingData();
    }
  }, [userId, fetchSpendingData]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent relative">
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-3xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white font-bold text-lg">ArcFi</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />

            <div className="text-center space-y-2">
              <p className="text-foreground font-semibold">
                Analyzing Financial Data
              </p>
              <p className="text-muted-foreground text-sm">
                Processing your spending patterns...
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full p-6 flex items-center justify-center bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent">
        <div className="w-full max-w-md">
          <Alert
            variant="destructive"
            className="bg-card/90 backdrop-blur-md border-destructive/20 shadow-lg relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
            <div className="relative">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex flex-col space-y-4 pt-2">
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">
                    Unable to load financial data
                  </p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchSpendingData}
                  className="self-start bg-background/50 hover:bg-background border-destructive/30 hover:border-destructive/50 text-destructive hover:text-destructive rounded-2xl"
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

  console.log("[FRONTEND] 🎨 Rendering dashboard with data:");
  console.log("[FRONTEND] 🎨 Income:", data?.income);
  console.log("[FRONTEND] 🎨 Expenses:", data?.expenses);
  console.log("[FRONTEND] 🎨 Activities count:", data?.activities?.length);
  console.log("[FRONTEND] 🎨 Activities:", data?.activities);
  console.log("[FRONTEND] 🎨 Insights length:", data?.insights?.length);
  console.log(
    "[FRONTEND] 🎨 Insights preview:",
    data?.insights?.substring(0, 100)
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/50 via-slate-50/30 to-white/50 dark:from-slate-900/10 dark:via-slate-800/5 dark:to-slate-900/10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none" />

      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          <div className="relative space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SpendingCard
                title="Income"
                amount={data?.income || 0}
                variant="success"
              />
              <SpendingCard
                title="Expenses"
                amount={data?.expenses || 0}
                variant="destructive"
              />
            </div>

            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <ActivitiesList activities={data?.activities || []} />
            </div>

            <div className="transform hover:scale-[1.01] transition-transform duration-300">
              <InsightsCard insights={data?.insights || ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
