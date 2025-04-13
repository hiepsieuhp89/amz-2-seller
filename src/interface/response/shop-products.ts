import type { IProduct } from "./products";

export interface IShopProduct {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  price: number;
  profit: number;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export interface IShopProductsResponse {
  message: string;
  statusCode: number;
  data: {
    success: boolean;
    shopProducts?: IShopProduct[];
  };
}

export interface IOrderItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  orderId: string;
  shopProductId: string;
  userId: string;
  quantity: number;
  price: string;
  totalAmount: string;
  fedexAmount: string;
  isFedexPaid: boolean;
  shopProduct: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    isActive: boolean;
    profit: string;
    soldCount: number;
  };
}

export interface IOrder {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: string;
  shopId: string;
  totalAmount: string;
  status: string;
  delayStatus: string;
  confirmedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  fedexAmount: string;
  isFedexPaid: boolean;
  email: string;
  phone: string | null;
  address: string;
  items: IOrderItem[];
  delayTime: string | null;
  user: {
    id: string;
    fullName: string;
    // Add other user fields as needed
  };
}

export interface IOrderResponse {
  message: string;
  statusCode: number;
  data: {
    success: boolean;
    data: IOrder[];
    meta: {
      itemCount: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface IShopStatisticsData {
  totalOrders: number;
  totalProfit: number;
  todayOrders: number;
  todayRevenue: string;
  todayProfit: string;
  totalPendingOrderAmount: any;
  totalPendingProfit: any;
  totalPendingOrder: any;
}

export interface IShopStatisticsResponse {
  status: boolean;
  message: string;
  data: IShopStatisticsData;
  errors: any;
  timestamp: string;
}
