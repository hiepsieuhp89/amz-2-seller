import {
  ISignIn,
  IRegister,
  IUpdateBank,
  IUpdateUser,
  IChangePassword,
} from "@/interface/request/authentication";
import {
  IAuthResponse,
  IProfileResponse,
  IBankListResponse,
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
