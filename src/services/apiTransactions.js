import { globalGetQueryURL, globalPostQueryURL, supabase } from "./supabase";

export async function getAllTransactions() {
  const { data: allTransactions, error } = await supabase
    .from("transactions")
    .select("*");

  if (error) {
    throw new Error("All transactions could not be fetched");
  }

  return allTransactions;
}

export async function getMyTransactions() {
  const url = "/finance/all";
  return await globalGetQueryURL({ url });
}

export async function createATransaction(newData) {
  const url = "/finance/create";
  return await globalPostQueryURL({ data: newData, url });
}

export async function getATransaction(id) {
  const url = `/finance/transaction/${id}`;
  return await globalGetQueryURL({ url });
}

export async function updateATransaction(id, updatedData) {
  const url = `/finance/update/${id}`;
  return await globalPostQueryURL({ data: { updatedData }, url });
}

export async function handleDepositWithToken(newData) {
  const url = "/finance/token/deposit";
  return await globalPostQueryURL({ data: newData, url });
}

export async function handleMoveMoney(newData) {
  const url = "/finance/move/balance";
  return await globalPostQueryURL({ data: newData, url });
}

export async function handleMakeWithdrawal(newData) {
  const url = "/finance/withdraw/funds";
  return await globalPostQueryURL({ data: newData, url });
}

// export async function downloadFile(fileUrl) {
//   const fileArray = fileUrl.split("/");

//   const { data: download, error } = await supabase.storage
//     .from("POF")
//     .download(fileArray[fileArray.length - 1]);

//   if (error) {
//     throw new Error("This file could not be downloaded");
//   }

//   return download;
// }

// export async function downloadFile(fileUrl) {
//   console.log(fileUrl);
//   const download = browser.downloads.download(fileUrl);

//   // if (error) {
//   //   throw new Error("This file could not be downloaded");
//   // }

//   return download;
// }
