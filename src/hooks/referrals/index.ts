import {
    getReferralsByUser,
    getReferralsByCode,
    getReferralStats,
    checkReferralCode,
    getReferredUsers,
  } from "@/api/referrals"
  import type { IReferralQueryParams } from "@/interface/request/referrals"
  import { useQuery } from "@tanstack/react-query"
  
  export const useReferralsByUser = (userId: string, params?: IReferralQueryParams) => {
    const {
      data: referralsData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["referralsByUser", userId, params],
      queryFn: () => getReferralsByUser(userId, params),
      enabled: !!userId, // Only run the query if userId is provided
    })
  
    return {
      referralsData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  export const useReferralsByCode = (code: string, params?: IReferralQueryParams) => {
    const {
      data: referralsData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["referralsByCode", code, params],
      queryFn: () => getReferralsByCode(code, params),
      enabled: !!code, // Only run the query if code is provided
    })
  
    return {
      referralsData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  export const useReferralStats = () => {
    const {
      data: statsData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["referralStats"],
      queryFn: () => getReferralStats(),
    })
  
    return {
      statsData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  export const useCheckReferralCode = (code: string) => {
    const {
      data: codeValidData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["referralCodeValid", code],
      queryFn: () => checkReferralCode(code),
      enabled: !!code, // Only run the query if code is provided
    })
  
    return {
      codeValidData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  export const useReferredUsers = (userId: string, params?: IReferralQueryParams) => {
    const {
      data: referredUsersData,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ["referredUsers", userId, params],
      queryFn: () => getReferredUsers(userId, params),
      enabled: !!userId, // Only run the query if userId is provided
    })
  
    return {
      referredUsersData,
      isLoading,
      isFetching,
      refetch,
    }
  }
  
  