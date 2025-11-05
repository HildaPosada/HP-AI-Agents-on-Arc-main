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
  // {
  //   name: "Goals",
  //   href: "/goals",
  //   icon: Target,
  // },
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
  // {
  //   name: "Profile",
  //   href: "/profile",
  //   icon: User,
  // },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const handleLogout = () => {
    logout(); // This sets user context to null
    router.push("/"); // Redirect to login page
  };

  return (
    <div className="w-64 flex flex-col relative" style={{ backgroundColor: 'var(--sidebar-bg)' }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Header with ArcFi Logo */}
      <div className="relative p-6 border-b" style={{ borderColor: '#3a4a5e' }}>
        <div className="flex items-center gap-3 group">
          {/* Mini ArcFi Logo with Orange */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300" style={{ 
              background: '#FF9900',
              boxShadow: '0 10px 15px -3px rgba(255, 153, 0, 0.25), 0 4px 6px -2px rgba(255, 153, 0, 0.1)' 
            }}>
              <Coins className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5">
              <DollarSign className="h-3.5 w-3.5 text-white" />
            </div>
          </div>

          {/* Brand Text */}
          <div>
            <h1 className="font-bold text-base text-white">
              ArcFi
            </h1>
            <p className="text-xs text-white/60">AI Banking Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${
                      isActive
                        ? "text-white border shadow-sm"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }
                  `}
                  style={isActive ? { 
                    backgroundColor: '#FF9900',
                    borderColor: '#FF9900' 
                  } : {}}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full" style={{ backgroundColor: 'white' }} />
                  )}

                  <Icon
                    className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                      isActive ? "text-white" : "group-hover:text-white"
                    }`}
                  />

                  <span className="relative z-10">{item.name}</span>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Make Transaction Button */}
        <div className="mt-6 pt-6 border-t" style={{ borderColor: '#3a4a5e' }}>
          <button
            onClick={() => setIsTransactionModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#2775CA] to-[#1E5FA8] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 group relative overflow-hidden"
          >
            <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            <span>Send USDC</span>
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
          <p className="text-xs text-white/50 text-center mt-2">Blockchain-powered transfers</p>
        </div>
      </nav>

      {/* Enhanced User Info & Logout */}
      <div className="relative p-4 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
        {user && (
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="backdrop-blur-sm border rounded-xl p-4 shadow-sm" style={{ 
              backgroundColor: 'rgba(255, 153, 0, 0.1)',
              borderColor: 'rgba(255, 153, 0, 0.3)'
            }}>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: '#FF9900' }}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{
                    backgroundColor: '#FF9900',
                    borderColor: '#232F3E'
                  }}>
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-white/70">
                    Active Session
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-background/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200"
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
