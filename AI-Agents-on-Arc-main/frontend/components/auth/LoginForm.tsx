"use client";

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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
      // Login successful - page.tsx will handle navigation based on agent permissions
      // Reset form state
      setUsername("");
    } else {
      setError("Invalid username. Please use: user-001, user-002, or user-003");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 shadow-2xl bg-white backdrop-blur-sm">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className={`h-12 text-base transition-all duration-200 bg-white border-[#283342]/20 focus:bg-white focus:border-[#FF9900] text-[#283342] placeholder:text-[#283342]/50 ${
                  error
                    ? "border-destructive focus:border-destructive ring-destructive/20"
                    : "focus:ring-[#FF9900]/20"
                }`}
                disabled={isLoading}
                autoComplete="username"
                autoFocus
              />
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 px-3 py-2 rounded-lg border border-destructive/20">
                  <span className="inline-block w-1 h-1 bg-destructive rounded-full"></span>
                  {error}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#FF9900] to-orange-600 hover:from-[#FF9900]/90 hover:to-orange-600/90 text-white shadow-lg hover:shadow-[#FF9900]/25 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </div>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-3">
            <div className="flex items-center gap-2 justify-center">
              <div className="h-px bg-[#283342]/20 flex-1"></div>
              <span className="text-xs text-[#283342]/60 bg-white px-2">
                Demo Accounts
              </span>
              <div className="h-px bg-[#283342]/20 flex-1"></div>
            </div>
            <div className="flex gap-2 justify-center">
              {["user-001", "user-002", "user-003"].map((demoUser) => (
                <button
                  key={demoUser}
                  type="button"
                  onClick={() => setUsername(demoUser)}
                  className="px-3 py-1 text-xs bg-[#FF9900]/10 hover:bg-[#FF9900]/20 text-[#FF9900] rounded-full transition-colors duration-200 border border-[#FF9900]/20 hover:border-[#FF9900]/30"
                >
                  {demoUser}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
