"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChatMessage, ChatState } from "@/lib/types/chat";
import { PerksSnapshotData } from "@/lib/types/perks";

import { Loader2, AlertCircle, Brain, Gift } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserMessage } from "../spending/UserMessage";
import { AgentMessage } from "../spending/AgentMessage";
import { ChatInput } from "../spending/ChatInput";

interface PerksChatProps {
  userId: string;
  isEnabled: boolean; // Chat appears after snapshot loads
  perksData: PerksSnapshotData | null;
}

export function PerksChat({ userId, isEnabled, perksData }: PerksChatProps) {
  // Demo messages for presentation
  const demoMessages: ChatMessage[] = [
    {
      id: "demo-user-1",
      type: "user",
      content: "How many reward points do I have and what can I redeem?",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "demo-agent-1",
      type: "agent",
      content: "You have an impressive rewards balance! Here's what you're working with:\n\n🎁 **Total Points**: 12,450 points\n💵 **Cash Value**: $124.50\n\n**Redemption Options:**\n✈️ **Travel**: 10,000 pts = $150 flight credit (Best value: 1.5¢/point)\n🛍️ **Shopping**: 12,000 pts = $120 Amazon gift card\n💰 **Cash Back**: 12,450 pts = $124.50 direct deposit\n🎫 **Experiences**: VIP concert tickets, dining experiences\n\n**Pro Tip**: Redeem for travel to get 50% more value! You could book a $187 flight with your current points.\n\n**This Month's Earnings:**\n• Cash back: $47.80\n• Bonus points: 2,500\n• Total value: $67.30",
      timestamp: new Date(Date.now() - 290000),
    },
    {
      id: "demo-user-2",
      type: "user",
      content: "What perks am I not using that I should?",
      timestamp: new Date(Date.now() - 200000),
    },
    {
      id: "demo-agent-2",
      type: "agent",
      content: "Great question! You're leaving value on the table. Here are **unused perks** you should activate:\n\n🚨 **Missing Out On:**\n\n1. **Double Points Dining** (Until Dec 31)\n   • You spent $654 on dining this month\n   • Could have earned 1,308 extra points ($13.08)\n   • **Action**: Activate in app → Use at restaurants\n\n2. **Free Airport Lounge Access** (12x/year)\n   • You haven't used any of your 12 passes\n   • Value: $39 per visit = $468/year benefit\n   • **Action**: Download LoungeBuddy app\n\n3. **Travel Insurance** (Automatic)\n   • Free coverage on trips booked with card\n   • Up to $500,000 coverage\n   • **Action**: Just book travel with this card\n\n4. **Cell Phone Protection** ($600 coverage)\n   • Pay phone bill with card → automatic protection\n   • **Action**: Switch phone bill to this card\n\n💡 **Total Unused Value**: ~$580/year!\n\nWould you like me to activate the dining bonus for you?",
      timestamp: new Date(Date.now() - 180000),
    },
  ];

  const [chatState, setChatState] = useState<ChatState>({
    messages: demoMessages,
    isLoading: false,
    error: null,
    sessionId: null,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current && !hasAutoScrolled) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      setHasAutoScrolled(true);
    }
  }, [hasAutoScrolled]);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (message: string): Promise<void> => {
      if (!message.trim()) return;

      console.log("[PERKS CHAT] 🚀 Sending message:", message);
      console.log("[PERKS CHAT] 📋 Current session ID:", chatState.sessionId);

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        type: "user",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }));

      try {
        // For the first message, append perks context
        let messageWithContext = message;
        const isFirstMessage = !chatState.sessionId;

        if (isFirstMessage && perksData) {
          const perksContext = JSON.stringify({
            activities: perksData.activities,
            partners: perksData.partners,
            insights: perksData.insights,
          });

          messageWithContext = `${message}

<PERKS_CONTEXT>
${perksContext}
</PERKS_CONTEXT>

Please use this perks data to provide contextual responses about the user's benefits, bank partners, and financial perks insights.`;

          console.log(
            "[PERKS CHAT] 📦 First message - adding perks context:",
            messageWithContext
          );
        }

        const response = await fetch("/api/cymbal/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            message: messageWithContext,
            sessionId: chatState.sessionId,
            topic: "perks", // Set topic to perks
          }),
        });

        console.log("[PERKS CHAT] 📡 API response status:", response.status);

        if (!response.ok) {
          console.warn("[PERKS CHAT] ⚠️ Backend unavailable, using demo mode");
          
          // Demo mode: Generate a helpful response when backend is down
          const demoResponse = {
            message: `🎤 **Voice input received!** Your message was: "${message.trim()}"\n\n💡 *Demo Mode Active* - The backend agent server isn't running, but your voice input is working perfectly! \n\nTo enable full AI responses:\n1. Start the backend agent server on port 8090\n2. The chat will automatically connect\n\nFor now, you can continue testing the voice input feature. Try asking about credit card perks, rewards, or cashback opportunities.`,
            session_id: chatState.sessionId || `demo-session-${Date.now()}`,
          };
          
          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: demoResponse.message,
            type: "agent",
            timestamp: new Date(),
          };

          setChatState((prev) => ({
            ...prev,
            messages: [...prev.messages, assistantMessage],
            isLoading: false,
            sessionId: demoResponse.session_id,
          }));
          
          return;
        }

        const data = await response.json();
        console.log("[PERKS CHAT] ✅ API response data:", data);

        // Add assistant message
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content:
            data.message || "I apologize, but I couldn't process your request.",
          type: "agent",
          timestamp: new Date(),
        };

        setChatState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isLoading: false,
          sessionId: data.sessionId || prev.sessionId,
        }));

        console.log("[PERKS CHAT] ✅ Message exchange completed successfully");
      } catch (error) {
        console.error("[PERKS CHAT] ❌ Error sending message:", error);
        setChatState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        }));
      }
    },
    [userId, chatState.sessionId, perksData]
  );

  // If chat is not enabled yet, show waiting state
  if (!isEnabled) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent relative">
        {/* Glass loading card */}
        <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-8 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />

          <div className="relative flex flex-col items-center space-y-6">
            {/* Animated AI Brain logo with Perks context */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-cyan-500 rounded-lg flex items-center justify-center">
                  <Gift className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>

            {/* Loading spinner */}
            <Loader2 className="h-8 w-8 animate-spin text-primary" />

            <div className="text-center space-y-2">
              <p className="text-foreground font-semibold">
                Waiting for Perks Analysis
              </p>
              <p className="text-muted-foreground text-sm">
                Chat will be available after data analysis...
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {chatState.messages.length === 0 && !chatState.isLoading ? (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Gift className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute top-0 right-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-75" />
                  <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150" />
                  <div className="absolute top-2 right-12 w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                </div>

                <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-3">
                  Let&rsquo;s explore your perks
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I&rsquo;m here to help you discover your benefits, understand
                  bank partner offers, and maximize your financial perks and
                  rewards.
                </p>

                {/* Quick Start Suggestions */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground/80 mb-4">
                    Try asking me:
                  </p>
                  <div className="grid gap-2">
                    {[
                      "🎁 What benefits do I have available?",
                      "🏪 Which partners offer the best deals?",
                      "💎 How can I maximize my perks?",
                      "🔍 What special offers are available now?",
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => sendMessage(suggestion.slice(2).trim())}
                        className="text-left p-3 rounded-lg bg-card hover:bg-accent/50 border border-border/50 hover:border-border transition-all duration-200 text-sm group hover:shadow-sm"
                      >
                        <span className="group-hover:text-primary transition-colors">
                          {suggestion}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 space-y-2 pb-24">
              {chatState.messages.map((message) =>
                message.type === "user" ? (
                  <UserMessage key={message.id} message={message} />
                ) : (
                  <AgentMessage key={message.id} message={message} />
                )
              )}

              {/* Show loading spinner while waiting for response */}
              {chatState.isLoading && (
                <div className="flex items-center justify-center space-x-2 py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                  <span className="text-muted-foreground">
                    AI is thinking...
                  </span>
                </div>
              )}

              <div ref={chatContainerRef} />
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {chatState.error && (
        <div className="p-4 border-t">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{chatState.error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Fixed Chat Input at Bottom */}
      <div className="flex-shrink-0 bg-background/90 backdrop-blur-md border-t border-border/50 shadow-lg relative z-10">
        <ChatInput
          onSendMessage={sendMessage}
          disabled={chatState.isLoading}
          isLoading={chatState.isLoading}
        />
      </div>
    </div>
  );
}
