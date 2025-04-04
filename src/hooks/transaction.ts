import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "@/api/transaction";

export const useTransactionHistory = (params?: any) => {
  const {
    data: transactionHistoryData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["transactionHistory", params],
    queryFn: () => getTransactionHistory(params),
  });

  return {
    transactionHistoryData,
    isLoading,
    isFetching,
    refetch,
  };
}; 