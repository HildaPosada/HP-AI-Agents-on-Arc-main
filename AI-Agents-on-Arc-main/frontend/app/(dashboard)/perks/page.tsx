"use client";

import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { PerksSnapshotData } from "@/lib/types/perks";
import { PerksAgentCollaboration } from "@/components/perks/PerksAgentCollaboration";
import { PerksExplainableInsights } from "@/components/perks/PerksExplainableInsights";
import { FloatingPerksChat } from "@/components/perks/FloatingPerksChat";
import { OptimizedAIAssistant } from "@/components/spending/OptimizedAIAssistant";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Gift, TrendingUp, DollarSign, Zap } from "lucide-react";

export default function PerksPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isLoadingData, setIsLoadingData] = useState(true);

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
          <p className="text-white/70">Analyzing your rewards...</p>
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
  const totalPerksValue = 3847;
  const activeRewards = 5;
  const pointsAvailable = 12450 + 22340 + 15800;
  const unusedBenefit = 580;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-4 sm:p-6 border-b border-[#ccff00]/10 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-[#ccff00] flex items-center justify-center">
                <Gift className="h-4 sm:h-5 w-4 sm:w-5 text-[#0f0f0f]" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Rewards & Perks</h1>
                <p className="text-xs sm:text-sm text-white/60">
                  Maximize card benefits and loyalty rewards
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Perks Value Card */}
            <Card className="bg-[#ccff00]/10 border border-[#ccff00]/30 relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#ccff00]/70 font-bold uppercase tracking-wider mb-2">
                      Total Value
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#ccff00]">
                      ${totalPerksValue.toLocaleString()}
                    </p>
                  </div>
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-[#ccff00]/30" />
                </div>
              </CardContent>
            </Card>

            {/* Active Rewards Card */}
            <Card className="bg-green-500/10 border border-green-500/30 relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-green-400/70 font-bold uppercase tracking-wider mb-2">
                      Active Rewards
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-400">
                      {activeRewards}
                    </p>
                    <p className="text-xs text-white/60 mt-1">Programs</p>
                  </div>
                  <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-green-400/30" />
                </div>
              </CardContent>
            </Card>

            {/* Total Points Card */}
            <Card className="bg-blue-500/10 border border-blue-500/30 relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-blue-400/70 font-bold uppercase tracking-wider mb-2">
                      Points Available
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-400">
                      {(pointsAvailable / 1000).toFixed(0)}K+
                    </p>
                  </div>
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400/30" />
                </div>
              </CardContent>
            </Card>

            {/* Unused Benefits Card */}
            <Card className="bg-orange-500/10 border border-orange-500/30 relative overflow-hidden">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-orange-400/70 font-bold uppercase tracking-wider mb-2">
                      Unused Annually
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-400">
                      ${unusedBenefit}
                    </p>
                    <p className="text-xs text-orange-400/60 mt-1">at risk</p>
                  </div>
                  <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400/30" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Analysis (2 columns wide) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Agent Collaboration Flow */}
              <PerksAgentCollaboration
                totalPerksValue={totalPerksValue}
                pointsValue={12450}
              />

              {/* Perks Insights */}
              <PerksExplainableInsights />
            </div>

            {/* Right Column - Metrics & Assistant */}
            <div className="space-y-6">
              {/* Quick Stats Card */}
              <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
                <CardContent className="pt-8">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
                    Rewards Summary
                  </h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20">
                      <span className="text-white/70">Chase Sapphire</span>
                      <span className="font-bold text-[#ccff00]">12,450 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20">
                      <span className="text-white/70">United Miles</span>
                      <span className="font-bold text-blue-400">22,340 mi</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-orange-500/20">
                      <span className="text-white/70">Marriott Points</span>
                      <span className="font-bold text-orange-400">15,800 pts</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20">
                      <span className="text-white/70">Amazon Rewards</span>
                      <span className="font-bold text-[#ccff00]">$485</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#ccff00]/10">
                    <p className="text-xs text-white/60 mb-2">Next to Expire</p>
                    <p className="text-sm font-bold text-orange-400">Marriott (3 months)</p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant */}
              <div className="h-96">
                <OptimizedAIAssistant />
              </div>
            </div>
          </div>

          {/* Redemption Strategy Footer */}
          <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
            <CardContent className="p-6">
              <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">
                Smart Redemption Strategy
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "Best Value Redemptions",
                    items: [
                      "Chase: 1.5x travel portal",
                      "United: Domestic flights",
                      "Marriott: Free stays",
                    ],
                  },
                  {
                    title: "Expiring Soon",
                    items: [
                      "Marriott: 3 months left",
                      "Lounge Access: 6 visits",
                      "Status bonus: Q4 only",
                    ],
                  },
                  {
                    title: "Monthly Active Benefits",
                    items: [
                      "Uber Cash: $35/month",
                      "DoorDash: Free delivery",
                      "Insurance: Trip & rental",
                    ],
                  },
                ].map((col, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20"
                  >
                    <p className="text-xs font-bold text-[#ccff00] uppercase tracking-wider mb-3">
                      {col.title}
                    </p>
                    <ul className="space-y-2 text-xs text-white/70">
                      {col.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#ccff00]">→</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
