export interface IAuthResponse {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
  }
}
