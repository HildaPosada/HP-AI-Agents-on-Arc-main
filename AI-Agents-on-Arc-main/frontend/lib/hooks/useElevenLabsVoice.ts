"use client";

import { useState, useCallback, useRef } from "react";

interface UseElevenLabsVoiceOptions {
  voiceId?: string;
  modelId?: string;
}

export function useElevenLabsVoice(options: UseElevenLabsVoiceOptions = {}) {
  const {
    voiceId = "EXAVITQu4vLHcDDzia9d", // Default voice ID (Rachel)
    modelId = "eleven_monolingual_v1",
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setError("No text provided");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Call the API route to generate speech
        const response = await fetch("/api/elevenlabs/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            voiceId,
            modelId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate speech");
        }

        // Get the audio blob
        const audioBlob = await response.blob();

        // Create audio element and play
        if (audioRef.current) {
          audioRef.current.pause();
        }

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onplay = () => setIsPlaying(true);
        audio.onpause = () => setIsPlaying(false);
        audio.onended = () => setIsPlaying(false);
        audio.onerror = (e) => {
          setError("Failed to play audio");
          setIsPlaying(false);
        };

        audioRef.current = audio;
        audio.play().catch((e) => {
          setError("Failed to play audio: " + e.message);
          setIsPlaying(false);
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    },
    [voiceId, modelId]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    error,
  };
}
