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

export default function CategoriesPage() {
    const { categoriesData, isLoading, isFetching, refetch } = useCategories({
        order: "DESC",
    })

    if (isLoading || isFetching) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <MenuHeader />
                <section className="py-8 px-[104px] max-w-[1500px] flex-1 bg-[#E3E6E6]">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-[200px]" />
                        <Skeleton className="h-4 w-[300px]" />
                    </div>
                    <div className="mt-8 space-y-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md">
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
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <MenuHeader />
            <section className="py-8 px-[104px] max-w-[1500px] flex-1 bg-[#E3E6E6]">
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
                        <div key={category.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="p-4 border-b border-gray-200">
                                <Link href={`/categories/${category.id}`} className="font-semibold text-lg text-main-golden-orange hover:text-main-golden-orange/80 transition-colors">
                                    {category.name}
                                    {category.parent && (
                                        <span className="block text-sm text-gray-500 mt-1">Thuộc: {category.parent.name}</span>
                                    )}
                                </Link>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-3 gap-6">
                                    {category.children.map((child) => (
                                        <div key={child.id} className="group">
                                            <h6 className="mb-3">
                                                <Link href={`/categories/${child.id}`} className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-base">
                                                    <span className="group-hover:underline">{child.name}</span>
                                                    {child.parent && (
                                                        <span className="block text-sm text-gray-500 mt-1">Thuộc: {child.parent.name}</span>
                                                    )}
                                                </Link>
                                            </h6>
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

