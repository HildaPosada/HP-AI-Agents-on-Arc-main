"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  Bot,
  User as UserIcon,
  Lightbulb,
  TrendingDown,
  DollarSign,
  Zap,
  Mic,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "suggestion" | "action";
  actions?: Array<{ label: string; action: string }>;
}

export function OptimizedAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hey! I'm your AI financial assistant powered by 6 specialized agents. I can help you understand your spending, optimize your budget, and reach your financial goals. What would you like to know?",
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setInput((prev) => prev + finalTranscript);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput("");
      recognitionRef.current.start();
    }
  };

  const suggestedQuestions = [
    {
      emoji: "💰",
      question: "Why did my dining spending decrease?",
      context: "Analysis of spending trends",
    },
    {
      emoji: "🎯",
      question: "How can I reach my savings goal faster?",
      context: "Financial planning advice",
    },
    {
      emoji: "📊",
      question: "What's my spending breakdown by category?",
      context: "Expense analysis",
    },
    {
      emoji: "✅",
      question: "Should I adjust my budget?",
      context: "Budget optimization",
    },
  ];

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      type: "text",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with context-aware answer
    setTimeout(() => {
      let response = "";
      let actionItems: Array<{ label: string; action: string }> = [];

      const lowerText = text.toLowerCase();

      if (
        lowerText.includes("dining") ||
        lowerText.includes("spending decrease")
      ) {
        response =
          "Great question! Your dining spending dropped 15% this month. Here's why:\n\n📊 Last month: 8 dining transactions ($768)\n📊 This month: 5 dining transactions ($654)\n\nYou reduced frequency by 37.5% while keeping quality meals. This trend suggests better impulse control. If you maintain this, you'll save ~$1,368/year.\n\nWould you like to lock in these savings or explore other categories?";
        actionItems = [
          { label: "Lock in savings", action: "lock-dining-budget" },
          { label: "View all categories", action: "view-categories" },
        ];
      } else if (
        lowerText.includes("savings goal") ||
        lowerText.includes("save")
      ) {
        response =
          "Perfect! Let's accelerate your savings. You're currently on track for a 4-month emergency fund. Here are 3 ways to reach 6 months faster:\n\n🎯 Strategy 1: Redirect dining savings ($129/month)\nTimeline: 5 months instead of 8\n\n🎯 Strategy 2: Optimize subscriptions ($27/month)\nTimeline: 4.5 months instead of 5\n\n🎯 Strategy 3: Talk to an advisor about side income\nTimeline: 2-3 months\n\nMy recommendation: Combine strategies 1 & 2, then consult an advisor.";
        actionItems = [
          { label: "Talk to advisor", action: "schedule-advisor" },
          { label: "Auto-transfer to savings", action: "auto-transfer" },
        ];
      } else if (lowerText.includes("breakdown") || lowerText.includes("category")) {
        response =
          "Your spending breakdown for November:\n\n🏠 Housing: 38% ($2,400) - Fixed cost\n🥕 Groceries: 14% ($892) - Reasonable\n🍽️ Dining: 10% ($654) - Great control!\n💳 Subscriptions: 0.5% ($27) - Optimized\n🚗 Other: 37.5% - Includes utilities, gas, shopping\n\nBenchmark: Housing should be 25-30% (yours is high). Suggest: increase income or negotiate rent renewal.";
        actionItems = [
          { label: "Negotiate rent", action: "rent-advice" },
          { label: "See detailed breakdown", action: "detailed-chart" },
        ];
      } else if (lowerText.includes("budget") || lowerText.includes("adjust")) {
        response =
          "Your current budget is healthy but here are 2 recommendations:\n\n✅ Increase emergency fund target: From 4 to 6 months\n✅ Create a 'fun money' budget: You've cut back on dining—allow yourself $50/week guilt-free\n\nAvoid: Cutting too aggressively. Unsustainable budgets fail within 3 months.\n\nYour spending is already optimized. Focus on building income instead.";
        actionItems = [
          { label: "Optimize budget", action: "smart-budget" },
          { label: "Income growth strategies", action: "income-tips" },
        ];
      } else {
        response =
          "That's a great question! Let me break it down for you based on your data...\n\nI'm analyzing multiple factors:\n- Your spending patterns\n- Market trends\n- Your financial goals\n- Advisor recommendations\n\nHere's what I found: You're in a strong financial position. The key is consistency. Would you like specific recommendations?";
        actionItems = [
          { label: "Get specific recommendations", action: "recommendations" },
          { label: "Talk to an advisor", action: "schedule-advisor" },
        ];
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        type: "text",
        actions: actionItems,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a] h-full flex flex-col">
      <CardContent className="p-4 sm:p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#FF9900]/10">
          <div className="w-6 h-6 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center flex-shrink-0">
            <Bot className="h-3 w-3 text-[#FF9900]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-white text-xs">AI Assistant</h3>
            <p className="text-xs text-white/50 leading-tight">Multi-agent powered</p>
          </div>
          <div className="ml-auto w-1.5 h-1.5 bg-[#FF9900] rounded-full animate-pulse flex-shrink-0"></div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.length === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-white/60 font-bold uppercase tracking-wider">
                Quick Questions
              </p>
              <div className="space-y-2">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q.question)}
                    className="w-full text-left p-3 rounded-lg bg-[#0f0f0f] border border-[#FF9900]/20 hover:border-[#FF9900]/60 hover:bg-[#FF9900]/10 transition-all group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{q.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white group-hover:text-[#FF9900] transition-colors">
                          {q.question}
                        </p>
                        <p className="text-xs text-white/40">{q.context}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3 w-3 text-[#FF9900]" />
                </div>
              )}

              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-3 text-sm",
                  msg.role === "user"
                    ? "bg-[#FF9900] text-[#0f0f0f] font-bold"
                    : "bg-[#0f0f0f] border border-[#FF9900]/20 text-white/80"
                )}
              >
                {msg.content}

                {/* Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#FF9900]/20 space-y-2">
                    {msg.actions.map((action, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left text-xs px-3 py-1.5 rounded bg-[#FF9900]/20 hover:bg-[#FF9900]/30 text-[#FF9900] font-medium transition-all"
                      >
                        → {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-[#FF9900] flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-3 w-3 text-[#0f0f0f]" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center flex-shrink-0">
                <Bot className="h-3 w-3 text-[#FF9900]" />
              </div>
              <div className="bg-[#0f0f0f] border border-[#FF9900]/20 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#FF9900] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#FF9900] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-[#FF9900] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-[#FF9900]/10 pt-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about your spending..."
              className="flex-1 px-3 py-2 text-sm bg-[#0f0f0f] border border-[#FF9900]/30 rounded-lg focus:border-[#FF9900] focus:outline-none text-white placeholder-white/30 transition-colors"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-[#FF9900]/20 hover:bg-[#FF9900]/30 border border-[#FF9900]/40 text-[#FF9900] rounded-lg disabled:opacity-40 transition-all"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-white/40 mt-2">
            💡 Powered by 6 AI agents (Spending, Portfolio, Goals, Perks, Advisors, Orchestrator)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
