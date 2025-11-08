"use client";

import { useState } from "react";
import { X, MessageCircle, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AdvisorsChat } from "./AdvisorsChat";
import { AdvisorsSnapshotData } from "@/lib/types/advisors";

interface FloatingAdvisorChatProps {
  userId: string;
  isEnabled: boolean;
  advisorsData: AdvisorsSnapshotData | null;
}

export function FloatingAdvisorChat({
  userId,
  isEnabled,
  advisorsData,
}: FloatingAdvisorChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsCollapsed(false);
        }}
        className={`fixed right-6 z-50 group transition-all duration-300 ${
          isOpen ? "hidden" : "block"
        }`}
        style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom))' }}
        aria-label="Open Advisor Chat"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#FF9900] rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"></div>

          {/* Main button */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9900] to-[#ffdd00] flex items-center justify-center shadow-2xl hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all duration-300">
            <MessageCircle className="w-7 h-7 text-[#0f0f0f]" />
          </div>

          {/* Badge - notification dot - proportional */}
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[#0f0f0f] border border-[#FF9900]/40 text-[#FF9900] text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap">
              Chat with Advisors
            </div>
          </div>
        </div>
      </button>

      {/* Chat Modal/Drawer */}
      {isOpen && (
        <>
          {/* Backdrop - Non-blocking (pointer-events-none) */}
          <div
            className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-300"
          ></div>

          {/* Modal - slides in from right - Non-blocking */}
          <div
            className={`fixed right-0 z-20 bg-[#0f0f0f] border-l border-[#FF9900]/20 shadow-2xl transition-all duration-300 ease-out flex flex-col overflow-hidden pointer-events-auto ${
              isCollapsed
                ? "top-auto h-16 w-full sm:w-96 lg:w-[28rem] rounded-tl-2xl"
                : "top-0 h-full w-full sm:w-96 lg:w-[28rem]"
            }`}
            style={isCollapsed ? { bottom: 'env(safe-area-inset-bottom)' } : { bottom: 0 }}
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-[#FF9900]/20 bg-[#1a1a1a]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF9900]/20 border border-[#FF9900]/40 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-[#FF9900]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      Advisors Assistant
                    </h3>
                    <p className="text-xs text-white/60">
                      Schedule & get guidance
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-[#FF9900]/10 rounded-lg transition-colors pointer-events-auto"
                    aria-label={isCollapsed ? "Expand chat" : "Collapse chat"}
                  >
                    <ChevronDown
                      className={`w-4 h-4 text-[#FF9900] transition-transform duration-300 ${
                        isCollapsed ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-[#FF9900]/10 rounded-lg transition-colors pointer-events-auto"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 text-[#FF9900]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Content - Hidden when collapsed */}
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden pb-6 sm:pb-6" style={{ paddingBottom: 'calc(4.5rem + env(safe-area-inset-bottom))' }}>
                <AdvisorsChat
                  userId={userId}
                  isEnabled={isEnabled}
                  advisorsData={advisorsData}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
