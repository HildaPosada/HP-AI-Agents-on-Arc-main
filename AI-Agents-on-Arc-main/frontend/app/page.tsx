"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Brain,
  DollarSign,
  TrendingUp,
  BarChart3,
  Shield,
  CheckCircle,
  AlertTriangle,
  Zap,
  Cpu,
  Network,
  MessageCircle,
  Award,
  Github,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [showAgentPermissions, setShowAgentPermissions] = useState(false);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setShowAgentPermissions(true);
      } else {
        setShowAgentPermissions(false);
      }
    }
  }, [isLoading, isAuthenticated]);

  const handleGrantPermissions = () => {
    setShowAgentPermissions(false);
    router.push("/spending");
  };

  const handleDenyPermissions = () => {
    setShowAgentPermissions(false);
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ccff00] mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (showAgentPermissions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 sm:left-20">
            <Shield className="h-16 w-16 sm:h-24 sm:w-24 text-[#ccff00] animate-pulse" />
          </div>
          <div className="absolute bottom-20 right-10 sm:right-32">
            <Brain className="h-18 w-18 sm:h-22 sm:w-22 text-[#ccff00] animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <Card className="shadow-2xl border-[#ccff00]/20 bg-[#1a1a1a]">
            <CardContent className="pt-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#ccff00] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#0f0f0f]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Enable AI Agents
                </h2>
                <p className="text-white/70">
                  To use ArcFi, grant access to our 6 specialized AI agents
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-[#ccff00]" />
                  Your AI Agent Team:
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { name: "Spending Agent", emoji: "💰" },
                    { name: "Portfolio Agent", emoji: "📈" },
                    { name: "Goals Agent", emoji: "🎯" },
                    { name: "Perks Agent", emoji: "🎁" },
                    { name: "Advisors Agent", emoji: "👨‍💼" },
                    { name: "Chat Orchestrator", emoji: "🤖" },
                  ].map((agent) => (
                    <div
                      key={agent.name}
                      className="p-3 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30 hover:border-[#ccff00]/60 transition-colors"
                    >
                      <p className="font-medium text-white">
                        {agent.emoji} {agent.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-lg p-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-white mb-1">
                      Powered by Google ADK & A2A Protocol
                    </p>
                    <p className="text-white/80">
                      Agents communicate securely via Agent-to-Agent protocol
                      with Gemini API for intelligent decision-making.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleGrantPermissions}
                  className="flex-1 bg-[#ccff00] hover:bg-[#ccff00]/90 text-[#0f0f0f] font-bold"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Allow Agent Access
                </Button>
                <Button
                  onClick={handleDenyPermissions}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-[#ccff00]/30 text-[#ccff00] hover:bg-[#ccff00]/10"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
      {/* Navigation */}
      <div className="fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur border-b border-[#ccff00]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-[#0f0f0f]" />
              </div>
              <span className="text-xl font-bold text-[#ccff00]">ArcFi</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setActiveTab("features")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "features"
                    ? "text-[#ccff00]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("tech")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "tech"
                    ? "text-[#ccff00]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Technology
              </button>
              <button
                onClick={() => setActiveTab("agents")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "agents"
                    ? "text-[#ccff00]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Agents
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo + Title */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#ccff00] to-[#ffdd00] rounded-xl flex items-center justify-center shadow-2xl shadow-[#ccff00]/30">
              <Brain className="h-10 w-10 text-[#0f0f0f]" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">
            The Future of <span className="text-[#ccff00]">Banking</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Multi-agent AI orchestration powered by Google ADK, Agent-to-Agent Protocol, and Gemini. Transform banking with intelligent, collaborative AI agents.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() =>
                document
                  .getElementById("login")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-[#ccff00] text-[#0f0f0f] font-bold rounded-lg hover:bg-[#ccff00]/90 transition-all hover:shadow-2xl hover:shadow-[#ccff00]/30"
            >
              Try ArcFi Now
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[#ccff00]/30 text-[#ccff00] font-bold rounded-lg hover:border-[#ccff00] hover:bg-[#ccff00]/10 transition-all flex items-center justify-center gap-2"
            >
              <Github className="h-5 w-5" />
              View Code
            </a>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-20">
            <div className="p-6 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20">
              <div className="text-3xl font-bold text-[#ccff00] mb-2">6</div>
              <div className="text-sm text-white/70">Specialized Agents</div>
            </div>
            <div className="p-6 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20">
              <div className="text-3xl font-bold text-[#ccff00] mb-2">A2A</div>
              <div className="text-sm text-white/70">Protocol Enabled</div>
            </div>
            <div className="p-6 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20">
              <div className="text-3xl font-bold text-[#ccff00] mb-2">USDC</div>
              <div className="text-sm text-white/70">Arc Integration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#ccff00]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Why ArcFi Wins the Hackathon
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Innovation */}
            <Card className="bg-[#1a1a1a] border-[#ccff00]/20 hover:border-[#ccff00]/50 transition-colors">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-[#ccff00]/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-[#ccff00]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  🎯 Originality
                </h3>
                <p className="text-white/70">
                  First multi-agent banking system using A2A Protocol. AI agents collaborate intelligently instead of static chatbots.
                </p>
              </CardContent>
            </Card>

            {/* Technology */}
            <Card className="bg-[#1a1a1a] border-[#ccff00]/20 hover:border-[#ccff00]/50 transition-colors">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-[#ccff00]/20 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-[#ccff00]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  💻 Application of Tech
                </h3>
                <p className="text-white/70">
                  Google ADK + Gemini API + A2A Protocol + USDC/Arc. Cutting-edge tech stack fully integrated.
                </p>
              </CardContent>
            </Card>

            {/* Business */}
            <Card className="bg-[#1a1a1a] border-[#ccff00]/20 hover:border-[#ccff00]/50 transition-colors">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-[#ccff00]/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#ccff00]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  💰 Business Value
                </h3>
                <p className="text-white/70">
                  B2C SaaS model. Solves real banking problems. USDC enables global stablecoin payments.
                </p>
              </CardContent>
            </Card>

            {/* Presentation */}
            <Card className="bg-[#1a1a1a] border-[#ccff00]/20 hover:border-[#ccff00]/50 transition-colors">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-[#ccff00]/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-[#ccff00]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  🎨 Presentation
                </h3>
                <p className="text-white/70">
                  Stunning dark UI with neon lime accents. Shows agent reasoning & USDC transactions visibly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Agents Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#ccff00]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Meet Your AI Agent Team
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                name: "Spending Agent",
                desc: "Analyzes transactions, finds savings, manages subscriptions",
              },
              {
                icon: TrendingUp,
                name: "Portfolio Agent",
                desc: "Investment analysis, market insights, rebalancing suggestions",
              },
              {
                icon: Brain,
                name: "Goals Agent",
                desc: "Goal setting, savings tracking, milestone planning",
              },
              {
                icon: BarChart3,
                name: "Perks Agent",
                desc: "Reward maximization, benefit discovery, optimization",
              },
              {
                icon: Shield,
                name: "Advisors Agent",
                desc: "Professional guidance, advisor matching, expert connections",
              },
              {
                icon: Network,
                name: "Chat Orchestrator",
                desc: "Intelligent routing, multi-agent coordination, response synthesis",
              },
            ].map((agent, idx) => {
              const Icon = agent.icon;
              return (
                <Card
                  key={idx}
                  className="bg-[#1a1a1a] border-[#ccff00]/20 hover:border-[#ccff00]/50 transition-all hover:shadow-lg hover:shadow-[#ccff00]/10"
                >
                  <CardContent className="pt-8">
                    <Icon className="h-8 w-8 text-[#ccff00] mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-white/70">{agent.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#ccff00]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Powered By Industry Leaders
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#1a1a1a] border-[#ccff00]/20">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold text-[#ccff00] mb-4">
                  🧠 Google AI Stack
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Agent Development Kit (ADK)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Gemini 2.5 Flash API
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    A2A Protocol
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#ccff00]/20">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold text-[#ccff00] mb-4">
                  💰 Blockchain Stack
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Circle Arc Network
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    USDC Stablecoin
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Smart Contract Integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#ccff00]/20">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold text-[#ccff00] mb-4">
                  🎨 Frontend Stack
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Next.js 15 + React 19
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    TypeScript
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Tailwind CSS
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-[#ccff00]/20">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-bold text-[#ccff00] mb-4">
                  ⚙️ Backend Stack
                </h3>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Python + FastAPI
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Microservices Architecture
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#ccff00]" />
                    Cymbal Bank Backend
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div
        id="login"
        className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#ccff00]/10"
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Get Started
          </h2>
          <div className="bg-[#1a1a1a] border border-[#ccff00]/20 rounded-lg p-8">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#ccff00]/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
          <p>Built for AI Agents on Arc with USDC Hackathon</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-[#ccff00] transition-colors flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="#"
              className="hover:text-[#ccff00] transition-colors flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
