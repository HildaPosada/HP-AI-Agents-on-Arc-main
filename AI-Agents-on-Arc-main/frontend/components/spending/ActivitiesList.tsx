import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface ActivitiesListProps {
  activities: string[];
}

export function ActivitiesList({ activities }: ActivitiesListProps) {
  const getActivityIcon = (activity: string) => {
    const activityLower = activity.toLowerCase();
    if (
      activityLower.includes("paycheck") ||
      activityLower.includes("income") ||
      activityLower.includes("salary") ||
      activityLower.includes("deposit")
    ) {
      return <ArrowUpRight className="h-4 w-4 text-success" />;
    } else if (
      activityLower.includes("transfer") &&
      activityLower.includes("savings")
    ) {
      return <ArrowDownLeft className="h-4 w-4 text-info" />;
    } else {
      return <ArrowDownLeft className="h-4 w-4 text-destructive" />;
    }
  };

  const getActivityColor = (activity: string) => {
    const activityLower = activity.toLowerCase();
    if (
      activityLower.includes("paycheck") ||
      activityLower.includes("income") ||
      activityLower.includes("salary") ||
      activityLower.includes("deposit")
    ) {
      return "text-success";
    } else if (
      activityLower.includes("transfer") &&
      activityLower.includes("savings")
    ) {
      return "text-info";
    } else {
      return "text-destructive";
    }
  };

  return (
    <Card className="card-modern border border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activities
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {activities.length > 0 ? (
          <div className="space-y-2">
            {activities.map((activity, index) => {
              const parts = activity.split(" - ");
              const dateStr = parts[0] || "";
              const description = parts.slice(1).join(" - ") || "";

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center">
                    {getActivityIcon(activity)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{dateStr}</p>
                    </div>
                  </div>

                  {(() => {
                    const amountMatch = description.match(/\$[\d,]+/);
                    if (amountMatch) {
                      return (
                        <span className={`text-sm font-bold whitespace-nowrap ${getActivityColor(activity)}`}>
                          {amountMatch[0]}
                        </span>
                      );
                    }
                    return null;
                  })()}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Activity className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-muted-foreground text-sm">No recent activities</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
