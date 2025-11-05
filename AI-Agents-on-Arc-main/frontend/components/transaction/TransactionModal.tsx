"use client";

import { useState, useEffect } from "react";
import { X, Send, ArrowRight, CheckCircle, Loader2, Bot, User as UserIcon } from "lucide-react";
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
      content: "Hi! I'm your AI-powered USDC transaction assistant. I can help you send stablecoins securely on the blockchain, verify wallet addresses, check network fees, and ensure everything is correct before broadcasting your transaction.",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Reset form when modal opens
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
          content: "Hi! I'm your AI-powered USDC transaction assistant. I can help you send stablecoins securely on the blockchain, verify wallet addresses, check network fees, and ensure everything is correct before broadcasting your transaction.",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  // Smart suggestions based on input
  useEffect(() => {
    if (amount && parseFloat(amount) > 1000 && chatMessages.length === 1) {
      setTimeout(() => {
        addAssistantMessage(
          `💡 I notice you're sending ${amount} USDC. This is a significant transaction. Would you like me to verify the recipient's wallet address and check current Ethereum gas fees before proceeding?`
        );
      }, 1000);
    }
  }, [amount]);

  useEffect(() => {
    if (receiver && receiver.length > 3 && chatMessages.length <= 2) {
      setTimeout(() => {
        addAssistantMessage(
          `✅ Great! I found "${receiver}" in your trusted contacts. Their wallet address has been verified on the blockchain and is ready to receive USDC.`
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

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "";
      const input = chatInput.toLowerCase();

      if (input.includes("who") || input.includes("recipient") || input.includes("suggest")) {
        response = "Based on your transaction history, you frequently send USDC to: Sarah Johnson, Mike Chen, and Emma Williams. All their wallet addresses are verified on the blockchain. Would you like to use any of these?";
      } else if (input.includes("safe") || input.includes("secure") || input.includes("verify")) {
        response = "Yes, this USDC transaction is highly secure! All transfers are executed on the Ethereum blockchain with smart contract verification. Our AI fraud detection monitors every transaction in real-time. You'll receive instant confirmation once the transaction is mined.";
      } else if (input.includes("limit") || input.includes("maximum")) {
        response = "Your current daily USDC transfer limit is 5,000 USDC. You have 4,200 USDC remaining today. This limit helps protect your account from unauthorized transactions.";
      } else if (input.includes("fee") || input.includes("charge") || input.includes("cost") || input.includes("gas")) {
        response = "Current Ethereum gas fees for USDC transfers are approximately 0.002-0.004 ETH (~$5-10). The exact fee depends on network congestion. I can help you optimize timing for lower fees!";
      } else if (input.includes("time") || input.includes("how long") || input.includes("when")) {
        response = "USDC transactions on Ethereum typically confirm in 15-30 seconds (1-2 blocks). During high network activity, it may take up to 2 minutes. Your recipient will see the funds immediately after blockchain confirmation.";
      } else if (input.includes("blockchain") || input.includes("network") || input.includes("chain")) {
        response = "We're using the Ethereum network for USDC transfers. This ensures maximum security and compatibility. USDC is a fully-backed stablecoin pegged 1:1 to the US Dollar.";
      } else if (input.includes("usdc") || input.includes("stablecoin")) {
        response = "USDC (USD Coin) is a digital stablecoin backed 1:1 by US dollars held in reserve. It combines the stability of traditional currency with the speed and security of blockchain technology. Perfect for fast, reliable payments!";
      } else {
        response = "I'm here to help with your USDC transaction! You can ask me about blockchain networks, gas fees, transaction timing, wallet verification, or any security concerns.";
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmitTransaction = () => {
    if (!amount || !receiver) return;

    setStep("processing");

    // Simulate processing
    setTimeout(() => {
      setStep("success");
      addAssistantMessage(
        `🎉 Transaction completed successfully! ${amount} USDC has been sent to ${receiver} on the Ethereum blockchain. Transaction hash and confirmation details are now available. They'll receive a notification right away.`
      );
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2775CA] to-[#1E5FA8] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Send className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Make a Transaction</h2>
              <p className="text-white/80 text-sm">Send USDC securely with AI-powered assistance</p>
            </div>
          </div>
          {/* USDC Badge */}
          <div className="mt-3 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#2775CA] text-xs font-bold">$</span>
            </div>
            <span className="text-xs font-semibold">Powered by USDC on Blockchain</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Side - Transaction Form */}
          <div className="flex-1 p-6 overflow-y-auto border-r border-gray-200">
            {step === "form" && (
              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Amount (USDC) *
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#2775CA] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">$</span>
                      </div>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-14 pr-4 py-3 text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-[#2775CA] focus:outline-none transition-colors text-gray-900"
                    />
                  </div>
                  <p className="text-xs text-gray-700 mt-1">
                    Available balance: 12,450.00 USDC
                  </p>
                </div>

                {/* Receiver Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Send to *
                  </label>
                  <input
                    type="text"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    placeholder="Name, email, or phone number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2775CA] focus:outline-none transition-colors text-gray-900"
                  />
                  
                  {/* Quick Recipients */}
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-700 font-medium">Quick send to:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Sarah Johnson", "Mike Chen", "Emma Williams"].map((name) => (
                        <button
                          key={name}
                          onClick={() => setReceiver(name)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-[#2775CA]/10 hover:border-[#2775CA] border-2 border-transparent rounded-lg text-sm transition-colors text-gray-900 font-medium"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Note Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Note (Optional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What's this for?"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2775CA] focus:outline-none transition-colors resize-none text-gray-900"
                  />
                </div>

                {/* Payment Method Info - USDC Blockchain */}
                <div className="bg-gradient-to-br from-[#2775CA]/10 to-[#1E5FA8]/5 rounded-xl p-4 border-2 border-[#2775CA]/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Payment Method</p>
                      <p className="text-xs text-gray-700 mt-1">USDC Wallet Connected</p>
                    </div>
                    <div className="w-12 h-12 bg-[#2775CA] rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-white text-lg font-bold">$</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-800">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">Blockchain:</span>
                      <span className="font-mono font-semibold">Ethereum</span>
                    </div>
                    <span className="text-gray-600">•</span>
                    <span className="font-mono text-gray-800 font-medium">0x...4242</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitTransaction}
                  disabled={!amount || !receiver}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-[#2775CA] to-[#1E5FA8] hover:from-[#1E5FA8] hover:to-[#2775CA] text-white disabled:opacity-50 shadow-lg"
                >
                  Send {amount || "0.00"} USDC
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}

            {step === "processing" && (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="relative">
                  <Loader2 className="h-16 w-16 text-[#2775CA] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#2775CA]/20 rounded-full animate-pulse" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Processing USDC Transaction</h3>
                <p className="text-gray-700 text-center max-w-sm font-medium">
                  Our AI agents are verifying and securing your blockchain transaction...
                </p>
                <div className="space-y-2 text-sm text-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#2775CA] rounded-full animate-pulse" />
                    <span className="font-medium">Verifying recipient wallet address</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#2775CA] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="font-medium">Checking blockchain network status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#2775CA] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <span className="font-medium">Broadcasting USDC transaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#2775CA] rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                    <span className="font-medium">Confirming on Ethereum network</span>
                  </div>
                </div>
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center justify-center h-full space-y-4 pt-32">
                <div className="relative z-10 mb-4">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Transaction Successful!</h3>
                <p className="text-gray-700 text-center max-w-sm font-medium">
                  {amount} USDC has been sent to {receiver}
                </p>
                
                {/* Transaction Details */}
                <div className="w-full max-w-md bg-gradient-to-br from-[#2775CA]/5 to-[#1E5FA8]/5 rounded-xl p-4 space-y-3 text-sm border-2 border-[#2775CA]/20">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium">Amount</span>
                    <span className="font-bold text-gray-900">{amount} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium">Recipient</span>
                    <span className="font-bold text-gray-900">{receiver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium">Network</span>
                    <span className="font-bold text-gray-900">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium">Gas Fee</span>
                    <span className="font-bold text-green-600">0.0023 ETH</span>
                  </div>
                  {note && (
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium">Note</span>
                      <span className="font-bold text-gray-900">{note}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-800 font-medium">Transaction Hash</span>
                    <span className="font-mono text-xs text-[#2775CA] font-bold">0x{Date.now().toString(16)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium">Block Number</span>
                    <span className="font-mono text-xs font-bold text-gray-900">#{Math.floor(Math.random() * 1000000) + 18000000}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium">Confirmations</span>
                    <span className="font-bold text-green-600">✓ 12 blocks</span>
                  </div>
                </div>

                <Button
                  onClick={onClose}
                  className="w-full max-w-md py-6 text-lg font-semibold bg-gradient-to-r from-[#2775CA] to-[#1E5FA8] hover:from-[#1E5FA8] hover:to-[#2775CA] text-white mt-6 shadow-lg"
                >
                  Done
                </Button>
              </div>
            )}
          </div>

          {/* Right Side - AI Chat Assistant */}
          <div className="w-80 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2775CA] to-[#1E5FA8] rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-gray-500">USDC Transaction Helper</p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-7 h-7 bg-gradient-to-br from-[#2775CA] to-[#1E5FA8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[70%] rounded-xl px-3 py-2 text-sm",
                      message.role === "user"
                        ? "bg-[#2775CA] text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="w-7 h-7 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserIcon className="h-4 w-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#2775CA] to-[#1E5FA8] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            {step === "form" && (
              <div className="p-4 bg-white border-t border-gray-200">
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
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#2775CA] focus:outline-none"
                  />
                  <button
                    onClick={handleSendChatMessage}
                    disabled={!chatInput.trim() || isTyping}
                    className="p-2 bg-[#2775CA] text-white rounded-lg hover:bg-[#1E5FA8] disabled:opacity-50 transition-colors"
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
