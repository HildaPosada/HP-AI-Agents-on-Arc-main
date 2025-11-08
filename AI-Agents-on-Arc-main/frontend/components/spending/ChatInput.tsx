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
  const [micError, setMicError] = useState<string | null>(null);
  const [hasBrowserSupport, setHasBrowserSupport] = useState<boolean | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check browser support on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      setHasBrowserSupport(false);
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    setHasBrowserSupport(!!SpeechRecognition);
  }, []);

  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      setMicError('Speech recognition not supported in this browser');
      setHasBrowserSupport(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('🎤 Speech recognition started');
        setIsListening(true);
        setIsRecording(true);
        setMicError(null);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript.trim()) {
          console.log('✓ Final transcript:', finalTranscript);
          setMessage(prev => (prev + ' ' + finalTranscript).trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.log('⚠️ Speech recognition error:', event.error);
        setMicError(`Mic error: ${event.error}`);
        setIsListening(false);
        setIsRecording(false);
      };

      recognition.onend = () => {
        console.log('🎤 Speech recognition ended');
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.log('ℹ️ Could not initialize speech recognition:', error);
      setMicError(`Failed to initialize: ${errorMsg}`);
      setIsListening(false);
      setIsRecording(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log('Speech recognition already stopped');
        }
      }
    };
  }, []);

  // Clear error after 3 seconds
  useEffect(() => {
    if (micError) {
      const timer = setTimeout(() => {
        setMicError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [micError]);

  const toggleVoiceInput = () => {
    if (isListening || isRecording) {
      // Stop listening
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
        recordingTimeoutRef.current = null;
      }
      try {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
      setIsListening(false);
      setIsRecording(false);
    } else {
      // Check browser support first
      if (!hasBrowserSupport) {
        setMicError('Microphone not supported. Try Chrome, Edge, or Safari.');
        return;
      }

      // Start listening
      setMessage(''); // Clear message when starting
      setMicError(null);

      if (!recognitionRef.current) {
        initializeSpeechRecognition();
      }

      // Show recording UI immediately
      setIsListening(true);
      setIsRecording(true);

      // Clear any existing timeout
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }

      // Set maximum recording duration (10 seconds)
      recordingTimeoutRef.current = setTimeout(() => {
        setIsListening(false);
        setIsRecording(false);
        recordingTimeoutRef.current = null;
      }, 10000);

      try {
        if (recognitionRef.current) {
          recognitionRef.current.start();
          console.log('✓ Speech recognition started');
        } else {
          setMicError('Failed to start microphone');
          setIsRecording(false);
          setIsListening(false);
        }
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        const err = error as any;
        if (err.name === 'InvalidStateError') {
          console.log('Speech recognition already running, attempting restart');
          try {
            if (recognitionRef.current) {
              recognitionRef.current.abort();
              setTimeout(() => {
                recognitionRef.current?.start();
              }, 100);
            }
          } catch (e) {
            console.error('Error restarting:', e);
            setMicError('Failed to start microphone');
          }
        } else {
          setMicError(`Microphone error: ${err.message || 'Unknown'}`);
          setIsRecording(false);
          setIsListening(false);
        }
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
              "px-4 py-3 text-sm ring-offset-background",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "min-h-[60px] max-h-[200px]"
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
            disabled={disabled || isLoading || hasBrowserSupport === false}
            size="sm"
            className={cn(
              "h-[50px] min-w-[50px]",
              isRecording
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-lg shadow-blue-500/30'
            )}
            title={hasBrowserSupport === false ? "Microphone not supported in this browser" : isRecording ? "Stop recording" : "Start voice input"}
            aria-label={isRecording ? "Stop recording" : "Start voice input"}
          >
            {isRecording ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled || isLoading}
            size="sm"
            className="h-[50px] min-w-[50px]"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
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
