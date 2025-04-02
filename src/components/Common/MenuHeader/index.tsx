"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Icon } from "@mdi/react"
import {
  mdiMenu,
  mdiPaw,
  mdiDresser,
  mdiBagPersonal,
  mdiGift,
  mdiLaptop,
  mdiToyBrick,
  mdiWashingMachine,
  mdiHeart,
  mdiLipstick,
  mdiChevronRight,
  mdiClose,
  mdiChevronDown,
  mdiPackage,
} from "@mdi/js"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { menuItems } from "./mockData"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MenuHeader() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const popoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()

    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleMouseEnter = () => {
    if (popoverTimeoutRef.current) {
      clearTimeout(popoverTimeoutRef.current)
    }
    setIsPopoverOpen(true)
  }

  const handleMouseLeave = () => {
    popoverTimeoutRef.current = setTimeout(() => {
      setIsPopoverOpen(false)
    }, 200)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  }

  const CategoryPopover = () => (
    <div className="aiz-category-menu rounded-none border-none">
      <ul className="list-unstyled categories no-scrollbar py-2 mb-0 text-left">
        {/* Pet Supplies */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiPaw} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Đồ dùng cho thú cưng</span>
          </Link>
        </li>
        {/* Women's Fashion */}
        <li className="flex items-center">
          <Popover>
            <PopoverTrigger
              className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Icon path={mdiDresser} size={0.8} className="cat-image mr-2 opacity-60" />
              <span className="cat-name">Thời trang nữ và phụ kiện</span>
              <Icon path={mdiChevronRight} size={0.8} className="ml-auto opacity-60" />
            </PopoverTrigger>
            <PopoverContent
              className="w-full rounded-none border shadow-sm !p-1"
              align="center"
              side="right"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Women Underwear
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Kính mát nữ
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Giày dép nữ
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Kính mắt nữ
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Quần áo nữ
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link
                        href="/categories"
                        className="text-reset"
                      >
                        Quần áo nữ nội y, ngủ & thư giãn
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Túi xách phụ nữ
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Phụ kiện nữ
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Đồ bơi và đồ dạo biển
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        {/* Men's Fashion */}
        <li className="flex items-center">
          <Popover>
            <PopoverTrigger
              className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Icon path={mdiBagPersonal} size={0.8} className="cat-image mr-2 opacity-60" />
              <span className="cat-name">Thời trang nam</span>
              <Icon path={mdiChevronRight} size={0.8} className="ml-auto opacity-60" />
            </PopoverTrigger>
            <PopoverContent
              className="w-full rounded-none border shadow-sm !p-1"
              align="center"
              side="right"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Đồ lót nam
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Mũ nam
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Dép nam
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Kính mát nam
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Giày dép nam
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Kính mắt nam
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Quần áo nam
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Túi xách nam
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/categories" className="text-reset">
                        Phụ kiện nam
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        {/* Travel Accessories */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiBagPersonal} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Đồ dùng du lịch</span>
          </Link>
        </li>
        {/* Souvenirs */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiGift} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Quà lưu niệm</span>
          </Link>
        </li>
        {/* Electronics */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiLaptop} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Thiết bị điện tử</span>
          </Link>
        </li>
        {/* Kids & Toys */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiToyBrick} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Trẻ em & đồ chơi</span>
          </Link>
        </li>
        {/* Cleaning & Laundry */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiWashingMachine} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Thiết bị giặt và vệ sinh</span>
          </Link>
        </li>
        {/* Adult Products */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiHeart} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Sản phẩm người lớn</span>
          </Link>
        </li>
        {/* Health & Beauty */}
        <li className="group relative">
          <Link
            href="/categories"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiLipstick} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Sức khoẻ và làm đẹp</span>
          </Link>
        </li>
      </ul>
    </div>
  )

  // Mobile menu component
  const MobileMenu = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMobileMenuOpen(false)}>
        <div className="bg-white h-full w-[85%] max-w-[320px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Danh mục</h2>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <Icon path={mdiClose} size={1} />
            </button>
          </div>

          <div className="p-2">
            {/* Main menu items */}
            <div className="mb-4">
              {menuItems.slice(3, menuItems.length).map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`block py-3 px-4 ${
                    pathname?.includes(item.href) && item.href !== "/" ? "text-main-golden-orange" : "text-gray-800"
                  } hover:bg-gray-100`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Categories accordion */}
            <Accordion type="single" collapsible className="w-full">
              {/* Pet Supplies */}
              <AccordionItem value="pet-supplies" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiPaw} size={0.8} className="mr-2 opacity-60" />
                  <span>Đồ dùng cho thú cưng</span>
                </Link>
              </AccordionItem>

              {/* Women's Fashion */}
              <AccordionItem value="womens-fashion" className="border-b">
                <AccordionTrigger className="py-3 px-4 hover:bg-gray-100 hover:no-underline">
                  <div className="flex items-center">
                    <Icon path={mdiDresser} size={0.8} className="mr-2 opacity-60" />
                    <span>Thời trang nữ và phụ kiện</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 pr-4">
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Women Underwear
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kính mát nữ
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Giày dép nữ
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kính mắt nữ
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Quần áo nữ
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Túi xách phụ nữ
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Men's Fashion */}
              <AccordionItem value="mens-fashion" className="border-b">
                <AccordionTrigger className="py-3 px-4 hover:bg-gray-100 hover:no-underline">
                  <div className="flex items-center">
                    <Icon path={mdiBagPersonal} size={0.8} className="mr-2 opacity-60" />
                    <span>Thời trang nam</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 pr-4">
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đồ lót nam
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mũ nam
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Kính mát nam
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Giày dép nam
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Quần áo nam
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Other categories */}
              <AccordionItem value="travel" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiBagPersonal} size={0.8} className="mr-2 opacity-60" />
                  <span>Đồ dùng du lịch</span>
                </Link>
              </AccordionItem>

              <AccordionItem value="souvenirs" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiGift} size={0.8} className="mr-2 opacity-60" />
                  <span>Quà lưu niệm</span>
                </Link>
              </AccordionItem>

              <AccordionItem value="electronics" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiLaptop} size={0.8} className="mr-2 opacity-60" />
                  <span>Thiết bị điện tử</span>
                </Link>
              </AccordionItem>

              <AccordionItem value="kids" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiToyBrick} size={0.8} className="mr-2 opacity-60" />
                  <span>Trẻ em & đồ chơi</span>
                </Link>
              </AccordionItem>

              <AccordionItem value="cleaning" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiWashingMachine} size={0.8} className="mr-2 opacity-60" />
                  <span>Thiết bị giặt và vệ sinh</span>
                </Link>
              </AccordionItem>

              <AccordionItem value="adult" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiHeart} size={0.8} className="mr-2 opacity-60" />
                  <span>Sản phẩm người lớn</span>
                </Link>
              </AccordionItem>

              <AccordionItem value="health" className="border-b">
                <Link
                  href="/categories"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiLipstick} size={0.8} className="mr-2 opacity-60" />
                  <span>Sức khoẻ và làm đẹp</span>
                </Link>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:flex items-center px-4 h-10 bg-[#37475A]"
        initial="closed"
        animate="open"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mr-2">
          <Icon path={mdiMenu} size={1} className="text-gray-400" />
        </div>

        <div className="flex space-x-6 overflow-x-auto no-scrollbar">
          {menuItems.map((item, index) => (
            <motion.div key={index}>
              {item.href === "/category/all-categories" ? (
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      <div
                        className={`flex items-center space-x-2 ${
                          pathname?.includes(item.href) && item.href !== "/category/all-categories"
                            ? "text-main-golden-orange border-transparent"
                            : "text-gray-400 border-transparent"
                        } border-b-2 hover:text-main-golden-orange hover:border-main-golden-orange transition-colors duration-200 cursor-default pointer-events-none`}
                      >
                        <span>{item.label}</span>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 p-0 rounded-none border-none shadow-sm"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    side="top"
                    align="end"
                  >
                    <CategoryPopover />
                  </PopoverContent>
                </Popover>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 ${
                    pathname?.includes(item.href) && item.href !== "/"
                      ? "text-main-golden-orange border-transparent"
                      : "text-gray-400 border-transparent"
                  } border-b-2 hover:text-main-golden-orange hover:border-main-golden-orange transition-colors duration-200`}
                >
                  <span>{item.label}</span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 h-10 bg-[#37475A]">
        <button onClick={toggleMobileMenu} className="text-gray-400 hover:text-main-golden-orange" aria-label="Menu">
          <Icon path={mdiPackage} size={1} />
        </button>

        <div className="overflow-x-auto no-scrollbar flex-1 mx-2">
          <div className="flex space-x-4">
            {menuItems.slice(0, 3).map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`whitespace-nowrap ${
                  pathname?.includes(item.href) && item.href !== "/" ? "text-main-golden-orange" : "text-gray-400"
                } hover:text-main-golden-orange transition-colors duration-200`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && <MobileMenu />}

      {/* Mobile Categories Popover */}
      {isPopoverOpen && isMobile && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsPopoverOpen(false)}>
          <div className="bg-white w-full max-h-[80vh] overflow-y-auto absolute bottom-0 rounded-t-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Tất cả danh mục</h2>
              <button onClick={() => setIsPopoverOpen(false)}>
                <Icon path={mdiClose} size={1} />
              </button>
            </div>
            <CategoryPopover />
          </div>
        </div>
      )}
    </>
  )
}

