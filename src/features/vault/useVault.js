import { useMutation, useQuery } from "@tanstack/react-query";
import {
  handleFetchAllStocks,
  handleFetchSingleStocks,
  handleFetchSingleStocksPurchases,
  handlePurchaseStock,
  handleWithdrawStock,
} from "../../services/apiVault";
import toast from "react-hot-toast";

export function useGetAllStocks() {
  const { data, isLoading } = useQuery({
    queryFn: handleFetchAllStocks,

    queryKey: ["all_stocks"],
  });

  return {
    isTopStocks: data?.isTopStocks,
    isVeryRisky: data?.isVeryRisky,
    isModerate: data?.isModerate,
    totalActivePurchase: data?.totalActivePurchase,
    totalValue: data?.totalValue,
    isLoading,
  };
}

export function useFetchSingleStock(id) {
  const { data, isLoading } = useQuery({
    queryFn: () => handleFetchSingleStocks(id),

    queryKey: ["single_stock", id],
  });

  return {
    singleStock: data?.currentStock,
    purchaseStock: data?.purchaseStock,
    isLoading,
  };
}

export function useFetchSingleStockPuchase(id, purchaseId) {
  const { data, isLoading } = useQuery({
    queryFn: () => handleFetchSingleStocksPurchases(id, purchaseId),

    queryKey: ["single_stock_purchases", id, purchaseId],
  });

  return {
    singleStock: data?.currentStock,
    purchaseStock: data?.purchaseStock,
    isLoading,
  };
}

/////////////// For stock puchases and fetching///////////////

export function useBuyStock() {
  const { mutate: purchaseStock, isPending } = useMutation({
    mutationFn: handlePurchaseStock,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { purchaseStock, isPending };
}

export function useCashoutStock() {
  const { mutate: cashOutStock, isPending } = useMutation({
    mutationFn: handleWithdrawStock,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { cashOutStock, isPending };
}
