import { signIn, register, getProfile, updateBank, getBankList, updateUser, changePassword } from "@/api/authentication"
import type { ISignIn, IRegister, IUpdateBank, IUpdateUser, IChangePassword } from "@/interface/request/authentication"
import type { IAuthResponse } from "@/interface/response/authentication"
import { type UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useSignIn = (): UseMutationResult<IAuthResponse, Error, ISignIn> => {
  return useMutation<IAuthResponse, Error, ISignIn>({
    mutationFn: (params: ISignIn) => signIn(params),
    onSuccess: (result: IAuthResponse) => {
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

export const useRegister = (): UseMutationResult<IAuthResponse, Error, IRegister> => {
  return useMutation<IAuthResponse, Error, IRegister>({
    mutationFn: (params: IRegister) => register(params),
    onSuccess: (result: IAuthResponse) => {
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

export const useProfile = () => {
  const {
    data: profileData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getProfile(),
  })

  return {
    profileData,
    isLoading,
    isFetching,
    refetch,
  }
}

export const useUpdateBank = (): UseMutationResult<IAuthResponse, Error, IUpdateBank> => {
  const queryClient = useQueryClient()

  return useMutation<IAuthResponse, Error, IUpdateBank>({
    mutationFn: (params: IUpdateBank) => updateBank(params),
    onSuccess: (result: IAuthResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

export const useBankList = () => {
  const {
    data: bankListData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["bankList"],
    queryFn: () => getBankList(),
  })

  return {
    bankListData,
    isLoading,
    isFetching,
  }
}

export const useUpdateUser = (): UseMutationResult<IAuthResponse, Error, IUpdateUser> => {
  const queryClient = useQueryClient()

  return useMutation<IAuthResponse, Error, IUpdateUser>({
    mutationFn: (params: IUpdateUser) => updateUser({
      ...params,
    }),
    onSuccess: (result: IAuthResponse) => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      })
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

export const useChangePassword = (): UseMutationResult<IAuthResponse, Error, IChangePassword> => {
  return useMutation<IAuthResponse, Error, IChangePassword>({
    mutationFn: (params: IChangePassword) => changePassword(params),
    onSuccess: (result: IAuthResponse) => {
      return result
    },
    onError: (result) => {
      return result
    },
  })
}

