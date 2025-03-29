import { sendGet } from "./axios";

export const getShopStatistics = async (): Promise<any> => {
  const res = await sendGet("/shop-products/statistics/shop");
  return res;
};

export const getShopDetailStatistics = async (): Promise<any> => {
  const res = await sendGet("/shop-products/statistics/detail");
  return res;
};

export const getTopSellingProducts = async (limit: number = 10): Promise<any> => {
  const res = await sendGet(`/shop-products/statistics/top-selling?limit=${limit}`);
  return res;
}; 