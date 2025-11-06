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
      return <TrendingUp className="h-6 w-6 text-success" />;
    } else if (variant === "destructive") {
      return <TrendingDown className="h-6 w-6 text-destructive" />;
    }
    return <DollarSign className="h-6 w-6 text-primary" />;
  };

  const getAmountColor = () => {
    if (variant === "success") {
      return "text-success";
    } else if (variant === "destructive") {
      return "text-destructive";
    }
    return "text-primary";
  };

  return (
    <Card className="card-modern border border-border bg-card hover:border-primary">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <p className={cn("text-4xl font-bold", getAmountColor())}>
              {formatCurrency(amount)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted border border-border">
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
