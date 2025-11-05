"use client";

import { useState, useCallback, useEffect } from "react";
import { SplitView } from "../../../components/layout/SplitView";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { PerksSnapshot } from "@/components/perks/PerksSnapshot";
import { PerksChat } from "@/components/perks/PerksChat";
import { PerksSnapshotData } from "@/lib/types/perks";
import { Bot, MessageSquare, Gift } from "lucide-react";

export default function PerksPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Shared state for snapshot and chat coordination
  const [snapshotLoaded, setSnapshotLoaded] = useState(false);
  const [perksData, setPerksData] = useState<PerksSnapshotData | null>(null);

  // ALL HOOKS MUST BE AT THE TOP - before any conditional returns
  const handleSnapshotDataLoaded = useCallback((data: PerksSnapshotData) => {
    console.log("[PERKS PAGE] 📋 Snapshot data loaded:", data);
    setPerksData(data);
    setSnapshotLoaded(true); // Enable chat
  }, []);

  const handleSnapshotLoadingChange = useCallback((loading: boolean) => {
    if (loading) {
      setSnapshotLoaded(false); // Disable chat during reload
    }
  }, []);

  // Handle navigation side effect when authentication changes
  useEffect(() => {
    // Only redirect if loading is complete and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state while authentication is being restored
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state while redirecting unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  console.log("[PERKS PAGE] 🎨 Rendering with state:", {
    userId: user?.username,
    snapshotLoaded,
    hasPerksData: !!perksData,
  });

  return (
    <SplitView
      leftPanel={
        <div className="h-full flex flex-col">
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-4 border-b border-orange-600/30 bg-primary backdrop-blur-sm relative z-10">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-1">
              {/* Perks Icon */}
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-700 to-orange-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-300 rounded-full animate-pulse" />
              </div>

              {/* Header Text */}
              <div>
                <h2 className="text-xl font-bold text-black">
                  Perks & Rewards Agent
                </h2>
                <p className="text-black/70 text-xs">
                  Maximize your credit card benefits and points
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-hidden">
            <PerksSnapshot
              userId={user?.username || ""}
              onDataLoaded={handleSnapshotDataLoaded}
              onLoadingStateChange={handleSnapshotLoadingChange}
            />
          </div>
        </div>
      }
      rightPanel={
        <div className="h-full flex flex-col">
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-4 border-b border-orange-600/30 bg-primary backdrop-blur-sm relative z-10">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-1">
              {/* AI Chat Icon */}
              <div className="relative">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-700 to-orange-800 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5">
                  <MessageSquare className="h-3.5 w-3.5 text-orange-300" />
                </div>
              </div>

              {/* Header Text */}
              <div>
                <h2 className="text-xl font-bold text-black">
                  Perks Chat Assistant
                </h2>
                <p className="text-black/70 text-xs">
                  Discover unused benefits and redeem your rewards
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Chat Container */}
          <div className="flex-1 overflow-hidden">
            <PerksChat
              userId={user?.username || ""}
              isEnabled={snapshotLoaded}
              perksData={perksData}
            />
          </div>
        </div>
      }
    />
  );
}
