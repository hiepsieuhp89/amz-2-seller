"use client"

import type React from "react"
import { useState } from "react"
import { Input, Dropdown, Badge, Menu } from "antd"
import Icon from "@mdi/react"
import { mdiMagnify, mdiChevronDown, mdiAccount, mdiCart } from "@mdi/js"
import Link from "next/link"
import Image from "next/image"
import "./styles.css"

interface LanguageOption {
  code: string
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "/images/vn-flag.png" },
  { code: "vn", name: "Tiếng Việt", flag: "/images/vn-flag.png" },
  { code: "cn", name: "中国人", flag: "/images/vn-flag.png" },
  { code: "kr", name: "한국인", flag: "/images/vn-flag.png" },
  { code: "id", name: "Indonesia", flag: "/images/vn-flag.png" },
  { code: "ru", name: "Русский", flag: "/images/vn-flag.png" },
]

const Header: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(languages[1]) // Default to Vietnamese
  const [cartCount, setCartCount] = useState<number>(0)

  const handleLanguageChange = (language: LanguageOption) => {
    setCurrentLanguage(language)
  }

  const languageMenu = (
    <Menu>
      {languages.map((language) => (
        <Menu.Item
          key={language.code}
          onClick={() => handleLanguageChange(language)}
          className={language.code === currentLanguage.code ? "ant-dropdown-menu-item-active" : ""}
        >
          <div className="flex items-center">
            <Image
              src={language.flag}
              alt={language.name}
              className="object-contain h-[11px] w-[16px]"
              height={11}
              width={16}
            />
            <span>{language.name}</span>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <header
      className="bg-[#131921] text-white h-[50px] px-[14px] flex items-center justify-between gap-[14px]"
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Amazon"
          width={80}
          height={34}
          className="cursor-pointer"
          quality={100}
        />
      </Link>

      {/* Search Bar */}
      <div className="relative flex-1 h-[30px]">
        <Input placeholder="Search Amazon" className="py-2 pr-10 h-[30px] rounded-sm w-full" />
        <div className="absolute right-0 top-0 h-full flex items-center justify-center bg-[#febd69] w-[30px] rounded-r-sm cursor-pointer">
          <Icon path={mdiMagnify} size={0.8} color="#131921" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center">
        {/* Language Selector */}
        <Dropdown overlay={languageMenu} trigger={["click"]} placement="bottomRight">
          <div className="flex flex-col mr-4 cursor-pointer">
            <span className="text-xs text-gray-300">{currentLanguage.name}</span>
            <span className="flex items-center">
              <Image
                quality={100}
                height={11}
                width={16}
                src={currentLanguage.flag} alt={currentLanguage.name} className="object-contain h-[11px] w-[16px]" />
              <Icon path={mdiChevronDown} size={0.6} />
            </span>
          </div>
        </Dropdown>

        {/* User Account */}
        <Link href="/dashboard">
          <div className="flex items-center mr-4">
            <Icon path={mdiAccount} size={1} color="white" />
          </div>
        </Link>

        {/* Shopping Cart */}
        <Link href="/cart">
          <div className="relative">
            <Icon path={mdiCart} size={1} color="white" />
          </div>
        </Link>
      </nav>
    </header>
  )
}

export default Header

