"use client"

import { useEffect, useState } from "react"
import { Input, Dropdown } from "antd"
import Icon from "@mdi/react"
import { mdiMagnify, mdiChevronDown, mdiCart } from "@mdi/js"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/context/useUserContext"
import { logout } from "@/api/axios"
import { useRouter } from "next/navigation"
import { ItemType } from "antd/es/menu/interface"

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
    { code: "vn", name: "Vietnamese", flag: "/images/vn-flag.png" },
    { code: "en", name: "English", flag: "/images/vn-flag.png" },
    { code: "cn", name: "中国人", flag: "/images/vn-flag.png" },
    { code: "kr", name: "한국인", flag: "/images/vn-flag.png" },
    { code: "id", name: "Indonesia", flag: "/images/vn-flag.png" },
    { code: "ru", name: "Русский", flag: "/images/vn-flag.png" },
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

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleLanguageChange = (language: LanguageOption) => {
        setCurrentLanguage(language)
    }

    const handleCurrencyChange = (currency: CurrencyOption) => {
        setCurrency(currency)
    }

    const languageMenu = (
        <ul className="bg-white text-black py-2 rounded shadow-lg min-w-[200px]">
            {languages.map((language) => (
                <li
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${language.code === currentLanguage.code ? "bg-gray-100" : ""}`}
                >
                    <Image
                        src={language.flag}
                        alt={language.name}
                        className="object-contain mr-2"
                        height={11}
                        width={16}
                    />
                    <span>{language.name}</span>
                </li>
            ))}
        </ul>
    )

    const currencyMenu = (
        <ul className="bg-white text-black py-2 rounded shadow-lg min-w-[200px]">
            {currencies.map((currency) => (
                <li
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency)}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${currency.code === currentCurrency.code ? "bg-gray-100" : ""}`}
                >
                    <span>
                        {currency.name} {currency.symbol}
                    </span>
                </li>
            ))}
        </ul>
    )

    return (
        <header className="bg-[#232F3E] text-gray-400 px-4 py-2 flex items-center justify-between gap-2">
            <Link href="/" className="flex-shrink-0">
                <Image src="/images/logo.png" alt="Amazon" width={80} height={34} className="cursor-pointer" quality={100} />
            </Link>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-[550px]">
                <Input placeholder="Tôi đang tìm mua..." className="py-2 pr-10 h-[38px] rounded-sm w-full" />
                <div className="absolute right-0 top-0 h-full flex items-center justify-center bg-[#febd69] w-[45px] rounded-r-sm cursor-pointer">
                    <Icon path={mdiMagnify} size={0.8} color="#E3E6E6" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
                {/* Language Selector */}
                <Dropdown menu={{ items: languageMenu as unknown as ItemType[] }} trigger={["click"]} placement="bottomRight">
                    <div className="flex items-center cursor-pointer px-2">
                        <Image
                            quality={100}
                            height={16}
                            width={24}
                            src={currentLanguage.flag}
                            alt={currentLanguage.name}
                            className="object-contain mr-1"
                        />
                        <span className="mr-1">{currentLanguage.name}</span>
                        <Icon path={mdiChevronDown} size={0.6} />
                    </div>
                </Dropdown>

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
                <Dropdown menu={{ items: currencyMenu as unknown as ItemType[] }} trigger={["click"]} placement="bottomRight">
                    <div className="flex items-center cursor-pointer px-2">
                        <span className="mr-1 text-gray-400 text-sm transition-all duration-300 hover:!text-white/80 font-bold">
                            {currentCurrency.name} {currentCurrency.symbol}
                        </span>
                        <Icon path={mdiChevronDown} size={0.6} />
                    </div>
                </Dropdown>

                {/* Shopping Cart */}
                <Link href="/cart" className="flex items-center px-2">
                    <div className="relative flex items-center">
                        <Icon path={mdiCart} size={1} color="#E3E6E6" />
                        <span className="ml-1 font-bold text-gray-400 text-sm transition-all duration-300 hover:!text-white/80">{cartItemCount} giỏ hàng</span>
                    </div>
                </Link>
            </nav>
        </header>
    )
}

