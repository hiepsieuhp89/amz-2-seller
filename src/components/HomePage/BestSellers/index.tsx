"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { bestSellers, bestSellingToys, featuredProducts } from "./mockData"

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
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: false,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative p-4 bg-[#E3E6E6] flex flex-col gap-4">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold md:text-2xl">
            Sản phẩm nổi bật
          </h2>
          <div className="flex gap-2">
            <Button
              className={cn(
                "w-10 h-10 !bg-black/70 !text-white rounded-none !hover:bg-black/50 flex items-center justify-center border shadow-sm transition-all",
                !prevBtnEnabled && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className={cn(
                "w-10 h-10  flex items-center justify-center border !bg-black/70 !text-white rounded-none !hover:bg-black/50 shadow-sm transition-all",
                !nextBtnEnabled && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
              >
                <Link href={`/product/${product.id}`} className="block h-full">
                  <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md" style={{ maxWidth: '200px' }}>
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
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
              {Array.from({ length: Math.ceil(featuredProducts.length / 2) }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full bg-gray-300",
                    emblaApi?.selectedScrollSnap() === index && "bg-primary w-4",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold md:text-2xl">
            Sản phẩm bán chạy nhất dành cho thể thao và giải trí ngoài trời
          </h2>
          <div className="flex gap-2">
            <Button
              className={cn(
                "w-10 h-10 !bg-black/70 !text-white rounded-none !hover:bg-black/50 flex items-center justify-center border shadow-sm transition-all",
                !prevBtnEnabled && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className={cn(
                "w-10 h-10  flex items-center justify-center border !bg-black/70 !text-white rounded-none !hover:bg-black/50 shadow-sm transition-all",
                !nextBtnEnabled && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
              >
                <Link href={`/product/${product.id}`} className="block h-full">
                  <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md" style={{ maxWidth: '200px' }}>
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
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
              {Array.from({ length: Math.ceil(bestSellers.length / 2) }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full bg-gray-300",
                    emblaApi?.selectedScrollSnap() === index && "bg-primary w-4",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold md:text-2xl">
            Đồ chơi & Trò chơi bán chạy nhất
          </h2>
          <div className="flex gap-2">
            <Button
              className={cn(
                "w-10 h-10 !bg-black/70 !text-white rounded-none !hover:bg-black/50 flex items-center justify-center border shadow-sm transition-all",
                !prevBtnEnabled && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              className={cn(
                "w-10 h-10  flex items-center justify-center border !bg-black/70 !text-white rounded-none !hover:bg-black/50 shadow-sm transition-all",
                !nextBtnEnabled && "opacity-50 cursor-not-allowed",
              )}
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {bestSellingToys.map((product) => (
              <div
                key={product.id}
                className="pl-4 min-w-[50%] sm:min-w-[33.333%] md:min-w-[25%] lg:min-w-[16.666%] flex-grow-0 flex-shrink-0"
              >
                <Link href={`/product/${product.id}`} className="block h-full">
                  <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md" style={{ maxWidth: '200px' }}>
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
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
                    emblaApi?.selectedScrollSnap() === index && "bg-primary w-4",
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

