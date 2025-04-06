"use client";

import { useTransactionHistory } from "@/hooks/transaction";
import { formatNumber } from "@/utils";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import StatCards from "../SellerMoneyWithdrawRequests/StatCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useEffect, useState } from "react";
import { getUserWithdrawals } from "@/api/withdrawals";

const SellerMoneyWithdrawRequests = () => {
  const { transactionHistoryData: transactionHistoryDataResponse, isLoading } =
    useTransactionHistory();
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [isLoadingWithdrawals, setIsLoadingWithdrawals] = useState(false);

  useEffect(() => {
    console.log(1)
    const fetchWithdrawals = async () => {
      try {
        setIsLoadingWithdrawals(true);
        const response = await getUserWithdrawals();
        console.log(response);
        setWithdrawals(response.data.data || []);
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
      } finally {
        setIsLoadingWithdrawals(false);
      }
    };

    fetchWithdrawals();
  }, []);

  const transactionHistoryData = transactionHistoryDataResponse?.data?.data;

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
        return <span className="line-clamp-1 truncate" style={{ color: "white", backgroundColor: status.color, padding: "4px", borderRadius: "4px" }}>{status.label}</span>;
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
          case "manual_fedex_amount":
            return "Nạp tiền vận chuyển Fedex";
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

  const withdrawalColumns: ColumnsType<any> = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Ngày yêu cầu",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Số tiền rút",
      dataIndex: "amount",
      render: (text) => `${formatNumber(Math.abs(parseFloat(text)))} USD`,
      align: "right",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => {
        const statusMap = {
          COMPLETED: { label: "Hoàn thành", color: "green" },
          PENDING: { label: "Đang chờ", color: "orange" },
          REJECTED: { label: "Từ chối", color: "red" },
          PROCESSING: { label: "Đang xử lý", color: "blue" },
          FAILED: { label: "Thất bại", color: "red" },
        };
        const status = statusMap[text as keyof typeof statusMap] || {
          label: text,
          color: "gray",
        };
        return <span className="line-clamp-1 truncate" style={{ color: "white", backgroundColor: status.color, padding: "4px", borderRadius: "4px" }}>{status.label}</span>;
      },
    },
    {
      title: "Ghi chú Admin",
      dataIndex: "adminNote",
      render: (text) => text || "N/A"
    },
    {
      title: "Lý do từ chối",
      dataIndex: "rejectionReason",
      render: (text) => text || "N/A"
    },
    {
      title: "Ngày xử lý",
      dataIndex: "completedAt",
      render: (text, record) => {
        if (record.completedAt) return new Date(record.completedAt).toLocaleDateString();
        if (record.rejectedAt) return new Date(record.rejectedAt).toLocaleDateString();
        return "Chưa xử lý";
      }
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
      <StatCards />

      <div className="mb-6 border p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">Lịch sử giao dịch</h2>
        <Table
          columns={columns}
          dataSource={transactionHistoryData}
          pagination={false}
          scroll={{ x: true }}
          bordered={true}
          loading={isLoading}
          size="middle"
          rowClassName={() => "transaction-table-row"}
          style={{
            overflowX: 'auto',
            tableLayout: 'auto',
            width: '100%',
          }}
        />
      </div>

      <div className="mb-4 border p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">Lịch sử nạp/rút tiền</h2>
        <Table
          columns={withdrawalColumns}
          dataSource={withdrawals}
          pagination={false}
          scroll={{ x: true }}
          bordered={true}
          loading={isLoadingWithdrawals}
          size="middle"
          rowClassName={() => "withdrawal-table-row"}
          style={{
            overflowX: 'auto',
            tableLayout: 'auto',
            width: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default SellerMoneyWithdrawRequests;
