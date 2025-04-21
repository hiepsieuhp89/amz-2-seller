import { Empty, Select, Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";
import { formatNumber } from "@/utils";
import { useEffect, useState } from "react";

interface ShopContentProps {
  shopProducts: any[];
  isLoading: boolean;
  meta: any;
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: "ASC" | "DESC";
  handleSortChange: (value: string) => void;
  handlePageChange: (newPage: number, newPageSize: number) => void;
}

export default function ShopContent({
  shopProducts,
  isLoading,
  meta,
  page,
  pageSize,
  sortField,
  sortOrder,
  handleSortChange,
  handlePageChange,
}: ShopContentProps) {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  
  useEffect(() => {
    if (page === 1) {
      setAllProducts(shopProducts);
    } else if (shopProducts.length > 0) {
      setAllProducts(prev => [...prev, ...shopProducts]);
    }
  }, [shopProducts, page]);
  
  useEffect(() => {
    // Reset all products when the component is unmounted or when sort changes
    return () => {
      setAllProducts([]);
    };
  }, [sortField, sortOrder]);

  const handleLoadMore = () => {
    if (meta && page < meta.pageCount) {
      handlePageChange(page + 1, pageSize);
    }
  };

  return (
    <main className="w-full flex justify-center px-[104px] py-6 bg-[#E3E6E6]">
      <div className="max-w-[1440px] bg-[#E3E6E6]">
        {/* Filters & Sort */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <span className="mr-2  font-medium text-sm">Sắp xếp theo:</span>
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
              <span className=" font-medium text-sm">
                Hiển thị {allProducts.length} trên {meta.itemCount} sản phẩm
              </span>
            )}
          </div>
        </div>

        {/* Products Section Title */}
        <div className="mb-4 border-b pb-2 flex justify-between items-center">
          <h2 className="text-xl font-medium ">Sản phẩm mới về</h2>
          <button className="text-blue-500">
            <span className="mr-1 font-medium text-sm">Xem tất cả</span>
            <span>❯</span>
          </button>
        </div>

        {/* Products Grid */}
        {isLoading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="small" />
          </div>
        ) : allProducts && allProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {allProducts.map((item: any) => (
                <Link
                  href={`/shop/product?id=${item.id}`}
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-sm p-3 relative hover:transition-shadow cursor-pointer hov-animate-outline"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div className="hoverEffect">
                    {/* Product Image */}
                    <div className="relative h-48 mb-3">
                      <Image
                        src={item.imageUrls[0] || "/images/white-image.png"
                        }
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-1">
                      <h3 className="text-sm  line-clamp-2 h-10 hover:text-[#C7511F]">
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
                        <span className="text-lg font-bold ">${formatNumber(Number(item.salePrice))}</span>
                        {item.profit > 0 && (
                          <span className="text-sm text-gray-500 ml-2 line-through">${formatNumber(Number(item.salePrice) - item.profit)}</span>
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
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Load More Button */}
            {meta && page < meta.pageCount && (
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md px-6 py-2 font-medium text-sm flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Spin size="small" className="mr-2" />
                      Đang tải...
                    </>
                  ) : (
                    'Xem thêm sản phẩm'
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <Empty description="Không tìm thấy sản phẩm nào" />
        )}
      </div>
    </main>
  );
} 