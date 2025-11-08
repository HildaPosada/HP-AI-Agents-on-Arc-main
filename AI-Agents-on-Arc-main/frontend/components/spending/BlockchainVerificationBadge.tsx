import { Shield, CheckCircle, AlertCircle } from "lucide-react";

interface BlockchainVerificationBadgeProps {
  status: "verified" | "pending" | "failed";
  network?: string;
  txHash?: string;
  message?: string;
}

export function BlockchainVerificationBadge({
  status = "verified",
  network = "Circle Arc",
  txHash,
  message,
}: BlockchainVerificationBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "verified":
        return {
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          hoverBorder: "hover:border-green-500/60",
          textColor: "text-green-400",
          icon: CheckCircle,
          label: "BLOCKCHAIN VERIFIED",
          pulse: true,
        };
      case "pending":
        return {
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          hoverBorder: "hover:border-yellow-500/60",
          textColor: "text-yellow-400",
          icon: AlertCircle,
          label: "VERIFYING ON CHAIN",
          pulse: true,
        };
      case "failed":
        return {
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          hoverBorder: "hover:border-red-500/60",
          textColor: "text-red-400",
          icon: AlertCircle,
          label: "VERIFICATION FAILED",
          pulse: false,
        };
      default:
        return {
          bgColor: "bg-[#ccff00]/10",
          borderColor: "border-[#ccff00]/30",
          hoverBorder: "hover:border-[#ccff00]/60",
          textColor: "text-[#ccff00]",
          icon: CheckCircle,
          label: "VERIFIED",
          pulse: true,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-3 px-3 py-2 rounded-lg ${config.bgColor} border ${config.borderColor} ${config.hoverBorder} transition-colors backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2">
        <Shield className={`h-4 w-4 ${config.textColor}`} />
        <span className={`text-xs font-bold ${config.textColor} tracking-widest`}>
          {config.label}
        </span>
        {config.pulse && (
          <div className={`w-1.5 h-1.5 rounded-full ${config.textColor} animate-pulse`} />
        )}
      </div>
    </div>
  );
}

interface BlockchainVerificationPanelProps {
  transactions?: Array<{
    id: string;
    status: "verified" | "pending" | "failed";
    hash: string;
    timestamp: string;
  }>;
}

export function BlockchainVerificationPanel({
  transactions = [
    {
      id: "1",
      status: "verified",
      hash: "0x742d35cc6634C0532925a3b844Bc9e7595f9a2...",
      timestamp: "2024-11-15 09:30 AM",
    },
    {
      id: "2",
      status: "verified",
      hash: "0x8f9e2d45aB3c4F6e8D1b5C9a0E2F4G5h6I7j8k9...",
      timestamp: "2024-11-14 02:15 PM",
    },
    {
      id: "3",
      status: "verified",
      hash: "0x5c3aB8e1F2d4G6h8I0j2k4l6m8n0o2p4q6r8s0t...",
      timestamp: "2024-11-13 11:00 AM",
    },
  ],
}: BlockchainVerificationPanelProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-bold text-white/70 uppercase tracking-widest">
        On-Chain Verification
      </div>

      <div className="grid grid-cols-1 gap-3">
        {transactions?.map((tx) => (
          <div
            key={tx.id}
            className="p-4 rounded-lg bg-[#ccff00]/5 border border-[#ccff00]/20 hover:border-[#ccff00]/50 transition-all group"
          >
            <div className="flex items-start gap-3 mb-3">
              <BlockchainVerificationBadge
                status={tx.status}
                network="Circle Arc"
              />
              <span className="text-xs text-white/60 ml-auto">{tx.timestamp}</span>
            </div>

            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-[#1a1a1a] border border-[#ccff00]/10">
              <span className="text-xs text-white/60 font-mono">
                Tx Hash:
              </span>
              <span className="text-xs text-[#ccff00] font-mono font-bold group-hover:select-all cursor-pointer">
                {tx.hash}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#ccff00]/10">
        <div className="flex items-center justify-between text-xs p-3 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 font-bold">All Transactions Verified</span>
          </div>
          <span className="text-green-400/70">Arc Network</span>
        </div>
      </div>
    </div>
  );
}
