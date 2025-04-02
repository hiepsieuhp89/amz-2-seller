"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { bestSellers, bestSellingToys } from "./mockData"
import { useProducts } from "@/hooks/products"
import { IProduct } from "@/interface/response/products"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelectedProduct } from '@/app/stores/useSelectedProduct'

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "w-3 h-3",
            index < rating ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-300 stroke-gray-300"
          )}
        />
      ))}
    </div>
  )
}

export function BestSellers() {
  const randomPage = () => {
    return Math.floor(Math.random() * 100) + 1;
  }
  const [page, setPage] = useState(randomPage());

  const {data: featuredProducts, isLoading} = useProducts(
    {
      order: "DESC",
      page: page,
      take: 20,
      // isFeatured: true,
    }
  )

  const {data: bestSellersProducts, isLoading: isBestSellersLoading} = useProducts(
    {
      order: "DESC",
      take: 20,
      name: "sport",
    }
  )
  
  // Thêm state isMobile
  const [isMobile, setIsMobile] = useState(false)

  // Tạo các Embla Carousel riêng biệt
  const [emblaRef1, emblaApi1] = useEmblaCarousel({ align: "start", loop: false })
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ align: "start", loop: false })
  const [emblaRef3, emblaApi3] = useEmblaCarousel({ align: "start", loop: false })

  // Tạo state và callback riêng cho từng section
  const [prevBtnEnabled1, setPrevBtnEnabled1] = useState(false)
  const [nextBtnEnabled1, setNextBtnEnabled1] = useState(true)
  const [prevBtnEnabled2, setPrevBtnEnabled2] = useState(false)
  const [nextBtnEnabled2, setNextBtnEnabled2] = useState(true)
  const [prevBtnEnabled3, setPrevBtnEnabled3] = useState(false)
  const [nextBtnEnabled3, setNextBtnEnabled3] = useState(true)

  const scrollPrev1 = useCallback(() => emblaApi1 && emblaApi1.scrollPrev(), [emblaApi1])
  const scrollNext1 = useCallback(() => emblaApi1 && emblaApi1.scrollNext(), [emblaApi1])
  const scrollPrev2 = useCallback(() => emblaApi2 && emblaApi2.scrollPrev(), [emblaApi2])
  const scrollNext2 = useCallback(() => emblaApi2 && emblaApi2.scrollNext(), [emblaApi2])
  const scrollPrev3 = useCallback(() => emblaApi3 && emblaApi3.scrollPrev(), [emblaApi3])
  const scrollNext3 = useCallback(() => emblaApi3 && emblaApi3.scrollNext(), [emblaApi3])

  const onSelect1 = useCallback(() => {
    if (!emblaApi1) return
    setPrevBtnEnabled1(emblaApi1.canScrollPrev())
    setNextBtnEnabled1(emblaApi1.canScrollNext())
  }, [emblaApi1])

  const onSelect2 = useCallback(() => {
    if (!emblaApi2) return
    setPrevBtnEnabled2(emblaApi2.canScrollPrev())
    setNextBtnEnabled2(emblaApi2.canScrollNext())
  }, [emblaApi2])

  const onSelect3 = useCallback(() => {
    if (!emblaApi3) return
    setPrevBtnEnabled3(emblaApi3.canScrollPrev())
    setNextBtnEnabled3(emblaApi3.canScrollNext())
  }, [emblaApi3])

  useEffect(() => {
    if (!emblaApi1) return
    onSelect1()
    emblaApi1.on("select", onSelect1)
    emblaApi1.on("reInit", onSelect1)

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      emblaApi1.off("select", onSelect1)
      emblaApi1.off("reInit", onSelect1)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [emblaApi1, onSelect1])

  useEffect(() => {
    if (!emblaApi2) return
    onSelect2()
    emblaApi2.on("select", onSelect2)
    emblaApi2.on("reInit", onSelect2)

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      emblaApi2.off("select", onSelect2)
      emblaApi2.off("reInit", onSelect2)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [emblaApi2, onSelect2])

  useEffect(() => {
    if (!emblaApi3) return
    onSelect3()
    emblaApi3.on("select", onSelect3)
    emblaApi3.on("reInit", onSelect3)

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      emblaApi3.off("select", onSelect3)
      emblaApi3.off("reInit", onSelect3)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [emblaApi3, onSelect3])

  return (
    <div className="relative p-4 bg-[#E3E6E6] flex flex-col gap-4">
      {/* Section 1 */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold md:text-2xl">Sản phẩm nổi bật</h2>
          <div className="flex gap-2">
            <Button
              className={cn(
                "w-10 h-10 !bg-black/70 !rounded-none !!text-white/80 !hover:bg-black/50 flex items-center justify-center border shadow-sm transition-all",
                !prevBtnEnabled1 && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollPrev1}
              disabled={!prevBtnEnabled1}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className={cn(
                "w-10 h-10  flex items-center justify-center border !bg-black/70 !rounded-none !!text-white/80 !hover:bg-black/50 shadow-sm transition-all",
                !nextBtnEnabled1 && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollNext1}
              disabled={!nextBtnEnabled1}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef1}>
          <div className="flex -ml-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
                >
                  <Card className="overflow-hidden h-full" style={{ maxWidth: '200px' }}>
                    <CardContent className="p-0 flex flex-col h-full">
                      <Skeleton className="aspect-square w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <div className="flex justify-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-3 w-3 rounded-full" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              featuredProducts?.data.data.map((product: IProduct) => (
                <div
                  key={product.id}
                  className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
                >
                  <Link 
                    href={`/product?id=${product.id}`} 
                    className="block h-full"
                    onClick={() => useSelectedProduct.getState().setSelectedProduct(product)}
                  >
                    <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md" style={{ maxWidth: '200px' }}>
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={product.imageUrl  || "/images/white-image.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-medium text-sm sm:text-base line-clamp-2">{product.name}</h3>
                          <h4 className="text-sm text-gray-600 line-clamp-2">${product.price}</h4>
                          <RatingStars rating={parseFloat(product.averageRating)} />
                          {product.isNew && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mt-1">
                              Mới
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {isMobile && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              {Array.from({ length: Math.ceil(featuredProducts?.data?.data?.length || 0 / 2) }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full bg-gray-300",
                    emblaApi1?.selectedScrollSnap() === index && "bg-primary w-4",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 2 */}
      <div className="bg-white p-4 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold md:text-2xl">Sản phẩm bán chạy nhất dành cho thể thao và giải trí ngoài trời</h2>
          <div className="flex gap-2">
            <Button
              className={cn(
                "w-10 h-10 !bg-black/70 !rounded-none !!text-white/80 !hover:bg-black/50 flex items-center justify-center border shadow-sm transition-all",
                !prevBtnEnabled2 && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollPrev2}
              disabled={!prevBtnEnabled2}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className={cn(
                "w-10 h-10  flex items-center justify-center border !bg-black/70 !rounded-none !!text-white/80 !hover:bg-black/50 shadow-sm transition-all",
                !nextBtnEnabled2 && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollNext2}
              disabled={!nextBtnEnabled2}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef2}>
          <div className="flex -ml-4">
            {isBestSellersLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
                >
                  <Card className="overflow-hidden h-full" style={{ maxWidth: '200px' }}>
                    <CardContent className="p-0 flex flex-col h-full">
                      <Skeleton className="aspect-square w-full" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <div className="flex justify-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-3 w-3 rounded-full" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : (
              bestSellersProducts?.data.data.map((product: IProduct) => (
                <div
                  key={product.id}
                  className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
                >
                  <Link 
                    href={`/product?id=${product.id}`} 
                    className="block h-full"
                    onClick={() => useSelectedProduct.getState().setSelectedProduct(product as unknown as IProduct)}
                  >
                    <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md" style={{ maxWidth: '200px' }}>
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={product.imageUrl || "/images/white-image.png"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 text-center">
                          <h3 className="font-medium text-sm sm:text-base line-clamp-2">{product.name}</h3>
                          <h4 className="text-sm text-gray-600 line-clamp-2">${product.price}</h4>
                          <RatingStars rating={parseFloat(product.averageRating)} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {isMobile && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              {Array.from({ length: Math.ceil(bestSellers.length / 2) }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full bg-gray-300",
                    emblaApi2?.selectedScrollSnap() === index && "bg-primary w-4",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 3 */}
      <div className="bg-white p-4 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold md:text-2xl">Đồ chơi & Trò chơi bán chạy nhất</h2>
          <div className="flex gap-2">
            <Button
              className={cn(
                "w-10 h-10 !bg-black/70 !rounded-none !!text-white/80 !hover:bg-black/50 flex items-center justify-center border shadow-sm transition-all",
                !prevBtnEnabled3 && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollPrev3}
              disabled={!prevBtnEnabled3}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className={cn(
                "w-10 h-10  flex items-center justify-center border !bg-black/70 !rounded-none !!text-white/80 !hover:bg-black/50 shadow-sm transition-all",
                !nextBtnEnabled3 && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollNext3}
              disabled={!nextBtnEnabled3}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef3}>
          <div className="flex -ml-4">
            {bestSellingToys.map((product) => (
              <div
                key={product.id}
                className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
              >
                <Link 
                  href={`/product?id=${product.id}`} 
                  className="block h-full"
                  onClick={() => useSelectedProduct.getState().setSelectedProduct(product as unknown as IProduct)}
                >
                  <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md" style={{ maxWidth: '200px' }}>
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={product.image }
                          alt={product.category}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-medium text-sm sm:text-base line-clamp-2">{product.name}</h3>
                        <h4 className="text-sm text-gray-600 line-clamp-2">{product.category}</h4>
                        <RatingStars rating={product.rating} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {isMobile && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-1">
              {Array.from({ length: Math.ceil(bestSellingToys.length / 2) }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full bg-gray-300",
                    emblaApi3?.selectedScrollSnap() === index && "bg-primary w-4",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

