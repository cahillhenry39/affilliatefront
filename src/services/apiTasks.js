import { globalGetQueryURL, globalPostQueryURL } from "./supabase";

export async function checkAndValidateTask() {
  const url = "/task/validate/task";
  return await globalGetQueryURL({ url });
}

export async function getMyATask(id) {
  const url = `/task/fetch/task/${id}`;
  return await globalGetQueryURL({ url });
}

export async function getMyPastTask() {
  const url = "/task/fetch/alltask";
  return await globalGetQueryURL({ url });
}

export async function createATodayTask(newData) {
  const url = "/task/create/todays/task";
  return await globalPostQueryURL({ data: newData, url });
}

export async function claimTodaysTaskEarnings(newData) {
  const url = "/task/claim/reward";
  return await globalPostQueryURL({ data: newData, url });
}

export async function updateMyTodaysTask(newData) {
  const url = "/rate/app/complete";
  return await globalPostQueryURL({ data: newData, url });
}
