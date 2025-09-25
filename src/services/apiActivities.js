import { globalGetQueryURL, supabase } from "./supabase";

export async function getAllActivities() {
  const url = "/user/activities";

  const allActivities = await globalGetQueryURL({ url });

  return allActivities;
}

export async function createActivities(newActivity) {
  const { data: activity, error } = await supabase
    .from("activities")
    .insert([{ ...newActivity }])
    .select();

  if (error) {
    throw new Error("Your activity could not be created");
  }

  return activity;
}
