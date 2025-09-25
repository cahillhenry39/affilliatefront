import { globalGetQueryURL, globalPostQueryURL } from "./supabase";

export async function getAReferralWithEmail(email) {
  const url = "/referral/fetch/withemail";
  return await globalPostQueryURL({ data: { email }, url });
}

export async function getMyReferralDetails() {
  const url = `/referral/fetch`;
  return await globalGetQueryURL({ url });
}

export async function getAllMyReferrals() {
  return [];
}

export async function getAReferralWithId() {
  return {};
}

export async function updateAReferral() {
  return [];
}
