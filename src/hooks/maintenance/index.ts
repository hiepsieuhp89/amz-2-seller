import { getMaintenanceMode, updateMaintenanceMode } from "@/api/maintenance";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
// Query keys
const MAINTENANCE_MODE_KEY = "maintenanceMode";
// Get maintenance mode status
export const useGetMaintenanceMode = (): UseQueryResult<any> => {
    return useQuery({
      queryKey: [MAINTENANCE_MODE_KEY],
      queryFn: () => getMaintenanceMode(),
    });
  };
  
  // Update maintenance mode status
  export const useUpdateMaintenanceMode = (): UseMutationResult<any, Error, any> => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, any>({
      mutationFn: (payload: any) => updateMaintenanceMode(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [MAINTENANCE_MODE_KEY],
        });
      },
    });
  };