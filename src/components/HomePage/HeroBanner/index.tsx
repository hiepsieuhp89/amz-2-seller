"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { banners } from "../mockData"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@mdi/react"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import Link from "next/link"

export function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative w-full overflow-visible">
      <div className="h-[400px] md:h-[500px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${banners[currentBanner].image})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center !text-white/80 p-4">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  {banners[currentBanner].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl mb-6"
                >
                  {banners[currentBanner].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient effect element below the banner */}
        <motion.div
          key={`gradient-${currentBanner}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: -100,
            left: 0,
            right: 0,
            height: 100,
            background: `linear-gradient(to bottom, ${banners[currentBanner].color} 0%, rgba(255,255,255,0) 100%)`,
            zIndex: 0
          }}
        />

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full ${index === currentBanner ? "bg-primary" : "bg-white/50"}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 !bg-black/30 !!text-white/80 rounded-none !hover:bg-black/50 z-10"
          onClick={prevBanner}
        >
          <Icon path={mdiChevronLeft} size={1.5} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 !bg-black/30 !!text-white/80 !rounded-none !hover:bg-black/50 z-10"
          onClick={nextBanner}
        >
          <Icon path={mdiChevronRight} size={1.5} />
        </Button>
      </div>
    </div>
  )
}

