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
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from '@mdi/react'
import { mdiArrowRight } from '@mdi/js'
import { Button } from "@/components/ui/button"
import { brandsData } from './mockData'

export default function BrandsPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <MenuHeader />
            <section className="py-8 px-[104px] max-w-[1500px] flex-1 bg-[#F5F5F5]">
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
            <section className="p-4 container mx-auto px-[104px] max-w-[1500px] bg-[#F5F5F5]">
                <div className="rounded bg-white px-3 pt-3 shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {brandsData.map((brand, index) => (
                            <div key={index} className="p-4 rounded-sm shadow-sm border flex items-center justify-center">
                                <Link href={brand.link} className="relative h-[70px] w-[105px]">
                                    <Image
                                        src={brand.imageUrl}
                                        alt={brand.name}
                                        quality={100}
                                        height={70}
                                        width={105}
                                        draggable={false}
                                        className="object-contain h-[70px] w-[105px]"
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

