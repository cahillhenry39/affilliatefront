import { globalGetQueryURL, globalPostQueryURL } from "./supabase";

export async function getAReferralWithEmail(email) {
  const url = "/referral/fetch/withemail";
  return await globalPostQueryURL({ data: { email }, url });
}

export async function getAReferralWithPubId(referralUniqueId) {
  if (!referralUniqueId) return {};

  const url = "/referral/fetch/withemail";
  return await globalPostQueryURL({ data: { referralUniqueId }, url });
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

///// For get public referral leaderboard panel ////////////
export async function handleFetchReferralLeaderboard() {
  const url = `/admin/referral/leaderboard`;
  return await globalGetQueryURL({ url });
}
