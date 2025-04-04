import { sendGet } from "./axios";

export const getTransactionHistory = async (params?: any): Promise<any> => {
  const res = await sendGet("/transaction/history", params);
  return res;
}; 