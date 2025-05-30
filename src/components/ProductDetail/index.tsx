"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Icon from "@mdi/react";
import {
  mdiHeart,
  mdiShareVariant,
  mdiCartOutline,
  mdiCreditCardOutline,
  mdiMinus,
  mdiPlus,
  mdiCheckCircle,
  mdiEmailOutline,
  mdiTwitter,
  mdiFacebook,
  mdiLinkedin,
  mdiWhatsapp,
  mdiChevronLeft,
  mdiChevronRight,
} from "@mdi/js";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelectedProduct } from "@/stores/useSelectedProduct";
import { Star } from "lucide-react";
import { formatNumber } from "@/utils";
import { message } from "antd";
import Link from "next/link";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "w-4 h-4",
            index < rating
              ? "fill-yellow-400 stroke-yellow-400"
              : "fill-gray-300 stroke-gray-300"
          )}
        />
      ))}
    </div>
  );
};
export default function ProductDetail() {
  const { selectedProduct } = useSelectedProduct();
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const price = parseFloat(selectedProduct?.price || "0");
  const totalPrice = price * quantity;
  const availableQuantity = selectedProduct?.stock || 0;
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Embla Carousel setup for thumbnails
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "keepSnaps",
    loop: false,
    slidesToScroll: 1,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const handleScroll = () => {
    };
    emblaApi.on("scroll", handleScroll);
    return () => {
      emblaApi.off("scroll", handleScroll);
    };
  }, [emblaApi, currentImage]);

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgContainerRef.current) return;

    const { left, top, width, height } =
      imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="w-full p-0 md:py-6 md:px-4 lg:px-[104px] bg-[#E3E6E6] flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[1440px] bg-white p-4 md:p-4">
        <div className="relative md:sticky md:top-20">
          <div className="product-gallery flex flex-col gap-2 md:gap-4">
            {/* Main Image */}
            <div
              ref={imgContainerRef}
              className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-md cursor-zoom-in border border-gray-200"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={cn(
                  "absolute w-full h-full transition-transform duration-200 bg-white",
                  isZoomed && "scale-150"
                )}
                style={
                  isZoomed
                    ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                    : {}
                }
              >
                <Image
                  src={
                    (selectedProduct?.imageUrls &&
                      selectedProduct?.imageUrls[currentImage]) ||
                    "/images/white-image.png"
                  }
                  alt="Product image"
                  height={1000}
                  width={1000}
                  className="object-contain p-4"
                  priority={currentImage === 0}
                  loading={currentImage === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGPzpQRT4tLS9gVkVOU0hHSF9nXnNkU05CSlD/2wBDARUXFyAeIBohHiAgQi0tLUJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="relative w-full">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-2">
                  {selectedProduct?.imageUrls &&
                    selectedProduct?.imageUrls.map((img, index) => (
                      <div
                        key={index}
                        className="pl-2 flex-shrink-0 flex-grow-0"
                        style={{ flexBasis: "25%" }} // Show 4 items
                      >
                        <motion.div
                          whileHover={{ scale: 1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleThumbnailClick(index)}
                          className={cn(
                            "relative w-full h-16 md:h-20 cursor-pointer overflow-hidden rounded-md border bg-white",
                            currentImage === index
                              ? "ring-0.5 ring-main-golden-orange border-main-golden-orange"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-contain p-1"
                          />
                        </motion.div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Carousel Controls */}
              {emblaApi &&
                selectedProduct?.imageUrls &&
                selectedProduct?.imageUrls.length > 4 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "absolute left-2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-6 w-6 md:h-8 md:w-8 !text-white bg-black/80 hover:bg-black border-none rounded-none shadow",
                        !prevBtnEnabled && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={scrollPrev}
                      disabled={!prevBtnEnabled}
                    >
                      <Icon path={mdiChevronLeft} size={0.8} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-6 w-6 md:h-8 md:w-8 bg-black/80 hover:bg-black shadow !text-white rounded-none border-none",
                        !nextBtnEnabled && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={scrollNext}
                      disabled={!nextBtnEnabled}
                    >
                      <Icon path={mdiChevronRight} size={0.8} />
                    </Button>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="product-info space-y-4 md:space-y-6 mt-4 md:mt-0">
          <div>
            <h1 className="text-lg md:text-xl font-semibold">{selectedProduct?.name}</h1>
            <div className="mt-1 md:mt-2 flex items-center gap-2">
              <div className="flex">
                <RatingStars
                  rating={Number(selectedProduct?.averageRating || 0)}
                />
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">
                (2 Nhận xét)
              </span>
            </div>

            <p className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground">
              Ước tính thời gian vận chuyển:{" "}
              <span className="font-medium text-main-golden-orange">
                5 ngày
              </span>
            </p>
          </div>
          <div className="border-t border-gray-200 my-3 md:my-6"></div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
            <div className="text-xs md:text-sm text-muted-foreground flex flex-col">
              <span>Được bán bởi</span>
              <span className="font-medium">Ẩn danh</span>
            </div>
            <Button
              onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
              variant="outline"
              className="w-full sm:w-auto sm:ml-4 text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 font-semibold border-main-golden-orange !text-main-golden-orange hover:bg-main-golden-orange/30"
            >
              Nhắn tin với người bán
            </Button>
          </div>
          <div className="border-t border-gray-200 my-3 md:my-6"></div>
          <div className="grid grid-cols-3 gap-2 md:gap-4 items-center">
            <div className="text-xs md:text-sm text-muted-foreground col-span-1">Giá bán:</div>
            <p className="text-xl md:text-2xl font-bold text-green-500 col-span-2">
              ${formatNumber(price)}<span className="ml-1 text-xs md:text-sm text-muted-foreground">/pc</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="text-xs md:text-sm text-muted-foreground col-span-1">Định lượng:</div>
            <div className="col-span-2 flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Icon path={mdiMinus} size={0.8} />
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={availableQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-8 md:h-9 w-10 md:w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-l-none"
                  onClick={() =>
                    setQuantity(Math.min(availableQuantity, quantity + 1))
                  }
                >
                  <Icon path={mdiPlus} size={0.8} />
                </Button>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">
                ({availableQuantity} có sẵn)
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="text-xs md:text-sm text-muted-foreground col-span-1">Tổng giá:</div>
            <div className="col-span-2">
              <span className="text-xl md:text-2xl font-bold text-green-500">
                ${formatNumber(totalPrice)}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                variant="outline"
                className="w-full sm:w-auto h-10 md:h-11 gap-2 bg-muted hover:bg-muted/80 text-xs md:text-sm"
              >
                <Icon path={mdiCartOutline} size={0.8} />
                Thêm vào giỏ hàng
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button
                onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                className="w-full sm:w-auto h-10 md:h-11 gap-2 bg-primary text-xs md:text-sm">
                <Icon path={mdiCreditCardOutline} size={0.8} />
                Mua ngay
              </Button>
            </motion.div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
            <Button
              onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
              variant="link"
              className="h-auto p-0 text-xs md:text-sm text-muted-foreground text-wrap break-words justify-start"
            >
              <Icon path={mdiHeart} size={0.8} className="mr-2" />
              Thêm vào danh sách yêu thích
            </Button>
            <Button
              onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
              variant="link"
              className="h-auto p-0 text-xs md:text-sm text-muted-foreground text-wrap break-words justify-start"
            >
              <Icon path={mdiShareVariant} size={0.8} className="mr-2" />
              Thêm vào để so sánh
            </Button>
          </div>
          <div className="border-t border-gray-200 my-3 md:my-6"></div>
          <div className="flex flex-col">
            <div className="text-xs md:text-sm text-muted-foreground">Hoàn tiền:</div>
            <div className="mt-3 md:mt-6 bg-green-50 p-3 md:p-4 rounded-md">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-green-100">
                  <Icon
                    path={mdiCheckCircle}
                    size={0.8}
                    className="text-green-600 md:size-1"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm md:text-base font-medium">Hoàn tiền đảm bảo</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    30 Days Cash Back Guarantee
                  </p>
                </div>
                <Link href="/return-policy">
                  <Button variant="link" className="h-auto p-0 text-xs md:text-sm">
                    Xem Chính sách
                  </Button></Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-3 md:my-6"></div>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="text-xs md:text-sm text-muted-foreground">Chia sẻ:</div>
            <div className="col-span-2 flex flex-wrap gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full"
                >
                  <Icon path={mdiEmailOutline} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full text-[#1DA1F2]"
                >
                  <Icon path={mdiTwitter} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full text-[#4267B2]"
                >
                  <Icon path={mdiFacebook} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full text-[#0077B5]"
                >
                  <Icon path={mdiLinkedin} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 md:h-9 md:w-9 rounded-full text-[#25D366]"
                >
                  <Icon path={mdiWhatsapp} size={0.8} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
