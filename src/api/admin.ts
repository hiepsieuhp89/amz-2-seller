import type {
    IUpdateBankInfoRequest,
    IUpdateWithdrawStatusRequest,
    IDownlineQueryParams,
    IWithdrawTransactionsQueryParams,
  } from "@/interface/request/admin"
  import type { IAdminResponse, IWithdrawTransactionsResponse, IDownlineUsersResponse } from "@/interface/response/admin"
  import { sendGet, sendPatch, sendPost } from "./axios"
  
  /**
   * Update a user's bank information (Admin only)
   */
  export const updateUserBankInfo = async (payload: IUpdateBankInfoRequest): Promise<IAdminResponse> => {
    const res = await sendPost("/admin/update-bank-info", payload)
    const data: IAdminResponse = res
    return data
  }
  
  /**
   * Get a list of withdrawal transactions (Admin only)
   */
  export const getWithdrawTransactions = async (
    params?: IWithdrawTransactionsQueryParams,
  ): Promise<IWithdrawTransactionsResponse> => {
    const res = await sendGet("/admin/transactions/withdraw", params)
    const data: IWithdrawTransactionsResponse = res
    return data
  }
  
  /**
   * Update the status of a withdrawal transaction (Admin only)
   */
  export const updateWithdrawStatus = async (payload: IUpdateWithdrawStatusRequest): Promise<IAdminResponse> => {
    const res = await sendPatch("/admin/transactions/withdraw/status", payload)
    const data: IAdminResponse = res
    return data
  }
  
  /**
   * Get a list of downline users (Admin only)
   */
  export const getDownlineUsers = async (params?: IDownlineQueryParams): Promise<IDownlineUsersResponse> => {
    const res = await sendGet("/admin/downline", params)
    const data: IDownlineUsersResponse = res
    return data
  }
  
  