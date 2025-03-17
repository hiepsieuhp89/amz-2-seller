export interface IAuthResponse {
  message: string;
  statusCode: number;
  data: {
    access_token: string;
  }
}
