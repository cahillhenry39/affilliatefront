import { supabase } from "./supabase";

export async function getAllToken() {
  const { data: allToken, error } = await supabase
    .from("activeToken")
    .select("*");

  if (error) {
    throw new Error("Tokens could not be fetched");
  }

  return allToken;
}

export async function getAToken(id) {
  const { data: aaToken, error } = await supabase
    .from("activeToken")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("This token could not be fetched");
  }

  return aaToken;
}

export async function getATokenByToken(token) {
  const { data: newToken, error } = await supabase
    .from("activeToken")
    .select("*")
    .eq("token", token)
    .eq("isActive", true);

  if (error) {
    throw new Error("Token could not be fetched");
  }

  return newToken;
}

export async function updateAToken(id, updatedData) {
  const { data: updatedToken, error } = await supabase
    .from("activeToken")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("This token request could not be updated");
  }

  return updatedToken;
}

export async function createAToken(newToken) {
  const { data: token, error } = await supabase
    .from("activeToken")
    .insert([{ ...newToken }])
    .select();

  if (error) {
    throw new Error("Token could not be created");
  }

  return token;
}

//  Not altered
