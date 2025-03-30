import { Icon } from "@mdi/react"
import {
  mdiFacebook,
  mdiInstagram,
  mdiTwitter,
  mdiYoutube,
  mdiEmailOutline,
  mdiPhoneOutline,
  mdiMapMarkerOutline,
} from "@mdi/js"
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-main-dark-blue">
      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
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
            <p className="text-gray-400 mb-4">
              Cửa hàng trực tuyến với đa dạng sản phẩm chất lượng cao và dịch vụ khách hàng tuyệt vời.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Icon path={mdiFacebook} size={1} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Icon path={mdiInstagram} size={1} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Icon path={mdiTwitter} size={1} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Icon path={mdiYoutube} size={1} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Thông tin</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Điều khoản & Điều kiện
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Tài khoản</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-gray-400 hover:text-white">
                  Tài khoản của tôi
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-white">
                  Đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-400 hover:text-white">
                  Danh sách yêu thích
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white">
                  Trả hàng
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="text-gray-400 hover:text-white">
                  Thông báo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Icon path={mdiMapMarkerOutline} size={0.8} className="flex-shrink-0 text-gray-400" />
                <span className="text-gray-400" >
                  Amazon Web Services Singapore 23 Church St, #10-01, Singapore 049481
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Icon path={mdiPhoneOutline} size={0.8} className="flex-shrink-0 text-gray-400" />
                <span className="text-gray-400">+84 333273472</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon path={mdiEmailOutline} size={0.8} className="flex-shrink-0 text-gray-400" />
                <span className="text-gray-400">sellercentralamazon.index@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-8">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Amazon Shop. Tất cả các quyền được bảo lưu.
          </p>
          <div className="relative h-[30px] w-[216px]">
            <Image
              src="/images/payments.png"
              alt="Visa"
              width={500}
              height={500}
              className="object-contain"
              draggable={false}
              quality={100}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

