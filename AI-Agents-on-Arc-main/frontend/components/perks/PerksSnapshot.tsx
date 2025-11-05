"use client";

import { useState, useEffect, useCallback } from "react";
import { PerksSnapshotData } from "@/lib/types/perks";
import { Loader2, AlertCircle, Gift } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PerksCard } from "./PerksCard";
import { InsightsCard } from "../spending/InsightsCard";

interface PerksSnapshotProps {
  userId: string;
  onDataLoaded?: (data: PerksSnapshotData) => void;
  onLoadingStateChange?: (isLoading: boolean) => void;
}

export function PerksSnapshot({
  userId,
  onDataLoaded,
  onLoadingStateChange,
}: PerksSnapshotProps) {
  const [data, setData] = useState<PerksSnapshotData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerksData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    onLoadingStateChange?.(true);

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Use dummy data directly
    console.log("[FRONTEND] 📊 Loading demo data for presentation");
    const dummyData: PerksSnapshotData = {
      activities: [
        "Chase Sapphire Reserve: 12,450 points ($187 value)",
        "Airport Lounge Access: 6 visits remaining",
        "Travel Insurance: Active coverage on all trips",
        "Marriott Gold Elite Status (expires March 2025)",
        "Free Rental Car Insurance Coverage",
        "Purchase Protection: Up to $500 per claim",
      ],
      partners: [
        "Marriott Bonvoy: 15,800 points",
        "United MileagePlus: 22,340 miles",
        "Amazon Prime Rewards: $485 earned YTD",
        "Uber Cash: $35 monthly credit",
        "DoorDash DashPass: Free delivery",
      ],
      insights: "You have 12,450 Chase points worth ~$187! Your unused perks are valued at $580/year: Airport lounge access (6 remaining visits), travel insurance on booked trips, and rental car coverage. Marriott Gold Elite status expires in 3 months - book 2 more stays to maintain it. United miles (22,340) can get you a round-trip domestic flight. Amazon Prime rewards earned $485 cashback this year. Don't forget your monthly Uber Cash ($35) and active DoorDash DashPass. Tip: Use points for travel to get 1.5x value through Chase portal!"
    };
    
    setData(dummyData);
    setIsLoading(false);
    onLoadingStateChange?.(false);
    onDataLoaded?.(dummyData);
  }, [userId, onLoadingStateChange, onDataLoaded]);

  useEffect(() => {
    if (userId) {
      fetchPerksData();
    }
  }, [userId, fetchPerksData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent relative">
        {/* Glass loading card */}
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            {/* Animated Perks logo */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse" />
            </div>

            {/* Loading spinner */}
            <Loader2 className="h-8 w-8 animate-spin text-primary" />

            <div className="text-center space-y-2">
              <p className="text-foreground font-semibold">
                Analyzing Perks Data
              </p>
              <p className="text-muted-foreground text-sm">
                AI is processing your benefits and financial perks...
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
              onClick={fetchPerksData}
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
  console.log("[FRONTEND] 🎨 Rendering perks dashboard with data:");
  console.log("[FRONTEND] 🎨 Activities:", data?.activities);
  console.log("[FRONTEND] 🎨 Partners:", data?.partners);
  console.log("[FRONTEND] 🎨 Insights length:", data?.insights?.length);
  console.log(
    "[FRONTEND] 🎨 Insights preview:",
    data?.insights?.substring(0, 100)
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4 pb-8">
          {/* Perks Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            <PerksCard
              title="Your Benefits"
              items={data?.activities || []}
              variant="activities"
            />
            <PerksCard
              title="Bank Partners"
              items={data?.partners || []}
              variant="partners"
            />
          </div>

          {/* Financial Insights */}
          <InsightsCard insights={data?.insights || ""} />
        </div>
      </div>
    </div>
  );
}
