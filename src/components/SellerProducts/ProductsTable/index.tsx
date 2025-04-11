"use client";

import Icon from "@mdi/react";
import {
  mdiArrowTopRightThin,
  mdiContentSaveEdit,
  mdiEye,
  mdiTrashCan,
} from "@mdi/js";
import type React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Pagination,
  Tooltip,
  Badge,
  Divider,
  message,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { IShopProduct } from "@/interface/response/shop-products";
import { useGetMyShopProducts, useRemoveShopProducts } from "@/hooks/shop-products";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./styles.css";
import { checkImageUrl } from "@/lib/utils";
import Link from "next/link";
import { useSelectedProduct } from "@/stores/useSelectedProduct";

const { Title, Text } = Typography;
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
interface ProductsTableProps {
  onSearch: (value: string) => void;
  selectedRowKeys: React.Key[];
  onSelectChange: (selectedRowKeys: React.Key[]) => void;
}

const ProductsTable = ({
  onSearch,
  selectedRowKeys,
  onSelectChange,
}: ProductsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState<string>("");
  const { data: shopProductsData, isLoading } = useGetMyShopProducts({
    page: currentPage,
    search: searchText,
  });
  const { mutate: removeShopProducts } = useRemoveShopProducts();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setSelectedProduct } = useSelectedProduct();
  const products = shopProductsData?.data?.data || [];
  const totalItems = shopProductsData?.data?.meta?.itemCount || 0;
  const productImages = products
    .map((product: any) => product.product.imageUrls[0])
    .filter(Boolean);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});

  const handleSearch = (value: string) => {
    setSearchText(value);
    onSearch(value);
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const handleImageClick = (imageUrls: string[]) => {
    const index = productImages.indexOf(imageUrls[0]);
    setCurrentImageIndex(index);
    setCurrentImage(imageUrls[0]);
    setOpenLightbox(true);
  };

  const toggleDescription = (productId: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleRemoveProduct = (productId: string) => {
    removeShopProducts(
      { productIds: [productId] },
      {
        onSuccess: () => {
          message.success("Xóa sản phẩm thành công");
        },
        onError: (error) => {
          message.error("Xóa sản phẩm thất bại");
        },
      }
    );
  };

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: ["product", "imageUrls"],
      key: "image",
      render: (imageUrls: string[]) =>
        imageUrls ? (
          <div
            style={{
              width: "80px",
              height: "80px",
              position: "relative",
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(imageUrls)}
          >
            <Image
              src={checkImageUrl(imageUrls)}
              alt="Product"
              width={80}
              height={80}
              quality={100}
              draggable={false}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text type="secondary">No Image</Text>
          </div>
        ),
      width: 80,
      align: "center" as const,
      responsive: ["xs", "sm"] as Breakpoint[],
    },
    {
      title: "Tên sản phẩm",
      dataIndex: ["product", "name"],
      key: "name",
      sorter: (a: IShopProduct, b: IShopProduct) =>
        a.product.name.localeCompare(b.product.name),
      render: (text: string, record: IShopProduct) => {
        const productId = record.product?.id || "";
        const isExpanded = expandedDescriptions[productId];
        const description = record.product?.description || "";

        return (
          <Space direction="vertical" size={0}>
            <Text
              strong
              style={{
                fontSize: "14px",
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {text}
            </Text>
            <div style={{ position: "relative" }}>
              <div
                className={`description-container ${
                  isExpanded ? "expanded" : ""
                }`}
                style={{
                  fontSize: "12px",
                  wordWrap: "break-word",
                  overflow: isExpanded ? "visible" : "hidden",
                  maxHeight: isExpanded ? "none" : "60px",
                  position: "relative",
                }}
              >
                <div
                  className="description-content"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
              {description && (
                <ShowMoreButton
                  description={description}
                  isExpanded={isExpanded}
                  toggleDescription={() => toggleDescription(productId)}
                />
              )}
            </div>
          </Space>
        );
      },
      responsive: ["xs", "sm", "md"] as Breakpoint[],
    },
    {
      title: "Số lượng",
      dataIndex: ["product", "stock"],
      key: "quantity",
      sorter: (a: IShopProduct, b: IShopProduct) =>
        a.product.stock - b.product.stock,
      render: (stock: number) => (
        <Badge
          count={stock}
          showZero
          overflowCount={999}
          style={{
            backgroundColor: stock > 0 ? "#1890ff" : "#f5222d",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        />
      ),
      responsive: ["md" as Breakpoint],
      align: "center" as const,
      width: 110,
    },
    {
      title: "Giá nhập",
      dataIndex: ["product", "price"],
      key: "price",
      sorter: (a: IShopProduct, b: IShopProduct) =>
        Number(a.product.price) - Number(b.product.price),
      render: (price: number) => (
        <Button
          style={{
            backgroundColor: "#E6F4FF",
            color: "#1890FF",
            borderRadius: "4px",
            padding: "0 10px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "default",
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          $ {price ? price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) : '0.00'}
        </Button>
      ),
      responsive: ["md" as Breakpoint],
      align: "right" as const,
      width: 110,
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      sorter: (a: IShopProduct, b: IShopProduct) => a.profit - b.profit,
      render: (profit: number) => (
        <Button
          style={{
            backgroundColor: "#FFF1F0",
            color: "#FF4D4F",
            borderRadius: "4px",
            padding: "0 10px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "default",
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          $ {profit ? Math.abs(profit).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) : '0.00'}
        </Button>
      ),
      align: "right" as const,
      width: 110,
      responsive: ["md" as Breakpoint],
    },
    {
      title: "Trạng thái",
      key: "status",
      responsive: ["md" as Breakpoint],
      render: (_: any, record: IShopProduct) => (
        <Button
          style={{
            backgroundColor: "#ECFFF3",
            color: "#5AC48A",
            borderRadius: "4px",
            padding: "0 10px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "default",
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          {record?.isActive ? "Đang bán" : "Ngừng bán"}
        </Button>
      ),
      align: "center" as const,
      width: 110,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: IShopProduct) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => 
              handleRemoveProduct(record?.product?.id)
            }
            okText="Có"
            cancelText="Không"
          >
            <Button
              icon={<Icon path={mdiTrashCan} size={0.7} color={"#ffffff"} />}
              className="!bg-red-500 !rounded-[4px] w-full"
              type="primary"
              size="small"
              danger
            >
              Xóa sản phẩm
            </Button>
          </Popconfirm>
          <Link
            onClick={() => setSelectedProduct(record.product)}
            target="_blank"
            href={`/product?id=${record?.product?.id}`}
          >
            <Button
              icon={
                <Icon path={mdiArrowTopRightThin} size={0.7} color={"#ffffff"} />
              }
              iconPosition="end"
              className="!bg-main-golden-orange !rounded-[4px] w-full"
              type="primary"
              size="small"
            >
              Chi tiết sản phẩm
            </Button>
          </Link>
        </Space>
      ),
      align: "center" as const,
      width: 150,
    },
  ];

  return (
    <div className="border p-4 bg-white rounded-md">
      <Row
        justify="space-between"
        align="middle"
        gutter={[12, 12]}
        style={{ marginBottom: 16 }}
      >
        <Col>
          <Space size="middle">
            <Title level={5} style={{ margin: 0 }}>
              Tất cả sản phẩm
            </Title>
            <Badge
              size="default"
              count={totalItems}
              showZero
              style={{ backgroundColor: "#1890ff" }}
            />
          </Space>
        </Col>
        <Col>
          <Space size="small" style={{ display: "flex", width: "100%" }}>
            <Input
              placeholder="Tìm kiếm sản phẩm"
              prefix={<SearchOutlined style={{ color: "#636363" }} />}
              value={searchText}
              onChange={(e: any) => handleSearch(e.target.value)}
              style={{ flex: 1, borderRadius: "6px" }}
              allowClear
            />
            <Tooltip title="Lọc sản phẩm">
              <Button
                icon={<FilterOutlined />}
                style={{ borderRadius: "6px" }}
              />
            </Tooltip>
            <Tooltip title="Làm mới">
              <Button
                icon={<ReloadOutlined />}
                style={{ borderRadius: "6px" }}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>

      <Divider style={{ margin: "0 0 16px 0" }} />

      {selectedRowKeys.length > 0 && (
        <Row style={{ marginBottom: 16 }}>
          <Space>
            <Text strong>{selectedRowKeys.length} sản phẩm đã chọn</Text>
            <Button danger size="small">
              Xóa đã chọn
            </Button>
          </Space>
        </Row>
      )}

      <div className="table-responsive-container">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={products as any}
          loading={isLoading}
          pagination={false}
          scroll={{ x: 800 }}
          size="middle"
          rowClassName={() => "product-table-row"}
          style={{
            tableLayout: "fixed",
          }}
          bordered
        />
      </div>

      <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
        <Col></Col>
        <Col>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            showSizeChanger
            showQuickJumper
            onChange={handlePaginationChange}
            onShowSizeChange={handlePaginationChange}
            style={{ marginTop: "16px" }}
            className="custom-pagination"
          />
        </Col>
      </Row>

      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={productImages.map((src: any) => ({ src }))}
        index={currentImageIndex}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        on={{
          view: ({ index }: { index: number }) => setCurrentImageIndex(index),
        }}
      />

      <style jsx global>{`
        .description-container {
          transition: max-height 0.3s ease;
        }
        .description-container.expanded {
          max-height: none;
        }
        .description-container:not(.expanded)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 1)
          );
        }
      `}</style>
    </div>
  );
};

const ShowMoreButton = ({
  description,
  isExpanded,
  toggleDescription,
}: {
  description: string;
  isExpanded: boolean;
  toggleDescription: () => void;
}) => {
  const [shouldShowButton, setShouldShowButton] = useState(false);

  useEffect(() => {
    // Kiểm tra xem mô tả có bị cắt hay không bằng cách đo chiều cao của nội dung
    const checkHeight = () => {
      const descriptionElements = document.getElementsByClassName(
        "description-content"
      );
      for (let i = 0; i < descriptionElements.length; i++) {
        const el = descriptionElements[i] as HTMLElement;
        if (el && el.scrollHeight > 60) {
          setShouldShowButton(true);
          return;
        }
      }
      setShouldShowButton(false);
    };

    // Chạy kiểm tra sau khi render
    setTimeout(checkHeight, 0);

    // Chạy kiểm tra khi cửa sổ thay đổi kích thước
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [description]);

  if (!shouldShowButton) return null;

  return (
    <Button
      type="link"
      size="small"
      style={{ padding: "0", fontSize: "12px", height: "auto" }}
      onClick={toggleDescription}
    >
      {isExpanded ? "Thu gọn" : "Xem thêm"}
    </Button>
  );
};

export default ProductsTable;
