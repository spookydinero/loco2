'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Wrench, Package, Bell, QrCode } from 'lucide-react'
import { CricoDashboard } from "@/modules/crico";
// Temporarily disabled components that might cause infinite loops
import { useShop } from '@/store/useShop'
// import { ThemeToggle } from '@/components/theme-toggle'
// import { DemoModeToggle } from '@/components/demo-mode-toggle'

export default function Home() {
  // Use the alert count selector
  const alertCount = useShop(state => state.getAlertCount())

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Auto Shop Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/inventory" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Inventory
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/reports" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Reports
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/qr-codes" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  QR Codes
                </Link>
              </Button>
              <Button variant="ghost" className="relative">
                <Bell className="h-4 w-4" />
                {alertCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {alertCount}
                  </Badge>
                )}
              </Button>
              {/* Temporarily disabled components */}
              {/* <DemoModeToggle /> */}
              {/* <ThemeToggle /> */}
            </div>
          </div>
        </div>
      </nav>

      <CricoDashboard />
    </div>
  );
}