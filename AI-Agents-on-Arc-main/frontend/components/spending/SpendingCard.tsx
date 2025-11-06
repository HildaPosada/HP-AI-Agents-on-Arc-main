import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpendingCardProps {
  title: string;
  amount: number;
  variant: "success" | "destructive";
}

export function SpendingCard({ title, amount, variant }: SpendingCardProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getIcon = () => {
    if (variant === "success") {
      return (
        <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      );
    } else if (variant === "destructive") {
      return (
        <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
      );
    }
    return <DollarSign className="h-6 w-6 text-slate-600 dark:text-slate-400" />;
  };

  const getIconBackground = () => {
    if (variant === "success") {
      return "bg-emerald-100/50 dark:bg-emerald-900/30 border border-emerald-200/50 dark:border-emerald-700/50";
    } else if (variant === "destructive") {
      return "bg-red-100/50 dark:bg-red-900/30 border border-red-200/50 dark:border-red-700/50";
    }
    return "bg-slate-100/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-700/50";
  };

  const getAmountColor = () => {
    if (variant === "success") {
      return "text-emerald-600 dark:text-emerald-400";
    } else if (variant === "destructive") {
      return "text-red-600 dark:text-red-400";
    }
    return "text-slate-900 dark:text-slate-100";
  };

  const getCardBackground = () => {
    if (variant === "success") {
      return "bg-gradient-to-br from-emerald-50/50 to-emerald-50/30 dark:from-emerald-950/20 dark:to-emerald-900/10 border-emerald-100/50 dark:border-emerald-800/50 hover:border-emerald-200/80 dark:hover:border-emerald-700/80 hover:shadow-lg hover:shadow-emerald-100/30 dark:hover:shadow-emerald-900/30";
    } else if (variant === "destructive") {
      return "bg-gradient-to-br from-red-50/50 to-red-50/30 dark:from-red-950/20 dark:to-red-900/10 border-red-100/50 dark:border-red-800/50 hover:border-red-200/80 dark:hover:border-red-700/80 hover:shadow-lg hover:shadow-red-100/30 dark:hover:shadow-red-900/30";
    }
    return "bg-gradient-to-br from-slate-50 to-slate-50/50 dark:from-slate-900/20 dark:to-slate-800/10 border-slate-100/50 dark:border-slate-700/50";
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:scale-105 group relative overflow-hidden rounded-3xl",
        getCardBackground()
      )}
    >
      <CardContent className="p-8 relative">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              {title}
            </p>
            <p
              className={cn(
                "text-4xl font-bold tracking-tight transition-colors duration-200",
                getAmountColor()
              )}
            >
              {formatCurrency(amount)}
            </p>
            <div
              className={cn(
                "h-1.5 w-20 rounded-full transition-all duration-300 group-hover:w-24",
                variant === "success"
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                  : variant === "destructive"
                  ? "bg-gradient-to-r from-red-400 to-red-600"
                  : "bg-gradient-to-r from-slate-400 to-slate-600"
              )}
            />
          </div>

          <div className="relative">
            <div
              className={cn(
                "p-5 rounded-2xl transition-all duration-300 group-hover:scale-110",
                getIconBackground()
              )}
            >
              {getIcon()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
