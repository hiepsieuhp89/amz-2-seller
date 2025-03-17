import { IManageDocComeToRequest, IQueryParams } from "@/interface/request/managedocument";
import { IManageDocComeToResponse } from "@/interface/response/mangedocument";
import { htpPatch, httpDelete, httpGet, httpPost, httpPut } from "./axios";
import { camelizeConvert } from "@/utils";

export const createManageDocComeTo: (
    payload: IManageDocComeToRequest
  ) => Promise<IManageDocComeToResponse> = async (payload: IManageDocComeToRequest) => {
    const res = await httpPost('/v1/dispatchs', payload);
    const { data }: { data: IManageDocComeToResponse } = camelizeConvert(res?.data);
    return data;
  };


  export const getAllManageDocComeTo = async (params:IQueryParams): Promise<any> => {
    const res = await httpGet('/v1/dispatchs',params);
    const { data }: { data: any } = res;
    return data;
  };

  export const deleteManageDocComeToById: (manageId: string) => Promise<any> = async (
    manageId: string
  ) => {
    const res = await httpDelete(
      `/v1/dispatchs/${manageId}`
    );
    const { data } = camelizeConvert(res);
    return data;
  };

  export const getDetailManageDocComeTo = async (
    manageId: string
  ): Promise<any> => {
    const res = await httpGet(`/v1/dispatchs/${manageId}`);
    const { data }: { data: IManageDocComeToResponse } =res;
    return data;
  };

  export const updateManageDocComeTo: (
    id: string,
    payload: IManageDocComeToRequest
  ) => Promise<IManageDocComeToResponse> = async (
    manageId: string,
    payload: IManageDocComeToRequest
  ) => {
    const res = await httpPut(
      `/v1/dispatchs/${manageId}`,
      payload
    );
    const { data }: { data: IManageDocComeToResponse } = res;
    return data;
  };
  