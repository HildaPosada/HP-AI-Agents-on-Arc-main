import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, TrendingUp, DollarSign, AlertCircle, CheckCircle, Target } from "lucide-react";

interface AssetAllocation {
  name: string;
  value: number;
  percentage: number;
  trend: "up" | "down" | "stable";
  color: string;
}

interface InvestmentRecommendation {
  title: string;
  description: string;
  action: string;
  impact: string;
  priority: "high" | "medium" | "low";
  riskLevel: string;
}

interface PortfolioExplainableInsightsProps {
  mainInsight?: string;
  assets?: AssetAllocation[];
  recommendations?: InvestmentRecommendation[];
  agentName?: string;
  confidence?: number;
}

export function PortfolioExplainableInsights({
  mainInsight = "Your portfolio is generating 14.2% annual returns, outperforming the S&P 500 by 3.1%",
  assets = [
    {
      name: "401(k) Retirement",
      value: 127500,
      percentage: 65,
      trend: "up",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Stock Portfolio",
      value: 45800,
      percentage: 23,
      trend: "up",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Emergency Fund",
      value: 15000,
      percentage: 8,
      trend: "stable",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      name: "Crypto (USDC)",
      value: 8200,
      percentage: 4,
      trend: "up",
      color: "from-purple-500 to-purple-600",
    },
  ],
  recommendations = [
    {
      title: "Rebalance Technology Exposure",
      description:
        "Your tech allocation (45%) exceeds optimal 30%. Reduce by selling winners.",
      action: "Sell $5,000 of tech ETF",
      impact: "Reduces volatility by 8%, locks in $2,340 gains",
      priority: "high",
      riskLevel: "Low - profit-taking",
    },
    {
      title: "Increase Bond Allocation",
      description:
        "Add 15% bonds for stability. Current allocation: 0% bonds.",
      action: "Add $15,000 to bond index fund",
      impact: "Improves portfolio stability, lowers drawdown risk by 12%",
      priority: "high",
      riskLevel: "Very Low - bonds recommended",
    },
    {
      title: "Optimize USDC Holdings",
      description:
        "Current USDC position ($8,200) provides good settlement liquidity.",
      action: "Increase to $15,000 (8% allocation)",
      impact: "Better blockchain access, faster settlement, tax-efficient",
      priority: "medium",
      riskLevel: "Very Low - stablecoin",
    },
    {
      title: "Diversify Beyond Tech",
      description:
        "Add healthcare and energy sectors. Current: 70% tech, 20% healthcare.",
      action: "Reallocate $8,000 to diversified sectors",
      impact: "Reduces sector risk, increases downside protection by 15%",
      priority: "medium",
      riskLevel: "Low - sector diversification",
    },
  ],
  agentName = "Portfolio Agent",
  confidence = 96,
}: PortfolioExplainableInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Main Insight Card */}
      <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9900]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <CardContent className="pt-8 relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-[#FF9900]" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">{agentName}</h3>
                <div className="h-2 w-2 bg-[#FF9900] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#FF9900] font-bold">ANALYSIS</span>
              </div>
              <p className="text-base text-white/90 leading-relaxed">{mainInsight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            Portfolio Composition
          </h3>

          <div className="space-y-4">
            {/* Asset Bars */}
            {assets.map((asset) => (
              <div key={asset.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-white/60" />
                    <span className="font-medium text-white text-sm">{asset.name}</span>
                    {asset.trend === "up" && (
                      <TrendingUp className="h-3 w-3 text-green-400" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white text-sm">
                      ${(asset.value / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-[#FF9900]">{asset.percentage}%</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#FF9900]/20">
                  <div
                    className={`h-full bg-gradient-to-r ${asset.color}`}
                    style={{ width: `${asset.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}

            {/* Total Summary */}
            <div className="mt-6 pt-6 border-t border-[#FF9900]/10">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#FF9900]/5">
                <div>
                  <p className="text-xs text-white/60 mb-1">Total Portfolio Value</p>
                  <p className="text-3xl font-bold text-[#FF9900]">$196,500</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60 mb-1">YTD Performance</p>
                  <p className="text-3xl font-bold text-green-400">+$10,847</p>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="mt-6 pt-6 border-t border-[#FF9900]/10">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[#FF9900]/5">
              <div>
                <p className="text-xs text-white/60 mb-2">Analysis Confidence</p>
                <p className="text-2xl font-bold text-[#FF9900]">{confidence}%</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#FF9900]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF9900] to-[#ffdd00]"
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white/50 mt-2">Based on quarterly analysis of 47 holdings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Recommendations */}
      <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            Personalized Recommendations
          </h3>

          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border transition-all hover:shadow-lg hover:shadow-[#FF9900]/20 ${
                  rec.priority === "high"
                    ? "bg-green-500/10 border-green-500/30 hover:border-green-500/60"
                    : rec.priority === "medium"
                    ? "bg-[#FF9900]/10 border-[#FF9900]/30 hover:border-[#FF9900]/60"
                    : "bg-[#0f0f0f] border-[#FF9900]/20 hover:border-[#FF9900]/40"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.priority === "high"
                        ? "bg-green-500/20"
                        : rec.priority === "medium"
                        ? "bg-[#FF9900]/20"
                        : "bg-[#FF9900]/10"
                    }`}
                  >
                    {rec.priority === "high" ? (
                      <AlertCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Target className="h-4 w-4 text-[#FF9900]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white">{rec.title}</p>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          rec.priority === "high"
                            ? "bg-green-500/20 text-green-400"
                            : rec.priority === "medium"
                            ? "bg-[#FF9900]/20 text-[#FF9900]"
                            : "bg-[#FF9900]/10 text-white/60"
                        }`}
                      >
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-3">{rec.description}</p>

                {/* Risk Level Badge */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <Shield className="h-3 w-3 text-white/60" />
                  <span className="text-white/60">{rec.riskLevel}</span>
                </div>

                {/* Action & Impact */}
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/10">
                    <p className="text-xs text-white/60 mb-1">Action:</p>
                    <p className="text-sm text-[#FF9900] font-semibold">{rec.action}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0f0f0f] border border-green-500/20">
                    <p className="text-xs text-white/60 mb-1">Expected Impact:</p>
                    <p className="text-sm text-green-400 font-semibold">{rec.impact}</p>
                  </div>
                </div>

                <button className="w-full mt-3 py-2 px-4 rounded-lg bg-[#FF9900]/20 hover:bg-[#FF9900]/30 border border-[#FF9900]/40 text-[#FF9900] font-bold text-sm transition-all">
                  Execute {rec.priority === "high" ? "Now" : "Later"}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Missing import fix
function Shield({ className }: { className: string }) {
  return <AlertCircle className={className} />;
}
