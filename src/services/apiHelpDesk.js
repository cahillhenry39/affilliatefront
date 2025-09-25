import { supabase } from "./supabase";

export async function getAllHelpDesk() {
  const { data: allMessages, error } = await supabase
    .from("helpDesk")
    .select("*");

  if (error) {
    throw new Error("All messages could not be fetched");
  }

  return allMessages;
}

export async function getAMessage(id) {
  const { data: aMessage, error } = await supabase
    .from("helpDesk")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("This message could not be fetched");
  }

  return aMessage;
}

export async function updateAMessage(id, updatedData) {
  const { data: updatedMessage, error } = await supabase
    .from("helpDesk")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("This message could not be updated");
  }

  return updatedMessage;
}

export async function createAMesage(newData) {
  const { data: newMessage, error } = await supabase
    .from("helpDesk")
    .insert([{ ...newData }])
    .select();

  if (error) {
    throw new Error("Your message could not be sent");
  }

  return newMessage;
}

// not altered

export async function getOneSubscriber(id) {
  const { data: subscriber, error } = await supabase
    .from("helpDesk")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("This subscriber could not be fetched");
  }

  return subscriber;
}

export async function deleteSubscriber(id) {
  const { error } = await supabase.from("packages").delete().eq("id", id);

  if (error) {
    throw new Error("This subscirber could not be deleted");
  }

  return null;
}

export async function getMyBorrowersLo(userId) {
  const { data: loansOut, error } = await supabase
    .from("packages")
    .select("*")
    .eq("borrowersId", userId);

  if (error) {
    throw new Error("Your data could not be fetched");
  }

  return loansOut;
}

export async function getMyLendersLoan(userId) {
  const { data: loansOut, error } = await supabase
    .from("packages")
    .select("*")
    .eq("lendersId", userId);

  if (error) {
    throw new Error("Your data could not be fetched");
  }

  return loansOut;
}
