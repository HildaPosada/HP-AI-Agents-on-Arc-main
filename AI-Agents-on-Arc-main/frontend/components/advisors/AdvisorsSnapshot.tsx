"use client";

import { useState, useEffect, useCallback } from "react";
import { AdvisorsSnapshotData } from "@/lib/types/advisors";
import { Loader2, AlertCircle, UserCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AdvisorsCard } from "./AdvisorsCard";
import { AdvisorsAgentCollaboration } from "./AdvisorsAgentCollaboration";
import { AdvisorsExplainableInsights } from "./AdvisorsExplainableInsights";

interface AdvisorsSnapshotProps {
  userId: string;
  onDataLoaded?: (data: AdvisorsSnapshotData) => void;
  onLoadingStateChange?: (isLoading: boolean) => void;
}

export function AdvisorsSnapshot({
  userId,
  onDataLoaded,
  onLoadingStateChange,
}: AdvisorsSnapshotProps) {
  const [data, setData] = useState<AdvisorsSnapshotData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvisorsData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    onLoadingStateChange?.(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Use dummy data directly
    console.log("[FRONTEND] 📊 Loading demo data for presentation");
    const dummyData: AdvisorsSnapshotData = {
      advisors: [
        "Sarah Johnson - Retirement Planning (⭐ 4.8/5)",
        "Michael Chen - Investment Strategy (⭐ 4.9/5)",
        "Emily Davis - Tax Optimization (⭐ 4.7/5)",
        "Robert Martinez - Estate Planning (⭐ 4.6/5)",
        "Lisa Anderson - College Savings (⭐ 4.8/5)",
      ],
      meetings: [
        "Q4 Portfolio Review with Michael Chen - Nov 18, 2024 at 2:00 PM",
        "Tax Planning Session with Emily Davis - Dec 15, 2024 at 10:00 AM",
        "Retirement Goals Check-in with Sarah Johnson - Jan 5, 2025 at 3:30 PM",
      ],
    };

    setData(dummyData);
    setIsLoading(false);
    onLoadingStateChange?.(false);
    onDataLoaded?.(dummyData);
  }, [userId, onLoadingStateChange, onDataLoaded]);

  useEffect(() => {
    if (userId) {
      fetchAdvisorsData();
    }
  }, [userId, fetchAdvisorsData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent relative">
        {/* Glass loading card */}
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            {/* Animated Advisors logo */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
            </div>

            {/* Loading spinner */}
            <Loader2 className="h-8 w-8 animate-spin text-primary" />

            <div className="text-center space-y-2">
              <p className="text-foreground font-semibold">
                Analyzing Advisors Data
              </p>
              <p className="text-muted-foreground text-sm">
                AI is processing your advisors and meetings...
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
      <div className="flex-1 p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchAdvisorsData}
              className="ml-4"
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Success state - render the dashboard
  console.log("[FRONTEND] 🎨 Rendering advisors dashboard with data:");
  console.log("[FRONTEND] 🎨 Advisors:", data?.advisors);
  console.log("[FRONTEND] 🎨 Meetings:", data?.meetings);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Agent Collaboration Section */}
        <AdvisorsAgentCollaboration
          totalAdvisors={data?.advisors.length || 5}
          matchScore={94}
        />

        {/* Explainable Insights Section */}
        <AdvisorsExplainableInsights
          matchedAdvisors={data?.advisors.slice(0, 3) || []}
        />

        {/* Legacy Cards (Optional) */}
        <div className="grid grid-cols-1 gap-4">
          <AdvisorsCard
            title="Available Advisors"
            items={data?.advisors || []}
            variant="advisors"
          />
          <AdvisorsCard
            title="Your Meetings"
            items={data?.meetings || []}
            variant="meetings"
          />
        </div>
      </div>
    </div>
  );
}
