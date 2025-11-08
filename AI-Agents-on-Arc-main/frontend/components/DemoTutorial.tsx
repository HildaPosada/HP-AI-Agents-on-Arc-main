"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CheckCircle,
  BookOpen,
  Play,
  X,
  Lightbulb,
} from "lucide-react";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  highlight: string;
  action: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: "Welcome to ArcFi",
    description:
      "Meet the future of banking powered by AI agents and blockchain. Let's take a quick tour!",
    highlight: "full-screen",
    action: "Start Tour",
  },
  {
    id: 2,
    title: "Multi-Agent System",
    description:
      "6 specialized AI agents work together using A2A Protocol to manage your finances intelligently.",
    highlight: "agents",
    action: "Next",
  },
  {
    id: 3,
    title: "USDC Transactions",
    description:
      "All transactions are verified on Circle Arc Network using USDC stablecoin for global payments.",
    highlight: "usdc",
    action: "Next",
  },
  {
    id: 4,
    title: "AI Insights",
    description:
      "Get personalized financial insights powered by Gemini AI analyzing your spending patterns.",
    highlight: "insights",
    action: "Next",
  },
  {
    id: 5,
    title: "Start Using ArcFi",
    description:
      "You're ready to manage your finances with AI! Begin exploring your dashboard.",
    highlight: "full-screen",
    action: "Let's Go!",
  },
];

interface DemoTutorialProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function DemoTutorial({ isOpen = false, onClose }: DemoTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(isOpen);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    setShowTutorial(isOpen);
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < DEMO_STEPS.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setShowTutorial(false);
    onClose?.();
  };

  const handleFinish = () => {
    handleClose();
    // Scroll to login section
    setTimeout(() => {
      const loginSection = document.getElementById("login");
      if (loginSection) {
        loginSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const step = DEMO_STEPS[currentStep];
  const progress = ((currentStep + 1) / DEMO_STEPS.length) * 100;

  if (!showTutorial) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-[#1a1a1a] border-[#FF9900]/30 shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="pt-8">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#FF9900]/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>

          {/* Header */}
          <div className="mb-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#FF9900] flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-[#0f0f0f]" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {step.title}
              </h2>
              <p className="text-white/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-white/60 mb-2">
              <span>Step {currentStep + 1} of {DEMO_STEPS.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF9900] to-[#ffdd00] transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Completed Steps Indicator */}
          {completedSteps.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-[#FF9900]" />
                <span className="text-xs font-bold text-[#FF9900]">
                  Progress Saved
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {DEMO_STEPS.slice(0, currentStep + 1).map((s) => (
                  <div
                    key={s.id}
                    className="px-3 py-1 rounded-full bg-[#FF9900]/20 border border-[#FF9900]/30 text-xs text-white/70"
                  >
                    {s.title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feature Highlights */}
          <div className="mb-8 space-y-3">
            {step.id === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["💰 Spending", "📈 Portfolio", "🎯 Goals"].map((agent) => (
                  <div
                    key={agent}
                    className="p-3 rounded-lg bg-[#FF9900]/5 border border-[#FF9900]/20 text-center text-sm text-white"
                  >
                    {agent}
                  </div>
                ))}
              </div>
            )}

            {step.id === 3 && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="text-sm text-green-400 font-bold mb-2">
                  ✓ USDC on Arc
                </div>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Global stablecoin payments</li>
                  <li>• On-chain verification</li>
                  <li>• Circle Arc Network</li>
                </ul>
              </div>
            )}

            {step.id === 4 && (
              <div className="p-4 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/20">
                <div className="text-sm text-[#FF9900] font-bold mb-2">
                  AI-Powered Insights
                </div>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>• Spending analysis</li>
                  <li>• Category recommendations</li>
                  <li>• Gemini AI powered</li>
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setCompletedSteps(completedSteps.filter((s) => s !== currentStep - 1));
                }}
                className="sm:flex-1 border-[#FF9900]/30 text-white hover:bg-[#FF9900]/10"
              >
                Back
              </Button>
            )}

            <Button
              onClick={currentStep === DEMO_STEPS.length - 1 ? handleFinish : handleNext}
              className="flex-1 sm:flex-1 bg-[#FF9900] hover:bg-[#FF9900]/90 text-[#0f0f0f] font-bold flex items-center justify-center gap-2"
            >
              {step.action}
              {currentStep !== DEMO_STEPS.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              onClick={handleClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 pt-6 border-t border-[#FF9900]/10">
            <div className="flex items-start gap-2 text-xs text-white/60">
              <BookOpen className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>
                💡 Tip: You can always access this tutorial from the help menu
                in the sidebar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DemoTutorialButton() {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowTutorial(true)}
        className="text-[#FF9900] hover:bg-[#FF9900]/10 gap-2"
      >
        <Play className="h-4 w-4" />
        <span className="hidden sm:inline">Demo Tour</span>
      </Button>
      <DemoTutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
    </>
  );
}
