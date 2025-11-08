import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, TrendingDown, TrendingUp, Target, AlertCircle, CheckCircle } from "lucide-react";

interface InsightBreakdown {
  step: number;
  label: string;
  detail: string;
  icon: React.ReactNode;
}

interface ActionableRecommendation {
  title: string;
  description: string;
  impact: string;
  action: string;
  priority: "high" | "medium" | "low";
}

interface ExplainableInsightsProps {
  mainInsight?: string;
  breakdown?: InsightBreakdown[];
  recommendations?: ActionableRecommendation[];
  agentName?: string;
}

export function ExplainableInsights({
  mainInsight = "You're spending 15% less on dining this month compared to last month",
  breakdown = [
    {
      step: 1,
      label: "Data Collection",
      detail: "Analyzed 47 transactions from 47 merchants across all spending categories",
      icon: <CheckCircle className="h-4 w-4 text-blue-400" />,
    },
    {
      step: 2,
      label: "Category Analysis",
      detail: "Top spending: Housing (38% - $2,400), Groceries (14% - $892), Dining (10% - $654)",
      icon: <TrendingDown className="h-4 w-4 text-[#ccff00]" />,
    },
    {
      step: 3,
      label: "Trend Detection",
      detail: "Dining: Oct $768 → Nov $654. Subscriptions: Oct $42 → Nov $27 (both declining)",
      icon: <TrendingDown className="h-4 w-4 text-[#ccff00]" />,
    },
    {
      step: 4,
      label: "Impact Calculation",
      detail: "Monthly savings: $114 dining + $15 subscriptions = $129/month ($1,548/year)",
      icon: <Target className="h-4 w-4 text-green-400" />,
    },
  ],
  recommendations = [
    {
      title: "Build Emergency Fund",
      description: "You have an extra $129 this month. Add it to emergency savings.",
      impact: "Reaches 5-month emergency fund in 8 months (vs 12 months)",
      action: "Auto-transfer $129 to savings",
      priority: "high",
    },
    {
      title: "Optimize Dining Budget",
      description: "Great progress on dining! Maintain or reduce further.",
      impact: "Saves additional $200-300/month with meal planning",
      action: "Talk to financial advisor",
      priority: "medium",
    },
    {
      title: "Review Subscriptions",
      description: "You cancelled 2 subscriptions. Are you using the remaining ones?",
      impact: "Could save $15-30/month by cancelling unused services",
      action: "Review subscriptions",
      priority: "low",
    },
  ],
  agentName = "Spending Agent",
}: ExplainableInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Main Insight Card */}
      <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <CardContent className="pt-8 relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-[#ccff00]" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">{agentName}</h3>
                <div className="h-2 w-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#ccff00] font-bold">INSIGHTS</span>
              </div>
              <p className="text-base text-white/90 leading-relaxed">{mainInsight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Breakdown */}
      <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            How We Analyzed This
          </h3>

          <div className="space-y-4">
            {breakdown.map((item) => (
              <div key={item.step} className="flex gap-4">
                {/* Step number */}
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#ccff00]/20 border-2 border-[#ccff00] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#ccff00]">{item.step}</span>
                  </div>
                  {item.step < breakdown.length && (
                    <div className="w-0.5 h-12 bg-gradient-to-b from-[#ccff00]/50 to-transparent mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon}
                    <p className="font-bold text-white">{item.label}</p>
                  </div>
                  <p className="text-sm text-white/70">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Confidence Score */}
          <div className="mt-8 pt-6 border-t border-[#ccff00]/10">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[#ccff00]/5">
              <div>
                <p className="text-xs text-white/60 mb-2">Analysis Confidence</p>
                <p className="text-2xl font-bold text-[#ccff00]">92%</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#ccff00]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#ccff00] to-[#ffdd00]"
                    style={{ width: "92%" }}
                  ></div>
                </div>
                <p className="text-xs text-white/50 mt-2">Based on 47 transactions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actionable Recommendations */}
      <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            Recommended Actions
          </h3>

          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border transition-all hover:shadow-lg hover:shadow-[#ccff00]/20 ${
                  rec.priority === "high"
                    ? "bg-green-500/10 border-green-500/30 hover:border-green-500/60"
                    : rec.priority === "medium"
                    ? "bg-[#ccff00]/10 border-[#ccff00]/30 hover:border-[#ccff00]/60"
                    : "bg-[#0f0f0f] border-[#ccff00]/20 hover:border-[#ccff00]/40"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.priority === "high"
                        ? "bg-green-500/20"
                        : rec.priority === "medium"
                        ? "bg-[#ccff00]/20"
                        : "bg-[#ccff00]/10"
                    }`}
                  >
                    {rec.priority === "high" ? (
                      <AlertCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Lightbulb className="h-4 w-4 text-[#ccff00]" />
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
                            ? "bg-[#ccff00]/20 text-[#ccff00]"
                            : "bg-[#ccff00]/10 text-white/60"
                        }`}
                      >
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-3">{rec.description}</p>

                <div className="p-3 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/10 mb-3">
                  <p className="text-xs text-white/60 mb-1">Impact if completed:</p>
                  <p className="text-sm text-[#ccff00] font-semibold">{rec.impact}</p>
                </div>

                <button className="w-full py-2 px-4 rounded-lg bg-[#ccff00]/20 hover:bg-[#ccff00]/30 border border-[#ccff00]/40 text-[#ccff00] font-bold text-sm transition-all">
                  {rec.action}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
