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
  mdiBookOpen,
  mdiCart,
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
            href="/category?id=e63bba6f-cacc-4820-af21-5f474aea2529&name=Đồ dùng cho thú cưng"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiPaw} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Đồ dùng cho thú cưng</span>
          </Link>
        </li>
        {/* Women's Fashion */}
        
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
            href="/category?id=5676a518-3c6b-459a-83a0-c8e0ef3fad5c&name=Xe hơi và xe máy"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiBagPersonal} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Đồ dùng du lịch</span>
          </Link>
        </li>
        {/* Souvenirs */}
        <li className="group relative">
          <Link
            href="/category?id=05b9431d-dec9-4c3b-a342-3708f137f235&name=Quà lưu niệm"
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
          >
            <Icon path={mdiGift} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Quà lưu niệm</span>
          </Link>
        </li>
        {/* Electronics */}
        <li className="flex items-center">
          <Popover>
            <PopoverTrigger
            className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
          >
            <Icon path={mdiLaptop} size={0.8} className="cat-image mr-2 opacity-60" />
            <span className="cat-name">Thiết bị điện tử</span>
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
                      <Link href="/category?id=2440992e-f551-4a80-a15b-d4768ca5d6d6&name=Laptop" className="text-reset">
                        Laptop
                </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=368654bf-8c90-4833-bddf-fbace3268c33&name=Máy ảnh kỹ thuật số" className="text-reset">
                        Máy ảnh kỹ thuật số
              </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=05d1d17f-e51e-48be-bb91-5f3ac290fe8c&name=Máy tính bảng" className="text-reset">
                        Máy tính bảng
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=02bb1893-0e28-4be9-a0e6-3726a50a4d35&name=Gadget & Các máy ảnh khác" className="text-reset">
                        Gadget & Các máy ảnh khác
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=00eb3d2a-d56f-4086-9970-51857ac27d42&name=Trò chơi trên máy console" className="text-reset">
                        Trò chơi trên máy console
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=13ec6568-ffc5-4492-b9ac-6963272d6119&name=Máy tính để bàn" className="text-reset">
                        Máy tính để bàn
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=845a2e32-cff9-4b17-b1af-d26357818f58&name=Camera hành động / Video" className="text-reset">
                        Camera hành động / Video
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=8f87d10d-5d7b-4577-90a4-b35f032dcc93&name=Điện thoại di động" className="text-reset">
                        Điện thoại di động
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=f488c94f-b738-4947-b7d8-2dd749335e21&name=Camera an ninh & Hệ thống" className="text-reset">
                        Camera an ninh & Hệ thống
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
        {/* Books */}
        <li className="flex items-center">
          <Popover>
            <PopoverTrigger
              className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Icon path={mdiBookOpen} size={0.8} className="cat-image mr-2 opacity-60" />
              <span className="cat-name">Sách</span>
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
                      <Link href="/category?id=44c0d761-b522-4c21-9075-ed1dd1735cc3&name=Art Books" className="text-reset">
                        Sách nghệ thuật
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=6cb2a264-6b02-4448-b717-05a527b6c2b0&name=Self-Help" className="text-reset">
                        Sách tự lực
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=5b68cef9-324b-44f9-9e87-36038ae26189&name=Magazines" className="text-reset">
                        Tạp chí
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=3bfd1500-ea22-4071-9ef8-b15eed347586&name=Textbooks" className="text-reset">
                        Sách giáo khoa
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=41da44a5-5c73-495a-a37d-691024fc1d18&name=Comics" className="text-reset">
                        Truyện tranh
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=d9a5e6fb-1b62-429e-9283-03294b68dfed&name=Stationery" className="text-reset">
                        Văn phòng phẩm
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=8e41aca3-27e2-4f81-9213-f10a1372725f&name=Children's Books" className="text-reset">
                        Sách thiếu nhi
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=e302c668-b6ef-4356-8088-c4352a7c5a79&name=Fiction" className="text-reset">
                        Tiểu thuyết
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=90789283-c3cf-484c-aab8-d3ab84c2a0a9&name=Cookbooks" className="text-reset">
                        Sách nấu ăn
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </li>
        {/* New category: Hàng tạp hoá */}
        <li className="flex items-center">
          <Popover>
            <PopoverTrigger
              className="py-2 px-3 hover:bg-gray-100 w-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Icon path={mdiCart} size={0.8} className="cat-image mr-2 opacity-60" />
              <span className="cat-name">Hàng tạp hoá</span>
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
                      <Link href="/category?id=6441ca14-5838-4f6a-917a-c6a44ef80d39&name=Frozen Foods" className="text-reset">
                        Thực phẩm đông lạnh
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=f43f3000-c4ff-431f-98e2-973827d71f9c&name=Dairy" className="text-reset">
                        Sản phẩm từ sữa
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=1a7fb407-4089-496e-9efe-9ef785daa5bf&name=Fresh Produce" className="text-reset">
                        Rau củ quả tươi
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=23c88963-914d-4d62-9c03-15211ae6196f&name=Canned Goods" className="text-reset">
                        Đồ hộp
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=0008eb50-aacb-4ea7-b1fd-331b1839112a&name=Bakery" className="text-reset">
                        Bánh mì & bánh ngọt
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=934134bf-f856-45f3-a749-ff8c21de607e&name=Condiments" className="text-reset">
                        Gia vị & nước sốt
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="card shadow-none border-0">
                  <ul className="list-unstyled mb-3">
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=18dc4525-1a3d-47cf-a78c-10aaf7ec39de&name=Snacks" className="text-reset">
                        Đồ ăn vặt
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=2ba17ef6-3a0a-460b-b283-360f98303de4&name=Pasta & Grains" className="text-reset">
                        Mì & ngũ cốc
                      </Link>
                    </li>
                    <li className="py-2 px-3 hover:bg-gray-100 w-full">
                      <Link href="/category?id=97360822-e84c-4151-84da-4c9bad68ce24&name=Beverages" className="text-reset">
                        Đồ uống
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
                  href="/category?id=e63bba6f-cacc-4820-af21-5f474aea2529&name=Đồ dùng cho thú cưng"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiPaw} size={0.8} className="mr-2 opacity-60" />
                  <span>Đồ dùng cho thú cưng</span>
                </Link>
              </AccordionItem>

              {/* Women's Fashion */}
              <AccordionItem value="womens-fashion" className="border-b">
                <Link
                  href="/category?id=YOUR_WOMEN_FASHION_CATEGORY_ID&name=Thời trang nữ"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiDresser} size={0.8} className="mr-2 opacity-60" />
                  <span>Thời trang nữ</span>
                </Link>
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
                      Dép nam
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
                      Kính mắt nam
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Quần áo nam
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Túi xách nam
                    </Link>
                    <Link
                      href="/categories"
                      className="block py-2 text-gray-700 hover:text-main-golden-orange"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Phụ kiện nam
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Travel Accessories */}
              <AccordionItem value="travel" className="border-b">
                <Link
                  href="/category?id=5676a518-3c6b-459a-83a0-c8e0ef3fad5c&name=Đồ dùng du lịch"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiBagPersonal} size={0.8} className="mr-2 opacity-60" />
                  <span>Đồ dùng du lịch</span>
                </Link>
              </AccordionItem>

              {/* Souvenirs */}
              <AccordionItem value="souvenirs" className="border-b">
                <Link
                  href="/category?id=05b9431d-dec9-4c3b-a342-3708f137f235&name=Quà lưu niệm"
                  className="flex items-center py-3 px-4 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon path={mdiGift} size={0.8} className="mr-2 opacity-60" />
                  <span>Quà lưu niệm</span>
                </Link>
              </AccordionItem>

              {/* Electronics */}
              <AccordionItem value="electronics" className="border-b">
                <AccordionTrigger className="py-3 px-4 hover:bg-gray-100 hover:no-underline">
                  <div className="flex items-center">
                    <Icon path={mdiLaptop} size={0.8} className="mr-2 opacity-60" />
                    <span>Thiết bị điện tử</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 pr-4">
                    <Link href="/category?id=2440992e-f551-4a80-a15b-d4768ca5d6d6&name=Laptop" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Laptop</Link>
                    <Link href="/category?id=368654bf-8c90-4833-bddf-fbace3268c33&name=Máy ảnh kỹ thuật số" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Máy ảnh kỹ thuật số</Link>
                    <Link href="/category?id=05d1d17f-e51e-48be-bb91-5f3ac290fe8c&name=Máy tính bảng" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Máy tính bảng</Link>
                    <Link href="/category?id=02bb1893-0e28-4be9-a0e6-3726a50a4d35&name=Gadget & Các máy ảnh khác" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Gadget & Các máy ảnh khác</Link>
                    <Link href="/category?id=00eb3d2a-d56f-4086-9970-51857ac27d42&name=Trò chơi trên máy console" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Trò chơi trên máy console</Link>
                    <Link href="/category?id=13ec6568-ffc5-4492-b9ac-6963272d6119&name=Máy tính để bàn" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Máy tính để bàn</Link>
                    <Link href="/category?id=845a2e32-cff9-4b17-b1af-d26357818f58&name=Camera hành động / Video" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Camera hành động / Video</Link>
                    <Link href="/category?id=8f87d10d-5d7b-4577-90a4-b35f032dcc93&name=Điện thoại di động" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Điện thoại di động</Link>
                    <Link href="/category?id=f488c94f-b738-4947-b7d8-2dd749335e21&name=Camera an ninh & Hệ thống" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Camera an ninh & Hệ thống</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Kids & Toys */}
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

              {/* Cleaning & Laundry */}
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

              {/* Adult Products */}
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

              {/* Health & Beauty */}
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

              {/* Books */}
              <AccordionItem value="books" className="border-b">
                <AccordionTrigger className="py-3 px-4 hover:bg-gray-100 hover:no-underline">
                  <div className="flex items-center">
                    <Icon path={mdiBookOpen} size={0.8} className="mr-2 opacity-60" />
                    <span>Sách</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 pr-4">
                    <Link href="/category?id=44c0d761-b522-4c21-9075-ed1dd1735cc3&name=Art Books" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Sách nghệ thuật</Link>
                    <Link href="/category?id=6cb2a264-6b02-4448-b717-05a527b6c2b0&name=Self-Help" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Sách tự lực</Link>
                    <Link href="/category?id=5b68cef9-324b-44f9-9e87-36038ae26189&name=Magazines" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Tạp chí</Link>
                    <Link href="/category?id=3bfd1500-ea22-4071-9ef8-b15eed347586&name=Textbooks" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Sách giáo khoa</Link>
                    <Link href="/category?id=41da44a5-5c73-495a-a37d-691024fc1d18&name=Comics" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Truyện tranh</Link>
                    <Link href="/category?id=d9a5e6fb-1b62-429e-9283-03294b68dfed&name=Stationery" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Văn phòng phẩm</Link>
                    <Link href="/category?id=8e41aca3-27e2-4f81-9213-f10a1372725f&name=Children's Books" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Sách thiếu nhi</Link>
                    <Link href="/category?id=e302c668-b6ef-4356-8088-c4352a7c5a79&name=Fiction" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Tiểu thuyết</Link>
                    <Link href="/category?id=90789283-c3cf-484c-aab8-d3ab84c2a0a9&name=Cookbooks" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Sách nấu ăn</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Groceries */}
              <AccordionItem value="groceries" className="border-b">
                <AccordionTrigger className="py-3 px-4 hover:bg-gray-100 hover:no-underline">
                  <div className="flex items-center">
                    <Icon path={mdiCart} size={0.8} className="mr-2 opacity-60" />
                    <span>Hàng tạp hoá</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 pr-4">
                    <Link href="/category?id=6441ca14-5838-4f6a-917a-c6a44ef80d39&name=Frozen Foods" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Thực phẩm đông lạnh</Link>
                    <Link href="/category?id=f43f3000-c4ff-431f-98e2-973827d71f9c&name=Dairy" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Sản phẩm từ sữa</Link>
                    <Link href="/category?id=1a7fb407-4089-496e-9efe-9ef785daa5bf&name=Fresh Produce" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Rau củ quả tươi</Link>
                    <Link href="/category?id=23c88963-914d-4d62-9c03-15211ae6196f&name=Canned Goods" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Đồ hộp</Link>
                    <Link href="/category?id=0008eb50-aacb-4ea7-b1fd-331b1839112a&name=Bakery" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Bánh mì & bánh ngọt</Link>
                    <Link href="/category?id=934134bf-f856-45f3-a749-ff8c21de607e&name=Condiments" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Gia vị & nước sốt</Link>
                    <Link href="/category?id=18dc4525-1a3d-47cf-a78c-10aaf7ec39de&name=Snacks" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Đồ ăn vặt</Link>
                    <Link href="/category?id=2ba17ef6-3a0a-460b-b283-360f98303de4&name=Pasta & Grains" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Mì & ngũ cốc</Link>
                    <Link href="/category?id=97360822-e84c-4151-84da-4c9bad68ce24&name=Beverages" className="block py-2 text-gray-700 hover:text-main-golden-orange" onClick={() => setIsMobileMenuOpen(false)}>Đồ uống</Link>
                  </div>
                </AccordionContent>
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

