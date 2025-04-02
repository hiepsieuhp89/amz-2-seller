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
import { useCategoryDetail } from '@/hooks/categories'

export default function CategoryPage({ id }: { id: string }) {
  const { categoryData, isLoading, isFetching } = useCategoryDetail(id)

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (!categoryData) {
    return <div>Category not found</div>
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen"
    >
      <Header/>
      <MenuHeader/>
      <SidebarProvider>
        <div className="flex px-[104px] max-w-[1500px] bg-[#E3E6E6] pt-4 pb-8">
          <Sidebar 
            categories={mockData.categories} 
            priceRange={mockData.priceRange} 
          />
          <MainSection 
            breadcrumbs={mockData.breadcrumbs}
            title={mockData.title}
            brands={mockData.brands}
            sortOptions={mockData.sortOptions}
            products={mockData.products}
            pagination={mockData.pagination}
          />
        </div>
      </SidebarProvider>
      <Footer/>
    </motion.div>
  )
}
