"use client"

import { Footer } from "@/components/HomePage/Footer"
import { Header } from "@/components/HomePage/Header"
import MenuHeader from "@/components/HomePage/MenuHeader"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function FlashDealsPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <MenuHeader />
                <section className="py-8 px-[104px] max-w-[1500px] flex-1 bg-[#E3E6E6]">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Giao dịch nhanh</h1>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink 
                                        href="/">Trang chủ</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink 
                                    className="font-semibold"
                                    href="/flash-deals">Giao dịch nhanh</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </section>
            <Footer />
        </div>
    )
}

