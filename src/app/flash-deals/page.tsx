"use client"

import { Footer } from "@/components/Common/Footer"
import { Header } from "@/components/Common/Header"
import MenuHeader from "@/components/Common/MenuHeader"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function FlashDealsPage() {
    return (
        <main className="bg-[#E3E6E6]">
            <Header />
            <MenuHeader />
            <div className="max-w-[1440px] mx-auto relative">
                <div className="min-h-screen bg-background flex flex-col">
                    <section className="py-8 px-[104px] max-w-[1440px] flex-1 bg-[#E3E6E6]">
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
                </div>
            </div>
            <Footer />
        </main>
    )
}

