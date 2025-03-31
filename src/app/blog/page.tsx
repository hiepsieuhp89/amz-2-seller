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
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from '@mdi/react'
import { mdiArrowRight } from '@mdi/js'
import { blogPosts } from "./mockData"
import { Button } from "@/components/ui/button"
export default function FlashDealsPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <MenuHeader />
            <section className="py-8 px-[104px] max-w-[1500px] flex-1 bg-[#E3E6E6]">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Blog</h1>
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
                                    href="/blog">Blog</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="pb-4 container mx-auto px-[104px] max-w-[1500px] bg-[#E3E6E6]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <div className="overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col h-full">
                                <Link href={post.link} className="flex flex-col h-full">
                                    <div className="relative aspect-video ">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {post.description}
                                        </p>
                                        <div className="flex justify-end items-end flex-1">
                                            <Button className="flex items-center transition-colors bg-main-charcoal-blue text-white px-4 py-2 h-10 rounded-sm">
                                                <span>Xem thêm</span>
                                                <Icon path={mdiArrowRight} size={0.8} className="ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}

