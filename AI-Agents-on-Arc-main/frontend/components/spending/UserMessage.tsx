import { ChatMessage } from "@/lib/types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { User, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end mb-0.25 animate-in slide-in-from-right-2 duration-500">
      <div className="flex items-end gap-1.5 max-w-[85%]">
        {/* iOS Messenger Style Message Bubble */}
        <Card
          className={cn(
            "relative bg-gradient-to-br from-[#ccff00] to-[#b8e800] order-2",
            "text-[#0f0f0f] shadow-md",
            "transition-all duration-200 overflow-hidden rounded-3xl"
          )}
        >
          <CardContent className="px-3 py-2 relative">
            {/* Message content with proportional sizing */}
            <p className="text-xs leading-snug whitespace-pre-wrap font-medium text-[#0f0f0f] break-words">
              {message.content}
            </p>

            {/* Inline timestamp - only on longer messages */}
            {message.content.length > 20 && (
              <div className="flex items-center justify-end gap-0.5 mt-1">
                <CheckCircle className="h-2 w-2 text-[#0f0f0f]/50" />
                <span className="text-xs text-[#0f0f0f]/60">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tiny User Avatar */}
        <div className="flex-shrink-0 relative order-1 mb-0.5">
          <div
            className={cn(
              "relative w-6 h-6 rounded-lg flex items-center justify-center shadow-sm transition-all duration-200",
              "bg-gradient-to-br from-primary/90 to-primary/80",
              "border border-primary/30"
            )}
          >
            {/* User icon */}
            <User className="h-3 w-3 text-primary-foreground" />
          </div>

          {/* Tiny status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-background" />
        </div>
      </div>
    </div>
  );
}
