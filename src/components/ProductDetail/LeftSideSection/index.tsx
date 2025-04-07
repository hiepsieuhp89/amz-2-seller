'use client';

import React from 'react';
import { Card, Button, List, Typography } from 'antd';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { mdiStorefront } from '@mdi/js';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { formatNumber } from '@/utils';
import { useTopSellingProducts } from '@/hooks/dashboard';
import { useSelectedProduct } from '@/stores/useSelectedProduct';
import { useProfile } from '@/hooks/authentication';
const { Text } = Typography;

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

const LeftSideSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const { data: topSellingProducts, isLoading } = useTopSellingProducts()
  const {setSelectedProduct} = useSelectedProduct()
  const {profileData} = useProfile()
  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div
            className="seller-info-card mb-4 border border-solid border-gray-200"
            style={{ background: '#fcfcfd' }}
          >
            <div className="position-relative text-left">
              <div className="font-semibold text-lg border-b p-4">
                Được bán bởi
              </div>
              <div className='p-4'>
                <div className="flex items-start mb-3">
                  {/* Shop Logo */}
                  <Link href={"/shop?id=" + profileData?.data?.id}>
                    <motion.div
                      className="mr-3 w-14 h-14 bg-white border relative rounded-full"
                    >
                      <Image
                        draggable={false}
                        src={profileData?.data?.logoUrl || "/images/default-avatar.jpg"}
                        alt={profileData?.data?.shopName || "Shop ẩn danh"}
                        height={56}
                        width={56}
                        quality={100}
                        className="flex-shrink-0 rounded-full h-full w-full object-cover p-1"
                      />
                    </motion.div>
                  </Link>

                  {/* Shop Name & Location */}
                  <div>
                    <Link href={"/shop?id=" + profileData?.data?.id} className="text-sm flex items-center font-semibold">
                      {profileData?.data?.shopName || "Shop ẩn danh"}
                      <motion.span
                        className="ml-2 text-blue-500"
                      >
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlSpace="preserve"
                          viewBox="0 0 287.5 442.2"
                          width="22"
                          height="34"
                          className="inline-block"
                        >
                          <polygon style={{ fill: '#F8B517' }} points="223.4,442.2 143.8,376.7 64.1,442.2 64.1,215.3 223.4,215.3" />
                          <circle style={{ fill: '#FBD303' }} cx="143.8" cy="143.8" r="143.8" />
                          <circle style={{ fill: '#F8B517' }} cx="143.8" cy="143.8" r="93.6" />
                          <polygon
                            style={{ fill: '#FCFCFD' }}
                            points="143.8,55.9 163.4,116.6 227.5,116.6 175.6,154.3 195.6,215.3 143.8,177.7 91.9,215.3 111.9,154.3 60,116.6 124.1,116.6"
                          />
                        </svg>
                      </motion.span>
                    </Link>
                    <Text className="text-xs !text-gray-400">{profileData?.data?.shopAddress || profileData?.data?.address}</Text>
                  </div>
                </div>
                {/* Rating */}
                <div className="mb-3 flex flex-col items-center p-2 border">
                  <RatingStars rating={5} />
                  <div className="text-xs text-gray-500 mt-1">
                    (1 Phản hồi khách hàng)
                  </div>
                </div>
                {/* Visit Store Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="primary"
                    icon={<Icon path={mdiStorefront} size={0.8} />}
                    block
                    style={{
                      background: 'linear-gradient(to right, #232f3e, #37475A)',
                      borderRadius: 0
                    }}
                  >
                    Ghé thăm cửa hàng
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Selling Products */}
        <motion.div variants={itemVariants} className="hidden lg:block mt-4 bg-white">
          <div
            className="top-selling-card border border-solid border-gray-200"
          >
            <div className="font-semibold text-lg border-b p-4">
              Sản phẩm bán chạy nhất
            </div>
            <List
              itemLayout="horizontal"
              dataSource={topSellingProducts}
              renderItem={(product: any) => (
                <motion.div
                  variants={hoverVariants}
                  whileHover="hover"
                  className="p-4"
                >
                  <Link 
                  onClick={()=> setSelectedProduct(product?.product)}
                  href={"/product?id=" + product?.product.id} className="block">
                    <div className="flex items-center">
                      {/* Product Image */}
                      <div className="w-1/4 xl:w-1/3 overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={product?.product?.imageUrls[0]}
                            alt={product?.product?.name}
                            width={200}
                            height={200}
                            className="w-full h-20 object-cover"
                            style={{ maxHeight: '200px' }}
                          />
                        </motion.div>
                      </div>

                      {/* Product Details */}
                      <div className="w-3/4 xl:w-2/3 pl-3">
                        <div className="hidden xl:block mb-2">
                          <Text className="text-sm line-clamp-2 hover:transition-colors">
                            {product?.product?.name && product?.product?.name.length > 20 ? product?.product?.name.slice(0, 20) + "..." : product?.product?.name}
                          </Text>
                        </div>
                        <Text className=" font-bold">
                          ${formatNumber(product?.product?.price)}
                        </Text>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeftSideSection;
