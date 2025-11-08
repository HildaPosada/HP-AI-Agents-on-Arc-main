import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { BlockchainVerificationBadge } from "./BlockchainVerificationBadge";

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
    <Card className="card-modern border border-[#FF9900]/20 bg-[#1a1a1a] hover:border-[#FF9900]/50">
      <CardContent className="pt-4 sm:pt-6">
        {/* Header with Balance */}
        <div className="mb-4">
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1">
            USDC Balance on Arc
          </p>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#FF9900]">
                ${totalUSADCBalance.toFixed(2)}
              </span>
              <span className="text-xs text-white/60">Circle Arc Network</span>
            </div>
            <div className="w-full sm:w-auto">
              <BlockchainVerificationBadge
                status="verified"
                network="Circle Arc"
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span>Connected • Verified</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#FF9900]/10 mb-6"></div>

        {/* Recent Transactions */}
        <div>
          <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">
            Recent Arc Transactions
          </p>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-lg bg-[#FF9900]/5 border border-[#FF9900]/20 hover:border-[#FF9900]/50 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  {/* Icon */}
                  <div
                    className={`p-2 rounded-lg w-fit ${
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="text-xs text-white/50">{tx.timestamp}</span>
                      <div className="flex items-center gap-1">
                        {tx.status === "confirmed" ? (
                          <>
                            <CheckCircle className="h-3 w-3 text-[#FF9900]" />
                            <span className="text-xs text-[#FF9900] font-bold">
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

                {/* Hash on Hover - Mobile Friendly */}
                <div className="mt-2 pt-2 border-t border-[#FF9900]/10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-white/60 font-mono break-all">
                    Hash: <span className="text-[#FF9900]">{tx.hash}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arc Network Info */}
        <div className="mt-6 pt-6 border-t border-[#FF9900]/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FF9900]/5 border border-[#FF9900]/20">
            <div className="w-8 h-8 rounded-full bg-[#FF9900]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-[#FF9900]">⊙</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Circle Arc Network</p>
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
