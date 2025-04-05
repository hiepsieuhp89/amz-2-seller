"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Icon } from "@mdi/react"
import { mdiStar, mdiStarOutline, mdiHeartOutline, mdiSyncAlert, mdiCartOutline, mdiMenu } from "@mdi/js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSidebar } from "../SidebarContext"
import { useProducts } from "@/hooks/products"
import { useSearchParams } from "next/navigation"
import { IProduct } from "@/interface/response/products"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelectedProduct } from "@/stores/useSelectedProduct"
import { formatNumber } from "@/utils"

interface Brand {
  id: string
  name: string
}

interface SortOption {
  value: string
  label: string
}

interface MainSectionProps {
  brands: Brand[]
  sortOptions: SortOption[]
}

export default function MainSection({ brands, sortOptions }: MainSectionProps) {
  const { toggleSidebar } = useSidebar()
  const { setSelectedProduct } = useSelectedProduct()
  const searchParams = useSearchParams()
  const categoryId = searchParams.get("id")
  const name = searchParams.get("name")
  const page = searchParams.get("page") || "1"
  const { data, isLoading, isFetching } = useProducts({
    categoryId: categoryId || undefined,
    page: Number.parseInt(page),
    order: "DESC",
    take: 12,
  })
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const breadcrumbs = [
    {
      name: "Trang chủ",
      url: "/",
      isActive: false,
    },
    {
      name: "Tất cả danh mục",
      url: "/categories",
      isActive: false,
    },
    {
      name: name,
      url: `/category?id=${categoryId}&name=${name}`,
      isActive: true,
    },
  ]

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-4 pt-0 px-0 md:pl-8">
        {/* Breadcrumbs */}
        <div className="flex items-center mb-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-3 p-1 rounded hover:bg-gray-200"
            aria-label="Toggle sidebar"
          >
            <Icon path={mdiMenu} size={1} />
          </button>

          <nav className="flex">
            {breadcrumbs.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.url}
                  className={`text-sm ${item.isActive ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}
                >
                  {item.name}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2 text-gray-500">/</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Title and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold mb-4 md:mb-0">{name}</h1>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-48">
              <label className="block text-sm text-gray-500 mb-1">Nhãn hiệu</label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Tất cả các thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả các thương hiệu</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-48">
              <label className="block text-sm text-gray-500 mb-1">Sắp xếp theo</label>
              <Select defaultValue={sortOptions[0].value}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[300px] !w-full">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="relative">
                  <Skeleton className="aspect-square w-full" />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-7 w-7 rounded-full" />
                  </div>
                </div>
                <div className="p-3">
                  <Skeleton className="h-6 w-20 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full mb-2" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {!isLoading && data?.data.data?.length === 0 && (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
            </div>
          )}
          {data?.data.data?.map((product: IProduct) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Link
                  onClick={() => { setSelectedProduct(product) }}
                  href={`/shop/product?id=${product.id}&name=${product.name}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.imageUrls?.[0] || "/placeholder.svg?height=300&width=300"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button className="bg-white rounded-full p-1.5 shadow hover:bg-gray-100">
                    <Icon path={mdiHeartOutline} size={0.8} className="text-gray-600" />
                  </button>
                  <button className="bg-white rounded-full p-1.5 shadow hover:bg-gray-100">
                    <Icon path={mdiSyncAlert} size={0.8} className="text-gray-600" />
                  </button>
                  <button className="bg-white rounded-full p-1.5 shadow hover:bg-gray-100">
                    <Icon path={mdiCartOutline} size={0.8} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div className="text-primary font-bold">${formatNumber(Number.parseFloat(product.price))}</div>

                <div className="flex mt-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      path={i < Number.parseFloat(product.averageRating) ? mdiStar : mdiStarOutline}
                      size={0.7}
                      className="text-amber-500"
                    />
                  ))}
                </div>

                <h3 className="text-sm font-semibold line-clamp-2 h-10 mb-2">
                  <Link href={`/shop/product?id=${product.id}&name=${product.name}`} className="hover:text-primary">
                    {product.name}
                  </Link>
                </h3>

                <div className="bg-primary/10 border border-primary/20 rounded px-2 py-1 text-xs">
                  Điểm câu lạc bộ: <span className="font-bold float-right">0</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          {data?.data.meta && (
            <nav className="flex items-center">
              <Link
                href={data.data.meta.page > 1 ? `?page=${data.data.meta.page - 1}${categoryId ? `&id=${categoryId}` : ""}&name=${name}` : "#"}
                className={`px-3 py-1 mx-1 rounded ${data.data.meta.page === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"}`}
                aria-disabled={data.data.meta.page === 1}
              >
                Trước
              </Link>

              {Array.from({ length: Math.min(5, data.data.meta.pageCount) }, (_, i) => {
                const pageNumber = data.data.meta.page <= 3 ? i + 1 : data.data.meta.page + i - 2

                if (pageNumber <= data.data.meta.pageCount) {
                  return (
                    <Link
                      key={pageNumber}
                      href={`?page=${pageNumber}${categoryId ? `&id=${categoryId}` : ""}&name=${name}`}
                      className={`h-9 w-9 flex items-center justify-center mx-1 rounded-full ${pageNumber === data.data.meta.page ? "bg-main-charcoal-blue !text-white/80" : "text-gray-700 hover:bg-main-charcoal-blue bg-white hover:!text-white/80"}`}
                    >
                      {pageNumber}
                    </Link>
                  )
                }
                return null
              })}

              {data.data.meta.pageCount > 5 && data.data.meta.page < data.data.meta.pageCount - 2 && (
                <span className="px-3 py-1 mx-1">...</span>
              )}
              <Link
                href={
                  data.data.meta.page < data.data.meta.pageCount
                    ? `?page=${data.data.meta.page + 1}${categoryId ? `&id=${categoryId}` : ""}&name=${name}`
                    : "#"
                }
                className={`px-3 py-1 mx-1 rounded ${data.data.meta.page === data.data.meta.pageCount ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"}`}
                aria-disabled={data.data.meta.page === data.data.meta.pageCount}
              >
                Kế tiếp
              </Link>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

