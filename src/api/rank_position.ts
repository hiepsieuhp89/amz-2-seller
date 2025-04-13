import { IRequestRankPosition } from "@/interface/request/rank_position";
import { camelizeConvert } from "@/utils";
import { httpGet, httpPost } from "./axios";
import { IResponseRankPosition } from "@/interface/response/rank_position";

export const createRank: (
    payload: IRequestRankPosition
  ) => Promise<any> = async (payload: IRequestRankPosition) => {
    const res = await httpPost('/v1/ranks', payload);
    const { data }: { data: any } = camelizeConvert(res?.data);
    return data;
  };

  export const getAllRank = async (): Promise<IResponseRankPosition[]> => {
    const res = await httpGet('/v1/ranks');
    const { data }: { data: IRequestRankPosition[] } = camelizeConvert(res);
    return data;
  };


export const createPosition: (
    payload: IRequestRankPosition
  ) => Promise<any> = async (payload: IRequestRankPosition) => {
    const res = await httpPost('/v1/positions', payload);
    const { data }: { data: any } = camelizeConvert(res?.data);
    return data;
  };

  export const getAllPosition = async (): Promise<IResponseRankPosition[]> => {
    const res = await httpGet('/v1/positions');
    const { data }: { data: IRequestRankPosition[] } = camelizeConvert(res);
    return data;
  };