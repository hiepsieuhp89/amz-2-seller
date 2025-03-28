"use client";
import Header from "@/components/ProductDetail/Header";
import { useGetAllShopProducts } from "@/hooks/shop-products";
import { Empty, Pagination, Select, Spin } from "antd";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./styles.css"
import Link from "next/link";
export default function ShopPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopId = params.id as string;
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const { data: shopProductsData, isLoading, refetch } = useGetAllShopProducts({
    page: page,
    take: pageSize,
    shopId: shopId
  })

  const shopProducts = shopProductsData?.data?.data || [];
  console.log(shopProducts)
  const meta = shopProductsData?.data?.meta;
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page > 1) params.set("page", String(page));

    const url = `/ecom/shop/${shopId}${params.toString() ? `?${params.toString()}` : ""
      }`;
    router.replace(url, { scroll: false });
  }, [search, page, shopId, router]);

  useEffect(() => {
    refetch();
  }, [page, pageSize]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    const [field, order] = value.split(":");
    setSortField(field);
    setSortOrder(order as "ASC" | "DESC");
  };

  const handlePageChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* Secondary Navigation */}
      <div className="text-main-dark-blue font-medium py-2 border-b border-gray-200">
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
          <div className="cursor-pointer hover:text-[#FF9900] transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-[#FF9900] !font-semibold">
            Tất cả sản phẩm
          </div>
        </div>
      </div>

      {/* Shop Header Section */}
      <div className="bg-red border-b px-[104px] py-6">
        <div className="container mx-auto max-w-[1500px] flex items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
            <span className="text-3xl text-gray-400">a</span>
          </div>

          <div className="flex-1">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Shop Hoa Hong</h1>
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

          <button className="ml-4 bg-[#FF9900] hover:bg-[#f3a847] text-white px-6 py-2 rounded-full flex items-center">
            <span className="mr-1">+</span>
            <span>Follow Seller (0)</span>
          </button>
        </div>
      </div>

      {/* Main Shop Content */}
      <main className="container mx-auto max-w-[1500px] px-[104px] py-6">
        {/* Filters & Sort */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <span className="mr-2">Sắp xếp theo:</span>
            <Select
              defaultValue={`${sortField}:${sortOrder}`}
              onChange={handleSortChange}
              options={[
                { value: 'createdAt:DESC', label: 'Mới nhất' },
                { value: 'price:ASC', label: 'Giá: Thấp đến cao' },
                { value: 'price:DESC', label: 'Giá: Cao đến thấp' },
              ]}
              style={{ width: 180 }}
            />
          </div>
          <div>
            {meta && (
              <span>
                Hiển thị {shopProducts.length} trên {meta.itemCount} sản phẩm
              </span>
            )}
          </div>
        </div>

        {/* Products Section Title */}
        <div className="mb-4 border-b pb-2 flex justify-between items-center">
          <h2 className="text-xl font-medium">Sản phẩm mới về</h2>
          <button className="text-blue-500">
            <span className="mr-1">Xem tất cả</span>
            <span>❯</span>
          </button>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="small" />
          </div>
        ) : shopProducts && shopProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {shopProducts.map((item: any) => (
              <Link
                href={`/ecom/product/${item.id}`}
                key={item.id}
                className="bg-white border border-gray-200 rounded-sm p-3 relative hover:shadow-md transition-shadow cursor-pointer group hov-animate-outline"
              >
                {/* Product Image */}
                <div className="relative h-48 mb-3">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-1">
                  <h3 className="text-sm text-[#0F1111] line-clamp-2 h-10 hover:text-[#C7511F]">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-[#FFA41C] text-xs">
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-[#007185]">(0)</span>
                  </div>
                  <div className="flex items-end">
                    <span className="text-lg font-bold text-[#0F1111]">
                      ${Number(item.salePrice).toFixed(2)}
                    </span>
                    {item.profit > 0 && (
                      <span className="text-sm text-gray-500 ml-2 line-through">
                        ${(Number(item.salePrice) - item.profit).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#007185]">
                    {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                  <div className="text-xs text-[#565959]">
                    FREE delivery
                  </div>
                </div>
                <button
                  className="absolute bottom-2 right-2 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <Empty description="Không tìm thấy sản phẩm nào" />
        )}

        {/* Pagination */}
        {meta && meta.pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              current={page}
              total={meta.itemCount}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={true}
              pageSizeOptions={['10', '20', '50']}
            />
          </div>
        )}
      </main>

      {/* Footer */}
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

      {/* Bottom Footer with Language and Currency */}
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

      {/* Final Bottom CTA */}
      <div className="bg-[#37475a] text-white py-3 text-center">
        <div className="container mx-auto max-w-[1500px]">
          <p className="mb-2">Start selling products on Amazon today! <a href="#" className="text-[#48a3c6] hover:underline">Sign up</a></p>
          <p>Login to Amazon Seller. <a href="#" className="text-[#48a3c6] hover:underline">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}
