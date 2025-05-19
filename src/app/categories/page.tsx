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
import { useCategories } from "@/hooks/categories"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { mdiChevronUp } from "@mdi/js";
import Icon from "@mdi/react";

export default function CategoriesPage() {
    const { categoriesData, isLoading, isFetching, refetch } = useCategories({
        order: "DESC",
        take: 1000
    })
    const [showScroll, setShowScroll] = useState(false);
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [400, 500], [0, 1]);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        animate(scrollY, 0, {
            duration: 1,
            ease: "easeInOut",
            onUpdate: (latest) => {
                window.scrollTo(0, latest);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    if (isLoading || isFetching) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <MenuHeader />
                <section className="py-8 px-[104px] max-w-[1440px] flex-1 bg-[#E3E6E6]">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-[200px]" />
                        <Skeleton className="h-4 w-[300px]" />
                    </div>
                    <div className="mt-8 space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-sm shadow-md">
                                <div className="p-4 border-b border-gray-200">
                                    <Skeleton className="h-6 w-[150px]" />
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-3 gap-6">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i}>
                                                <Skeleton className="h-4 w-[100px]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <Footer />
            </div>
        )
    }

    return (
        <main className="bg-[#E3E6E6]">
            <Header />
            <MenuHeader />
            <div className="max-w-[1440px] mx-auto relative">
                <div className="min-h-screen bg-background flex flex-col">
                    <section className="py-8 px-[104px] max-w-[1440px] flex-1 bg-[#E3E6E6]">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Tất cả danh mục</h1>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink className="font-semibold" href="/categories">
                                            Tất cả danh mục
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <div className="mt-8 space-y-4">
                            {categoriesData?.data?.data.map((category) => (
                                <div key={category.id} className="bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="p-4  flex items-center">
                                        {category.imageUrl && (
                                            <Image
                                                src={category.imageUrl || "/images/white-image.png"}
                                                alt={category.name}
                                                className="h-16 w-16 object-cover rounded mr-4"
                                                width={64}
                                                height={64}
                                            />
                                        )}
                                        <Link href={`/category?id=${category.id}&name=${category.name}`} className="font-semibold text-lg text-main-golden-orange hover:text-main-golden-orange/80 transition-colors">
                                            {category.name}
                                            {category.parent && (
                                                <span className="block text-sm text-gray-500 mt-1">Thuộc: {category.parent.name}</span>
                                            )}
                                        </Link>
                                    </div>
                                    {category.children.length > 0 && <div className="p-4 border-t border-gray-200">
                                        <div className="grid grid-cols-3 gap-6">
                                            {category.children.map((child) => (
                                                <div key={child.id} className="group flex items-center">
                                                    {child.imageUrl && (
                                                        <Image src={child.imageUrl || "/images/white-image.png"} alt={child.name} className="h-10 w-10 object-cover rounded mr-2" width={40} height={40} />
                                                    )}
                                                    <h6 className="mb-3">
                                                        <Link href={`/category?id=${child.id}&name=${child.name}`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base">
                                                            <span className="group-hover:underline">{child.name}</span>
                                                            {child.parent && (
                                                                <span className="block text-sm text-gray-500 mt-1">Thuộc: {child.parent.name}</span>
                                                            )}
                                                        </Link>
                                                    </h6>
                                                </div>
                                            ))}
                                        </div>
                                    </div>}
                                </div>
                            ))}
                        </div>
                    </section>
                    <motion.button
                        style={{ opacity }}
                        onClick={scrollTop}
                        className="fixed bottom-4 right-4 p-3 bg-main-golden-orange !text-white/80 rounded-full shadow-lg hover:bg-main-golden-orange/80 transition-colors"
                    >
                        <Icon path={mdiChevronUp} size={1} />
                    </motion.button>
                </div>
            </div>
            <Footer />
        </main>
    )
}

