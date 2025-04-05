"use client"

import { HeroBanner } from "./HeroBanner"
import { BestSellers } from "./BestSellers"
import { motion, useScroll, useTransform, animate } from "framer-motion"
import MenuHeader from "../Common/MenuHeader"
import Categories from "./Categories"
import { FeaturedCategories } from "./FeaturedCategories"
import Categories2 from "./Categories2"
import { useEffect, useState } from 'react';
import { mdiChevronUp } from "@mdi/js"
import Icon from "@mdi/react"
import { Header } from "../Common/Header"
import { Footer } from "../Common/Footer"

export default function HomePage() {
  const [showScroll, setShowScroll] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 500], [0, 1]);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    animate(scrollY, 0, {
      duration: 1,
      ease: "easeInOut",
      onUpdate: (latest) => {
        window.scrollTo(0, latest);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <div className="min-h-screen bg-[#E3E6E6]">
      <Header />
      <MenuHeader />
      <div className="max-w-[1440px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          
        >
          <HeroBanner />
        </motion.div>
      </div>
      {/* Wrapper for all sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full absolute top-2/3 bg-[#E3E6E6]"
      >
        {/* Category Grid */}
        <div className="px-4 max-w-[1440px] mx-auto">
          <Categories />
        </div>
        <div className="px-4 max-w-[1440px] mx-auto">
        <FeaturedCategories />
        <BestSellers />
        <Categories2 />
        </div>
        <Footer />

      </motion.div>



      <motion.button
        style={{ opacity }}
        onClick={scrollTop}
        className="fixed bottom-4 right-4 p-3 bg-main-golden-orange !text-white/80 rounded-full shadow-lg hover:bg-main-golden-orange/80 transition-colors"
      >
        <Icon path={mdiChevronUp} size={1} />
      </motion.button>
    </div>
  )
}

