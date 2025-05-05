import Image from "next/image";
import "./styles.css"
import { useSelectedProduct } from "@/stores/useSelectedProduct";
import { useProducts } from "@/hooks/products";

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/');
};

export default function ShopHeader() {
  const { selectedProduct } = useSelectedProduct()
  const {data: topSellingProducts} = useProducts({
    shopId: (selectedProduct?.shopProducts[selectedProduct.shopProducts.length-1] as any)?.userId,
    order: "DESC",
    page: 1,
    sortBy: "shopProduct.soldCount"
  })
  const user = topSellingProducts?.data?.data?.[0]?.shopProducts?.[0]?.user;

  return (
    <div className="bg-red border-b px-4 sm:px-6 md:px-8 lg:px-[104px] py-4 sm:py-6 bg-white">
      <div className="container mx-auto max-w-[1440px] flex flex-wrap sm:flex-nowrap items-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-main-golden-orange rounded-full items-center justify-center overflow-hidden mr-3 sm:mr-4 p-2 bg-white flex-shrink-0">
          <Image
            className="flex-shrink-0 object-fill h-full w-full rounded-full"
            src={user?.logoUrl || "/images/default-avatar.jpg"} alt="seller-avatar" width={100} height={100} quality={100} draggable={false} />
        </div>
        <div className="flex-1 mb-3 sm:mb-0">
          <div className="flex items-center">
            <h1 className="text-base sm:text-xl font-bold text-ellipsis overflow-hidden">{user?.fullName || "Chưa có tên"}</h1>
            <span className="ml-2 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </span>
          </div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-sm">★</span>
            ))}
            <span className="ml-2 text-xs sm:text-sm text-gray-500">(0 Nhận xét)</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 line-clamp-1">Địa chỉ shop</div>
        </div>
        <div className="flex flex-col items-start sm:items-end ml-auto sm:ml-0 order-3 sm:order-none w-full sm:w-auto mt-3 sm:mt-0">
          <div className="text-xs sm:text-sm text-gray-500">Member Since</div>
          <div className="text-sm sm:font-medium">--/--/----</div>
        </div>
        <button className="ml-0 sm:ml-4 mt-3 sm:mt-0 bg-[#FF9900] hover:bg-[#f3a847] !text-white/80 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex items-center text-xs sm:text-sm order-2 sm:order-none">
          <span className="mr-1">+</span>
          <span>Follow Seller (0)</span>
        </button>
      </div>
    </div>
  );
} 