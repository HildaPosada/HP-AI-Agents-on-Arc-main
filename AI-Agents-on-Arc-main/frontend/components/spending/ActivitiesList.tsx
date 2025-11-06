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
      return <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
    } else if (
      activityLower.includes("transfer") &&
      activityLower.includes("savings")
    ) {
      return <ArrowDownLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    } else {
      return <ArrowDownLeft className="h-4 w-4 text-red-600 dark:text-red-400" />;
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
      return "text-emerald-600 dark:text-emerald-400";
    } else if (
      activityLower.includes("transfer") &&
      activityLower.includes("savings")
    ) {
      return "text-blue-600 dark:text-blue-400";
    } else {
      return "text-red-600 dark:text-red-400";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white/50 to-slate-50/30 dark:from-slate-900/20 dark:to-slate-800/10 border-slate-100/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden rounded-3xl">
      <CardHeader className="pb-4 relative">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-100/50 to-emerald-100/30 dark:from-emerald-900/30 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/50">
            <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-foreground">
              Recent Activities
            </span>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mt-1" />
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 relative">
        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const parts = activity.split(" - ");
              const dateStr = parts[0] || "";
              const description = parts.slice(1).join(" - ") || "";

              return (
                <div key={index} className="group relative">
                  {index < activities.length - 1 && (
                    <div className="absolute left-7 top-12 w-0.5 h-6 bg-gradient-to-b from-slate-200 dark:from-slate-700 to-transparent" />
                  )}

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-700/50 hover:border-emerald-200/50 dark:hover:border-emerald-700/50 transition-all duration-200 group-hover:shadow-md group-hover:bg-white/70 dark:group-hover:bg-slate-800/50">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/50 dark:bg-slate-700/50 border border-slate-100/50 dark:border-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {getActivityIcon(activity)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                            {description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              {dateStr}
                            </p>
                          </div>
                        </div>

                        {(() => {
                          const amountMatch = description.match(/\$[\d,]+/);
                          if (amountMatch) {
                            return (
                              <span
                                className={`text-sm font-semibold whitespace-nowrap ${getActivityColor(
                                  activity
                                )}`}
                              >
                                {amountMatch[0]}
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="p-3 rounded-full bg-slate-100/50 dark:bg-slate-800/50">
              <Activity className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              No recent activities to display
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
