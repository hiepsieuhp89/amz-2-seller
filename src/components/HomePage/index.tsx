"use client"

import { Header } from "./Header"
import { HeroBanner } from "./HeroBanner"
import { FeaturedProducts } from "./FeaturedProducts"
import { BestSellers } from "./BestSellers"
import { SpecialOffers } from "./SpecialOffers"
import { Footer } from "./Footer"
import { motion } from "framer-motion"
import { CategoryGrid } from "./CategoryGrid"
import { categories, products } from "./mockData"
import MenuHeader from "./MenuHeader"

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.isFeatured)
  const onSaleProducts = products.filter((product) => product.isOnSale)
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MenuHeader />
      <main>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <HeroBanner />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <CategoryGrid categories={categories} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
        >
          <FeaturedProducts products={featuredProducts} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          <BestSellers products={onSaleProducts} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full"
        >
          <SpecialOffers />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

