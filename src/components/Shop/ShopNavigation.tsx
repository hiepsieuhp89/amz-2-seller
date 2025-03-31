import "./styles.css"
export default function ShopNavigation() {
  return (
    <div className=" font-medium py-2 border-b border-gray-200 bg-[#E3E6E6]">
      <div className="container mx-auto max-w-[1500px] flex space-x-8 text-sm font-medium px-[104px]">
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