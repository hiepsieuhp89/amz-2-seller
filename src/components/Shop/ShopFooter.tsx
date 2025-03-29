"use client"

import { Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function ShopFooter() {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-slate-950 text-white p-8">
        <div className="container mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-base font-bold mb-3">Tìm hiểu về chúng tôi</h3>
              <ul className="space-y-2">
                <li className="text-sm text-slate-300 hover:text-white cursor-pointer">Giới thiệu</li>
                <li className="text-sm text-slate-300 hover:text-white cursor-pointer">Điều khoản dịch vụ</li>
                <li className="text-sm text-slate-300 hover:text-white cursor-pointer">Chính sách bán hàng</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-3">Thanh toán</h3>
              <ul className="space-y-2">
                <li className="text-sm text-slate-300 hover:text-white cursor-pointer">Phương thức thanh toán</li>
                <li className="text-sm text-slate-300 hover:text-white cursor-pointer">Chính sách hoàn tiền</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-3">Hỗ trợ khách hàng</h3>
              <ul className="space-y-2">
                <li className="text-sm text-slate-300 hover:text-white cursor-pointer">Trung tâm trợ giúp</li>
                <li className="text-sm text-slate-300 hover:text-white cursor-pointer">Liên hệ chúng tôi</li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-bold mb-3">Tải ứng dụng</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="h-10 w-32 bg-black border-slate-600 hover:bg-slate-800 hover:text-white text-sm"
                >
                  App Store
                </Button>
                <Button
                  variant="outline"
                  className="h-10 w-32 bg-black border-slate-600 hover:bg-slate-800 hover:text-white text-sm"
                >
                  Google Play
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-300 text-xs">© 2023 Amazon Clone. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Language and Currency Selector */}
      <div className="bg-slate-900 text-white py-4">
        <div className="container mx-auto max-w-[1500px] flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Select defaultValue="vi">
                <SelectTrigger className="w-[130px] text-sm bg-transparent border-slate-600 text-white focus:ring-0 focus:ring-offset-0">
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select language" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="vi" className="text-sm text-white hover:bg-slate-800">
                    Tiếng Việt
                  </SelectItem>
                  <SelectItem value="en" className="text-sm text-white hover:bg-slate-800">
                    English
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <Select defaultValue="usd">
                <SelectTrigger className="w-[130px] text-sm bg-transparent border-slate-600 text-white focus:ring-0 focus:ring-offset-0">
                  <div className="flex items-center">
                    <SelectValue placeholder="Select currency" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="usd" className="text-sm text-white hover:bg-slate-800">
                    U.S. Dollar $
                  </SelectItem>
                  <SelectItem value="vnd" className="text-sm text-white hover:bg-slate-800">
                    VND ₫
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-800 text-white py-3 text-center">
        <div className="container mx-auto max-w-[1500px]">
          <p className="mb-2 text-sm">
            Start selling products on Amazon today!{" "}
            <Button variant="link" className="text-sky-400 hover:text-sky-300 p-0 h-auto text-sm">
              Sign up
            </Button>
          </p>
          <p className="text-sm">
            Login to Amazon Seller.{" "}
            <Button variant="link" className="text-sky-400 hover:text-sky-300 p-0 h-auto text-sm">
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </>
  )
}

