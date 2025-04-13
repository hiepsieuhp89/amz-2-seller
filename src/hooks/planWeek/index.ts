import { deletePlanWeekbyWeekYear,  downLoadFilePdfWithLeader,  downLoadFilePlanWeekPdfwithGA,  downLoadFilePlanWeekwithGA,  downLoadFilePlanWeekWithLeader, getAllPlanWeek, getDetailPlanWeek, getDetailVersion, publishUpdateWithGA, updatePlanWeekDetail } from "@/api/planWeek";
import { IQueryParams } from "@/interface/request/managedocument";
import { IExportFile, IQueryParmaPlanWeek, IQueryParmaVersionHistory } from "@/interface/request/planWeek";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";

export const useListAllPlantWeek = (params:IQueryParams) => {
    const {
      data: listAllPlanWeek,
      isLoading,
      isFetching,
    } = useQuery({
      queryKey: ['listAllPlanWeek', params],
      queryFn: () => getAllPlanWeek(params),
    });
    return {
        listAllPlanWeek,
      isLoading,
      isFetching,
    };
  };


  export const useDetailPlantWeek = (params: IQueryParmaPlanWeek) => {
    const {
      data: dataPlanWeekDetail,
      isLoading,
      isFetching,
    } = useQuery({
      queryKey: ['detailPlanWeek', params],
      queryFn: () => getDetailPlanWeek(params),
    });


  
    return {
      dataPlanWeekDetail,
      isLoading,
      isFetching,
     
    };
  };

  export const useDeletePlanWeekbyWeekPlan = (): UseMutationResult<any, Error, any> => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
      mutationFn: (params: IQueryParmaPlanWeek) => deletePlanWeekbyWeekYear(params),
      onSuccess: async (result: any) => {
        await queryClient.invalidateQueries({
          queryKey: ['listAllPlanWeek'],
        });
        return result;
      },
      onError: (result) => {
        return result;
      },
    });
  };

  export const useUpdatePlanWeekDetail = (
    params: IQueryParmaPlanWeek,
  ): UseMutationResult<any, Error, any> => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
      mutationFn: (payload: any) =>
        updatePlanWeekDetail( params,payload),
      onSuccess: (result: any) => {
        queryClient.invalidateQueries({
          queryKey: ['detailPlanWeek'],
        });
        return result;
      },
      onError: (result) => {
        return result;
      },
    });
  };
  export const useUpdatePlanWeekDetailWithGA = (
    params: IQueryParmaPlanWeek,
  ): UseMutationResult<any, Error, any> => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
      mutationFn: (payload: any) =>
        publishUpdateWithGA( params,payload),
      onSuccess: (result: any) => {
        queryClient.invalidateQueries({
          queryKey: ['detailPlanWeek'],
        });
        return result;
      },
      onError: (result) => {
        return result;
      },
    });
  };

  export const useCreateDownloadPlanWeekFileWithGA = (): UseMutationResult<
  any,
  Error,
  any
> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (params: any) => downLoadFilePlanWeekwithGA(params),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({
        queryKey: [''],
      });
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};
  export const useCreateDownloadPlanWeekFilePdfWithGA = (): UseMutationResult<
  any,
  Error,
  any
> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IExportFile>({
    mutationFn: (params: IExportFile) => downLoadFilePlanWeekPdfwithGA(params),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({
        queryKey: [''],
      });
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};


  export const useCreateDownloadPlanWeekFileWithLD = (): UseMutationResult<
  any,
  Error,
  any
> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (params: IExportFile) => downLoadFilePlanWeekWithLeader(params),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({
        queryKey: [''],
      });
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};


export const useCreateDownloadPdfWithLD = (): UseMutationResult<
any,
Error,
any
> => {
const queryClient = useQueryClient();

return useMutation<any, Error, any>({
  mutationFn: (params: any) => downLoadFilePdfWithLeader(params),
  onSuccess: (result: any) => {
    queryClient.invalidateQueries({
      queryKey: [''],
    });
    return result;
  },
  onError: (result) => {
    return result;
  },
});
};





export const useDataVersionHistory = (params: IQueryParmaVersionHistory) => {
  const {
    data: dataVersionHistory,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['detailPlanWeek', params],
    queryFn: () => getDetailVersion(params),
  });
  return {
    dataVersionHistory,
    isLoading,
    isFetching,
   
  };
};
