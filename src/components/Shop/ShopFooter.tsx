import "./styles.css"
import { Select } from "antd";

export default function ShopFooter() {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-[#131921] text-white p-8 mt-8">
        <div className="container mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Tìm hiểu về chúng tôi</h3>
              <ul className="space-y-2">
                <li>Giới thiệu</li>
                <li>Điều khoản dịch vụ</li>
                <li>Chính sách bán hàng</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Thanh toán</h3>
              <ul className="space-y-2">
                <li>Phương thức thanh toán</li>
                <li>Chính sách hoàn tiền</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hỗ trợ khách hàng</h3>
              <ul className="space-y-2">
                <li>Trung tâm trợ giúp</li>
                <li>Liên hệ chúng tôi</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Tải ứng dụng</h3>
              <div className="flex space-x-2">
                <div className="w-32 h-10 bg-black rounded flex items-center justify-center">
                  App Store
                </div>
                <div className="w-32 h-10 bg-black rounded flex items-center justify-center">
                  Google Play
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>© 2023 Amazon Clone. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Language and Currency Selector */}
      <div className="bg-[#232f3e] text-white py-4">
        <div className="container mx-auto max-w-[1500px] flex justify-center items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-500 rounded px-2 py-1">
              <Select
                defaultValue="vi"
                bordered={false}
                style={{ width: 100 }}
                options={[
                  { value: 'vi', label: 'Tiếng Việt' },
                  { value: 'en', label: 'English' },
                ]}
                className="text-white"
              />
            </div>

            <div className="flex items-center border border-gray-500 rounded px-2 py-1">
              <Select
                defaultValue="usd"
                bordered={false}
                style={{ width: 120 }}
                options={[
                  { value: 'usd', label: 'U.S. Dollar $' },
                  { value: 'vnd', label: 'VND ₫' },
                ]}
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#37475a] text-white py-3 text-center">
        <div className="container mx-auto max-w-[1500px]">
          <p className="mb-2">Start selling products on Amazon today! <a href="#" className="text-[#48a3c6] hover:underline">Sign up</a></p>
          <p>Login to Amazon Seller. <a href="#" className="text-[#48a3c6] hover:underline">Sign in</a></p>
        </div>
      </div>
    </>
  );
} 