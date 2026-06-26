import { SUPABASE_URL, adminAuthClient, supabase } from "../supabase";

export async function createABorrower({ email, password, ...others }) {
  const { data, error } = await adminAuthClient.createUser({
    email,
    email_confirm: true,
    password,
    user_metadata: {
      personal: {
        fullName: others.fullName,
        email,
        DOB: others.DOB,
        gender: others.gender,
        idNumber: others.idNumber,
        phone: others.phone,
        address: others.address,
        city: others.city,
        country: others.country,
        avatar: "",
        balance: 0,
      },

      social: {
        instagram: others.instagram,
        facebook: others.facebook,
        twitter: others.twitter,
      },

      type: {
        isBorrower: true,
        limit: others.limit,
      },
      bank: {
        bankName: "",
        bankAccount: "",
        swiftCode: "",
        bankAccountType: "",
      },
      crypto: {
        cryptoType: "",
        walletAddress: "",
        moreInfo: "",
      },

      profession: {
        employed: others.employed,
        jobType: others.jobType,
        jobField: others.jobField,
      },
      identification: {
        idCardType: "",
        idCardNumber: "",
        nationale: "",
        idCardPhoto: "",
      },

      nextKin: {
        nextKinFullName: "",
        relationship: "",
        nextKinEmail: "",
        nextKinPhone: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function createAnAgent({ email, password, ...others }) {
  const imageFile = others.logo;
  let message;

  const imageName = `${imageFile?.[0]?.name.replaceAll(" ", "")}-${Date.now()}`;
  const imagePath = `${SUPABASE_URL}/storage/v1/object/public/avatar/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(imageName, imageFile[0], {
      cacheControl: "3600",
      upsert: false,
    });
  if (storageError) {
    message =
      storageError.statusCode === "413"
        ? `Image file is too large. Max 2mb`
        : "Your image could not be uploaded";

    throw new Error(message);
  }
  const { data, error } = await adminAuthClient.createUser({
    email,
    email_confirm: true,
    password,
    user_metadata: {
      personal: {
        fullName: others.fullName,
        email,
        city: others.city,
        country: others.country,
        logo: imagePath,
        balance: others.balance,
      },
      social: {
        instagram: others.instagram,
        facebook: others.facebook,
        twitter: others.twitter,
        phone: others.phone,
      },
      type: {
        isAnAgent: true,
        limit: others.limit,
      },
      bank: {
        method: others.method,
        type: others.type,
        duration: others.duration,
        range: others.range,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getAllUsers({ page, number }) {
  const {
    data: { users },
    error,
  } = await adminAuthClient.listUsers({
    page: page,
    perPage: number,
  });

  if (error) {
    throw new Error(error.message);
  }

  return users;
}

export async function getAUsers(id) {
  const { data: user, error } = await adminAuthClient.getUserById(id);

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function updateAUsers(id, newUpdate) {
  const { data: user, error } = await adminAuthClient.updateUserById(id, {
    user_metadata: { ...newUpdate },
  });

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function getAllAgents({ page, number }) {
  const {
    data: { users },
    error,
  } = await adminAuthClient.listUsers({
    page: page,
    perPage: number,
  });

  if (error) {
    throw new Error(error.message);
  }

  const agents = users.filter(
    (user) => user?.user_metadata?.type?.isAnAgent === true
  );

  return agents;
}
