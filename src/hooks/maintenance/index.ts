import { getMaintenanceMode, updateMaintenanceMode } from "@/api/maintenance";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Query keys
const MAINTENANCE_MODE_KEY = "maintenanceMode";

// Get maintenance mode status
export const useGetMaintenanceMode = (): UseQueryResult<any> => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: [MAINTENANCE_MODE_KEY],
    queryFn: async () => {
      try {
        return await getMaintenanceMode();
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 502) {
          // Set maintenance mode automatically on 502 error
          try {
            await updateMaintenanceMode({ 
              isMaintenance: true, 
              message: "System is temporarily unavailable due to technical issues." 
            });
            
            // Return a maintenance mode object to be used in the UI
            return { isMaintenance: true };
          } catch (err) {
            console.error("Failed to set maintenance mode:", err);
          }
        }
        // Re-throw the error to be handled by react-query
        throw error;
      }
    },
    retry: false, // Don't retry when we get errors
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