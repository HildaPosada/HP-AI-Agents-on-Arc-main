import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  isLoading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setMessage(prev => prev + finalTranscript);
        } else if (interimTranscript) {
          // Show interim results
          setMessage(prev => {
            const lastSpace = prev.lastIndexOf(' ');
            return lastSpace >= 0 ? prev.substring(0, lastSpace + 1) + interimTranscript : interimTranscript;
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      initializeSpeechRecognition();
    }

    if (isListening) {
      // Stop listening
      recognitionRef.current?.stop();
      setIsListening(false);
      setIsRecording(false);
    } else {
      // Start listening
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        // If already started, just continue
        setIsListening(true);
        setIsRecording(true);
      }
    }
  };

  const handleSend = () => {
    if (!message.trim() || disabled || isLoading) {
      return;
    }

    onSendMessage(message.trim());
    setMessage("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Allow shift+enter for new lines
        return;
      } else {
        // Send message on Enter
        e.preventDefault();
        handleSend();
      }
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 200; // Max ~8 lines approximately
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
  };

  return (
    <div className="p-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading
                ? "Waiting for response..."
                : "Ask me about your spending habits, financial insights, or recommendations..."
            }
            disabled={disabled || isLoading}
            className={cn(
              "w-full resize-none rounded-md border border-input bg-background",
              "px-3 py-2 text-sm ring-offset-background",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "min-h-[40px] max-h-[120px]"
            )}
            rows={1}
          />

          {/* Character counter for very long messages */}
          {message.length > 500 && (
            <div className="absolute right-2 bottom-1 text-xs text-muted-foreground">
              {message.length}/1000
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {/* Voice Input Button */}
          <Button
            onClick={toggleVoiceInput}
            disabled={disabled || isLoading}
            size="sm"
            className={cn(
              "h-[40px] min-w-[40px]",
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#047857] hover:to-[#065f46]'
            )}
            aria-label={isRecording ? "Stop recording" : "Start voice input"}
          >
            {isRecording ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled || isLoading}
            size="sm"
            className="h-[40px] min-w-[40px]"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Help text */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-muted-foreground">
          {isRecording ? (
            <span className="text-red-500 font-medium animate-pulse">
              🎤 Recording... Speak now
            </span>
          ) : (
            "Press Enter to send, Shift+Enter for a new line"
          )}
        </p>
        {isRecording && (
          <span className="text-xs text-red-500 font-medium">
            Click microphone to stop
          </span>
        )}
      </div>
    </div>
  );
}
