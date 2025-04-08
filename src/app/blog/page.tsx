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
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from '@mdi/react'
import { mdiArrowRight } from '@mdi/js'
import { blogPosts } from "./mockData"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useSelectedBlog } from "@/stores/useSelectedBlog"
import { Suspense } from "react"

// Create a component that uses useSearchParams
function BlogContent() {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const { setSelectedBlog, selectedBlog } = useSelectedBlog()
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <section className="py-8 px-[104px] max-w-[1440px] flex-1 bg-[#E3E6E6]">
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
                            {id && selectedBlog && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            className="font-semibold line-clamp-1"
                                        >{selectedBlog.title}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            {id && selectedBlog ? (
                <section className="pb-4 container mx-auto px-[104px] max-w-[1440px] bg-[#E3E6E6]">
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <div className="relative aspect-[16/9] mb-8">
                            <Image
                                src={selectedBlog.image || "/images/white-image.png"}
                                alt={selectedBlog.title}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 1200px) 100vw"
                                quality={100}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQRT4tLS9gVkVOU0hHSF9nXnNkU05CSlD/2wBDARUXFyAeIBohHiAgQi0tLUJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>
                        <p className="text-lg text-gray-600 mb-8">{selectedBlog.description}</p>
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedBlog.content }} 
                        />
                    </div>
                </section>
            ) : (
                <section className="pb-4 container mx-auto px-[104px] max-w-[1440px] bg-[#E3E6E6]">
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
                                    <Link 
                                    onClick={() => {
                                        setSelectedBlog(post)
                                    }}
                                    href={`/blog?id=${post.link}`} className="flex flex-col h-full">
                                        <div className="relative aspect-video ">
                                            <Image
                                                src={post.image || "/images/white-image.png"}
                                                alt={post.title}
                                                fill
                                                quality={100}
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
                                                <Button className="flex items-center transition-colors bg-main-charcoal-blue !text-white/80 px-4 py-2 h-10 rounded-sm">
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
            )}
        </div>
    )
}

// Loading fallback component
function BlogLoading() {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading blog content...</p>
    </div>
}

export default function FlashDealsPage() {
    return (
        <main className="bg-[#E3E6E6]">
            <Header />
            <MenuHeader />
            <div className="max-w-[1440px] mx-auto relative">
                <Suspense fallback={<BlogLoading />}>
                    <BlogContent />
                </Suspense>
            </div>
            <Footer />
        </main>
    )
}

