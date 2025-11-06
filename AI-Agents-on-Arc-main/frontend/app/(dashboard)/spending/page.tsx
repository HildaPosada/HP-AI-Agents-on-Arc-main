"use client";

import { useState, useCallback, useEffect } from "react";
import { SplitView } from "../../../components/layout/SplitView";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { SpendingSnapshot } from "@/components/spending/SpendingSnapshot";
import { SpendingChat } from "@/components/spending/SpendingChat";
import { SpendingSnapshotData } from "@/lib/types/spending";
import { Bot, MessageSquare, TrendingUp, Zap } from "lucide-react";

export default function SpendingPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const [snapshotLoaded, setSnapshotLoaded] = useState(false);
  const [snapshotData, setSnapshotData] = useState<SpendingSnapshotData | null>(
    null
  );

  const handleDataLoaded = useCallback((data: SpendingSnapshotData) => {
    setSnapshotData(data);
    setSnapshotLoaded(true);
  }, []);

  const handleLoadingStateChange = useCallback((loading: boolean) => {
    if (!loading) {
    }
  }, []);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ccff00] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ccff00] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const leftPanel = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-4 sm:p-6 border-b border-[#ccff00]/10 bg-[#1a1a1a]">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center bg-[#ccff00]">
            <span className="text-[#0f0f0f] font-bold text-xs sm:text-sm">$</span>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Spending Analysis
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Track & optimize
            </p>
          </div>
          <div className="ml-auto">
            <Zap className="h-5 w-5 text-[#ccff00] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <SpendingSnapshot
          userId={user?.username || ""}
          onDataLoaded={handleDataLoaded}
          onLoadingStateChange={handleLoadingStateChange}
        />
      </div>
    </div>
  );

  const rightPanel = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-4 sm:p-6 border-b border-[#ccff00]/10 bg-[#1a1a1a]">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center bg-[#ccff00]">
            <Bot className="h-4 sm:h-5 w-4 sm:w-5 text-[#0f0f0f]" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              AI Assistant
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Get insights
            </p>
          </div>
          <div className="ml-auto">
            <MessageSquare className="h-5 w-5 text-[#ccff00]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <SpendingChat
          userId={user?.username || ""}
          isEnabled={snapshotLoaded}
          spendingData={snapshotData}
        />
      </div>
    </div>
  );

  return isMobile ? (
    // Mobile: Stacked view
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Show only dashboard on mobile by default */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {leftPanel}
      </div>

      {/* Toggle for chat on mobile */}
      <div className="hidden">{rightPanel}</div>
    </div>
  ) : (
    // Desktop: Split view
    <SplitView leftPanel={leftPanel} rightPanel={rightPanel} />
  );
}
