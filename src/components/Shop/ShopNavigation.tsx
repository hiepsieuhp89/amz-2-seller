import "./styles.css"
export default function ShopNavigation() {
  return (
    <div className="font-medium py-2 border-b border-gray-200 bg-[#E3E6E6] overflow-x-auto">
      <div className="container mx-auto max-w-[1440px] flex space-x-4 sm:space-x-8 text-xs sm:text-sm font-medium px-4 sm:px-6 md:px-8 lg:px-[104px] whitespace-nowrap">
        <div className="cursor-pointer hover:text-[#FF9900] transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-[#FF9900] !font-semibold">
          Trang chủ cửa hàng
        </div>
        <div className="cursor-pointer hover:text-[#FF9900] transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-[#FF9900] !font-semibold">
          Bán chạy nhất
        </div>
        <div className="cursor-pointer hover:text-[#FF9900] transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-[#FF9900] !font-semibold">
          Coupons
        </div>
      </div>
    </div>
  );
} 