import { Card, CardContent } from "@/components/ui/card";
import { Network, MessageCircle, CheckCircle, AlertCircle, Brain } from "lucide-react";

interface AgentMessage {
  agent: string;
  emoji: string;
  message: string;
  confidence?: number;
  timestamp?: string;
  status: "active" | "thinking" | "complete";
}

interface AgentCollaborationFlowProps {
  messages?: AgentMessage[];
}

export function AgentCollaborationFlow({
  messages = [
    {
      agent: "Spending Agent",
      emoji: "💰",
      message: "Analyzing 47 transactions across 12 merchants...",
      confidence: 100,
      status: "complete",
    },
    {
      agent: "Goals Agent",
      emoji: "🎯",
      message: "Cross-checking against savings goals...",
      confidence: 95,
      status: "thinking",
    },
    {
      agent: "Advisors Agent",
      emoji: "👨‍💼",
      message: "Recommending advisor consultation for emergency fund planning...",
      confidence: 87,
      status: "active",
    },
    {
      agent: "Chat Orchestrator",
      emoji: "🤖",
      message: "Synthesizing final recommendation...",
      confidence: 92,
      status: "active",
    },
  ],
}: AgentCollaborationFlowProps) {
  return (
    <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF9900]/5 rounded-full blur-3xl"></div>

      <CardContent className="pt-8 relative">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center">
              <Network className="h-4 w-4 text-[#FF9900]" />
            </div>
            <h3 className="text-lg font-bold text-white">Live Agent Collaboration</h3>
            <div className="ml-auto">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-[#FF9900] rounded-full animate-pulse"></div>
                <span className="text-[#FF9900] font-bold">A2A PROTOCOL</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/60">
            Agents communicate and collaborate to deliver the best insights
          </p>
        </div>

        {/* Agent Communication Flow */}
        <div className="space-y-3 mb-8">
          {messages.map((msg, idx) => (
            <div key={idx} className="relative">
              {/* Connection line */}
              {idx < messages.length - 1 && (
                <div className="absolute left-6 top-14 w-0.5 h-8 bg-gradient-to-b from-[#FF9900]/50 to-transparent"></div>
              )}

              {/* Agent message card */}
              <div
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  msg.status === "active"
                    ? "bg-[#FF9900]/10 border-[#FF9900]/40 shadow-lg shadow-[#FF9900]/20"
                    : msg.status === "thinking"
                    ? "bg-[#0f0f0f] border-[#FF9900]/20 opacity-75"
                    : "bg-[#0f0f0f] border-green-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Agent Icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-10 h-10 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center text-lg">
                      {msg.emoji}
                    </div>
                    {msg.status === "active" && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#FF9900] rounded-full animate-pulse border border-[#1a1a1a]"></div>
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
                          <div className="w-1.5 h-1.5 bg-[#FF9900] rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-[#FF9900] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-1.5 h-1.5 bg-[#FF9900] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-white/70">{msg.message}</p>

                    {/* Confidence & Status */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#FF9900]/10">
                      {msg.confidence && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs text-white/60">Confidence</span>
                            <span className="text-xs font-bold text-[#FF9900]">
                              {msg.confidence}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden border border-[#FF9900]/20">
                            <div
                              className="h-full bg-gradient-to-r from-[#FF9900] to-[#ffdd00] transition-all duration-500"
                              style={{ width: `${msg.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {msg.timestamp && (
                        <span className="text-xs text-white/50 whitespace-nowrap">
                          {msg.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Consensus */}
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-green-400 mb-1">Agent Consensus</p>
              <p className="text-xs text-white/70">
                All agents agree: You're in strong financial health. Increase emergency fund to 6 months of expenses.
              </p>
            </div>
          </div>
        </div>

        {/* Protocol Status */}
        <div className="mt-4 flex items-center justify-between text-xs p-3 rounded-lg bg-[#FF9900]/5 border border-[#FF9900]/20">
          <div className="flex items-center gap-2">
            <Network className="h-3 w-3 text-[#FF9900]" />
            <span className="text-white/70">A2A Protocol Status</span>
          </div>
          <span className="text-[#FF9900] font-bold">ACTIVE</span>
        </div>
      </CardContent>
    </Card>
  );
}
