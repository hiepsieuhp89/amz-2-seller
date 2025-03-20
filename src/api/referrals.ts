import type { IReferralQueryParams } from "@/interface/request/referrals"
import type {
  IReferralUsersResponse,
  IReferralStatsResponse,
  IReferralCodeValidResponse,
} from "@/interface/response/referrals"
import { sendGet } from "./axios"

export const getReferralsByUser = async (
  userId: string,
  params?: IReferralQueryParams,
): Promise<IReferralUsersResponse> => {
  const res = await sendGet(`/referrals/by-user/${userId}`, params)
  const data: IReferralUsersResponse = res
  return data
}

export const getReferralsByCode = async (
  code: string,
  params?: IReferralQueryParams,
): Promise<IReferralUsersResponse> => {
  const res = await sendGet(`/referrals/by-code/${code}`, params)
  const data: IReferralUsersResponse = res
  return data
}

export const getReferralStats = async (): Promise<IReferralStatsResponse> => {
  const res = await sendGet("/referrals/stats")
  const data: IReferralStatsResponse = res
  return data
}

export const checkReferralCode = async (code: string): Promise<IReferralCodeValidResponse> => {
  const res = await sendGet(`/referrals/code/${code}`)
  const data: IReferralCodeValidResponse = res
  return data
}

export const getReferredUsers = async (
  userId: string,
  params?: IReferralQueryParams,
): Promise<IReferralUsersResponse> => {
  const res = await sendGet(`/referrals/user/${userId}`, params)
  const data: IReferralUsersResponse = res
  return data
}

