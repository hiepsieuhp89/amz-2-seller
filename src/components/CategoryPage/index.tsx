'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import MainSection from './MainSection'
import { mockData } from './mockData'
import { SidebarProvider } from './SidebarContext'
import { Header } from '../Common/Header'
import { Footer } from '../Common/Footer'
import MenuHeader from '../Common/MenuHeader'

export default function CategoryPage() {
  return (
    <main className="bg-[#E3E6E6]">
      <Header />
      <MenuHeader />
      <div className="max-w-[1440px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 min-h-screen"
      >

        <SidebarProvider>
          <div className="flex  max-w-[1440px] bg-[#E3E6E6] pt-4 pb-8
        px-4
        md:px-10
        lg:px-20
        xl:px-[104px]
        ">
            <Sidebar
              categories={mockData.categories}
              priceRange={mockData.priceRange}
            />
            <MainSection
              brands={mockData.brands}
              sortOptions={mockData.sortOptions}
            />
          </div>
        </SidebarProvider>
      </motion.div>
      </div>
      <Footer />
    </main>
  )
}
