"use client";

import { useState, useCallback, useEffect } from "react";
import { SplitView } from "../../../components/layout/SplitView";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { PortfolioSnapshot } from "@/components/portfolio/PortfolioSnapshot";
import { PortfolioChat } from "@/components/portfolio/PortfolioChat";
import { PortfolioSnapshotData } from "@/lib/types/portfolio";
import { Bot, MessageSquare, TrendingUp } from "lucide-react";

export default function PortfolioPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [snapshotLoaded, setSnapshotLoaded] = useState(false);
  const [_portfolioData, setPortfolioData] =
    useState<PortfolioSnapshotData | null>(null);

  const handleDataLoaded = useCallback((data: PortfolioSnapshotData) => {
    setPortfolioData(data);
    setSnapshotLoaded(true);
  }, []);

  const handleLoadingStateChange = useCallback((loading: boolean) => {
    if (!loading) {
    }
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex-shrink-0 p-6 border-b border-border bg-secondary">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Portfolio</h2>
                <p className="text-sm text-muted-foreground">
                  Monitor investments and track performance
                </p>
              </div>
            </div>
          </div>

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
          <div className="flex-shrink-0 p-6 border-b border-border bg-secondary">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Investment Assistant
                </h2>
                <p className="text-sm text-muted-foreground">
                  Get investment advice and recommendations
                </p>
              </div>
            </div>
          </div>

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
