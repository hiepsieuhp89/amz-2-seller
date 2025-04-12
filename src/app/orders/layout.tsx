import type { Metadata } from "next"
import React, { Suspense } from "react"

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
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  )
} 