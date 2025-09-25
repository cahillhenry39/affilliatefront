import { supabase } from "./supabase";

export async function getAllReadNotification() {
  const { data: allReadNotification, error } = await supabase
    .from("readNotification")
    .select("*");

  if (error) {
    throw new Error("All read notification could not be fetched");
  }

  return allReadNotification;
}

export async function getMyReadNotification(usersId) {
  const { data: myReadNotification, error } = await supabase
    .from("readNotification")
    .select("*")
    .eq("usersId", usersId);

  if (error) {
    throw new Error("Your read notification could not be fetched");
  }

  return myReadNotification;
}

export async function getAReadNotification(id) {
  const { data: readNotification, error } = await supabase
    .from("readNotification")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("This read notification could not be fetched");
  }

  return readNotification;
}

export async function createAReadNotification(newData) {
  const { data: newReadNotification, error } = await supabase
    .from("readNotification")
    .insert([{ ...newData }])
    .select();

  if (error) {
    throw new Error("This read notification could not be created");
  }

  return newReadNotification;
}

export async function updateReadNotification(id, updatedData) {
  const { data: updateAReadNotification, error } = await supabase
    .from("readNotification")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("This read notification could not be updated");
  }

  return updateAReadNotification;
}

export async function downloadFile(fileUrl) {
  const fileArray = fileUrl.split("/");

  const { data: download, error } = await supabase.storage
    .from("POF")
    .download(fileArray[fileArray.length - 1]);

  if (error) {
    throw new Error("This file could not be downloaded");
  }

  return download;
}
