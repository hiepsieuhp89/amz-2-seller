"use client";
import type { PaginationProps, TableProps } from "antd";
import { Button, Empty, Table } from "antd";
import type { SorterResult } from "antd/lib/table/interface";
import type { HTMLAttributes, TdHTMLAttributes } from "react";
import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { errorMessage } from "@/utils";
import { DeleteOutlined } from "@ant-design/icons";
import ModalAction from "../ModalConfirmDelete/ModalAction";
import { useDeleteUserSelect } from "@/hooks/user";
import MessageClientContext from "@/provider/MessageProvider";
interface ITable {
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  changeSortColumn: (columnName: any, typeSort: any) => void;
  total?: number;
  pageCurrent: number;
  columns: any;
  data: any;
  rowKey: string;
  pageSize: number;
  onRowClick?: (row: any) => HTMLAttributes<any> | TdHTMLAttributes<any>;
  isPageHide?: boolean;
  isLoading?: boolean;
  scrollX?: any;
  scrollY?: any;
  rowClassName?: (record: { id: string }) => string;
  paginationPosition?: "bottomLeft" | "bottomRight";
  bordered?: boolean;
  rowSelectionEnabled?: boolean;
}

interface DataTypeSort {
  columnKey: any;
  order: any;
}

interface Locale {
  emptyText: string | JSX.Element;
}

const TableComponent = ({
  setPage,
  setPageSize,
  total,
  columns,
  data,
  rowKey,
  pageCurrent,
  changeSortColumn,
  pageSize,
  onRowClick,
  isPageHide,
  isLoading,
  scrollX,
  scrollY,
  rowClassName,

  bordered,
  rowSelectionEnabled = false,
}: ITable) => {
  const mapTypeSort = (typeSort: any) => {
    switch (typeSort) {
      case "ascend":
        return "ASC";
      case "descend":
        return "DESC";
      default:
        return "";
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<any[]>(data);
  const [isOpenDelete, setShowDelete] = useState<boolean>(false);
  const { handleSuccessMessage, handleErrorMessage } =
    useContext(MessageClientContext);
  const { isPending, mutateAsync } = useDeleteUserSelect();
  const onSelectChange = (selectedKeys: any) => {
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = rowSelectionEnabled
    ? {
        selectedRowKeys,
        onChange: onSelectChange,
      }
    : undefined;
  const handleDelete = async () => {
    try {
      const payload: any = {
        ids: selectedRowKeys,
      };
      await mutateAsync(payload);
      setSelectedRowKeys([]);
      handleSuccessMessage(
        `Xoá thành công ${selectedRowKeys?.length} tài khoản !`
      );
      setShowDelete(false);
    } catch (error: any) {
      handleErrorMessage(error?.response?.data?.description);
    }
  };

  const handleChange: TableProps<any>["onChange"] = (
    pagination,
    _filters,
    sorter
  ) => {
    const sorterHandle = sorter as SorterResult<DataTypeSort>;
    if (
      sorterHandle?.order !== undefined &&
      sorterHandle?.columnKey !== undefined
    ) {
      changeSortColumn(sorterHandle.columnKey, mapTypeSort(sorterHandle.order));
    } else {
      changeSortColumn("", "");
    }

    if (pagination && pagination.current) {
      setPage(pagination.current - 1);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination?.pageSize!);
    }
  };

  const locale: Locale = {
    emptyText: isLoading ? (
      <></>
    ) : (
      <Empty
        className="my-20"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={errorMessage.noData}
      />
    ),
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setPage(page);
  };

  return (
    <div className="relative">
      <Table
        tableLayout="auto"
        pagination={
          isPageHide
            ? false
            : {
                onChange,
                total,
                current: pageCurrent + 1,
                pageSize,
                showSizeChanger: true,
                showTotal: (total, range) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>{`${range[0]}-${range[1]} of ${total} items`}</div>
                  </div>
                ),

                pageSizeOptions: ["10", "20", "50"],
                size: "default",
              }
        }
        className={styles.tableCustom}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowKey={rowKey}
        onRow={onRowClick}
        scroll={{ x: scrollX, y: scrollY }}
        locale={locale}
        loading={isLoading}
        rowClassName={rowClassName}
        bordered={bordered}
        rowSelection={rowSelection}
      />

      {selectedRowKeys.length > 0 && (
        <div className="absolute left-5 bottom-4">
          <Button
            danger
            onClick={() => setShowDelete(true)}
            className="!rounded-[2px] !px-4 !text-sm !bg-[#DA251D] !!text-white/80"
            icon={<DeleteOutlined/>}
          >
            Xóa
          </Button>
        </div>
      )}
      <div>
        <ModalAction
          title=""
          isModalOpen={isOpenDelete}
          setIsModalOpen={(isOpen: boolean) => setShowDelete(isOpen)}
          nameTitle="Xoá người dùng"
          contentQuestion={`Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} tài khoản không ?`}
          handleActionSubmit={handleDelete}
          nameButtonClose="Không"
          nameButtonSubmit="Có"
        />
      </div>
    </div>
  );
};

export default TableComponent;
