"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdvisorsChat } from "./AdvisorsChat";
import { AdvisorsSnapshotData } from "@/lib/types/advisors";

interface ExpandableAdvisorChatProps {
  userId: string;
  isEnabled: boolean;
  advisorsData: AdvisorsSnapshotData | null;
}

export function ExpandableAdvisorChat({
  userId,
  isEnabled,
  advisorsData,
}: ExpandableAdvisorChatProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a]">
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left transition-all duration-300 hover:bg-[#0f0f0f]/50"
      >
        <CardContent className="p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#ccff00]/20 border border-[#ccff00]/40 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-[#ccff00]" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">
                Chat with Advisors
              </h3>
              <p className="text-sm text-white/60">
                {isExpanded
                  ? "Schedule meetings and get personalized guidance"
                  : "Click to open the advisor assistant chat"}
              </p>
            </div>
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            className={`w-5 h-5 text-[#ccff00] flex-shrink-0 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </CardContent>
      </button>

      {/* Chat Content - Expandable */}
      {isExpanded && (
        <>
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#ccff00]/20 to-transparent"></div>

          {/* Chat Area */}
          <div className="h-96 overflow-hidden">
            <AdvisorsChat
              userId={userId}
              isEnabled={isEnabled}
              advisorsData={advisorsData}
            />
          </div>
        </>
      )}
    </Card>
  );
}
