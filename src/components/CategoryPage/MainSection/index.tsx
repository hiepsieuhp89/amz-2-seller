'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Icon } from '@mdi/react'
import { mdiStar, mdiStarOutline, mdiHeartOutline, mdiSyncAlert, mdiCartOutline, mdiMenu } from '@mdi/js'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSidebar } from '../SidebarContext'

interface Breadcrumb {
  name: string
  url: string
  isActive?: boolean
}

interface Brand {
  id: string
  name: string
}

interface SortOption {
  value: string
  label: string
}

interface Product {
  id: string
  title: string
  price: number
  rating: number
  imageUrl: string
  url: string
  clubPoints: number
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  pages: number[]
}

interface MainSectionProps {
  breadcrumbs: Breadcrumb[]
  title: string
  brands: Brand[]
  sortOptions: SortOption[]
  products: Product[]
  pagination: PaginationInfo
}

export default function MainSection({
  breadcrumbs,
  title,
  brands,
  sortOptions,
  products,
  pagination
}: MainSectionProps) {
  const { toggleSidebar } = useSidebar()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex-1 min-h-screen">
      <div className="p-4 pt-0 pl-8">
        {/* Breadcrumbs */}
        <div className="flex items-center mb-4">
          <button 
            onClick={toggleSidebar} 
            className="md:hidden mr-3 p-1 rounded hover:bg-gray-200"
            aria-label="Toggle sidebar"
          >
            <Icon path={mdiMenu} size={1} />
          </button>
          
          <nav className="flex">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <Link 
                  href={item.url} 
                  className={`text-sm ${item.isActive ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}
                >
                  {item.name}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-2 text-gray-500">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Title and Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-xl font-semibold mb-4 md:mb-0">{title}</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-48">
              <label className="block text-sm text-gray-500 mb-1">Nhãn hiệu</label>
              <Select>
                <SelectTrigger className='bg-white'>
                  <SelectValue placeholder="Tất cả các thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả các thương hiệu</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-48">
              <label className="block text-sm text-gray-500 mb-1">Sắp xếp theo</label>
              <Select defaultValue={sortOptions[0].value}>
                <SelectTrigger className='bg-white'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map(product => (
            <motion.div 
              key={product.id}
              variants={itemVariants}
              className="bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Link href={`/shop/product?id=${product.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <Image 
                      src={product.imageUrl} 
                      alt={product.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button className="bg-white rounded-full p-1.5 shadow hover:bg-gray-100">
                    <Icon path={mdiHeartOutline} size={0.8} className="text-gray-600" />
                  </button>
                  <button className="bg-white rounded-full p-1.5 shadow hover:bg-gray-100">
                    <Icon path={mdiSyncAlert} size={0.8} className="text-gray-600" />
                  </button>
                  <button className="bg-white rounded-full p-1.5 shadow hover:bg-gray-100">
                    <Icon path={mdiCartOutline} size={0.8} className="text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-3">
                <div className="text-primary font-bold">${product.price.toFixed(2)}</div>
                
                <div className="flex mt-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i} 
                      path={i < product.rating ? mdiStar : mdiStarOutline} 
                      size={0.7} 
                      className="text-amber-500" 
                    />
                  ))}
                </div>
                
                <h3 className="text-sm font-semibold line-clamp-2 h-10 mb-2">
                  <Link href={`/shop/product?id=${product.id}`} className="hover:text-primary">
                    {product.title}
                  </Link>
                </h3>
                
                <div className="bg-primary/10 border border-primary/20 rounded px-2 py-1 text-xs">
                  Điểm câu lạc bộ: <span className="font-bold float-right">{product.clubPoints}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center">
            <Link 
              href={pagination.currentPage > 1 ? `?page=${pagination.currentPage - 1}` : '#'} 
              className={`px-3 py-1 mx-1 rounded ${pagination.currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
              aria-disabled={pagination.currentPage === 1}
            >
              ‹
            </Link>
            
            {pagination.pages.map(page => (
              <Link
                key={page}
                href={`?page=${page}`}
                className={`h-9 w-9 flex items-center justify-center mx-1 rounded-full ${page === pagination.currentPage ? 'bg-main-charcoal-blue text-white' : 'text-gray-700 hover:bg-main-charcoal-blue bg-white hover:text-white'}`}
                
              >
                {page}
              </Link>
            ))}
            
            {pagination.totalPages > 10 && pagination.currentPage < pagination.totalPages - 5 && (
              <span className="px-3 py-1 mx-1">...</span>
            )}
            
            <Link 
              href={pagination.currentPage < pagination.totalPages ? `?page=${pagination.currentPage + 1}` : '#'} 
              className={`px-3 py-1 mx-1 rounded ${pagination.currentPage === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
              aria-disabled={pagination.currentPage === pagination.totalPages}
            >
              ›
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
