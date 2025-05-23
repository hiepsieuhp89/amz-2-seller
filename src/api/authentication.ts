import {
  ISignIn,
  IRegister,
  IUpdateBank,
  IUpdateUser,
  IChangePassword,
  ISpreadPackageHistoryParams,
  IPackageHistoryParams,
  ICheckUserExists,
} from "@/interface/request/authentication";
import {
  IAuthResponse,
  IProfileResponse,
  IBankListResponse,
  ISpreadPackageHistoryResponse,
  IPackageHistoryResponse,
  ICheckUserExistsResponse,
} from "@/interface/response/authentication";
import { sendGet, sendPost, sendPut } from "./axios";

export const register = async (payload: IRegister): Promise<IAuthResponse> => {
  const res = await sendPost("/auth/register", payload);
  const data: IAuthResponse = res;
  return data;
};

export const signIn = async (payload: ISignIn): Promise<IAuthResponse> => {
  const res = await sendPost("/auth/login", payload);
  const data: IAuthResponse = res;
  return data;
};

export const getProfile = async (): Promise<IProfileResponse> => {
  const res = await sendGet("/auth/profile");
  const data: IProfileResponse = res;
  return data;
};

export const updateBank = async (
  payload: IUpdateBank
): Promise<IAuthResponse> => {
  const res = await sendPut("/auth/update-bank", payload);
  const data: IAuthResponse = res;
  return data;
};

export const getBankList = async (): Promise<IBankListResponse> => {
  const res = await sendGet("/auth/list-bank");
  const data: IBankListResponse = res;
  return data;
};

export const updateUser = async (
  payload: IUpdateUser
): Promise<IAuthResponse> => {
  const res = await sendPut("/auth/update-user", payload);
  const data: IAuthResponse = res;
  return data;
};

export const changePassword = async (
  payload: IChangePassword
): Promise<IAuthResponse> => {
  const res = await sendPut("/auth/changePassword", payload);
  const data: IAuthResponse = res;
  return data;
};

export const getSpreadPackageHistory = async (
  params?: ISpreadPackageHistoryParams
): Promise<ISpreadPackageHistoryResponse> => {
  const res = await sendGet("/auth/spread-package-purchase-history", params);
  const data: ISpreadPackageHistoryResponse = res;
  return data;
};

export const getPackageHistory = async (
  params?: IPackageHistoryParams
): Promise<IPackageHistoryResponse> => {
  const res = await sendGet("/auth/package-purchase-history", params);
  const data: IPackageHistoryResponse = res;
  return data;
};

export const checkUserExists = async (
  params: ICheckUserExists
): Promise<ICheckUserExistsResponse> => {
  const res = await sendGet("/auth/check-user-exists", params);
  const data: ICheckUserExistsResponse = res;
  return data;
};

export const verifyEmail = async (
  payload: { email: string; otp: string }
): Promise<IAuthResponse> => {
  const res = await sendPost("/auth/verify-email", payload);
  const data: IAuthResponse = res;
  return data;
};

export const resendOtp = async (
  payload: { email: string }
): Promise<{ success: boolean; message: string }> => {
  const res = await sendPost("/auth/resend-otp", payload);
  return res;
};
