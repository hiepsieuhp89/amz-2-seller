import type { Metadata } from "next"
import React, { Suspense } from "react"

export const metadata: Metadata = {
  title: "Amz homepage",
  description: " Official Site — Browse & discover millions of products. Read customer reviews and find best sellers. Yes, we ship to you. Shop top brands in electronics, clothing",
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