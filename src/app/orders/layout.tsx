import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Amazon CMS - Orders",
  description: "Orders page for Amazon CMS",
}

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full">
      {children}
    </div>
  )
} 