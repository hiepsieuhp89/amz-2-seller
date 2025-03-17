export interface IManageDocComeToRequest {
  receive_no: string;
  dispatch_no: string;
  from_org: string;
  dispatch_issue_date: string;
  short_description: string;
  copies: number;
  papers: number;
  security_level?: string;
  received_by?: string[];
  archived_no?: string;
  response_secure_info?: ResponseSecureInfo;
  cancellation?: Cancellation;
  presence_by?: string;
  attached?: string[];
}

export interface ResponseSecureInfo {
  date?: string;
  signed_by?: string;
}

export interface Cancellation {
  date?: string;
  copies?: number;
  signed_by?: string;
}
export interface IQueryParams {
  page?: number;
  size?: number;
  query?: any;
  from?: any;
  to?: any;
}

export type FileType = {
  receive_no: string;
  dispatch_no: string;
  from_org: string;
  dispatch_issue_date: string;
  short_description: string;
  copies: number;
  papers: number;
  security_level?: string;
  received_by?: string[];
  archived_no?: string;
  response_secure_info: {
    date: string;
    signed_by: string;
  };
  cancellation: {
    date: string;
    copies: number;
    signed_by: string;
  };
  presence_by?: string;
  attached?: string[];
};
