import "./styles.css"
export default function ShopHeader() {
  return (
    <div className="bg-red border-b px-[104px] py-6">
      <div className="container mx-auto max-w-[1500px] flex items-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
          <span className="text-3xl text-gray-400">a</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            <h1 className="text-xl font-bold ">Shop Hoa Hong</h1>
            <span className="ml-2 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </span>
          </div>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400">★</span>
            ))}
            <span className="ml-2 text-sm text-gray-500">(0 Nhận xét)</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">Yên Sơn Tuyên Quang Việt Nam</div>
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