import { createPosition, createRank, getAllPosition, getAllRank } from "@/api/rank_position";
import { IRequestRankPosition } from "@/interface/request/rank_position";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useListAllRank = () => {
  const {
    data: listAllRank,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["listRank"],
    queryFn: () => getAllRank(),
  });
  return {
    listAllRank,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useCreateRank = (): UseMutationResult<
  any,
  Error,
  IRequestRankPosition
> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IRequestRankPosition>({
    mutationFn: (params: IRequestRankPosition) => createRank(params),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({
        queryKey: ["listRank"],
      });
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};
export const useListAllPosition = () => {
  const {
    data: listAllPosition,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["listPosition"],
    queryFn: () => getAllPosition(),
  });
  return {
    listAllPosition,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useCreatePosition = (): UseMutationResult<
  any,
  Error,
  IRequestRankPosition
> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IRequestRankPosition>({
    mutationFn: (params: IRequestRankPosition) => createPosition(params),
    onSuccess: (result: any) => {
      queryClient.invalidateQueries({
        queryKey: ["listPosition"],
      });
      return result;
    },
    onError: (result) => {
      return result;
    },
  });
};
