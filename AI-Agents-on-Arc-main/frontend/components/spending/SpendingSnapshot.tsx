"use client";

import { useState, useEffect, useCallback } from "react";
import { SpendingSnapshotData } from "@/lib/types/spending";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SpendingCard } from "./SpendingCard";
import { ActivitiesList } from "./ActivitiesList";
import { InsightsCard } from "./InsightsCard";
import { AgentReasoningPanel } from "./AgentReasoningPanel";
import { USDCTransactionCard } from "./USDCTransactionCard";

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
      <div className="h-full flex items-center justify-center bg-background">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg relative overflow-hidden">
          <div className="relative flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <span className="text-[#0f0f0f] font-bold text-lg">ArcFi</span>
              </div>
            </div>

            <Loader2 className="h-8 w-8 animate-spin text-[#ccff00]" />

            <div className="text-center space-y-2">
              <p className="text-foreground font-bold">
                Analyzing Financial Data
              </p>
              <p className="text-muted-foreground text-sm">
                Processing your spending patterns...
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"
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
      <div className="h-full p-6 flex items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <Alert
            variant="destructive"
            className="bg-card border border-destructive/30 rounded-lg shadow-lg"
          >
            <div className="relative">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex flex-col space-y-4 pt-2">
                <div className="space-y-2">
                  <p className="font-bold text-destructive">
                    Unable to load financial data
                  </p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchSpendingData}
                  className="self-start bg-card hover:bg-muted text-foreground rounded-lg"
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

  return (
    <div className="h-full flex flex-col bg-background relative">
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 space-y-8">
          <div className="relative space-y-8">
            {/* Income & Expenses */}
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

            {/* Agent Reasoning & USDC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AgentReasoningPanel
                agentName="Spending Agent"
                confidence={95}
                reasoning="Analyzed 47 transactions across 12 merchants. Income exceeds expenses by 26.6%. Top spending category is Housing at 38%. Recommendation: Increase emergency fund savings."
              />
              <USDCTransactionCard
                totalUSADCBalance={3500.5}
                transactions={[
                  {
                    id: "1",
                    type: "receive",
                    amount: 1000,
                    recipient: "Salary Deposit",
                    timestamp: "2024-11-15 09:30 AM",
                    hash: "0x742d...f9a2",
                    status: "confirmed",
                  },
                  {
                    id: "2",
                    type: "send",
                    amount: 50,
                    recipient: "USDC Payment",
                    timestamp: "2024-11-14 02:15 PM",
                    hash: "0x8f9e...2d45",
                    status: "confirmed",
                  },
                  {
                    id: "3",
                    type: "receive",
                    amount: 250,
                    recipient: "Reward Payout",
                    timestamp: "2024-11-13 11:00 AM",
                    hash: "0x5c3a...b8e1",
                    status: "confirmed",
                  },
                ]}
              />
            </div>

            {/* Activities */}
            <div>
              <ActivitiesList activities={data?.activities || []} />
            </div>

            {/* Insights */}
            <div>
              <InsightsCard insights={data?.insights || ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
