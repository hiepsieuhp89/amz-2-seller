"use client"

import type React from "react"
import { useState } from "react"
import { Dropdown, Menu } from "antd"
import { motion } from "framer-motion"
import Icon from "@mdi/react"
import { mdiEarth, mdiChevronDown } from "@mdi/js"
import Image from "next/image"
import Link from "next/link"
import "./styles.css"
interface LanguageOption {
  code: string
  name: string
  flag: string
  active?: boolean
}

interface CurrencyOption {
  code: string
  name: string
  symbol: string
  active?: boolean
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "/images/vn-flag.png" },
  { code: "vn", name: "Tiếng Việt", flag: "/images/vn-flag.png" },
  { code: "cn", name: "中国人", flag: "/images/vn-flag.png" },
  { code: "kr", name: "한국인", flag: "/images/vn-flag.png" },
  { code: "id", name: "Indonesia", flag: "/images/vn-flag.png" },
  { code: "ru", name: "Русский", flag: "/images/vn-flag.png" },
]

const currencies: CurrencyOption[] = [
  { code: "USD", name: "U.S. Dollar", symbol: "$", active: true },
  { code: "AUD", name: "Australian Dollar", symbol: "$" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "Pound Sterling", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
]

const Footer = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(
    languages.find((lang) => lang.active) || languages[0],
  )

  const [currentCurrency, setCurrentCurrency] = useState<CurrencyOption>(
    currencies.find((curr) => curr.active) || currencies[0],
  )

  const handleLanguageChange = (language: LanguageOption) => {
    setCurrentLanguage(language)
  }

  const handleCurrencyChange = (currency: CurrencyOption) => {
    setCurrentCurrency(currency)
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
            <img
              src={language.flag}
              alt={language.name}
              className="mr-2"
              height={11}
              width={16}
            />
            <span>{language.name}</span>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  )

  const currencyMenu = (
    <Menu>
      {currencies.map((currency) => (
        <Menu.Item
          key={currency.code}
          onClick={() => handleCurrencyChange(currency)}
          className={currency.code === currentCurrency.code ? "ant-dropdown-menu-item-active" : ""}
        >
          <span>
            {currency.name} ({currency.symbol})
          </span>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <footer className="w-full">
      <div className="bg-[#232f3e] py-6 px-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Logo Section */}
            <div className="flex justify-center md:justify-start">
              <Link href="/" className="transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Amazon"
                  width={80}
                  height={34}
                  className="cursor-pointer"
                  quality={100}
                />
              </Link>
            </div>

            {/* Language and Currency Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-6">
                <Dropdown overlay={languageMenu} trigger={["click"]} placement="topRight">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    className="text-white text-sm py-2 px-3 flex items-center cursor-pointer rounded hover:bg-[#37475A] transition-colors duration-200"
                  >
                    <Icon path={mdiEarth} size={0.8} className="mr-2" />
                    <span>{currentLanguage.name}</span>
                    <Icon path={mdiChevronDown} size={0.6} className="ml-2" />
                  </motion.a>
                </Dropdown>

                <Dropdown overlay={currencyMenu} trigger={["click"]} placement="topRight">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    className="text-white text-sm py-2 px-3 flex items-center cursor-pointer rounded hover:bg-[#37475A] transition-colors duration-200"
                  >
                    <span>
                      {currentCurrency.name} {currentCurrency.symbol}
                    </span>
                    <Icon path={mdiChevronDown} size={0.6} className="ml-2" />
                  </motion.a>
                </Dropdown>
              </div>
            </div>
          </div>

          {/* Promotional Text Section */}
          <div className="mt-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white mb-3"
            >
              <span className="mr-2">Start selling products on Amazon today!</span>
              <a
                href="/shops/create"
                className="text-[#f58840] hover:underline font-medium transition-colors duration-200"
              >
                Sign up
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white"
            >
              <span className="mr-2">Login to Amazon Seller.</span>
              <a
                href="/dashboard"
                className="text-[#f58840] hover:underline font-medium transition-colors duration-200"
              >
                Sign in
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#131A22] py-4">
        <div className="container mx-auto max-w-screen-xl px-4">
          <ul className="flex flex-wrap justify-center items-center text-xs text-gray-400 gap-x-6 gap-y-2">
            <li className="hidden md:block">
              <a className="hover:underline cursor-pointer hover:text-gray-300 transition-colors duration-200">
                Conditions of Use
              </a>
            </li>
            <li className="hidden md:block">
              <a className="hover:underline cursor-pointer hover:text-gray-300 transition-colors duration-200">
                Privacy Notice
              </a>
            </li>
            <li className="hidden md:block">
              <a className="hover:underline cursor-pointer hover:text-gray-300 transition-colors duration-200">
                Interest-Based Ads
              </a>
            </li>
            <li>© 1996-2024, Amazon.com, Inc. or its affiliates</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

