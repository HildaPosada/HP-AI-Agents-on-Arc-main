"use client";

import { useState, useCallback, useEffect } from "react";
import { SplitView } from "../../../components/layout/SplitView";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { PortfolioSnapshot } from "@/components/portfolio/PortfolioSnapshot";
import { PortfolioChat } from "@/components/portfolio/PortfolioChat";
import { PortfolioSnapshotData } from "@/lib/types/portfolio";
import { Bot, MessageSquare } from "lucide-react";

export default function PortfolioPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Shared state for snapshot and chat coordination
  const [snapshotLoaded, setSnapshotLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_portfolioData, setPortfolioData] =
    useState<PortfolioSnapshotData | null>(null);

  // Memoize callback functions to prevent infinite re-renders
  const handleDataLoaded = useCallback((data: PortfolioSnapshotData) => {
    setPortfolioData(data);
    setSnapshotLoaded(true);
  }, []);

  const handleLoadingStateChange = useCallback((loading: boolean) => {
    if (!loading) {
      // Additional logic can go here if needed
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

  return (
    <SplitView
      leftPanel={
        <div className="h-full flex flex-col">
          <div className="flex-shrink-0 p-6 border-b border-emerald-200/30 dark:border-emerald-900/30 bg-gradient-to-r from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/20 dark:to-emerald-900/10 backdrop-blur-sm relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xs">ArcFi</span>
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Portfolio Analysis
                </h2>
                <p className="text-sm text-muted-foreground">
                  Monitor investments and track performance
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-hidden">
            <PortfolioSnapshot
              userId={user?.username || ""}
              onDataLoaded={handleDataLoaded}
              onLoadingStateChange={handleLoadingStateChange}
            />
          </div>
        </div>
      }
      rightPanel={
        <div className="h-full flex flex-col">
          <div className="flex-shrink-0 p-6 border-b border-emerald-200/30 dark:border-emerald-900/30 bg-gradient-to-r from-emerald-50/50 to-emerald-100/30 dark:from-emerald-950/20 dark:to-emerald-900/10 backdrop-blur-sm relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Investment Assistant
                </h2>
                <p className="text-sm text-muted-foreground">
                  Get investment advice and rebalancing recommendations
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Chat Container */}
          <div className="flex-1 overflow-hidden">
            <PortfolioChat
              userId={user?.username || ""}
              isEnabled={snapshotLoaded}
              portfolioData={_portfolioData}
            />
          </div>
        </div>
      }
    />
  );
}
