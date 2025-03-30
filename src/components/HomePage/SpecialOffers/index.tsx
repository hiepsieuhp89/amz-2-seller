"use client"

import Link from "next/link"
import { products } from "../mockData"
import { ProductCard } from "../ProductCard"
import { motion } from "framer-motion"

export function SpecialOffers() {
  const specialOffers = products.filter((product) => product.isOnSale)

  return (
    <section className="p-8 bg-[#F5F5F5]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Khuyến mãi đặc biệt</h2>
        <Link href="/special-offers" className="text-primary hover:underline">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {specialOffers.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

