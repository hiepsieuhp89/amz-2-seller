"use client"

import { useEffect, useState, useRef } from "react"
import { Input } from "antd"
import Icon from "@mdi/react"
import { mdiMagnify, mdiChevronDown, mdiCart, mdiMenu, mdiCog } from "@mdi/js"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/context/useUserContext"
import { logout } from "@/api/axios"
import { useRouter } from "next/navigation"
import { useProducts } from "@/hooks/products"
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useSelectedProduct } from "@/stores/useSelectedProduct"
import { IProduct } from "@/interface/response/products"

interface LanguageOption {
    code: string
    name: string
    flag: string
}

interface CurrencyOption {
    code: string
    name: string
    symbol: string
}

const languages: LanguageOption[] = [
    { code: "vn", name: "Tiếng Việt", flag: "vn" },
    { code: "en", name: "English", flag: "gb" },
    { code: "cn", name: "中国人", flag: "cn" },
    { code: "kr", name: "한국인", flag: "kr" },
    { code: "id", name: "Indonesia", flag: "id" },
    { code: "ru", name: "Русский", flag: "ru" },
]

const currencies: CurrencyOption[] = [
    { code: "USD", name: "U.S. Dollar", symbol: "$" },
    { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
]

export function Header() {
    const { user } = useUser()
    const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(languages[0])
    const [currentCurrency, setCurrency] = useState<CurrencyOption>(currencies[0])
    const cartItemCount = 0
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchExpanded, setSearchExpanded] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showResults, setShowResults] = useState(false)
    const desktopSearchRef = useRef<HTMLDivElement>(null)
    const mobileSearchRef = useRef<HTMLDivElement>(null)
    const {setSelectedProduct} = useSelectedProduct()
    
    // Use the useProducts hook with search parameters
    const { data: productsData, isLoading } = useProducts({
        search: searchQuery,
        take: 100,
        page: 1
    })

    useEffect(() => {
        setIsMounted(true)
        
        // Add click event listener to detect clicks outside search results
        const handleClickOutside = (event: MouseEvent) => {
            if (
                (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target as Node)) &&
                (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node))
            ) {
                setShowResults(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLanguageChange = (language: LanguageOption) => {
        setCurrentLanguage(language)
        setMobileMenuOpen(false)
    }

    const handleCurrencyChange = (currency: CurrencyOption) => {
        setCurrency(currency)
        setMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
        if (searchExpanded) setSearchExpanded(false)
    }

    const toggleSearch = () => {
        setSearchExpanded(!searchExpanded)
        if (mobileMenuOpen) setMobileMenuOpen(false)
    }

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        setShowResults(value.length > 0)
    }

    // Handle search submit
    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            setShowResults(false)
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }
    
    // Handle product selection from search results
    const handleSelectProduct = (productId: string) => {
        setShowResults(false)
        router.push(`/product?id=${productId}`)
        setSelectedProduct(productsData?.data?.data?.find((product: any) => product.id === productId) as IProduct)
    }

    return (
        <>
            <header className="bg-[#232F3E] text-gray-400 px-4 py-2 relative z-30">
                {/* Desktop Header */}
                <div className="hidden md:flex items-center justify-between gap-2">
                    <Link href="/" className="flex-shrink-0">
                        <Image 
                            src="/images/logo.png" 
                            alt="Amazon" 
                            width={80} 
                            height={34} 
                            className="cursor-pointer" 
                            quality={100}
                            priority 
                        />
                    </Link>

                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-[550px] min-w-[250px]" ref={desktopSearchRef}>
                        <Input 
                            placeholder="Tôi đang tìm mua..." 
                            className="py-2 pr-10 h-[38px] rounded-sm w-full"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onPressEnter={handleSearchSubmit}
                            onFocus={() => searchQuery && setShowResults(true)}
                        />
                        <div 
                            className="absolute right-0 top-0 h-full flex items-center justify-center bg-[#febd69] w-[45px] rounded-r-sm cursor-pointer"
                            onClick={handleSearchSubmit}
                        >
                            <Icon path={mdiMagnify} size={0.8} color="#232F3E" />
                        </div>
                        
                        {/* Search Results Dropdown */}
                        {showResults && searchQuery && (
                            <div className="absolute left-0 right-0 top-[38px] bg-white shadow-lg z-50 max-h-[400px] overflow-y-auto">
                                {isLoading ? (
                                    <div className="p-4 text-center text-gray-600">Đang tìm kiếm...</div>
                                ) : productsData?.data?.data && productsData.data.data.length > 0 ? (
                                    <div>
                                        {productsData.data.data?.map((product: any) => (
                                            <div 
                                                key={product.id} 
                                                className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b"
                                                onClick={() => handleSelectProduct(product.id)}
                                            >
                                                <div className="w-12 h-12 flex-shrink-0 bg-gray-100 relative">
                                                    {product.imageUrls && product.imageUrls.length > 0 ? (
                                                        <Image
                                                            src={product.imageUrls[0]}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                            No image
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-900 font-medium truncate">{product.name}</p>
                                                    <p className="text-sm text-red-600 font-bold">{currentCurrency.symbol}{product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="p-2 text-center">
                                            <button 
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                onClick={handleSearchSubmit}
                                            >
                                                Xem tất cả kết quả
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 text-center text-gray-600">Không tìm thấy sản phẩm nào</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-2 flex-shrink-0">
                        {/* Language Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center cursor-pointer px-2 focus:outline-none">
                                <span className={`fi fi-${currentLanguage.flag} mr-2`}></span>
                                <span className="mr-1 text-gray-400">{currentLanguage.name}</span>
                                <Icon path={mdiChevronDown} size={0.6} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white rounded-none shadow-md z-50">
                                {languages.map((language) => (
                                    <DropdownMenuItem 
                                        key={language.code}
                                        onClick={() => handleLanguageChange(language)}
                                        className={`rounded-none flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                            language.code === currentLanguage.code ? "bg-gray-100" : ""
                                        }`}
                                    >
                                        <span className={`fi fi-${language.flag} mr-2`}></span>
                                        <span>{language.name}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User Account */}
                        <Link href="/sign-in" className="px-2">
                            <div className="flex flex-col">
                                {!isMounted ? null : (
                                    <>
                                        {!user && <span
                                            onClick={() => router.push("/sign-in")}
                                            className="text-xs text-gray-400 transition-all duration-300 cursor-pointer">Xin chào. Đăng nhập</span>}
                                        {user && <span
                                            onClick={() => router.push("/seller/products/storehouse")}
                                            className="font-bold text-sm text-gray-400 hover:!text-white/80 transition-all duration-300">Bảng điều khiển của tôi</span>}
                                        {!user && <span className="font-bold text-sm text-gray-400 hover:!text-white/80 transition-all duration-300">Tài khoản và danh sách mong muốn</span>}
                                    </>
                                )}
                            </div>
                        </Link>
                        {isMounted && user && (
                            <div className="font-bold text-sm text-gray-400 cursor-pointer hover:!text-white/80 transition-all duration-300" onClick={() => logout()}>
                                Đăng xuất
                            </div>
                        )}

                        {/* Currency Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center cursor-pointer px-2 focus:outline-none">
                                <span className="mr-1 text-gray-400 text-sm transition-all duration-300 hover:!text-white/80 font-bold">
                                    {currentCurrency.name} {currentCurrency.symbol}
                                </span>
                                <Icon path={mdiChevronDown} size={0.6} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white rounded-none shadow-md z-50">
                                {currencies.map((currency) => (
                                    <DropdownMenuItem 
                                        key={currency.code}
                                        onClick={() => handleCurrencyChange(currency)}
                                        className={`rounded-none px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                            currency.code === currentCurrency.code ? "bg-gray-100" : ""
                                        }`}
                                    >
                                        <span>
                                            {currency.name} {currency.symbol}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Shopping Cart */}
                        <Link href="/cart" className="flex items-center px-2">
                            <div className="relative flex items-center">
                                <Icon path={mdiCart} size={1} color="#E3E6E6" />
                                <span className="ml-1 font-bold text-gray-400 text-sm transition-all duration-300 hover:!text-white/80">{cartItemCount} giỏ hàng</span>
                            </div>
                        </Link>
                    </nav>
                </div>

                {/* Mobile Header */}
                <div className="flex md:hidden items-center justify-between">
                    <div className="flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-300 hover:text-white p-1 mr-2"
                            aria-label="Menu"
                        >
                            <Icon path={mdiMenu} size={0.9} />
                        </button>
                        <Link href="/" className="flex-shrink-0">
                            <Image 
                                src="/images/logo.png" 
                                alt="Amazon" 
                                width={60} 
                                height={25} 
                                className="cursor-pointer" 
                                quality={100}
                                priority 
                            />
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleSearch}
                            className="text-gray-300 hover:text-white p-1"
                            aria-label="Search"
                        >
                            <Icon path={mdiMagnify} size={0.9} />
                        </button>
                        <Link href="/cart" className="text-gray-300 hover:text-white p-1">
                            <div className="relative">
                                <Icon path={mdiCart} size={0.9} />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#febd69] text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <button
                            onClick={() => router.push(user ? "/seller/dashboard" : "/sign-in")}
                            className="text-gray-300 hover:text-white p-1"
                            aria-label="Account"
                        >
                            <Icon path={mdiCog} size={0.9} />
                        </button>
                    </div>
                </div>

                {/* Mobile Search - Expandable */}
                {searchExpanded && (
                    <div className="md:hidden mt-2 relative w-full" ref={mobileSearchRef}>
                        <Input
                            placeholder="Tôi đang tìm mua..."
                            className="py-1 pr-10 h-[34px] rounded-sm w-full min-w-[200px]"
                            autoFocus
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onPressEnter={handleSearchSubmit}
                            onFocus={() => searchQuery && setShowResults(true)}
                        />
                        <div 
                            className="absolute right-0 top-0 h-full flex items-center justify-center bg-[#febd69] w-[40px] rounded-r-sm cursor-pointer"
                            onClick={handleSearchSubmit}
                        >
                            <Icon path={mdiMagnify} size={0.7} color="#232F3E" />
                        </div>
                        
                        {/* Mobile Search Results Dropdown */}
                        {showResults && searchQuery && (
                            <div className="fixed left-0 right-0 top-[87px] bg-white shadow-lg z-50 max-h-[60vh] overflow-y-auto">
                                {isLoading ? (
                                    <div className="p-3 text-center text-gray-600">Đang tìm kiếm...</div>
                                ) : productsData?.data?.data && productsData.data.data.length > 0 ? (
                                    <div>
                                        {productsData.data.data.slice(0, 5).map((product: any) => (
                                            <div 
                                                key={product.id} 
                                                className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer border-b"
                                                onClick={() => handleSelectProduct(product.id)}
                                            >
                                                <div className="w-12 h-12 flex-shrink-0 bg-gray-100 relative">
                                                    {product.imageUrls && product.imageUrls.length > 0 ? (
                                                        <Image
                                                            src={product.imageUrls[0]}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                            No image
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-gray-900 font-medium truncate">{product.name}</p>
                                                    <p className="text-sm text-red-600 font-bold">{currentCurrency.symbol}{product.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="p-2 text-center">
                                            <button 
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                onClick={handleSearchSubmit}
                                            >
                                                Xem tất cả kết quả
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-3 text-center text-gray-600">Không tìm thấy sản phẩm nào</div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                
                {/* Tablet Navigation - Shows on medium screens */}
                <div className="hidden md:flex lg:hidden mt-2 justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-300 hover:text-white p-1"
                            aria-label="Menu"
                        >
                            <Icon path={mdiMenu} size={0.8} />
                            <span className="ml-1 text-xs">Danh mục</span>
                        </button>
                        <span className="text-xs text-gray-300">Khuyến mãi</span>
                        <span className="text-xs text-gray-300">Bán chạy</span>
                    </div>
                    <Link href="/cart" className="text-gray-300 hover:text-white p-1">
                        <div className="flex items-center">
                            <Icon path={mdiCart} size={0.8} />
                            <span className="ml-1 text-xs">Giỏ hàng ({cartItemCount})</span>
                        </div>
                    </Link>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
                    <div className="bg-[#232F3E] h-full w-[80%] max-w-[300px] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        {/* User Account Section */}
                        <div className="bg-[#37475A] p-4 text-white">
                            {!isMounted ? null : (
                                <>
                                    {!user ? (
                                        <div onClick={() => {
                                            router.push("/sign-in")
                                            setMobileMenuOpen(false)
                                        }} className="cursor-pointer">
                                            <h3 className="font-bold text-lg">Xin chào. Đăng nhập</h3>
                                            <p className="text-sm">Tài khoản và danh sách mong muốn</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div onClick={() => {
                                                router.push("/seller/products/storehouse")
                                                setMobileMenuOpen(false)
                                            }} className="cursor-pointer">
                                                <h3 className="font-bold text-lg">Xin chào, {user.username || 'Người dùng'}</h3>
                                                <p className="text-sm">Bảng điều khiển của tôi</p>
                                            </div>
                                            <div className="font-bold text-sm cursor-pointer hover:text-white/80"
                                                onClick={() => {
                                                    logout()
                                                    setMobileMenuOpen(false)
                                                }}>
                                                Đăng xuất
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Menu Categories */}
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white font-bold mb-2">Danh mục sản phẩm</h3>
                            <ul className="space-y-2">
                                <li className="py-1 cursor-pointer text-gray-400 hover:text-white">Tất cả sản phẩm</li>
                                <li className="py-1 cursor-pointer text-gray-400 hover:text-white">Khuyến mãi</li>
                                <li className="py-1 cursor-pointer text-gray-400 hover:text-white">Sản phẩm bán chạy</li>
                                <li className="py-1 cursor-pointer text-gray-400 hover:text-white">Sản phẩm mới</li>
                            </ul>
                        </div>

                        {/* Language Selector */}
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white font-bold mb-2">Ngôn ngữ</h3>
                            <ul className="space-y-2">
                                {languages.map((language) => (
                                    <li
                                        key={language.code}
                                        onClick={() => handleLanguageChange(language)}
                                        className={`py-1 cursor-pointer flex items-center ${language.code === currentLanguage.code ? "text-white" : "text-gray-400"}`}
                                    >
                                        <span className={`fi fi-${language.flag} mr-2`}></span>
                                        <span>{language.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Currency Selector */}
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-white font-bold mb-2">Tiền tệ</h3>
                            <ul className="space-y-2">
                                {currencies.map((currency) => (
                                    <li
                                        key={currency.code}
                                        onClick={() => handleCurrencyChange(currency)}
                                        className={`py-1 cursor-pointer ${currency.code === currentCurrency.code ? "text-white" : "text-gray-400"}`}
                                    >
                                        <span>
                                            {currency.name} {currency.symbol}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigation Links */}
                        <div className="p-4">
                            <Link href="/cart" className="block py-2 text-white hover:text-gray-300" onClick={() => setMobileMenuOpen(false)}>
                                <div className="flex items-center">
                                    <Icon path={mdiCart} size={0.8} className="mr-2" />
                                    <span>Giỏ hàng ({cartItemCount})</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}