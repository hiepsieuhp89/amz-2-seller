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
import { useSearchParams } from 'next/navigation';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelectedProduct } from "@/stores/useSelectedProduct";
import { Star } from "lucide-react";
import { formatNumber } from "@/utils";
import { message } from "antd";
import Link from "next/link";
import { useProductById } from "@/hooks/products";

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
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const { product, isLoading, error } = useProductById(productId);
  const { selectedProduct, setSelectedProduct } = useSelectedProduct();
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const price = parseFloat(selectedProduct?.price || "0");
  const availableQuantity = selectedProduct?.stock || 0;
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  // Update selected product when data is fetched
  useEffect(() => {
    if (product) {
      setSelectedProduct(product.data);
    }
  }, [product, setSelectedProduct]);

  // Show error message if fetch fails
  useEffect(() => {
    if (error) {
      message.error('Could not load product details');
      console.error('Error fetching product details:', error);
    }
  }, [error]);

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

  // Handle mobile image tap to open preview
  const handleImageTap = () => {
    // Only open preview on mobile devices
    if (window.innerWidth < 768) {
      setIsImagePreviewOpen(true);
    }
  };

  // Close image preview
  const closeImagePreview = () => {
    setIsImagePreviewOpen(false);
  };

  // Handle swipe to next/previous image in preview
  const handlePreviewSwipe = (direction: 'next' | 'prev') => {
    if (!selectedProduct?.imageUrls) return;
    
    const totalImages = selectedProduct.imageUrls.length;
    if (direction === 'next') {
      setCurrentImage((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  // Show loading state while fetching product data
  if (isLoading) {
    return (
      <div className="w-full p-4 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-0 md:py-4 bg-[#EAEDED] flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-[1500px] bg-white p-0 md:p-4">
        {/* Left Column - Product Gallery */}
        <div className="md:col-span-5 lg:col-span-4 relative md:sticky md:top-20 px-4 md:px-0">
          <div className="product-gallery flex flex-col gap-2 md:gap-4">
            {/* Main Image */}
            <div
              ref={imgContainerRef}
              className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-sm cursor-zoom-in border border-gray-200"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleImageTap}
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

            {/* Image Preview Modal for Mobile */}
            {isImagePreviewOpen && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center md:hidden">
                <div className="relative w-full h-full">
                  {/* Close button */}
                  <button 
                    className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2"
                    onClick={closeImagePreview}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  
                  {/* Image counter */}
                  <div className="absolute top-4 left-4 z-10 text-white bg-black bg-opacity-50 px-2 py-1 rounded-md text-sm">
                    {currentImage + 1}/{selectedProduct?.imageUrls?.length || 1}
                  </div>
                  
                  {/* Image */}
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    onClick={(e) => {
                      // Determine tap position to navigate
                      const { clientX, currentTarget } = e;
                      const { width } = currentTarget.getBoundingClientRect();
                      const tapPosition = clientX / width;
                      
                      if (tapPosition > 0.5) {
                        handlePreviewSwipe('next');
                      } else {
                        handlePreviewSwipe('prev');
                      }
                    }}
                  >
                    <Image
                      src={
                        (selectedProduct?.imageUrls &&
                          selectedProduct?.imageUrls[currentImage]) ||
                        "/images/white-image.png"
                      }
                      alt="Product preview"
                      height={1000}
                      width={1000}
                      className="object-contain max-h-full max-w-full p-4"
                    />
                  </div>
                  
                  {/* Navigation indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                    {selectedProduct?.imageUrls?.map((_, index) => (
                      <div 
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-500'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Thumbnail Carousel */}
            <div className="relative w-full pb-4">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-2">
                  {selectedProduct?.imageUrls &&
                    selectedProduct?.imageUrls.map((img, index) => (
                      <div
                        key={index}
                        className="pl-2 flex-shrink-0 flex-grow-0"
                        style={{ flexBasis: "20%" }} // Show 5 items
                      >
                        <motion.div
                          whileHover={{ scale: 1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleThumbnailClick(index)}
                          className={cn(
                            "relative w-full h-16 md:h-20 cursor-pointer overflow-hidden rounded-sm border bg-white",
                            currentImage === index
                              ? "ring-2 ring-[#e77600] border-[#e77600]"
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
                selectedProduct?.imageUrls.length > 5 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "absolute left-2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-6 w-6 md:h-8 md:w-8 !text-black bg-white hover:bg-white border-gray-300 rounded-full shadow",
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
                        "absolute right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-6 w-6 md:h-8 md:w-8 bg-white hover:bg-white shadow !text-black rounded-full border-gray-300",
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

        {/* Middle Column - Product Details */}
        <div className="md:col-span-7 lg:col-span-5 product-info space-y-3 px-4 md:px-0 mt-2 md:mt-0">
          <div className="border-b border-gray-200 pb-2">
            <h1 className="text-xl md:text-2xl font-medium">{selectedProduct?.name}</h1>
            
            <div className="mt-1 flex items-center gap-2">
              <div className="flex">
                <RatingStars
                  rating={Number(selectedProduct?.averageRating || 0)}
                />
              </div>
              <Link 
                href="#reviews" 
                className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline"
              >
                2 Nhận xét
              </Link>
            </div>
          </div>

          {/* Price Section */}
          <div className="pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-sm">Giá bán:</span>
              <span className="text-xl md:text-3xl font-medium text-[#232F3E]">
                ${formatNumber(price)}
              </span>
            </div>
            
            {/* Shipping Estimate */}
            <div className="flex items-center mt-1">
              <p className="text-sm">
                <span className="text-muted-foreground">Ước tính thời gian vận chuyển:</span>{" "}
                <span className="font-medium text-[#007600]">
                  5 ngày
                </span>
              </p>
            </div>

            {/* Availability */}
            <div className="mt-3 text-sm">
              <span className={`font-medium ${availableQuantity > 10 ? 'text-[#007600]' : availableQuantity > 0 ? 'text-[#B12704]' : 'text-[#B12704]'}`}>
                {availableQuantity > 10 
                  ? 'Còn hàng' 
                  : availableQuantity > 0 
                    ? `Chỉ còn ${availableQuantity} sản phẩm` 
                    : 'Hết hàng'}
              </span>
            </div>
          </div>

          {/* About this item */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <h3 className="text-base font-medium">Về sản phẩm này</h3>
            <ul className="list-disc list-inside text-sm space-y-1 mt-2 ml-2">
              <li>Xuất xứ: {'Imported'}</li>
              <li>Bảo hành: 12 tháng</li>
              <li>Dành cho: Unisex</li>
              <li>Hình thức thanh toán: COD, thẻ tín dụng, ví điện tử</li>
            </ul>
          </div>

          {/* Seller Information */}
          <div className="border-t border-gray-200 pt-3 mt-3 m">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Được bán bởi </span>
                <Link href="#" className="font-medium text-[#007185] hover:text-[#C7511F] hover:underline">
                  {'Amazon'}
                </Link>
              </div>
              <Button
                onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                variant="outline"
                className="text-xs md:text-sm px-3 py-1 font-medium border-[#007185] text-[#007185] hover:bg-[#007185]/10"
              >
                Nhắn tin với người bán
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Buy Box */}
        <div className="md:col-span-12 lg:col-span-3 px-4 md:px-0">
          <div className="border border-gray-200 rounded-md p-4">
            <p className="text-2xl font-medium text-[#B12704]">
              ${formatNumber(price)}
            </p>
            
            <p className="text-sm mt-1">
              <span className="text-[#007600] font-medium">Miễn phí giao hàng </span> 
              <Link href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Chi tiết</Link>
            </p>
            
            <p className="text-sm mt-2">
              Giao đến: <span className="font-medium">Việt Nam</span>{" "}
              <Link href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Cập nhật vị trí</Link>
            </p>
            
            <div className="mt-3">
              <div className={`text-lg ${availableQuantity > 0 ? 'text-[#007600]' : 'text-[#B12704]'} font-medium`}>
                {availableQuantity > 0 ? 'Còn hàng' : 'Hết hàng'}
              </div>
            </div>
            
            {/* Quantity Selector */}
            <div className="mt-3">
              <div className="flex items-center">
                <label htmlFor="quantity" className="text-sm mr-2">Số lượng:</label>
                <select 
                  id="quantity"
                  className="border border-gray-300 rounded text-sm py-1 px-2 bg-[#F0F2F2] hover:bg-[#e3e6e6]"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {Array.from({ length: Math.min(10, availableQuantity) }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Buy Buttons */}
            <div className="mt-4 space-y-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  className="w-full h-[30px] rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-black border-0 shadow-sm"
                >
                  Thêm vào giỏ hàng
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  className="w-full h-[30px] rounded-full bg-[#FFA41C] hover:bg-[#FA8900] text-black border-0 shadow-sm"
                >
                  Mua ngay
                </Button>
              </motion.div>
            </div>
            
            {/* Secure Transaction */}
            <div className="mt-3 text-xs text-right">
              <Link href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">Giao dịch bảo mật</Link>
            </div>
            
            {/* Add to List Buttons */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <Button
                onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                variant="link"
                className="h-auto p-0 text-xs text-[#007185] hover:text-[#C7511F] hover:underline justify-start"
              >
                <Icon path={mdiHeart} size={0.7} className="mr-1" />
                Thêm vào danh sách yêu thích
              </Button>
            </div>
          </div>
          
          {/* Returns Section */}
          <div className="border border-gray-200 rounded-md p-4 mt-4">
            <div className="flex items-start gap-2">
              <div>
                <Icon
                  path={mdiCheckCircle}
                  size={0.8}
                  className="text-[#007600]"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Hoàn tiền đảm bảo</p>
                <p className="text-xs text-muted-foreground">
                  30 ngày hoàn tiền
                </p>
                <Link href="/return-policy" className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
          
          {/* Share Section */}
          <div className="border border-gray-200 rounded-md p-4 mt-4">
            <p className="text-sm font-medium mb-2">Chia sẻ</p>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full text-[#4267B2] border-gray-300"
                >
                  <Icon path={mdiFacebook} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full text-[#1DA1F2] border-gray-300"
                >
                  <Icon path={mdiTwitter} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full text-[#25D366] border-gray-300"
                >
                  <Icon path={mdiWhatsapp} size={0.8} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={() => message.warning("Vui lòng đăng nhập với tư cách là người mua để tiếp tục")}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full text-[#0077B5] border-gray-300"
                >
                  <Icon path={mdiLinkedin} size={0.8} />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
