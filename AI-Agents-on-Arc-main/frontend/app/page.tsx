"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { DemoTutorial } from "@/components/DemoTutorial";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Brain,
  Coins,
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
  Menu,
  X,
  Play,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [showAgentPermissions, setShowAgentPermissions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDemoTutorial, setShowDemoTutorial] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9900] mx-auto mb-4"></div>
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
            <Shield className="h-16 w-16 sm:h-24 sm:w-24 text-[#FF9900] animate-pulse" />
          </div>
          <div className="absolute bottom-20 right-10 sm:right-32">
            <Coins className="h-18 w-18 sm:h-22 sm:w-22 text-[#FF9900] animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <Card className="shadow-2xl border-[#FF9900]/20 bg-[#1a1a1a]">
            <CardContent className="pt-6 sm:pt-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-16 h-16 bg-[#FF9900] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#0f0f0f]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Enable AI Agents
                </h2>
                <p className="text-white/70 text-sm sm:text-base">
                  Grant access to our 6 specialized AI agents
                </p>
              </div>

              <div className="space-y-4 mb-6 sm:mb-8">
                <h3 className="font-semibold flex items-center gap-2 text-white text-sm">
                  <CheckCircle className="h-5 w-5 text-[#FF9900]" />
                  Your AI Agent Team:
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  {[
                    { name: "Spending Agent", emoji: "💰" },
                    { name: "Portfolio Agent", emoji: "��" },
                    { name: "Goals Agent", emoji: "🎯" },
                    { name: "Perks Agent", emoji: "🎁" },
                    { name: "Advisors Agent", emoji: "👨‍💼" },
                    { name: "Chat Orchestrator", emoji: "🤖" },
                  ].map((agent) => (
                    <div
                      key={agent.name}
                      className="p-2 sm:p-3 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30 hover:border-[#FF9900]/60 transition-colors"
                    >
                      <p className="font-medium text-white">
                        {agent.emoji} {agent.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FF9900]/10 border border-[#FF9900]/30 rounded-lg p-4 mb-6 sm:mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#FF9900] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-medium text-white mb-1">
                      Powered by Google ADK & A2A Protocol
                    </p>
                    <p className="text-white/80">
                      Agents communicate securely via Agent-to-Agent protocol
                      with Gemini API.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleGrantPermissions}
                  className="w-full bg-[#FF9900] hover:bg-[#FF9900]/90 text-[#0f0f0f] font-bold"
                  size="lg"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Allow Agent Access
                </Button>
                <Button
                  onClick={handleDenyPermissions}
                  variant="outline"
                  size="lg"
                  className="w-full border-[#FF9900]/30 text-[#FF9900] hover:bg-[#FF9900]/10"
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
      <div className="fixed top-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur border-b border-[#FF9900]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF9900] rounded-lg flex items-center justify-center logo-glow">
                <Coins className="h-5 w-5 text-[#0f0f0f]" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-[#FF9900]">
                ArcFi
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#agents"
                className="text-xs sm:text-sm font-medium text-white/60 hover:text-[#FF9900] transition-colors"
              >
                Meet Your AI Team
              </a>
              <a
                href="#tech"
                className="text-xs sm:text-sm font-medium text-white/60 hover:text-[#FF9900] transition-colors"
              >
                Technology
              </a>
              <Button
                onClick={() => setShowDemoTutorial(true)}
                variant="ghost"
                size="sm"
                className="text-[#FF9900] hover:bg-[#FF9900]/10 gap-2"
              >
                <Play className="h-4 w-4" />
                Demo
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                onClick={() => setShowDemoTutorial(true)}
                variant="ghost"
                size="sm"
                className="text-[#FF9900] hover:bg-[#FF9900]/10"
              >
                <Play className="h-4 w-4" />
              </Button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-[#FF9900]/10 rounded-lg transition-colors"
              >
                {showMobileMenu ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden pb-4 space-y-2">
              <a
                href="#agents"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#FF9900]/10 rounded-lg"
              >
                Meet Your AI Team
              </a>
              <a
                href="#tech"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#FF9900]/10 rounded-lg"
              >
                Technology
              </a>
              <a
                href="https://github.com/HildaPosada/HP-AI-Agents-on-Arc-main/tree/main/AI-Agents-on-Arc-main"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#FF9900]/10 rounded-lg flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://github.com/HildaPosada/HP-AI-Agents-on-Arc-main/tree/main/AI-Agents-on-Arc-main"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-4 py-2 text-white hover:bg-[#FF9900]/10 rounded-lg flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Docs
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-20 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo + Title */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FF9900] to-[#ffdd00] rounded-xl flex items-center justify-center shadow-2xl shadow-[#FF9900]/30 logo-glow">
              <Coins className="h-8 w-8 sm:h-10 sm:w-10 text-[#0f0f0f]" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            The Future of <span className="text-[#FF9900]">Crypto Exchange</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Empower your finances with AI + Arc insights. Track spending, grow savings with USDC, and manage money hands-free through multilingual ElevenLabs voice AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-2">
            <button
              onClick={() =>
                document
                  .getElementById("login")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[#FF9900] text-[#0f0f0f] font-bold rounded-lg hover:bg-[#FF9900]/90 transition-all hover:shadow-2xl hover:shadow-[#FF9900]/30 text-sm sm:text-base"
            >
              Try ArcFi Now
            </button>
            <a
              href="https://github.com/HildaPosada/HP-AI-Agents-on-Arc-main/tree/main/AI-Agents-on-Arc-main"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 border border-[#FF9900]/30 text-[#FF9900] font-bold rounded-lg hover:border-[#FF9900] hover:bg-[#FF9900]/10 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              GitHub
            </a>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 mb-12 sm:mb-20">
            <div className="p-4 sm:p-6 rounded-lg bg-[#FF9900]/5 border border-[#FF9900]/20">
              <div className="text-2xl sm:text-3xl font-bold text-[#FF9900] mb-1 sm:mb-2">
                6
              </div>
              <div className="text-xs sm:text-sm text-white/70">Agents</div>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-[#FF9900]/5 border border-[#FF9900]/20">
              <div className="text-2xl sm:text-3xl font-bold text-[#FF9900] mb-1 sm:mb-2">
                A2A
              </div>
              <div className="text-xs sm:text-sm text-white/70">Protocol</div>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-[#FF9900]/5 border border-[#FF9900]/20">
              <div className="text-2xl sm:text-3xl font-bold text-[#FF9900] mb-1 sm:mb-2">
                USDC
              </div>
              <div className="text-xs sm:text-sm text-white/70">Arc</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agents Section */}
      <div id="agents" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#FF9900]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">
            Meet Your AI Team
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: DollarSign,
                name: "Spending Agent",
                desc: "Analyzes transactions & finds savings",
              },
              {
                icon: TrendingUp,
                name: "Portfolio Agent",
                desc: "Investment analysis & rebalancing",
              },
              {
                icon: Coins,
                name: "Goals Agent",
                desc: "Goal setting & savings tracking",
              },
              {
                icon: BarChart3,
                name: "Perks Agent",
                desc: "Reward maximization",
              },
              {
                icon: Shield,
                name: "Advisors Agent",
                desc: "Professional guidance & matching",
              },
              {
                icon: Network,
                name: "Chat Orchestrator",
                desc: "Multi-agent coordination",
              },
            ].map((agent, idx) => {
              const Icon = agent.icon;
              return (
                <Card
                  key={idx}
                  className="bg-[#1a1a1a] border-[#FF9900]/20 hover:border-[#FF9900]/50 transition-all hover:shadow-lg hover:shadow-[#FF9900]/10"
                >
                  <CardContent className="pt-6">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-[#FF9900] mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70">
                      {agent.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div id="tech" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#FF9900]/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center">
            Powered By Industry Leaders
          </h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "🧠 Google AI Stack",
                items: ["Agent Development Kit (ADK)", "Gemini 2.5 Flash API", "A2A Protocol"],
              },
              {
                title: "💰 Blockchain Stack",
                items: ["Circle Arc Network", "USDC Stablecoin", "Smart Contracts"],
              },
              {
                title: "🎨 Frontend Stack",
                items: ["Next.js 15 + React 19", "TypeScript", "Tailwind CSS"],
              },
              {
                title: "⚙️ Backend Stack",
                items: ["Python + FastAPI", "Microservices", "Cymbal Bank"],
              },
            ].map((stack, idx) => (
              <Card
                key={idx}
                className="bg-[#1a1a1a] border-[#FF9900]/20"
              >
                <CardContent className="pt-6 sm:pt-8">
                  <h3 className="text-lg sm:text-2xl font-bold text-[#FF9900] mb-4">
                    {stack.title}
                  </h3>
                  <ul className="space-y-2">
                    {stack.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-xs sm:text-sm text-white/70"
                      >
                        <CheckCircle className="h-4 w-4 text-[#FF9900]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div
        id="login"
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#FF9900]/10"
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
            Get Started
          </h2>
          <div className="bg-[#1a1a1a] border border-[#FF9900]/20 rounded-lg p-4 sm:p-6">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#FF9900]/10 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-xs sm:text-sm">
          <p>Built for AI Agents on Arc with USDC Hackathon</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/HildaPosada/HP-AI-Agents-on-Arc-main/tree/main/AI-Agents-on-Arc-main"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF9900] transition-colors flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://github.com/HildaPosada/HP-AI-Agents-on-Arc-main/tree/flare-space/AI-Agents-on-Arc-main#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF9900] transition-colors flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Docs
            </a>
          </div>
        </div>
      </div>

      {/* Demo Tutorial Modal */}
      <DemoTutorial
        isOpen={showDemoTutorial}
        onClose={() => setShowDemoTutorial(false)}
      />
    </div>
  );
}
