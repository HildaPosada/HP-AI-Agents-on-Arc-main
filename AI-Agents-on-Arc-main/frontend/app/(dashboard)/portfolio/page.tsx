"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { PortfolioSnapshotData } from "@/lib/types/portfolio";
import { PortfolioAgentCollaboration } from "@/components/portfolio/PortfolioAgentCollaboration";
import { PortfolioExplainableInsights } from "@/components/portfolio/PortfolioExplainableInsights";
import { OptimizedAIAssistant } from "@/components/spending/OptimizedAIAssistant";
import { FloatingPortfolioChat } from "@/components/portfolio/FloatingPortfolioChat";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, TrendingUp, TrendingDown, Zap, DollarSign } from "lucide-react";

export default function PortfolioPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    } else if (!isLoading && isAuthenticated) {
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
          <p className="text-white/70">Analyzing your portfolio...</p>
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
  const totalAssets = 196500;
  const totalLiabilities = 275800;
  const netWorth = totalAssets - totalLiabilities;
  const ytdReturn = 14.2;
  const gainAmount = 10847;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-2 sm:p-4 border-b border-[#FF9900]/10 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#FF9900] flex items-center justify-center">
                <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-[#0f0f0f]" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Portfolio Analysis</h1>
                <p className="text-xs sm:text-sm text-white/60">
                  Real-time investment analysis with multi-agent insights
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Assets Card */}
            <Card className="bg-green-500/10 border border-green-500/30 relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-green-400/70 font-bold uppercase tracking-wider mb-2">
                      Total Assets
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-400">
                      ${(totalAssets / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-400/30" />
                </div>
              </CardContent>
            </Card>

            {/* Total Liabilities Card */}
            <Card className="bg-red-500/10 border border-red-500/30 relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-red-400/70 font-bold uppercase tracking-wider mb-2">
                      Liabilities
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-red-400">
                      ${(totalLiabilities / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-red-400/30" />
                </div>
              </CardContent>
            </Card>

            {/* Net Worth Card */}
            <Card className={`relative overflow-hidden ${
              netWorth >= 0
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-yellow-500/10 border border-yellow-500/30"
            }`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                      netWorth >= 0 ? "text-green-400/70" : "text-yellow-400/70"
                    }`}>
                      Net Worth
                    </p>
                    <p className={`text-2xl sm:text-3xl font-bold ${
                      netWorth >= 0 ? "text-green-400" : "text-yellow-400"
                    }`}>
                      ${Math.abs(netWorth / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <DollarSign className={`h-6 w-6 sm:h-8 sm:w-8 opacity-30 ${
                    netWorth >= 0 ? "text-green-400" : "text-yellow-400"
                  }`} />
                </div>
              </CardContent>
            </Card>

            {/* YTD Return Card */}
            <Card className="bg-[#FF9900]/10 border border-[#FF9900]/30 relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#FF9900]/70 font-bold uppercase tracking-wider mb-2">
                      YTD Return
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#FF9900]">
                      +{ytdReturn}%
                    </p>
                    <p className="text-xs text-green-400 mt-1">+${(gainAmount / 1000).toFixed(1)}K</p>
                  </div>
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF9900]/30" />
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
                <PortfolioAgentCollaboration
                  portfolioValue={totalAssets}
                  ytdReturn={ytdReturn}
                />

                {/* Portfolio Insights */}
                <PortfolioExplainableInsights
                  mainInsight={`Your portfolio is generating ${ytdReturn}% annual returns, outperforming the S&P 500 by 3.1%. Strong diversification across asset classes.`}
                />
              </div>
            )}

            {/* Right Column - Metrics & Assistant */}
            <div className={`${showFullAnalysis ? "" : "lg:col-span-1"} space-y-6`}>
              {/* Key Metrics Card */}
              <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a]">
                <CardContent className="pt-8">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
                    Portfolio Metrics
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/20">
                      <span className="text-white/70">Sharpe Ratio</span>
                      <span className="font-bold text-[#FF9900]">1.92</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/20">
                      <span className="text-white/70">Max Drawdown</span>
                      <span className="font-bold text-green-400">-8.3%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/20">
                      <span className="text-white/70">Volatility</span>
                      <span className="font-bold text-[#FF9900]">12.1%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/20">
                      <span className="text-white/70">Beta</span>
                      <span className="font-bold text-white">0.94</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#FF9900]/10">
                    <p className="text-xs text-white/60 mb-2">Last Rebalanced</p>
                    <p className="text-sm font-bold text-white">Q3 2024</p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <div className="h-96">
                <OptimizedAIAssistant />
              </div>
            </div>
          </div>

          {/* Asset Allocation Summary Footer */}
          <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a]">
            <CardContent className="p-6">
              <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">
                Asset Class Distribution
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Equities", value: "65%", color: "text-[#FF9900]" },
                  { label: "Bonds", value: "23%", color: "text-green-400" },
                  { label: "Cash", value: "8%", color: "text-yellow-400" },
                  { label: "Crypto", value: "4%", color: "text-purple-400" },
                ].map((asset, idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/20 hover:border-[#FF9900]/60 transition-all"
                  >
                    <p className={`text-2xl font-bold ${asset.color} mb-1`}>{asset.value}</p>
                    <p className="text-xs text-white/60">{asset.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Chat Widget */}
      <FloatingPortfolioChat
        userId={user?.username || ""}
        isEnabled={true}
      />
    </div>
  );
}
