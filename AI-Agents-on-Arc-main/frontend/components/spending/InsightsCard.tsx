import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, Sparkles, TrendingUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface InsightsCardProps {
  insights: string;
}

export function InsightsCard({ insights }: InsightsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-white/50 to-slate-50/30 dark:from-slate-900/20 dark:to-slate-800/10 border-slate-100/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden rounded-3xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/10 via-emerald-400/5 to-transparent rounded-full blur-3xl" />

      <CardHeader className="pb-4 relative">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-100/50 to-emerald-100/30 dark:from-emerald-900/30 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/50 relative">
              <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-pulse" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-emerald-400 animate-pulse" />
          </div>

          <div>
            <span className="text-foreground font-semibold">
              Smart Insights
            </span>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mt-1" />
          </div>

          <div className="ml-auto">
            <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-100/50 to-emerald-100/30 dark:from-emerald-900/30 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/50">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 relative">
        {insights && insights.trim() ? (
          <div className="relative">
            <div className="absolute top-0 right-0 flex items-center gap-1 text-xs text-muted-foreground bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-2 py-1 rounded-full border border-slate-100/50 dark:border-slate-700/50">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              AI Analysis
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none pt-6">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 last:mb-0 pl-4 border-l-2 border-emerald-500/20">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-emerald-600 dark:text-emerald-400 font-medium">
                      {children}
                    </em>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4 mt-3">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-3 p-2 rounded-2xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-100/50 dark:border-slate-700/50 hover:border-emerald-200/50 dark:hover:border-emerald-700/50 transition-colors duration-200">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mt-2" />
                      <span className="flex-1">{children}</span>
                    </li>
                  ),
                  code: ({ children }) => (
                    <code className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-md text-xs font-mono border border-emerald-500/20">
                      {children}
                    </code>
                  ),
                }}
              >
                {insights}
              </ReactMarkdown>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground bg-gradient-to-r from-emerald-500/5 to-emerald-600/5 dark:from-emerald-900/20 dark:to-emerald-800/20 backdrop-blur-sm p-3 rounded-2xl border border-emerald-500/10 dark:border-emerald-700/30">
              <div className="flex items-center gap-2">
                <Brain className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-100/50 to-emerald-100/30 dark:from-emerald-900/30 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/50">
                <Brain className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-emerald-400 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                Analyzing your financial data
              </p>
              <p className="text-muted-foreground text-xs">
                Insights will appear once analysis is complete
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <div
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
