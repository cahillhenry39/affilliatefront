import { globalGetQueryURL, globalPostQueryURL } from "./supabase";

export async function handleFetchActiveSpinners() {
  const url = "/spinner/fetch/all";
  return await globalGetQueryURL({ url });
}

export async function handleUpdateSpinner(data) {
  const url = `/spinner/update`;

  return await globalPostQueryURL({ data, url });
}
