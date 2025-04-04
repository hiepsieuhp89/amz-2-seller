"use client";

import { useTransactionHistory } from "@/hooks/transaction";
import { formatNumber } from "@/utils";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import StatCards from "../SellerOrders/StatCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const SellerMoneyWithdrawRequests = () => {
  const { transactionHistoryData: transactionHistoryDataResponse, isLoading } =
    useTransactionHistory();

  const transactionHistoryData = transactionHistoryDataResponse?.data?.data;
  console.log(transactionHistoryData);

  const columns: ColumnsType<any> = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Số tiền",
      dataIndex: "money",
      render: (text) => `${formatNumber(Math.abs(parseFloat(text)))} USD`,
      align: "right",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => {
        const statusMap = {
          completed: { label: "Hoàn thành", color: "green" },
          pending: { label: "Đang chờ", color: "orange" },
          failed: { label: "Thất bại", color: "red" },
          processing: { label: "Đang xử lý", color: "blue" },
        };
        const status = statusMap[text as keyof typeof statusMap] || {
          label: text,
          color: "gray",
        };
        return <span style={{ color: "white", backgroundColor: status.color, padding: "4px", borderRadius: "4px" }}>{status.label}</span>;
      },
    },
    { title: "Mô tả", dataIndex: "description" },
    {
      title: "Loại giao dịch",
      dataIndex: "type",
      render: (text) => {
        switch (text) {
          case "fedex_payment":
            return "Thanh toán vận chuyển Fedex";
          case "package_purchase":
            return "Mua gói bán hàng";
          default:
            return text;
        }
      },
    },
    {
      title: "Mã tham chiếu",
      dataIndex: "referenceId",
      render: (text) =>
        text ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>{text}</span>
            <button
              onClick={() => navigator.clipboard.writeText(text)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M8 17.929H6c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h8c1.105 0 2 .895 2 2v2M16 6h4c1.105 0 2 .895 2 2v10c0 1.105-.895 2-2 2h-8c-1.105 0-2-.895-2-2V8c0-1.105.895-2 2-2z" />
              </svg>
            </button>
          </div>
        ) : (
          "N/A"
        ),
    },
  ];

  return (
    <div className="p-4 bg-[#E3E6E6]">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-main-dark-blue/80 hover:text-main-dark-blue uppercase"
            >
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-main-dark-blue/80" />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-main-dark-blue/80 font-semibold uppercase">
              Lịch sử thanh toán
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <StatCards /> */}
      <div title="Lịch sử giao dịch" className="!mb-4 rounded-[4px]">
        <Table
          columns={columns}
          dataSource={transactionHistoryData}
          pagination={false}
          scroll={{ x: true }}
          bordered={true}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default SellerMoneyWithdrawRequests;
