import { supabase } from "./supabase";

export async function getAvaultTransaction(vaultId, usersId) {
  const { data: vaultTransaction, error } = await supabase
    .from("vaultTransaction")
    .select("*")
    .eq("usersId", usersId)
    .eq("vaultId", vaultId);

  if (error) {
    throw new Error("This vaultTransaction could not be fetched");
  }

  return vaultTransaction;
}

export async function getAllMyVaultTransaction(usersId) {
  const { data: allMyVaultTransaction, error } = await supabase
    .from("vaultTransaction")
    .select("*")
    .eq("usersId", usersId);

  if (error) {
    throw new Error("All my vault transaction could not be fetched");
  }

  return allMyVaultTransaction;
}

export async function createAVaultTransaction(newData) {
  const { data: newVaultTransaction, error } = await supabase
    .from("vaultTransaction")
    .insert([{ ...newData }])
    .select();

  if (error) {
    throw new Error("This vaultTransaction could not be created");
  }

  return newVaultTransaction;
}

// not altered

export async function updateAvaultTransaction(id, updatedData) {
  const { data: updatedvaultTransaction, error } = await supabase
    .from("vaultTransaction")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("This vaultTransaction could not be updated");
  }

  return updatedvaultTransaction;
}
