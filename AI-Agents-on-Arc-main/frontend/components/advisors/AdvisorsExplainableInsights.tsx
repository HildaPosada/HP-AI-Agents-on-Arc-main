import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, CheckCircle, AlertCircle, Target, Calendar, Award } from "lucide-react";

interface AdvisorRecommendation {
  title: string;
  description: string;
  action: string;
  impact: string;
  priority: "high" | "medium" | "low";
  expertise: string;
}

interface AdvisorsExplainableInsightsProps {
  mainInsight?: string;
  matchedAdvisors?: string[];
  recommendations?: AdvisorRecommendation[];
  agentName?: string;
  confidence?: number;
}

export function AdvisorsExplainableInsights({
  mainInsight = "We've identified 3 perfect advisor matches based on your retirement planning goals and investment profile",
  matchedAdvisors = [
    "Sarah Johnson - Retirement Planning Specialist (⭐ 4.8/5, 12 years experience)",
    "Michael Chen - Investment Strategy Expert (⭐ 4.9/5, 15 years experience)",
    "Emily Davis - Tax Optimization Specialist (⭐ 4.7/5, 10 years experience)",
  ],
  recommendations = [
    {
      title: "Schedule Initial Consultation with Sarah Johnson",
      description:
        "Start with a retirement planning specialist to assess your long-term goals and create a comprehensive plan.",
      action: "Book 30-min consultation",
      impact: "Clarity on retirement timeline, target savings, and investment strategy",
      priority: "high",
      expertise: "Retirement Planning, 401k Optimization, Social Security Strategy",
    },
    {
      title: "Discuss Investment Strategy with Michael Chen",
      description:
        "Optimize your portfolio allocation and discuss crypto/USDC integration for better diversification.",
      action: "Schedule strategy review",
      impact: "5-10% potential performance improvement, reduced portfolio risk",
      priority: "high",
      expertise: "Investment Strategy, Portfolio Diversification, Crypto Integration",
    },
    {
      title: "Tax Planning Session with Emily Davis",
      description:
        "Explore tax-efficient strategies and optimize your withdrawal plans for maximum savings.",
      action: "Book tax planning session",
      impact: "Potential 15-20% tax savings annually through optimization",
      priority: "medium",
      expertise: "Tax Optimization, Estate Planning, Withdrawal Strategies",
    },
    {
      title: "Set Up Regular Check-ins",
      description:
        "Establish quarterly reviews to track progress toward your financial goals and adjust strategies as needed.",
      action: "Create recurring schedule",
      impact: "Ongoing support and proactive adjustments to your financial plan",
      priority: "medium",
      expertise: "Ongoing Advisory, Performance Tracking, Goal Alignment",
    },
  ],
  agentName = "Advisors Agent",
  confidence = 94,
}: AdvisorsExplainableInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Main Insight Card */}
      <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <CardContent className="pt-8 relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center flex-shrink-0">
              <Users className="h-6 w-6 text-[#ccff00]" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-white">{agentName}</h3>
                <div className="h-2 w-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#ccff00] font-bold">ANALYSIS</span>
              </div>
              <p className="text-base text-white/90 leading-relaxed">{mainInsight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matched Advisors */}
      <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            Your Top Matched Advisors
          </h3>

          <div className="space-y-4">
            {/* Matched Advisors List */}
            {matchedAdvisors.map((advisor, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20 hover:border-[#ccff00]/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{advisor}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Match Summary */}
            <div className="mt-6 pt-6 border-t border-[#ccff00]/10">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#ccff00]/5">
                <div>
                  <p className="text-xs text-white/60 mb-1">Advisors Reviewed</p>
                  <p className="text-3xl font-bold text-[#ccff00]">5</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60 mb-1">Top Matches Found</p>
                  <p className="text-3xl font-bold text-green-400">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="mt-6 pt-6 border-t border-[#ccff00]/10">
            <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[#ccff00]/5">
              <div>
                <p className="text-xs text-white/60 mb-2">Match Confidence</p>
                <p className="text-2xl font-bold text-[#ccff00]">{confidence}%</p>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#ccff00]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#ccff00] to-[#ffdd00]"
                    style={{ width: `${confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white/50 mt-2">Based on profile analysis and goal assessment</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advisor Recommendations */}
      <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
        <CardContent className="pt-8">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-6">
            Next Steps to Maximize Your Advisor Relationships
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
                      <Calendar className="h-4 w-4 text-[#ccff00]" />
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

                {/* Expertise Badge */}
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <Target className="h-3 w-3 text-white/60" />
                  <span className="text-white/60">{rec.expertise}</span>
                </div>

                {/* Action & Impact */}
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/10">
                    <p className="text-xs text-white/60 mb-1">Action:</p>
                    <p className="text-sm text-[#ccff00] font-semibold">{rec.action}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0f0f0f] border border-green-500/20">
                    <p className="text-xs text-white/60 mb-1">Expected Outcome:</p>
                    <p className="text-sm text-green-400 font-semibold">{rec.impact}</p>
                  </div>
                </div>

                <button className="w-full mt-3 py-2 px-4 rounded-lg bg-[#ccff00]/20 hover:bg-[#ccff00]/30 border border-[#ccff00]/40 text-[#ccff00] font-bold text-sm transition-all">
                  {rec.priority === "high" ? "Schedule Now" : "Schedule"}
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
