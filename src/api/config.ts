import { sendGet, sendPost, sendPut, sendDelete } from "./axios";

export const getAllConfigs = async (params?: any): Promise<any> => {
  const res = await sendGet("/config", params);
  return res;
};

export const getConfigByKey = async (key: string, params?: any): Promise<any> => {
  const res = await sendGet(`/config/${key}`, params);
  return res;
};

export const createConfig = async (data: any): Promise<any> => {
  const res = await sendPost("/config", data);
  return res;
};

export const updateConfig = async (key: string, data: any): Promise<any> => {
  const res = await sendPut(`/config/${key}`, data);
  return res;
};

export const deleteConfig = async (key: string): Promise<any> => {
  const res = await sendDelete(`/config/${key}`);
  return res;
}; 