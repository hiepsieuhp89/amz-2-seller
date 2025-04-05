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
import Image from "next/image"
import { brandsData } from './mockData'

export default function BrandsPage() {
    return (
        <main className="bg-[#E3E6E6]">
            <Header />
            <MenuHeader />
            <div className="max-w-[1440px] mx-auto relative">
                <div className="min-h-screen bg-background flex flex-col">
                    <section className="py-8 px-[104px] max-w-[1440px] flex-1 bg-[#E3E6E6]">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Tất cả các thương hiệu</h1>
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
                                            href="/brands">Tất cả các thương hiệu</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </section>
                    <section className="p-4 container mx-auto px-[104px] max-w-[1440px] bg-[#E3E6E6]">
                        <div className="rounded bg-white p-4 shadow-sm">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {brandsData.map((brand, index) => (
                                    <div key={index} className="p-4 rounded-sm shadow-sm border flex items-center justify-center">
                                        <div className="relative h-[70px] w-[105px]">
                                            <Image
                                                src={brand.imageUrl || "/images/white-image.png"}
                                                alt={brand.name}
                                                quality={100}
                                                height={70}
                                                width={105}
                                                draggable={false}
                                                className="object-contain h-[70px] w-[105px]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}

