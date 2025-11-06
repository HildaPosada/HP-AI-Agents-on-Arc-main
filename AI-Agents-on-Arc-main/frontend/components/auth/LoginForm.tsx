"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, AlertCircle } from "lucide-react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!username.trim()) {
      setError("Please enter a username");
      setIsLoading(false);
      return;
    }

    // Attempt login
    const success = login(username.trim());

    if (success) {
      // Login successful
      setUsername("");
    } else {
      setError("Invalid username. Use: user-001, user-002, or user-003");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-[#1a1a1a] border border-[#ccff00]/20 shadow-2xl shadow-[#ccff00]/10 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ccff00]/10 rounded-full blur-3xl"></div>

        <CardContent className="p-6 sm:p-8 relative">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#ccff00] rounded-lg flex items-center justify-center shadow-lg shadow-[#ccff00]/30">
                <Zap className="h-6 w-6 text-[#0f0f0f]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Get Started</h2>
            <p className="text-white/60 text-sm">
              Join ArcFi and experience multi-agent banking
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-white/70 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="user-001"
                  className="h-12 text-base bg-[#0f0f0f] border border-[#ccff00]/30 text-white placeholder-white/30 focus:border-[#ccff00] focus:outline-none transition-colors rounded-lg"
                  disabled={isLoading}
                  autoComplete="username"
                  autoFocus
                />
                {username && !isLoading && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#ccff00]" />
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 text-sm bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-red-400">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold bg-[#ccff00] hover:bg-[#ccff00]/90 text-[#0f0f0f] shadow-lg shadow-[#ccff00]/30 transition-all duration-200 rounded-lg mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0f0f0f]"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <Zap className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-6">
            <div className="h-px bg-[#ccff00]/10 flex-1"></div>
            <span className="text-xs text-white/50 font-bold uppercase">Demo Accounts</span>
            <div className="h-px bg-[#ccff00]/10 flex-1"></div>
          </div>

          {/* Demo Account Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {["user-001", "user-002", "user-003"].map((demoUser) => (
              <button
                key={demoUser}
                type="button"
                onClick={async () => {
                  setError("");
                  setIsLoading(true);
                  const success = login(demoUser);
                  if (!success) {
                    setError(`Failed to login with ${demoUser}`);
                  }
                  setIsLoading(false);
                }}
                disabled={isLoading}
                className="px-3 py-2 text-xs font-bold bg-[#ccff00]/10 hover:bg-[#ccff00]/20 text-[#ccff00] rounded-lg transition-all duration-200 border border-[#ccff00]/30 hover:border-[#ccff00]/60 hover:shadow-lg hover:shadow-[#ccff00]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {demoUser}
              </button>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20 space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs text-white/70">
                <span className="text-[#ccff00] font-bold">Multi-agent AI</span> - 6 specialized financial agents
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs text-white/70">
                <span className="text-[#ccff00] font-bold">Blockchain secured</span> - USDC on Arc network
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full mt-1.5 flex-shrink-0"></div>
              <p className="text-xs text-white/70">
                <span className="text-[#ccff00] font-bold">AI-powered</span> - Gemini 2.5 Flash API
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
