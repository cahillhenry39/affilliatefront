import { supabase } from "./supabase";

export async function getAllNotification() {
  const { data: allNotification, error } = await supabase
    .from("notification")
    .select("*");

  if (error) {
    throw new Error("All notification could not be fetched");
  }

  return allNotification;
}

export async function getMyNotification(userId) {
  const { data: notification, error } = await supabase
    .from("notification")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error("Your notification could not be fetched");
  }

  return notification;
}

export async function getANotification(id) {
  const { data: notification, error } = await supabase
    .from("notification")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("This notification could not be fetched");
  }

  return notification;
}

export async function createANotification(newData) {
  const { data: newNotification, error } = await supabase
    .from("notification")
    .insert([{ ...newData }])
    .select();

  if (error) {
    throw new Error("This notificaiton could not be created");
  }

  return newNotification;
}

export async function updateANotificaiton(id, updatedData) {
  const { data: updateNotification, error } = await supabase
    .from("notification")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("This transaction could not be updated");
  }

  return updateNotification;
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
