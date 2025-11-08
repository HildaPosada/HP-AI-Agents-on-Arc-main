import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Network, CheckCircle, Zap } from "lucide-react";

interface AgentReasoningPanelProps {
  agentName?: string;
  confidence?: number;
  reasoning?: string;
}

export function AgentReasoningPanel({
  agentName = "Spending Agent",
  confidence = 95,
  reasoning = "Analyzed 47 transactions across 12 merchants. Income exceeds expenses by 26.6%. Top spending category is Housing at 38%.",
}: AgentReasoningPanelProps) {
  const getAgentColor = (agent: string) => {
    const colors: { [key: string]: string } = {
      "Spending Agent": "from-blue-500 to-cyan-500",
      "Portfolio Agent": "from-green-500 to-emerald-500",
      "Goals Agent": "from-purple-500 to-pink-500",
      "Perks Agent": "from-yellow-500 to-orange-500",
      "Advisors Agent": "from-indigo-500 to-blue-500",
      "Chat Orchestrator": "from-pink-500 to-rose-500",
    };
    return colors[agent] || "from-[#ccff00] to-[#ffdd00]";
  };

  const getAgentIcon = (agent: string) => {
    const icons: { [key: string]: string } = {
      "Spending Agent": "💰",
      "Portfolio Agent": "📈",
      "Goals Agent": "🎯",
      "Perks Agent": "🎁",
      "Advisors Agent": "👨‍💼",
      "Chat Orchestrator": "🤖",
    };
    return icons[agent] || "🤖";
  };

  return (
    <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a] hover:border-[#ccff00]/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-8 h-8 rounded-lg bg-[#ccff00]/20 flex items-center justify-center">
            <Network className="h-4 w-4 text-[#ccff00]" />
          </div>
          <div>
            <div className="text-white">Multi-Agent Orchestration</div>
            <div className="text-xs text-white/50 font-normal">
              AI Agent-to-Agent Protocol
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-6">
        {/* Active Agent */}
        <div>
          <div className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">
            Active Agent
          </div>
          <div className={`p-4 rounded-lg bg-gradient-to-r ${getAgentColor(agentName)} bg-opacity-10 border border-[#ccff00]/30`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getAgentIcon(agentName)}</span>
              <div>
                <p className="font-bold text-white">{agentName}</p>
                <p className="text-sm text-white/70">Processing your query</p>
              </div>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-white/70 uppercase tracking-wider">
              Confidence Score
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#ccff00]">
                {confidence}%
              </span>
              <CheckCircle className="h-5 w-5 text-[#ccff00]" />
            </div>
          </div>
          <div className="w-full bg-[#2a2a2a] rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#ccff00] to-[#ffdd00] h-2 rounded-full transition-all duration-500"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Agent Reasoning */}
        <div>
          <div className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">
            Agent Reasoning
          </div>
          <div className="p-4 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20">
            <div className="flex items-start gap-3">
              <Zap className="h-4 w-4 text-[#ccff00] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/80 leading-relaxed">
                {reasoning}
              </p>
            </div>
          </div>
        </div>

        {/* Agent Team */}
        <div>
          <div className="text-xs font-bold text-white/70 uppercase tracking-wider mb-3">
            Agent Team Status
          </div>
          <div className="space-y-2">
            {[
              { name: "Spending Agent", emoji: "💰", active: agentName === "Spending Agent" },
              { name: "Portfolio Agent", emoji: "📈", active: agentName === "Portfolio Agent" },
              { name: "Advisors Agent", emoji: "👨‍💼", active: agentName === "Advisors Agent" },
              { name: "Goals Agent", emoji: "🎯", active: agentName === "Goals Agent" },
            ].map((agent) => (
              <div
                key={agent.name}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  agent.active
                    ? "bg-[#ccff00]/20 border border-[#ccff00]/50"
                    : "bg-[#ccff00]/5 border border-[#ccff00]/20"
                }`}
              >
                <span className="text-lg">{agent.emoji}</span>
                <span className="text-sm font-medium text-white flex-1">
                  {agent.name}
                </span>
                {agent.active ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#ccff00] font-bold">
                      ACTIVE
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></div>
                  </div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#ccff00]/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* A2A Protocol Badge */}
        <div className="pt-4 border-t border-[#ccff00]/10">
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></div>
              <span className="text-xs font-bold text-[#ccff00]">
                A2A PROTOCOL ENABLED
              </span>
            </div>
            <span className="text-xs text-white/60">Live</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
