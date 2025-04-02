import { IVerifyBankAccountResponse } from "@/interface/response/bank";
import { sendPost } from "./axios";

export const verifyBankAccount = async (
  bankCode: string,
  accountNumber: string
): Promise<IVerifyBankAccountResponse> => {
  // Fake response - luôn trả về hợp lệ
  const fakeResponse: IVerifyBankAccountResponse = {
    message: "Verify bank account successfully",
    statusCode: 200,
    data: {
      isValid: true,
      accountName: "NGUYEN VAN A", // Tên chủ tài khoản mẫu
      accountNumber: accountNumber,
      bankName: bankCode === "vcb" ? "Vietcombank" : "Techcombank"
    }
  }
  
  // Giả lập delay network
  await new Promise(resolve => setTimeout(resolve, 500))
  return fakeResponse
  
}
