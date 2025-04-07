import Image from "next/image";
import "./styles.css"
import { useProfile } from "@/hooks/authentication";
export default function ShopHeader() {
  const { profileData } = useProfile()
  return (
    <div className="bg-red border-b px-[104px] py-6">
      <div className="container mx-auto max-w-[1440px] flex items-center">
        <div className="w-16 h-16 border-2 border-main-golden-orange rounded-full bg-gray-200 items-center justify-center overflow-hidden mr-4">
          <Image
            className="flex-shrink-0 object-fill h-full w-full"
            src={profileData?.data?.logoUrl || "/images/white-image.png"} alt="avatar" width={100} height={100} quality={100} draggable={false} />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h1 className="text-xl font-bold ">{profileData?.data?.shopName || profileData?.data?.username}</h1>
            <span className="ml-2 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </span>
          </div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400">★</span>
            ))}
            <span className="ml-2 text-sm text-gray-500">(0 Nhận xét)</span>
          </div>
          <div className="text-sm text-gray-600">Yên Sơn Tuyên Quang Việt Nam</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-500 mb-1">Member Since</div>
          <div className="font-medium">27 Mar 2025</div>
        </div>
        <button className="ml-4 bg-[#FF9900] hover:bg-[#f3a847] !text-white/80 px-6 py-2 rounded-full flex items-center">
          <span className="mr-1">+</span>
          <span>Follow Seller (0)</span>
        </button>
      </div>
    </div>
  );
} 