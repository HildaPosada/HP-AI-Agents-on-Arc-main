"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  CreditCard,
  Target,
  TrendingUp,
  Gift,
  Users,
  User,
  LogOut,
  Coins,
  DollarSign,
  Send,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { TransactionModal } from "@/components/transaction/TransactionModal";

const navigationItems = [
  {
    name: "Spending",
    href: "/spending",
    icon: CreditCard,
  },
  {
    name: "Portfolio",
    href: "/portfolio",
    icon: TrendingUp,
  },
  {
    name: "Perks",
    href: "/perks",
    icon: Gift,
  },
  {
    name: "Advisors",
    href: "/advisors",
    icon: Users,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="w-64 flex flex-col relative" style={{ backgroundColor: 'var(--sidebar-bg)' }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Header with ArcFi Logo */}
      <div className="relative p-6 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
        <div className="flex items-center gap-3 group">
          {/* ArcFi Logo with Emerald */}
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient-to-br from-emerald-500 to-emerald-600">
              <Coins className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Brand Text */}
          <div>
            <h1 className="font-bold text-base text-white">
              ArcFi
            </h1>
            <p className="text-xs text-white/60">Financial Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 group relative overflow-hidden
                    ${
                      isActive
                        ? "text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                  style={isActive ? { 
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  } : {}}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 transition-colors duration-200`}
                  />

                  <span className="relative z-10">{item.name}</span>

                  {isActive && (
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Send USDC Button */}
        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
          <button
            onClick={() => setIsTransactionModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-200 group relative overflow-hidden"
          >
            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span>Send USDC</span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          <p className="text-xs text-white/50 text-center mt-2">Secure transfers</p>
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="relative p-4 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
        {user && (
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="backdrop-blur-sm border rounded-2xl p-4 shadow-sm" style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderColor: 'rgba(16, 185, 129, 0.3)'
            }}>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{
                    backgroundColor: '#10b981',
                    borderColor: '#1e293b'
                  }}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-white/70">
                    Active
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 text-white/70 transition-all duration-200 rounded-2xl"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        userName={user?.username || "User"}
      />
    </div>
  );
}
