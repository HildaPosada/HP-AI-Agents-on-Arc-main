"use client";

import { useState, useCallback, useRef } from "react";

interface UseSpeechToTextOptions {
  language?: string;
}

export function useSpeechToText(options: UseSpeechToTextOptions = {}) {
  const { language = "en-US" } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const interimTranscriptRef = useRef("");

  const startListening = useCallback(() => {
    setError(null);
    setTranscript("");
    interimTranscriptRef.current = "";

    // Check browser support
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in your browser");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        interimTranscriptRef.current = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcript + " ");
          } else {
            interimTranscriptRef.current += transcript;
          }
        }
      };

      recognition.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setIsListening(false);
    }
  }, [language]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript("");
    interimTranscriptRef.current = "";
    setError(null);
  }, []);

  return {
    startListening,
    stopListening,
    clearTranscript,
    isListening,
    transcript: transcript + interimTranscriptRef.current,
    finalTranscript: transcript,
    error,
  };
}
