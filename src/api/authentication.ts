import { ISignIn } from "@/interface/request/authentication";
import { IAuthResponse } from "@/interface/response/authentication";
import { camelizeConvert } from "@/utils";
import { sendPost } from "./axios";


export const signIn: (payload: ISignIn) => Promise<IAuthResponse> = async (
  payload: ISignIn
) => {
  const res = await sendPost('/auth/login', payload);
  const data: IAuthResponse =res;
  return data;
};
