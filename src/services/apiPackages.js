import { SUPABASE_URL, supabase } from "./supabase";

export async function getAllPackages() {
  const { data: allPackages, error } = await supabase
    .from("packages")
    .select("*");

  if (error) {
    throw new Error("All package could not be fetched");
  }

  return allPackages;
}

export async function getAPackage(id) {
  const { data: aPackage, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("This package could not be fetched");
  }

  return aPackage;
}

export async function updateAPackage(id, updatedData) {
  const { data: updatedPackage, error } = await supabase
    .from("packages")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("This package could not be updated");
  }

  return updatedPackage;
}

export async function createAPackage(newData) {
  const imageName = `${newData?.image?.[0]?.name.replaceAll(
    " ",
    ""
  )}-${Date.now()}`;

  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/avatar/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(imageName, newData.image[0], {
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

  const { data: newpackage, error } = await supabase
    .from("packages")
    .insert([{ ...newData, image: imagePath }])
    .select();

  if (error) {
    throw new Error("could not be created");
  }

  return newpackage;
}

//// For Contact information like phone only

export async function getContact() {
  const { data: allContact, error } = await supabase
    .from("contact")
    .select("*");

  if (error) {
    throw new Error("Contact could not be fetched");
  }

  return allContact;
}

export async function updateConact(id, updatedData) {
  const { data: updatedContact, error } = await supabase
    .from("contact")
    .update({ ...updatedData })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Contact could not be updated");
  }

  return updatedContact;
}

// not altered

export async function getOneSubscriber(id) {
  const { data: subscriber, error } = await supabase
    .from("packages")
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
