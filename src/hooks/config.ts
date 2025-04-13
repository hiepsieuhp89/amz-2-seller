import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllConfigs, getConfigByKey, createConfig, updateConfig, deleteConfig } from "@/api/config";

export const useAllConfigs = (params?: any) => {
  const {
    data: configsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["configs", params],
    queryFn: () => getAllConfigs(params),
  });

  return {
    configsData,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useConfigByKey = (key: string, params?: any) => {
  const {
    data: configData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["config", key, params],
    queryFn: () => getConfigByKey(key, params),
    enabled: !!key,
  });

  return {
    configData,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useCreateConfig = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (data: any) => createConfig(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["configs"] });
    },
  });

  return {
    createConfig: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export const useUpdateConfig = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: ({ key, data }: { key: string; data: any }) => updateConfig(key, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      queryClient.invalidateQueries({ queryKey: ["config", variables.key] });
    },
  });

  return {
    updateConfig: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export const useDeleteConfig = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (key: string) => deleteConfig(key),
    onSuccess: (_, key) => {
      queryClient.invalidateQueries({ queryKey: ["configs"] });
      queryClient.invalidateQueries({ queryKey: ["config", key] });
    },
  });

  return {
    deleteConfig: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}; 