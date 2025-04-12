"use client"

import React, { useEffect, useState } from "react"
import OrderDetailDialog from "@/components/SellerOrders/OrderDetailDialog"
import { useSearchParams } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import OrdersTable from "@/components/SellerOrders/OrdersTable"
import StatCards from "@/components/SellerOrders/StatCards"
import { useRouter } from "next/navigation"

export default function OrdersPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const id = searchParams.get("id")
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // If ID is provided, show the order detail dialog
        if (id) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [id])

    const handleCloseDialog = (open: boolean) => {
        setIsOpen(open)
        // If dialog is closed, remove the id parameter from URL
        if (!open && id) {
            router.push("/orders")
        }
    }

    return (
        <div className="p-4 bg-[#E3E6E6]">
            {id && (
                <OrderDetailDialog
                    orderId={id}
                    open={isOpen}
                    onOpenChange={handleCloseDialog}
                />
            )}
        </div>
    )
} 