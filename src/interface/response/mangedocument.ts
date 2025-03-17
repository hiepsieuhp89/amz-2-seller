export interface IManageDocComeToResponse {
  id: string;
  created_by: CreatedBy;
  created_date: string;
  receive_no: string;
  dispatch_no: string;
  dispatch_issue_date: string;
  from_org: string;
  short_description: string;
  copies: number;
  papers: number;
  security_level: string;
  is_deleted: boolean;
  received_by: ReceivedBy;
  response_secure_info: ResponseSecureInfo;
  archived_no: string;
  presence_by: PresenceBy;
  attached: Attached[];
}

export interface CreatedBy {
  id: string;
  fullname: string;
  username: string;
}

export interface ReceivedBy {
  id: string;
  fullname: string;
  username: string;
}

export interface ResponseSecureInfo {
  date: string;
  signed_by: SignedBy;
}

export interface SignedBy {
  id: string;
  fullname: string;
  username: string;
}

export interface PresenceBy {
  id: string;
  fullname: string;
  username: string;
}

export interface Attached {
  id: string;
  object: string;
  bucket: string;
  name: string;
  type: string;
  uploaded_by: string;
  created_time: string;
  link: string;
}
