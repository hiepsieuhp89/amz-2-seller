'use client';

import React from 'react';
import { Card, Rate, Button, List, Typography } from 'antd';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiStorefront } from '@mdi/js';
import Link from 'next/link';
import Image from 'next/image';
const { Title, Text } = Typography;
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
}

const topSellingProducts: Product[] = [
  {
    id: 'd0UgfhsrIq',
    name: 'Yousie Toddler Girls Kids Jumpsuit One Piece Floral Dinosaur Playsuit Strap Romper Summer Outfits Clothes - Clothes',
    price: 9.98,
    image: 'https://m.media-amazon.com/images/I/613VU3cydAL._AC_SL1500_.jpg',
    url: '/product/d0UgfhsrIq'
  },
  {
    id: 'uImrvQGcKp',
    name: 'Hyhucoie Womens Sweatsuits 2 Piece Set Lounge Sets Long Sleeve Tops Jogger Sweatpants Track Sweats Suits Matching Pants Sets - Clothes',
    price: 9.99,
    image: 'https://m.media-amazon.com/images/I/51FANKJajxL._AC_SL1500_.jpg',
    url: '/product/uImrvQGcKp'
  },
  {
    id: 'IbxNrCi2om',
    name: 'Christmas Decorations - Christmas Window Clings Christmas Decorations Indoor Christmas Decorations Clearance Snowflakes Christmas Window Decorations Stickers for Home Office Classroom',
    price: 5.99,
    image: 'https://m.media-amazon.com/images/I/81nlCjJ1NaL._AC_SL1500_.jpg',
    url: '/product/IbxNrCi2om'
  },
  {
    id: '15Pus3qiBm',
    name: 'Sanniu Led String Lights, Mini Battery Powered Copper Wire Starry Fairy Lights, Battery Operated Lights for Bedroom, Christmas, Parties, Wedding, Centerpiece, Decoration (5m/16ft Warm White),1 Pack',
    price: 6.99,
    image: 'https://m.media-amazon.com/images/I/713LZ06UeJL._AC_SL1200_.jpg',
    url: '/product/15Pus3qiBm'
  },
  {
    id: 'PunXjMj9kG',
    name: 'Green Christmas Decorations Door Cover Merry Christmas Door Cover 6 X 3ft Black Buffalo Grid Flag Photography Banner Christmas Xmas Winter Holiday Home Kitchen',
    price: 9.99,
    image: 'https://m.media-amazon.com/images/I/81OoO5y-okL._AC_SL1500_.jpg',
    url: '/product/PunXjMj9kG'
  },
  {
    id: 'MrzvVvHdQQ',
    name: 'BLUE PANDA 8 Piece Christmas Headbands, Christmas Party Accessories for Kids Adults, Fun Festive Holiday Headband for Xmas Party Gatherings with Family Friends (4.4 x 7.15 In)',
    price: 8.99,
    image: 'https://m.media-amazon.com/images/I/61vjDAdS37L._SL1500_.jpg',
    url: '/product/MrzvVvHdQQ'
  }
];

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

  return (
    <div className="left-sidebar">
      {/* Seller Info Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card 
            className="seller-info-card mb-4" 
            bordered={true}
            style={{ background: '#fcfcfd' }}
          >
            <div className="position-relative text-left">
              <Text type="secondary" className="block mb-3">Seller</Text>
              
              <div className="flex items-start mb-3">
                {/* Shop Logo */}
                <Link href="/shop/Shop-Hoa-Hong">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="mr-3 w-14 h-14 bg-white border relative rounded-full"
                  >
                    <Image 
                      draggable={false}
                      src="/images/silver-shop.png" 
                      alt="Shop Hoa Hong" 
                      fill
                      quality={100}
                      className="flex-shrink-0 rounded-full h-full w-full  object-contain !p-1"
                    />
                  </motion.div>
                </Link>
                
                {/* Shop Name & Location */}
                <div>
                  <Link href="/shop/Shop-Hoa-Hong" className="text-main-text hover:text-primary font-bold text-sm flex items-center">
                    Shop Hoa Hong
                    <motion.span 
                      whileHover={{ scale: 1.2 }}
                      className="ml-2 text-blue-500"
                    >
                      <Icon path={mdiCheckCircleOutline} size={0.8} />
                    </motion.span>
                  </Link>
                  <Text type="secondary" className="text-xs">Yên Sơn Tuyên Quang Việt Nam</Text>
                </div>
              </div>
              
              {/* Rating */}
              <div className="mb-3">
                <Rate disabled defaultValue={5} className="text-sm" />
                <div className="text-xs text-gray-500 mt-1">
                  (0 Phản hồi khách hàng)
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
          </Card>
        </motion.div>

        {/* Top Selling Products */}
        <motion.div variants={itemVariants} className="hidden lg:block mt-4">
          <Card 
            title={
              <Title level={5} className="mb-0 font-semibold">
                Sản phẩm bán chạy nhất
              </Title>
            }
            className="top-selling-card" 
            bordered={true}
          >
            <List
              itemLayout="horizontal"
              dataSource={topSellingProducts}
              renderItem={(product) => (
                <motion.div 
                  variants={hoverVariants}
                  whileHover="hover"
                  className="py-3"
                >
                  <Link href={product.url} className="block">
                    <div className="flex items-center">
                      {/* Product Image */}
                      <div className="w-1/4 xl:w-1/3 overflow-hidden">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image 
                            src={product.image} 
                            alt={product.name} 
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
                          <Text className="text-sm line-clamp-2 hover:text-primary transition-colors">
                            {product.name}
                          </Text>
                        </div>
                        <Text className="text-primary font-bold">
                          ${product.price.toFixed(2)}
                        </Text>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            />
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeftSideSection;
