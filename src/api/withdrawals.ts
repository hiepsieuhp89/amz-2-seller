import {
  ICreateWithdrawal,
  IUpdateWithdrawalStatus,
} from "@/interface/request/withdrawals"
import {
  IWithdrawalResponse,
  IWithdrawalListResponse,
} from "@/interface/response/withdrawals"
import { sendPost, sendPut, sendGet } from "./axios"

export const createWithdrawal = async (payload: ICreateWithdrawal): Promise<IWithdrawalResponse> => {
  const res = await sendPost("/withdrawals", payload)
  const data: IWithdrawalResponse = res
  return data
}

export const getUserWithdrawals = async (params?: { page: number; take: number, search?: string, status?: string }): Promise<IWithdrawalListResponse> => {
  const res = await sendGet("/withdrawals/user", params)
  const data: IWithdrawalListResponse = res
  return data
}

export const updateWithdrawalStatus = async (
  id: string,
  payload: IUpdateWithdrawalStatus
): Promise<IWithdrawalResponse> => {
  const res = await sendPut(`/withdrawals/${id}/status`, payload)
  const data: IWithdrawalResponse = res
  return data
} 