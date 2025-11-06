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
  Menu,
  X,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const SidebarContent = () => (
    <>
      {/* Header with ArcFi Logo */}
      <div className="relative p-4 sm:p-6 border-b border-[#ccff00]/10">
        <div className="flex items-center gap-3">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center bg-[#ccff00]">
            <Coins className="h-4 sm:h-5 w-4 sm:w-5 text-[#0f0f0f] font-bold" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white">ArcFi</h1>
            <p className="text-xs text-white/60">Financial Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-[#ccff00] text-[#0f0f0f]"
                    : "text-white/70 hover:text-white hover:bg-[#ccff00]/10"
                }
              `}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Send USDC Button */}
      <div className="p-3 sm:p-4 border-t border-[#ccff00]/10">
        <button
          onClick={() => {
            setIsTransactionModalOpen(true);
            setIsMobileMenuOpen(false);
          }}
          className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#ccff00] text-[#0f0f0f] font-bold rounded-lg hover:opacity-90 transition-opacity duration-200 text-xs sm:text-sm"
        >
          <Send className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Send USDC</span>
        </button>
        <p className="text-xs text-white/60 text-center mt-2">Secure transfers</p>
      </div>

      {/* User Info & Logout */}
      <div className="p-3 sm:p-4 border-t border-[#ccff00]/10 space-y-3 sm:space-y-4">
        {user && (
          <>
            <div className="p-2 sm:p-3 rounded-lg bg-[#ccff00]/10 border border-[#ccff00]/30">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-[#ccff00]">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#0f0f0f]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-white truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-white/60">Active</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-transparent hover:bg-[#ccff00]/10 text-white rounded-lg text-xs sm:text-sm"
              onClick={handleLogout}
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
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
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex w-64 flex-col relative bg-[#0a0a0a] border-r border-[#ccff00]/10">
        <SidebarContent />
      </div>

      {/* Mobile Header with Menu Button */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0a0a] border-b border-[#ccff00]/10 flex items-center px-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-[#ccff00]/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-[#ccff00]">
            <Coins className="h-3 w-3 text-[#0f0f0f]" />
          </div>
          <span className="font-bold text-white">ArcFi</span>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="sm:hidden fixed inset-0 z-30 bg-black/50 top-14"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer menu panel */}
          <div className="sm:hidden fixed top-14 left-0 right-0 bottom-0 z-40 bg-[#0a0a0a] border-b border-[#ccff00]/10 overflow-y-auto">
            <div className="flex flex-col h-full">
              <SidebarContent />
            </div>
          </div>
        </>
      )}
    </>
  );
}
