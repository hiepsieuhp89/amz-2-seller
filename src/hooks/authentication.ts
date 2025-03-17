
import { signIn } from '@/api/authentication';
import { ISignIn } from '@/interface/request/authentication';
import { IAuthResponse } from '@/interface/response/authentication';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

export const useSignIn = (): UseMutationResult<
  IAuthResponse,
  Error,
  ISignIn
> => {
  return useMutation<IAuthResponse, Error, ISignIn>({
    mutationFn: (params: ISignIn) => signIn(params),
    onSuccess: (result: IAuthResponse) => {
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};