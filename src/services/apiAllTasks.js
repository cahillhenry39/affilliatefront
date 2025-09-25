import { SUPABASE_URL, supabase } from "./supabase";

export async function getAllAvailable() {
  const { data: allTasks, error } = await supabase.from("allTasks").select("*");

  if (error) {
    throw new Error("All Tasks could not be fetched");
  }

  return allTasks;
}

export async function createANewAllTasks(newAllTask) {
  const imageName = `${newAllTask?.taskImage?.[0]?.name.replaceAll(
    " ",
    ""
  )}-${Date.now()}`;

  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/avatar/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(imageName, newAllTask.taskImage[0], {
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
    .from("allTasks")
    .insert([{ ...newAllTask, taskImage: imagePath }])
    .select();

  if (error) {
    throw new Error("New Task could not be created");
  }

  return token;
}

//not altered

export async function getAallTasks(id) {
  if (id === "null" || !id) return null;

  const { data: allTasks, error } = await supabase
    .from("allTasks")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("Your allTasks could not be fetched");
  }

  return allTasks;
}

export async function createAallTasks(newallTasks) {
  const { data: token, error } = await supabase
    .from("allTasks")
    .insert([{ ...newallTasks }])
    .select();

  if (error) {
    throw new Error("Token could not be created");
  }

  return token;
}

export async function updateAallTasks(id, updatedallTasks) {
  const { data: token, error } = await supabase
    .from("allTasks")
    .update({ ...updatedallTasks })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Token could not be created");
  }

  return token;
}

export async function deleteAToken(tokenId) {
  const { error } = await supabase.from("allTasks").delete().eq("id", tokenId);

  if (error) {
    throw new Error("Token could not be deleted");
  }

  return null;
}
