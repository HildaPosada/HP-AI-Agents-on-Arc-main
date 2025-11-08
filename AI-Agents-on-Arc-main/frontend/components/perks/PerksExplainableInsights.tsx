import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Gift, TrendingUp, AlertCircle, CheckCircle, Target, Zap } from "lucide-react";

interface RewardCategory {
  name: string;
  value: number;
  status: "active" | "expiring" | "available";
  details: string;
  color: string;
}

interface RewardOptimization {
  title: string;
  description: string;
  action: string;
  saving: string;
  priority: "high" | "medium" | "low";
  deadline?: string;
}

interface PerksExplainableInsightsProps {
  mainInsight?: string;
  categories?: RewardCategory[];
  optimizations?: RewardOptimization[];
  agentName?: string;
  confidence?: number;
}

export function PerksExplainableInsights({
  mainInsight = "You're leaving $580/year in benefits unused. Your rewards could get you 2 free flights this year!",
  categories = [
    {
      name: "Chase Sapphire Points",
      value: 12450,
      status: "active",
      details: "Worth $187 in cash, $280 via travel portal",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "United MileagePlus Miles",
      value: 22340,
      status: "active",
      details: "2 domestic round-trips or 1 international",
      color: "from-blue-400 to-blue-500",
    },
    {
      name: "Marriott Bonvoy Points",
      value: 15800,
      status: "expiring",
      details: "Expires in 3 months - use or lose!",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Amazon Prime Rewards",
      value: 485,
      status: "active",
      details: "Earned $485 cashback this year",
      color: "from-orange-500 to-orange-600",
    },
  ],
  optimizations = [
    {
      title: "Book United Flights Before Year-End",
      description:
        "You have 22,340 miles = 2 domestic flights. Peak travel season books up 6-8 weeks in advance.",
      action: "Book flights now",
      saving: "Save $1,200 in flights",
      priority: "high",
      deadline: "Dec 31, 2024",
    },
    {
      title: "Redeem Marriott Points Before Expiration",
      description:
        "Your 15,800 points expire in 3 months. Book 2 nights for $0 or transfer to airline partners.",
      action: "Book 2 hotel nights",
      saving: "Save $600 in hotels",
      priority: "high",
      deadline: "Dec 15, 2024",
    },
    {
      title: "Use Chase Points via Travel Portal",
      description:
        "Chase portal gives 1.5x value. $187 cash vs $280 travel value. Book flights, hotels, or cruises.",
      action: "Book travel",
      saving: "Extra $93 in value",
      priority: "high",
    },
    {
      title: "Activate Airport Lounge Access",
      description:
        "You have 6 remaining lounge visits worth ~$80 each = $480 total. Use before year-end.",
      action: "Plan airport visits",
      saving: "Save $480 in lounge fees",
      priority: "medium",
    },
    {
      title: "Upgrade Chase Card Category",
      description:
        "You spend $654/mo on dining (2.25x points). Downgrade to standard (1x) after max category reset.",
      action: "Optimize card usage",
      saving: "Earn more efficiently",
      priority: "medium",
    },
  ],
  agentName = "Perks Agent",
  confidence = 97,
}: PerksExplainableInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Main Insight Card */}
      <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF9900]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <CardContent className="pt-8 relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center flex-shrink-0">
              <Gift className="h-6 w-6 text-[#FF9900]" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">{agentName}</h3>
                <div className="h-2 w-2 bg-[#FF9900] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#FF9900] font-bold">REWARDS</span>
              </div>
              <p className="text-base text-white/90 leading-relaxed">{mainInsight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Rewards */}
      <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            Your Active Rewards
          </h3>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Gift className="h-4 w-4 text-white/60" />
                    <div>
                      <p className="font-medium text-white text-sm">{cat.name}</p>
                      <p className="text-xs text-white/60">{cat.details}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {cat.status === "expiring" && (
                      <AlertCircle className="h-4 w-4 text-yellow-400 mb-1" />
                    )}
                    <p className="font-bold text-[#FF9900] text-sm">
                      {cat.value.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-2 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#FF9900]/20">
                    <div
                      className={`h-full bg-gradient-to-r ${cat.color}`}
                      style={{
                        width:
                          cat.status === "expiring"
                            ? "25%"
                            : cat.status === "available"
                            ? "100%"
                            : "75%",
                      }}
                    ></div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      cat.status === "expiring"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : cat.status === "available"
                        ? "bg-[#FF9900]/20 text-[#FF9900]"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {cat.status === "expiring"
                      ? "Expiring Soon"
                      : cat.status === "available"
                      ? "Ready to Use"
                      : "Active"}
                  </span>
                </div>
              </div>
            ))}

            {/* Total Summary */}
            <div className="mt-6 pt-6 border-t border-[#FF9900]/10">
              <div className="p-4 rounded-lg bg-[#FF9900]/5">
                <p className="text-xs text-white/60 mb-1">Total Rewards Value</p>
                <p className="text-3xl font-bold text-[#FF9900]">$3,847</p>
                <p className="text-xs text-white/60 mt-2">
                  If used optimally, could be worth $5,200+
                </p>
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
                <p className="text-xs text-white/50 mt-2">Across 5 reward accounts & programs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reward Optimizations */}
      <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            Optimization Opportunities
          </h3>

          <div className="space-y-4">
            {optimizations.map((opt, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border transition-all hover:shadow-lg hover:shadow-[#FF9900]/20 ${
                  opt.priority === "high"
                    ? "bg-green-500/10 border-green-500/30 hover:border-green-500/60"
                    : opt.priority === "medium"
                    ? "bg-[#FF9900]/10 border-[#FF9900]/30 hover:border-[#FF9900]/60"
                    : "bg-[#0f0f0f] border-[#FF9900]/20 hover:border-[#FF9900]/40"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      opt.priority === "high"
                        ? "bg-green-500/20"
                        : opt.priority === "medium"
                        ? "bg-[#FF9900]/20"
                        : "bg-[#FF9900]/10"
                    }`}
                  >
                    {opt.priority === "high" ? (
                      <AlertCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Target className="h-4 w-4 text-[#FF9900]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white">{opt.title}</p>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          opt.priority === "high"
                            ? "bg-green-500/20 text-green-400"
                            : opt.priority === "medium"
                            ? "bg-[#FF9900]/20 text-[#FF9900]"
                            : "bg-[#FF9900]/10 text-white/60"
                        }`}
                      >
                        {opt.priority.toUpperCase()}
                      </span>
                      {opt.deadline && (
                        <span className="text-xs text-white/40 ml-auto">
                          Deadline: {opt.deadline}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-3">{opt.description}</p>

                {/* Saving */}
                <div className="p-3 rounded-lg bg-[#0f0f0f] border border-green-500/20 mb-3">
                  <p className="text-xs text-white/60 mb-1">Expected Benefit:</p>
                  <p className="text-sm text-green-400 font-semibold">{opt.saving}</p>
                </div>

                <button className="w-full py-2 px-4 rounded-lg bg-[#FF9900]/20 hover:bg-[#FF9900]/30 border border-[#FF9900]/40 text-[#FF9900] font-bold text-sm transition-all">
                  {opt.action}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
