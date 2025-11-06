"use client";

import { useState, useCallback, useEffect } from "react";
import { SplitView } from "../../../components/layout/SplitView";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { AdvisorsSnapshot } from "@/components/advisors/AdvisorsSnapshot";
import { AdvisorsChat } from "@/components/advisors/AdvisorsChat";
import { AdvisorsSnapshotData } from "@/lib/types/advisors";
import { Bot, MessageSquare, UserCheck } from "lucide-react";

export default function AdvisorsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [snapshotLoaded, setSnapshotLoaded] = useState(false);
  const [_advisorsData, setAdvisorsData] =
    useState<AdvisorsSnapshotData | null>(null);

  const handleSnapshotDataLoaded = useCallback((data: AdvisorsSnapshotData) => {
    console.log("[ADVISORS PAGE] 📋 Snapshot data loaded:", data);
    setAdvisorsData(data);
    setSnapshotLoaded(true);
  }, []);

  const handleSnapshotLoadingChange = useCallback((loading: boolean) => {
    if (loading) {
      setSnapshotLoaded(false);
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
                <UserCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Financial Advisors</h2>
                <p className="text-sm text-muted-foreground">
                  Connect with expert advisors
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <AdvisorsSnapshot
              userId={user?.username || ""}
              onDataLoaded={handleSnapshotDataLoaded}
              onLoadingStateChange={handleSnapshotLoadingChange}
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
                  Advisors Assistant
                </h2>
                <p className="text-sm text-muted-foreground">
                  Schedule meetings and get matched with experts
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <AdvisorsChat
              userId={user?.username || ""}
              isEnabled={snapshotLoaded}
              advisorsData={_advisorsData}
            />
          </div>
        </div>
      }
    />
  );
}
