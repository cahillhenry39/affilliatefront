import { globalGetQueryURL } from "./supabase";

export async function handleFetchCompanyDetails() {
  const url = "/company/";
  return await globalGetQueryURL({ url });
}
