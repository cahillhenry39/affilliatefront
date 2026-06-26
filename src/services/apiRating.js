import { supabase } from "./supabase";

export async function getAllRatings(type) {
  const field = type === "loan" ? "loanRating" : "brokersRating";
  const { data: allRatings, error } = await supabase.from(field).select("*");

  if (error) {
    throw new Error("Ratings could not be fetched");
  }

  return allRatings;
}

export async function getRatingsByUser(type, userId) {
  const field = type === "loan" ? "loanRating" : "brokersRating";
  const searchId = type === "loan" ? "usersId" : "brokersId";

  const { data: usersRating, error } = await supabase
    .from(field)
    .select("*")
    .eq(searchId, userId);

  if (error) {
    throw new Error("Ratings could not be fetched");
  }

  return usersRating;
}

export async function createRating(type, newData) {
  const field = type === "loan" ? "loanRating" : "brokersRating";

  const { data: newRating, error } = await supabase
    .from(field)
    .insert([{ ...newData }])
    .select();

  if (error) {
    throw new Error("Your rating could not be created");
  }

  return newRating;
}
