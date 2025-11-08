import { Card, CardContent } from "@/components/ui/card";
import { Network, Gift, CheckCircle, AlertCircle, Brain, DollarSign, Zap } from "lucide-react";

interface PerksAgentMessage {
  agent: string;
  emoji: string;
  message: string;
  insight?: string;
  confidence?: number;
  status: "active" | "thinking" | "complete";
}

interface PerksAgentCollaborationProps {
  messages?: PerksAgentMessage[];
  totalPerksValue?: number;
  pointsValue?: number;
}

export function PerksAgentCollaboration({
  messages = [
    {
      agent: "Perks Agent",
      emoji: "🎁",
      message: "Scanning all card rewards and loyalty programs...",
      insight: "Chase Sapphire: 12,450 pts | United: 22,340 miles | Marriott: 15,800 pts",
      confidence: 100,
      status: "complete",
    },
    {
      agent: "Spending Agent",
      emoji: "💰",
      message: "Analyzing your actual spending patterns to maximize returns...",
      insight: "You're earning 2.25x on dining ($654/mo). Upgrade to 5x category?",
      confidence: 94,
      status: "complete",
    },
    {
      agent: "Goals Agent",
      emoji: "🎯",
      message: "Matching perks to your travel goals...",
      insight: "You can book 2 round-trip flights with current miles. Marriott status expires in 3mo",
      confidence: 88,
      status: "thinking",
    },
    {
      agent: "Chat Orchestrator",
      emoji: "🤖",
      message: "Synthesizing rewards optimization strategy...",
      confidence: 93,
      status: "active",
    },
  ],
  totalPerksValue = 3847,
  pointsValue = 187,
}: PerksAgentCollaborationProps) {
  return (
    <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/5 rounded-full blur-3xl"></div>

      <CardContent className="pt-8 relative">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center">
              <Network className="h-4 w-4 text-[#ccff00]" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Rewards Analysis</h3>
            <div className="ml-auto">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                <span className="text-[#ccff00] font-bold">A2A PROTOCOL</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20">
              <p className="text-xs text-white/60 mb-1">Total Perks Value</p>
              <p className="text-2xl font-bold text-[#ccff00]">
                ${totalPerksValue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#0f0f0f] border border-[#ccff00]/20">
              <p className="text-xs text-white/60 mb-1">Redeemable Value</p>
              <p className="text-2xl font-bold text-green-400">
                ${pointsValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Agent Analysis Flow */}
        <div className="space-y-3 mb-8">
          {messages.map((msg, idx) => (
            <div key={idx} className="relative">
              {/* Connection line */}
              {idx < messages.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-8 bg-gradient-to-b from-[#ccff00]/50 to-transparent"></div>
              )}

              {/* Agent message card */}
              <div
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  msg.status === "active"
                    ? "bg-[#ccff00]/10 border-[#ccff00]/40 shadow-lg shadow-[#ccff00]/20"
                    : msg.status === "thinking"
                    ? "bg-[#0f0f0f] border-[#ccff00]/20 opacity-75"
                    : "bg-[#0f0f0f] border-green-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Agent Icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-10 h-10 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center text-lg">
                      {msg.emoji}
                    </div>
                    {msg.status === "active" && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ccff00] rounded-full animate-pulse border border-[#1a1a1a]"></div>
                    )}
                    {msg.status === "complete" && (
                      <CheckCircle className="absolute -bottom-1 -right-1 w-4 h-4 text-green-500 bg-[#1a1a1a] rounded-full" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-white text-sm">{msg.agent}</p>
                      {msg.status === "thinking" && (
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-white/70 mb-2">{msg.message}</p>

                    {/* Insight Box */}
                    {msg.insight && (
                      <div className="p-2 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20 mb-2">
                        <p className="text-xs text-white/80">{msg.insight}</p>
                      </div>
                    )}

                    {/* Confidence & Status */}
                    {msg.confidence && (
                      <div className="flex items-center gap-3 pt-2 border-t border-[#ccff00]/10">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs text-white/60">Confidence</span>
                            <span className="text-xs font-bold text-[#ccff00]">
                              {msg.confidence}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#ccff00]/20">
                            <div
                              className="h-full bg-gradient-to-r from-[#ccff00] to-[#ffdd00] transition-all duration-500"
                              style={{ width: `${msg.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Recommendation */}
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-green-400 mb-1">Rewards Consensus</p>
              <p className="text-xs text-white/70">
                Book travel with United miles (22,340 mi = 2 flights). Maintain Marriott Gold status. Use Chase points for travel (1.5x value).
              </p>
            </div>
          </div>
        </div>

        {/* Protocol Status */}
        <div className="mt-4 flex items-center justify-between text-xs p-3 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20">
          <div className="flex items-center gap-2">
            <Network className="h-3 w-3 text-[#ccff00]" />
            <span className="text-white/70">A2A Protocol Status</span>
          </div>
          <span className="text-[#ccff00] font-bold">ACTIVE</span>
        </div>
      </CardContent>
    </Card>
  );
}
