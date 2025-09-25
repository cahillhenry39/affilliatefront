import { globalGetQueryURL, globalPostQueryURL } from "./supabase";

export async function handleFetchAllStocks() {
  const url = "/stock/fetch/all";
  return await globalGetQueryURL({ url });
}

export async function handleFetchSingleStocks(id) {
  const url = `/stock/fetch/${id}`;
  return await globalGetQueryURL({ url });
}

export async function handleFetchSingleStocksPurchases(id, purchaseId) {
  const url = `/stock/fetch/${id}/transaction/${purchaseId}`;
  return await globalGetQueryURL({ url });
}

/////////////// For stock puchases and fetching///////////////
/////////////////////////////////////////////////////////////////

export async function handlePurchaseStock(data) {
  const url = `/stock/purchase`;
  return await globalPostQueryURL({ url, data });
}

export async function handleWithdrawStock(data) {
  const url = `/stock/withdrawal`;
  return await globalPostQueryURL({ url, data });
}
