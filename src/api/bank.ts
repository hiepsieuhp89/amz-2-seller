import { sendGet, sendPost } from "./axios";
import { IBankListResponse, IVerifyBankAccountResponse } from "@/interface/response/bank";

export const getBankList = async (): Promise<IBankListResponse> => {
  const res = await sendGet("/bank-lookup/banks");
  return res;
};

export interface IVerifyBankAccountParams {
  bankCode: string;
  accountNumber: string;
}

export const verifyBankAccount = async (params: IVerifyBankAccountParams): Promise<IVerifyBankAccountResponse> => {
  const res = await sendPost("/bank-lookup/get-bank-name", params);
  return res;
};
