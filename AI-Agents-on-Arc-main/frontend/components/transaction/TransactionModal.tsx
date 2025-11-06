"use client";

import { useState, useEffect } from "react";
import { X, Send, ArrowRight, CheckCircle, Loader2, Bot, User as UserIcon, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function TransactionModal({ isOpen, onClose, userName }: TransactionModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");
  const [note, setNote] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "🤖 Hi! I'm your AI-powered USDC transaction assistant. I can help you send stablecoins securely on Arc blockchain.",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setAmount("");
      setReceiver("");
      setNote("");
      setChatMessages([
        {
          id: "1",
          role: "assistant",
          content: "🤖 Hi! I'm your AI-powered USDC transaction assistant. I can help you send stablecoins securely on Arc blockchain.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (amount && parseFloat(amount) > 1000 && chatMessages.length === 1) {
      setTimeout(() => {
        addAssistantMessage(
          `💡 Large transaction detected: ${amount} USDC. Would you like me to verify the recipient's wallet before proceeding?`
        );
      }, 1000);
    }
  }, [amount]);

  useEffect(() => {
    if (receiver && receiver.length > 3 && chatMessages.length <= 2) {
      setTimeout(() => {
        addAssistantMessage(
          `✅ Recipient "${receiver}" found and verified on Arc blockchain!`
        );
      }, 800);
    }
  }, [receiver]);

  const addAssistantMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "";
      const input = chatInput.toLowerCase();

      if (input.includes("who") || input.includes("recipient")) {
        response = "You frequently send USDC to: Sarah Johnson, Mike Chen, Emma Williams. All verified on Arc!";
      } else if (input.includes("safe") || input.includes("secure")) {
        response = "✅ USDC transactions are highly secure! All transfers are blockchain-verified with real-time fraud detection.";
      } else if (input.includes("fee") || input.includes("gas")) {
        response = "Current Arc network fees are ~0.0001 USDC (~$0.0001). Much cheaper than Ethereum!";
      } else if (input.includes("time") || input.includes("how long")) {
        response = "Arc USDC transfers confirm in 5-15 seconds. Instant money, no delays!";
      } else if (input.includes("limit")) {
        response = "Your daily USDC limit is 5,000 USDC. You have 4,200 remaining today.";
      } else {
        response = "Ask me about Arc network, USDC fees, transaction timing, or wallet security!";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSubmitTransaction = () => {
    if (!amount || !receiver) return;

    setStep("processing");

    setTimeout(() => {
      setStep("success");
      addAssistantMessage(
        `🎉 Transaction confirmed! ${amount} USDC sent to ${receiver} on Arc. Block verified!`
      );
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Modal Container */}
      <div className="bg-[#1a1a1a] border border-[#ccff00]/20 rounded-2xl shadow-2xl w-full sm:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 1rem)' }}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] p-4 sm:p-6 text-white relative border-b border-[#ccff00]/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#ccff00]/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-white/70" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#ccff00]/20 rounded-lg flex items-center justify-center border border-[#ccff00]/40">
              <Send className="h-5 w-5 text-[#ccff00]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Send USDC</h2>
              <p className="text-xs sm:text-sm text-white/60">Secure Arc blockchain transfer</p>
            </div>
          </div>

          {/* USDC + Arc Badge */}
          <div className="flex items-center gap-2 text-xs">
            <div className="inline-flex items-center gap-2 bg-[#ccff00]/10 backdrop-blur px-3 py-1.5 rounded-full border border-[#ccff00]/30">
              <Shield className="h-3 w-3 text-[#ccff00]" />
              <span className="text-[#ccff00] font-bold">USDC on Arc</span>
              <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-pulse" />
            </div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/30">
              <Zap className="h-3 w-3 text-green-400" />
              <span className="text-green-400 font-bold">Live</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side - Transaction Form */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#ccff00]/10">
            {step === "form" && (
              <div className="space-y-5">
                
                {/* Amount Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider mb-2">
                    Amount (USDC) *
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <div className="w-5 h-5 bg-[#ccff00] rounded-full flex items-center justify-center">
                        <span className="text-[#0f0f0f] text-xs font-bold">$</span>
                      </div>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-3 sm:py-4 text-2xl sm:text-3xl font-bold bg-[#0f0f0f] border border-[#ccff00]/30 rounded-lg focus:border-[#ccff00] focus:outline-none transition-colors text-[#ccff00] placeholder-white/20"
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Available: 12,450.00 USDC
                  </p>
                </div>

                {/* Receiver Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider mb-2">
                    Send to *
                  </label>
                  <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Name, email, or wallet address"
                    className="w-full px-4 py-3 sm:py-4 bg-[#0f0f0f] border border-[#ccff00]/30 rounded-lg focus:border-[#ccff00] focus:outline-none transition-colors text-white placeholder-white/30"
                  />
                  
                  {/* Quick Recipients */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Quick send:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Sarah Johnson", "Mike Chen", "Emma Williams"].map((name) => (
                        <button
                          key={name}
                          onClick={() => setReceiver(name)}
                          className="px-3 py-1.5 bg-[#ccff00]/10 hover:bg-[#ccff00]/20 border border-[#ccff00]/30 hover:border-[#ccff00]/60 rounded-lg text-xs font-medium text-[#ccff00] transition-all"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Note Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-white/80 uppercase tracking-wider mb-2">
                    Note (Optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's this for?"
                    rows={2}
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#ccff00]/30 rounded-lg focus:border-[#ccff00] focus:outline-none transition-colors text-white placeholder-white/30 resize-none text-sm"
                  />
                </div>

                {/* Arc Network Info */}
                <div className="bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Network & Method</p>
                      <p className="text-xs text-white/60 mt-0.5">Circle Arc Network</p>
                    </div>
                    <div className="w-10 h-10 bg-[#ccff00]/20 rounded-lg flex items-center justify-center border border-[#ccff00]/40">
                      <span className="text-[#ccff00] font-bold">⊙</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white/70">Network:</span>
                      <span className="font-mono text-[#ccff00] font-bold">Arc Mainnet</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs pt-2 border-t border-[#ccff00]/10">
                    <Shield className="h-4 w-4 text-[#ccff00]" />
                    <span className="text-white/70">Blockchain verified • Instant settlement</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitTransaction}
                  disabled={!amount || !receiver}
                  className="w-full py-4 sm:py-5 text-base sm:text-lg font-bold bg-[#ccff00] hover:bg-[#ccff00]/90 text-[#0f0f0f] disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#ccff00]/30 transition-all"
                >
                  Send {amount || "0.00"} USDC
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {step === "processing" && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
                <div className="relative mb-4">
                  <Loader2 className="h-16 w-16 text-[#ccff00] animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white">Processing Transaction</h3>
                <p className="text-white/60 max-w-sm text-sm">
                  Verifying and securing your USDC transfer on Arc blockchain...
                </p>
                <div className="space-y-2 text-xs text-white/70 w-full max-w-sm">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#ccff00]/5">
                    <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" />
                    <span>Verifying recipient wallet</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#ccff00]/5">
                    <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span>Checking Arc network</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#ccff00]/5">
                    <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <span>Broadcasting USDC</span>
                  </div>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 text-center py-8">
                <div className="relative mb-4">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white">Success!</h3>
                <p className="text-white/70 text-sm">
                  {amount} USDC sent to {receiver}
                </p>
                
                {/* Transaction Details */}
                <div className="w-full bg-[#ccff00]/5 border border-[#ccff00]/20 rounded-lg p-4 space-y-2 text-xs mt-4">
                  <div className="flex justify-between text-white/70">
                    <span>Amount</span>
                    <span className="text-[#ccff00] font-bold">{amount} USDC</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Recipient</span>
                    <span className="text-white">{receiver}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Network</span>
                    <span className="text-white">Arc</span>
                  </div>
                  <div className="flex justify-between text-white/70 pt-2 border-t border-[#ccff00]/10">
                    <span>Status</span>
                    <span className="text-green-400 font-bold">✓ Confirmed</span>
                  </div>
                </div>

                <Button
                  onClick={onClose}
                  className="w-full py-4 mt-4 text-base font-bold bg-[#ccff00] hover:bg-[#ccff00]/90 text-[#0f0f0f]"
                >
                  Done
                </Button>
              </div>
            )}
          </div>

          {/* Right Side - AI Chat Assistant */}
          <div className="w-full lg:w-80 flex flex-col bg-[#0f0f0f] border-t lg:border-t-0">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-[#ccff00]/10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#ccff00]/20 rounded-lg flex items-center justify-center border border-[#ccff00]/40">
                  <Bot className="h-5 w-5 text-[#ccff00]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">AI Assistant</h3>
                  <p className="text-xs text-white/50">USDC Helper</p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-7 h-7 bg-[#ccff00]/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#ccff00]/40">
                      <Bot className="h-3 w-3 text-[#ccff00]" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-3 py-2 text-xs sm:text-sm",
                      message.role === "user"
                        ? "bg-[#ccff00] text-[#0f0f0f] font-bold"
                        : "bg-[#1a1a1a] border border-[#ccff00]/20 text-white/80"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="w-7 h-7 bg-[#ccff00] rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserIcon className="h-3 w-3 text-[#0f0f0f]" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-[#ccff00]/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#ccff00]/40">
                    <Bot className="h-3 w-3 text-[#ccff00]" />
                  </div>
                  <div className="bg-[#1a1a1a] border border-[#ccff00]/20 rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            {step === "form" && (
              <div className="p-3 border-t border-[#ccff00]/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendChatMessage();
                      }
                    }}
                    placeholder="Ask..."
                    className="flex-1 px-3 py-2 text-xs bg-[#0f0f0f] border border-[#ccff00]/30 rounded-lg focus:border-[#ccff00] focus:outline-none text-white placeholder-white/30 transition-colors"
                  />
                  <button
                    onClick={handleSendChatMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className="p-2 bg-[#ccff00]/20 hover:bg-[#ccff00]/30 border border-[#ccff00]/40 text-[#ccff00] rounded-lg disabled:opacity-40 transition-all"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
