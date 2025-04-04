"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Icon } from "@mdi/react"
import { mdiChevronLeft, mdiClose } from "@mdi/js"
import { Slider } from "@/components/ui/slider"
import { useSidebar } from "../SidebarContext"
import { formatNumber } from "@/utils"

interface Category {
  id: string
  name: string
  url: string
  isActive?: boolean
  children?: Category[]
}

interface PriceRange {
  min: number
  max: number
  current: [number, number]
}

interface SidebarProps {
  categories: Category[]
  priceRange: PriceRange
}

export default function Sidebar({ categories, priceRange }: SidebarProps) {
  const { isOpen, toggleSidebar } = useSidebar()
  const [priceValues, setPriceValues] = useState<[number, number]>(priceRange.current)

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className={`
          fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200
          flex flex-col overflow-hidden md:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <button onClick={toggleSidebar} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 md:hidden">
          <Icon path={mdiClose} size={1} className="text-gray-500" />
        </button>

        {/* Header */}
        <div className="border-b border-gray-200">
          <div className="p-4 text-lg font-semibold">Thể loại</div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Categories */}
          <div className="p-4">
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id} className={`${category.isActive ? "font-semibold" : ""}`}>
                  <Link href={category.url} className="flex items-center text-sm hover:text-primary">
                    {category.isActive && <Icon path={mdiChevronLeft} size={0.8} className="mr-1 text-gray-400" />}
                    {category.name}
                  </Link>

                  {category.children && category.isActive && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 space-y-2 pl-4"
                    >
                      {category.children.map((child) => (
                        <li key={child.id} className={`${child.isActive ? "font-semibold" : ""}`}>
                          <Link href={child.url} className="text-sm hover:text-primary">
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Phạm vi giá</h3>
            <Slider
              defaultValue={priceValues}
              min={priceRange.min}
              max={priceRange.max}
              step={0.1}
              onValueChange={(value) => setPriceValues(value as [number, number])}
              className="my-6"
            />
            <div className="flex justify-between mt-2 text-sm">
              <div className="font-semibold opacity-70">{formatNumber(priceValues[0])}</div>
              <div className="font-semibold opacity-70">{formatNumber(priceValues[1])}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

