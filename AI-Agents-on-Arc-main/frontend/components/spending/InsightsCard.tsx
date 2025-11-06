import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, TrendingUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface InsightsCardProps {
  insights: string;
}

export function InsightsCard({ insights }: InsightsCardProps) {
  return (
    <Card className="card-modern border border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <Brain className="h-5 w-5 text-primary" />
          Smart Insights
          <div className="ml-auto">
            <TrendingUp className="h-5 w-5 text-success" />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {insights && insights.trim() ? (
          <div className="relative">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              AI Analysis
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-primary">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-primary">
                      {children}
                    </em>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4 mt-3">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                      <span className="flex-1">{children}</span>
                    </li>
                  ),
                  code: ({ children }) => (
                    <code className="bg-muted text-primary px-2 py-1 rounded text-xs font-mono border border-border">
                      {children}
                    </code>
                  ),
                }}
              >
                {insights}
              </ReactMarkdown>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2">
                <Brain className="h-3 w-3 text-primary" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-4">
              <Brain className="h-8 w-8 text-muted-foreground" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary animate-pulse" />
            </div>
            <p className="text-muted-foreground text-sm font-medium mb-1">
              Analyzing your financial data
            </p>
            <p className="text-muted-foreground text-xs">
              Insights will appear once analysis is complete
            </p>
            <div className="flex items-center gap-1 text-xs text-primary mt-4">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <div
                className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
              <div
                className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
