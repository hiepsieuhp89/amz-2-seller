export interface IBankData {
  id: string;
  name: string;
  code: string;
  bin: number;
  short_name: string;
  logo_url: string;
  icon_url: string;
  swift_code: string | null;
  lookup_supported: number;
}

export interface IBankListResponse {
  status: boolean;
  message: string;
  data: IBankData[];
  errors: any;
  timestamp: string;
}

export interface IVerifyBankAccountData {
  isValid: boolean;
  accountName?: string;
  accountNumber: string;
  bankName?: string;
}

export interface IVerifyBankAccountResponse {
  status: boolean;
  message: string;
  data: IVerifyBankAccountData;
  errors: any;
  timestamp: string;
} 