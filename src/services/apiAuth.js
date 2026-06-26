import { SUPABASE_URL, globalPostQueryURL, supabase } from "./supabase";

export async function signup(data) {
  const url = "/user/register";
  return await globalPostQueryURL({ data, url });
}

export async function login(data) {
  const url = "/user/login";
  return await globalPostQueryURL({ data, url });
}

export async function getCurrentUser() {
  const url = "/user/getuser";
  return await globalPostQueryURL({ url });
}

export async function updateCurrentUser(data) {
  const url = `/user/update`;
  return await globalPostQueryURL({ data: data?.newData, url });
}

export async function updateCurrentUserSettings(data) {
  const url = `/user/update/${data?.route}`;
  return await globalPostQueryURL({ data: data?.newData, url });
}

export async function handleSubscribePackage(data) {
  const url = "/user/subscribe/package";
  return await globalPostQueryURL({ data, url });
}

export async function handleClaimReferral(data) {
  const url = "/user/claim/referral";
  return await globalPostQueryURL({ data, url });
}

export async function logout() {
  const url = "/user/logout";
  return await globalPostQueryURL({ url });
}

export async function updateUserPassword(password) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

/// to update user images

export async function uploadImage(type, imageFile, newUpdate) {
  let message;
  const imageName = `${imageFile?.[0]?.name.replaceAll(" ", "")}-${Date.now()}`;

  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/${type}/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from(type)
    .upload(imageName, imageFile[0], {
      cacheControl: "3600",
      upsert: false,
    });
  if (storageError) {
    message =
      storageError.statusCode === "413"
        ? `Image file is too large. Max ${type === "avatar" ? "200kb" : "2mb"}`
        : "Your image could not be uploaded";

    throw new Error(message);
  }

  if (type === "avatar") {
    const avatarLinkArray = newUpdate?.avatar?.split("/");
    const initAvatar = avatarLinkArray[avatarLinkArray.length - 1];

    const { data: user, error } = await supabase.auth.updateUser({
      data: { personal: { ...newUpdate, avatar: imagePath } },
    });

    if (error) throw new Error("Your avatar could not be saved");

    const { error: deletingError } = await supabase.storage
      .from("avatar")
      .remove([`${initAvatar}`]);

    if (deletingError) throw new Error("Init image could not be deleted");

    return user;
  }

  const { data: user, error } = await supabase.auth.updateUser({
    data: { identification: { ...newUpdate, idCardPhoto: imagePath } },
  });

  if (error) throw new Error("Your data could not be saved");

  return user;
}

export async function forgottenPassword(data) {
  const { data: password, error } = await supabase.auth.resetPasswordForEmail(
    data,
    {
      redirectTo: "https://www.bomerg.com/reset_password/auth",
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return password;
}
