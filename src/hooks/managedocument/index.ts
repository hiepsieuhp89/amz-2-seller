import { createManageDocComeTo, deleteManageDocComeToById, getAllManageDocComeTo, getDetailManageDocComeTo, updateManageDocComeTo } from "@/api/manegedocument";
import { IManageDocComeToRequest, IQueryParams } from "@/interface/request/managedocument";
import { IManageDocComeToResponse } from "@/interface/response/mangedocument";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateManageDocComeTo = (): UseMutationResult<
  IManageDocComeToResponse,
  Error,
  IManageDocComeToRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<IManageDocComeToResponse, Error, IManageDocComeToRequest>({
    mutationFn: (params: IManageDocComeToRequest) => createManageDocComeTo(params),
    onSuccess: (result: IManageDocComeToResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['listMangeDocComeTo'],
      });
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};


export const useListManageComeTo = (params:IQueryParams) => {
    const {
      data: listMangeDocComeTo,
      isLoading,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: ['listMangeDocComeTo', params],
      queryFn: () => getAllManageDocComeTo(params),
    });
    return {
       listMangeDocComeTo,
      isLoading,
      isFetching,
      refetch,
    };
  };

  export const useDeleteMageDocumentById = (): UseMutationResult<any, Error, any> => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
      mutationFn: (manageId: string) => deleteManageDocComeToById(manageId),
      onSuccess: async (result: any) => {
        await queryClient.invalidateQueries({
          queryKey: ['listMangeDocComeTo'],
        });
        return result;
      },
      onError: (result) => {
        return result;
      },
    });
  };


  export const useDetailManageDocComeTo = (manageId: string) => {
    const {
      data: dataManageDocComeToDetail,
      isLoading,
      isFetching,
    } = useQuery({
      queryKey: ['detailManageDocComeTo', manageId],
      queryFn: () => getDetailManageDocComeTo(manageId),
    });
  
    return {
      dataManageDocComeToDetail,
      isLoading,
      isFetching,
     
    };
  };


  export const useUpdateMangeDocComeTo = (
    manageId: string
  ): UseMutationResult<IManageDocComeToResponse, Error, IManageDocComeToRequest> => {
    const queryClient = useQueryClient();
    return useMutation<IManageDocComeToResponse, Error, IManageDocComeToRequest>({
      mutationFn: (payload: IManageDocComeToRequest) =>
        updateManageDocComeTo(manageId, payload),
      onSuccess: (result: IManageDocComeToResponse) => {
        queryClient.invalidateQueries({
          queryKey: ['listMangeDocComeTo'],
        });
        queryClient.invalidateQueries({
          queryKey: ['detailManageDocComeTo',manageId],
        });
        return result;
      },
      onError: (result) => {
        return result;
      },
    });
  };
  

