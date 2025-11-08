"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface UseElevenLabsVoiceOptions {
  voiceId?: string;
  modelId?: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  category?: string;
  preview_url?: string;
}

export function useElevenLabsVoice(options: UseElevenLabsVoiceOptions = {}) {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>("");
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(true);
  const {
    voiceId = selectedVoiceId,
    modelId = "eleven_multilingual_v2",
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const voiceFetchedRef = useRef(false);

  // Fetch available voices on mount
  useEffect(() => {
    if (voiceFetchedRef.current) return;
    voiceFetchedRef.current = true;

    const fetchVoices = async () => {
      try {
        setVoicesLoading(true);
        const response = await fetch("/api/elevenlabs/voices");
        if (!response.ok) {
          console.warn("Could not fetch voices, using default");
          setSelectedVoiceId("Matilda");
          setAvailableVoices([]);
          return;
        }
        const data = await response.json();
        if (data.voices && data.voices.length > 0) {
          // Filter to only show Matilda and George voices
          const filteredVoices = data.voices.filter(
            (voice: Voice) =>
              voice.name.toLowerCase().includes("matilda") ||
              voice.name.toLowerCase().includes("george")
          );

          if (filteredVoices.length > 0) {
            setAvailableVoices(filteredVoices);
            setSelectedVoiceId(filteredVoices[0].voice_id);
          } else {
            // Fallback if voices don't exist
            console.warn("Matilda and George voices not found in account");
            setAvailableVoices(data.voices.slice(0, 2));
            setSelectedVoiceId(data.voices[0].voice_id);
          }
        } else {
          setSelectedVoiceId("Matilda");
          setAvailableVoices([]);
        }
      } catch (err) {
        console.warn("Failed to fetch voices:", err);
        setSelectedVoiceId("Matilda");
        setAvailableVoices([]);
      } finally {
        setVoicesLoading(false);
      }
    };

    fetchVoices();
  }, []);

  const speak = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        setError("No text provided");
        return;
      }

      if (!selectedVoiceId) {
        setError("Voice service loading...");
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
            voiceId: selectedVoiceId,
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
    [selectedVoiceId, modelId]
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
    selectedVoiceId,
    setSelectedVoiceId,
    availableVoices,
    voicesLoading,
  };
}
