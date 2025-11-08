"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { SpendingSnapshotData } from "@/lib/types/spending";
import { AgentCollaborationFlow } from "@/components/spending/AgentCollaborationFlow";
import { ExplainableInsights } from "@/components/spending/ExplainableInsights";
import { OptimizedAIAssistant } from "@/components/spending/OptimizedAIAssistant";
import { SpendingCard } from "@/components/spending/SpendingCard";
import { USDCTransactionCard } from "@/components/spending/USDCTransactionCard";
import { FloatingSpendingChat } from "@/components/spending/FloatingSpendingChat";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, TrendingDown, Zap, Target } from "lucide-react";

export default function SpendingPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    } else if (!isLoading && isAuthenticated) {
      // Simulate data loading
      setTimeout(() => setIsLoadingData(false), 1000);
    }
  }, [isLoading, isAuthenticated, router]);

  // Scroll to top on page load
  useEffect(() => {
    if (!isLoadingData && isAuthenticated && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isLoadingData, isAuthenticated]);

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF9900] mx-auto mb-4" />
          <p className="text-white/70">Analyzing your finances...</p>
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

  // Demo data
  const income = 8500;
  const expenses = 6234;
  const savings = income - expenses;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-2 sm:p-4 border-b border-[#FF9900]/10 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#FF9900] flex items-center justify-center">
                <Zap className="h-4 sm:h-5 w-4 sm:w-5 text-[#0f0f0f]" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Spending Analysis</h1>
                <p className="text-xs sm:text-sm text-white/60">
                  Powered by 6 AI agents analyzing your finances in real-time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-[#FF9900] rounded-full animate-pulse"></div>
              <span className="text-[#FF9900] font-bold">A2A PROTOCOL LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Top Metrics Row - Hero Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Income Card */}
            <Card className="bg-green-500/10 border border-green-500/30 relative overflow-hidden">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-green-400/70 font-bold uppercase tracking-wider mb-1">
                      Income
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-400">
                      ${income.toLocaleString()}
                    </p>
                  </div>
                  <TrendingDown className="h-6 w-6 text-green-400/30 rotate-180 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            {/* Expenses Card */}
            <Card className="bg-red-500/10 border border-red-500/30 relative overflow-hidden">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-red-400/70 font-bold uppercase tracking-wider mb-1">
                      Expenses
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-red-400">
                      ${expenses.toLocaleString()}
                    </p>
                  </div>
                  <TrendingDown className="h-6 w-6 text-red-400/30 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>

            {/* Net Savings Card */}
            <Card className="bg-[#FF9900]/10 border border-[#FF9900]/30 relative overflow-hidden">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-[#FF9900]/70 font-bold uppercase tracking-wider mb-1">
                      Monthly Savings
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#FF9900]">
                      ${savings.toLocaleString()}
                    </p>
                    <p className="text-xs text-white/60 mt-1">
                      {((savings / income) * 100).toFixed(1)}% of income
                    </p>
                  </div>
                  <Target className="h-6 w-6 text-[#FF9900]/30 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* View Full Analysis Toggle - Robinhood Minimalist Style */}
          {!showFullAnalysis && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowFullAnalysis(true)}
                className="px-6 py-2 rounded-lg border border-[#FF9900]/30 text-[#FF9900] text-sm font-semibold hover:bg-[#FF9900]/10 transition-all"
              >
                View Full Analysis
              </button>
            </div>
          )}

          {/* Two-Column Layout */}
          <div className={`grid grid-cols-1 ${showFullAnalysis ? "lg:grid-cols-3" : "lg:grid-cols-1"} gap-6`}>
            {/* Left Column - Analysis (shown only in full mode) */}
            {showFullAnalysis && (
              <div className="lg:col-span-2 space-y-6">
                {/* Hide Full Analysis Button */}
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowFullAnalysis(false)}
                    className="px-6 py-2 rounded-lg border border-[#FF9900]/30 text-[#FF9900] text-sm font-semibold hover:bg-[#FF9900]/10 transition-all"
                  >
                    Hide Full Analysis
                  </button>
                </div>

                {/* Agent Collaboration Flow */}
                <AgentCollaborationFlow />

                {/* Explainable Insights */}
                <ExplainableInsights />
              </div>
            )}

            {/* Right Column - USDC & Assistant */}
            <div className={`${showFullAnalysis ? "" : "lg:col-span-1"} space-y-6`}>
              {/* USDC Balance */}
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

              {/* AI Assistant */}
              <div className="h-96">
                <OptimizedAIAssistant />
              </div>
            </div>
          </div>

          {/* Key Stats Footer - Only in Full Analysis Mode */}
          {showFullAnalysis && (
            <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a]">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">
                  Your Financial Health Score
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Emergency Fund", value: "4 months", color: "text-[#FF9900]" },
                    { label: "Savings Rate", value: "26.6%", color: "text-green-400" },
                    { label: "Debt Ratio", value: "None", color: "text-green-400" },
                    { label: "Budget Health", value: "95%", color: "text-[#FF9900]" },
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-3 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/20">
                      <p className={`text-xl sm:text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-white/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Floating Chat Widget */}
      <FloatingSpendingChat
        userId={user?.username || ""}
        isEnabled={true}
      />
    </div>
  );
}
