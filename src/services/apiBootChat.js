import { supabase } from "./supabase";

export async function getAllMyBootChats() {
  const { data: bootChat, error } = await supabase.from("bootData").select("*");

  if (error) {
    throw new Error("All bootChats could not be fetched");
  }

  return bootChat;
}

export async function createABootChat(newChat) {
  const { data: newBootChat, error } = await supabase
    .from("bootData")
    .insert([{ ...newChat }])
    .select();

  if (error) {
    throw new Error("New bootChat could not be created");
  }

  return newBootChat;
}
