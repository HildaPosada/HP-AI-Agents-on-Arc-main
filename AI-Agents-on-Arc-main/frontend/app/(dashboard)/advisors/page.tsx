"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdvisorsSnapshot } from "@/components/advisors/AdvisorsSnapshot";
import { AdvisorsCard } from "@/components/advisors/AdvisorsCard";
import { FloatingAdvisorChat } from "@/components/advisors/FloatingAdvisorChat";
import { AdvisorsSnapshotData } from "@/lib/types/advisors";

export default function AdvisorsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [snapshotLoaded, setSnapshotLoaded] = useState(false);
  const [_advisorsData, setAdvisorsData] =
    useState<AdvisorsSnapshotData | null>(null);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

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

  // Load advisor data upfront
  useEffect(() => {
    const loadAdvisorsData = async () => {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));

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

      setAdvisorsData(dummyData);
    };

    if (!isLoading && isAuthenticated) {
      loadAdvisorsData();
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    } else if (!isLoading && isAuthenticated) {
      setTimeout(() => setIsLoadingData(false), 1000);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#ccff00] mx-auto mb-4" />
          <p className="text-white/70">Analyzing your advisors...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-white/70">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-4 sm:p-6 border-b border-[#ccff00]/10 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#ccff00] flex items-center justify-center">
                <Users className="h-4 sm:h-5 w-4 sm:w-5 text-[#0f0f0f]" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Financial Advisors</h1>
                <p className="text-xs sm:text-sm text-white/60">
                  AI-powered advisor matching and consultation planning
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
              <span className="text-[#ccff00] font-bold">A2A PROTOCOL LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Top Metrics Row - Hero Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Available Advisors Card */}
            <Card className="bg-emerald-500/10 border border-emerald-500/30 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-emerald-400/70 font-bold uppercase tracking-wider mb-2">
                      Available Advisors
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-emerald-400">
                      5
                    </p>
                    <p className="text-xs text-white/60 mt-2">
                      Expert specialists
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-emerald-400/30" />
                </div>
              </CardContent>
            </Card>

            {/* Scheduled Meetings Card */}
            <Card className="bg-orange-500/10 border border-orange-500/30 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-orange-400/70 font-bold uppercase tracking-wider mb-2">
                      Your Meetings
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-orange-400">
                      3
                    </p>
                    <p className="text-xs text-white/60 mt-2">
                      Scheduled consultations
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-400/30" />
                </div>
              </CardContent>
            </Card>

            {/* Match Score Card */}
            <Card className="bg-[#ccff00]/10 border border-[#ccff00]/30 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#ccff00]/70 font-bold uppercase tracking-wider mb-2">
                      Match Score
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-[#ccff00]">
                      94%
                    </p>
                    <p className="text-xs text-white/60 mt-2">
                      High compatibility
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-[#ccff00]/30" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* View Full Analysis Toggle - Robinhood Minimalist Style */}
          {!showFullAnalysis && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowFullAnalysis(true)}
                className="px-6 py-2 rounded-lg border border-[#ccff00]/30 text-[#ccff00] text-sm font-semibold hover:bg-[#ccff00]/10 transition-all"
              >
                View Full Analysis
              </button>
            </div>
          )}

          {/* Full Width Analysis Section - Shown only in full mode */}
          {showFullAnalysis && (
            <div className="space-y-6">
              {/* Hide Full Analysis Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setShowFullAnalysis(false)}
                  className="px-6 py-2 rounded-lg border border-[#ccff00]/30 text-[#ccff00] text-sm font-semibold hover:bg-[#ccff00]/10 transition-all"
                >
                  Hide Full Analysis
                </button>
              </div>

              <div>
                <AdvisorsSnapshot
                  userId={user?.username || ""}
                  onDataLoaded={handleSnapshotDataLoaded}
                  onLoadingStateChange={handleSnapshotLoadingChange}
                />
              </div>
            </div>
          )}

          {/* Key Stats Footer - Only in Full Analysis Mode */}
          {showFullAnalysis && (
            <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">
                  Advisor Specializations
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Retirement Planning", value: "2", color: "text-[#ccff00]" },
                    { label: "Tax Optimization", value: "2", color: "text-green-400" },
                    { label: "Investment Strategy", value: "2", color: "text-emerald-400" },
                    { label: "Estate Planning", value: "1", color: "text-orange-400" },
                  ].map((spec, idx) => (
                    <div key={idx} className="text-center p-4 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20 hover:border-[#ccff00]/60 transition-all">
                      <p className={`text-2xl font-bold ${spec.color} mb-1`}>{spec.value}</p>
                      <p className="text-xs text-white/60">{spec.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Chat Widget */}
      <FloatingAdvisorChat
        userId={user?.username || ""}
        isEnabled={snapshotLoaded}
        advisorsData={_advisorsData}
      />
    </div>
  );
}
