import { SUPABASE_URL, globalGetQueryURL, supabase } from "./supabase";

export async function getAllDepositBank() {
  const url = "/bank/";
  return await globalGetQueryURL({ url });
}

export async function getADepositBank(id) {
  const url = `/bank/get/${id}`;
  return await globalGetQueryURL({ url });
}

export async function getAllAvailableBank() {
  const url = "/bank/all/nigerian";
  return await globalGetQueryURL({ url });
}

export async function updateABank(id, updatedData) {
  const { data: updatedBank, error } = await supabase
    .from("depositOptions")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("This bank request could not be updated");
  }

  return updatedBank;
}

export async function createANewBanks(newBank) {
  const imageName = `${newBank?.image?.[0]?.name.replaceAll(
    " ",
    ""
  )}-${Date.now()}`;

  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/avatar/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(imageName, newBank.image[0], {
      cacheControl: "3600",
      upsert: false,
    });
  if (storageError) {
    const message =
      storageError.statusCode === "413"
        ? "Image file is too large. Max 4mb"
        : "Your image could not be uploaded";

    throw new Error(message);
  }
  const { data: token, error } = await supabase
    .from("depositOptions")
    .insert([{ ...newBank, image: imagePath }])
    .select();

  if (error) {
    throw new Error("New bank could not be created");
  }

  return token;
}

export async function deleteABank(id) {
  const { error } = await supabase.from("depositOptions").delete().eq("id", id);

  if (error) {
    throw new Error("Bank could not be deleted");
  }

  return null;
}
// not altered yet
