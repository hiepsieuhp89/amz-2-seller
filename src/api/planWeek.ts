import { IQueryParams } from "@/interface/request/managedocument";
import { IExportFile, IQueryParmaPlanWeek, IQueryParmaVersionHistory } from "@/interface/request/planWeek";
import { camelizeConvert } from "@/utils";
import axios from "axios";
import { error } from "console";
import { saveAs } from "file-saver";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const getAllPlanWeek = async (params:IQueryParams): Promise<any> => {
    const res = await sendGet('/v1/weekly',params);
    const { data }: { data: any } = res;
    return data;
  };
  export const getDetailPlanWeek = async (
    params: IQueryParmaPlanWeek
  ): Promise<any> => {
    try {
      const res = await sendGet('/v1/weekly/detail', params);
      const { data }: { data: any } = res;
      return data;
    } catch (error:any) {
      console.error('Lỗi khi gọi API:', error?.response?.data?.code);

    }
  };
  

  export const deletePlanWeekbyWeekYear: (params: IQueryParmaPlanWeek) => Promise<any> = async (
    params: IQueryParmaPlanWeek
  ) => {
    const { year, week_number } = params;
    const res = await sendDelete(`/v1/weekly?year=${year}&week_number=${week_number}`);
    const { data } = camelizeConvert(res);
    return data;
  };
  export const updatePlanWeekDetail: (
    params: IQueryParmaPlanWeek,
    payload: any
  ) => Promise<any> = async (
    params:IQueryParmaPlanWeek,
    payload: any,
   
  ) => {
    const {year,week_number}=params
    const res = await sendPut(
      `/v1/weekly?year=${year}&week_number=${week_number}`,
      payload
    );
    const { data }: { data: any } = res;
    return data;
  };
  
  export const publishUpdateWithGA: (
    params: IQueryParmaPlanWeek,
    payload: any
  ) => Promise<any> = async (
    params:IQueryParmaPlanWeek,
    payload: any,
   
  ) => {
    const {year,week_number}=params
    const res = await sendPost(
      `/v1/weekly/GA?year=${year}&week_number=${week_number}`,
      payload
    );
    const { data }: { data: any } = res;
    return data;
  };



  export const getDetailVersion = async (
    params: IQueryParmaVersionHistory
  ): Promise<any> => {
      const res = await sendGet('/v1/version', params);
      const { data }: { data: any } = res;
      return data;
  };
  
  export const downLoadFilePlanWeekWithLeader: (
    payload: IExportFile
  ) => Promise<any> = async (payload: IExportFile) => {
    const url = '/v1/weekly/export-ld-word';
    
    return sendPost(url, payload)
      .then((response: any) => {
        return response
      })
      .catch((error: any) => {
        console.error('Lỗi khi tải xuống:', error);
      });
  };
  export const downLoadFilePdfWithLeader: (
    payload: IExportFile
  ) => Promise<any> = async (payload: IExportFile) => {
    const url = '/v1/weekly/export-ld-pdf'; 
    
    return sendPost(url, payload)
      .then((response: any) => {
        return response
      })
      .catch((error: any) => {
        console.error('Lỗi khi tải xuống:', error);
      });
  };


 
  
  export const downLoadFilePlanWeekwithGA: (
    payload: IExportFile
  ) => Promise<any> = async (payload: IExportFile) => {
    const url = '/v1/weekly/export-word'; 
    
    return sendPost(url, payload)
      .then((response: any) => {
        return response
      })
      .catch((error: any) => {
        console.error('Lỗi khi tải xuống:', error);
      });
  };

  export const downLoadFilePlanWeekPdfwithGA: (
    payload: IExportFile
  ) => Promise<any> = async (payload: IExportFile) => {
    const url = '/v1/weekly/export-pdf'; 
    
    return sendPost(url, payload)
      .then((response: any) => {
        return response
      })
      .catch((error: any) => {
        console.error('Lỗi khi tải xuống:', error);
      });
  };
