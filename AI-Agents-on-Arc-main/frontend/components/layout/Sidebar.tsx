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
    <div className="w-64 flex flex-col relative bg-sidebar-bg border-r border-sidebar-border">
      {/* Header with ArcFi Logo */}
      <div className="relative p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary">
            <Coins className="h-5 w-5 text-primary-foreground font-bold" />
          </div>
          <div>
            <h1 className="font-bold text-base text-foreground">ArcFi</h1>
            <p className="text-xs text-muted-foreground">Financial Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }
              `}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Send USDC Button */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setIsTransactionModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity duration-200 group"
        >
          <Send className="w-4 h-4" />
          <span>Send USDC</span>
        </button>
        <p className="text-xs text-muted-foreground text-center mt-2">Secure transfers</p>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border space-y-4">
        {user && (
          <>
            <div className="p-3 rounded-lg bg-muted border border-sidebar-border">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-transparent hover:bg-muted text-foreground rounded-lg"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </>
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
