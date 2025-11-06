import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface USDCTransaction {
  id: string;
  type: "send" | "receive";
  amount: number;
  recipient: string;
  timestamp: string;
  hash: string;
  status: "confirmed" | "pending";
}

interface USDCTransactionCardProps {
  transactions?: USDCTransaction[];
  totalUSADCBalance?: number;
}

export function USDCTransactionCard({
  transactions = [
    {
      id: "1",
      type: "receive",
      amount: 1000,
      recipient: "Salary Deposit",
      timestamp: "2024-11-15 09:30 AM",
      hash: "0x742d...f9a2",
      status: "confirmed",
    },
    {
      id: "2",
      type: "send",
      amount: 50,
      recipient: "USDC Payment",
      timestamp: "2024-11-14 02:15 PM",
      hash: "0x8f9e...2d45",
      status: "confirmed",
    },
    {
      id: "3",
      type: "receive",
      amount: 250,
      recipient: "Reward Payout",
      timestamp: "2024-11-13 11:00 AM",
      hash: "0x5c3a...b8e1",
      status: "confirmed",
    },
  ],
  totalUSADCBalance = 3500.5,
}: USDCTransactionCardProps) {
  return (
    <Card className="card-modern border border-[#ccff00]/20 bg-[#1a1a1a] hover:border-[#ccff00]/50">
      <CardContent className="pt-8">
        {/* Header with Balance */}
        <div className="mb-6">
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-2">
            USDC Balance on Arc
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-[#ccff00]">
              ${totalUSADCBalance.toFixed(2)}
            </span>
            <span className="text-sm text-white/60">Circle Arc Network</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/70">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>Connected • Verified</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#ccff00]/10 mb-6"></div>

        {/* Recent Transactions */}
        <div>
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">
            Recent Arc Transactions
          </p>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20 hover:border-[#ccff00]/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className={`p-2 rounded-lg ${
                      tx.type === "receive"
                        ? "bg-green-500/20"
                        : "bg-orange-500/20"
                    }`}
                  >
                    {tx.type === "receive" ? (
                      <ArrowDownLeft className="h-4 w-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-orange-400" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-white truncate">
                        {tx.recipient}
                      </p>
                      <span
                        className={`text-sm font-bold ${
                          tx.type === "receive"
                            ? "text-green-400"
                            : "text-orange-400"
                        }`}
                      >
                        {tx.type === "receive" ? "+" : "-"}${tx.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-white/50">{tx.timestamp}</span>
                      <div className="flex items-center gap-1">
                        {tx.status === "confirmed" ? (
                          <>
                            <CheckCircle className="h-3 w-3 text-[#ccff00]" />
                            <span className="text-xs text-[#ccff00] font-bold">
                              CONFIRMED
                            </span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 text-yellow-400 animate-spin" />
                            <span className="text-xs text-yellow-400">
                              PENDING
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hash on Hover */}
                <div className="mt-2 pt-2 border-t border-[#ccff00]/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-white/60 font-mono">
                    Hash: <span className="text-[#ccff00]">{tx.hash}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arc Network Info */}
        <div className="mt-6 pt-6 border-t border-[#ccff00]/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20">
            <div className="w-8 h-8 rounded-full bg-[#ccff00]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-[#ccff00]">⊙</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Circle Arc Network</p>
              <p className="text-xs text-white/60">
                Stablecoin settlement on Arc blockchain
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
