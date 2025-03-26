import type {
  IUpdateBankInfoRequest,
  IUpdateWithdrawStatusRequest,
  IDownlineQueryParams,
  IWithdrawTransactionsQueryParams,
} from "@/interface/request/admin"
import type { IAdminResponse, IWithdrawTransactionsResponse, IDownlineUsersResponse } from "@/interface/response/admin"
import { sendGet, sendPatch, sendPost } from "./axios"

export const updateUserBankInfo = async (payload: IUpdateBankInfoRequest): Promise<IAdminResponse> => {
  const res = await sendPost("/admin/update-bank-info", payload)
  const data: IAdminResponse = res
  return data
}

export const getWithdrawTransactions = async (
  params?: IWithdrawTransactionsQueryParams,
): Promise<IWithdrawTransactionsResponse> => {
  const res = await sendGet("/admin/transactions/withdraw", params)
  const data: IWithdrawTransactionsResponse = res
  return data
}

export const updateWithdrawStatus = async (payload: IUpdateWithdrawStatusRequest): Promise<IAdminResponse> => {
  const res = await sendPatch("/admin/transactions/withdraw/status", payload)
  const data: IAdminResponse = res
  return data
}

export const getDownlineUsers = async (params?: IDownlineQueryParams): Promise<IDownlineUsersResponse> => {
  const res = await sendGet("/admin/downline", params)
  const data: IDownlineUsersResponse = res
  return data
}

