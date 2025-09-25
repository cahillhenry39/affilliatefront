import { useMutation, useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { getAllCountries } from "../../utils/ArrayHelper";
import {
  forgottenPassword as forgottenPasswordApi,
  getCurrentUser,
  handleClaimReferral,
  handleSubscribePackage,
  updateCurrentUserSettings,
} from "../../services/apiAuth";

export default function useUser() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    // refetchInterval: 1000,
  });

  return {
    isLoading,
    data,
    isAuthenticated:
      data?.role === "authenticated" &&
      error?.message?.toLowerCase() !== "invalid session",
    balance: data?.balance,
    expenseBal: data?.expenseBal,
    bankAccount: data?.bankAccount,
    bankName: data?.bankName,
    userPackageId: data?.userPackageId,
    userPackageTitle: data?.userPackageTitle,
    personalData: data?.user_metadata?.personal,
    allPackages: data?.allPackages,
    fullName: data?.usersName,
    phoneNum: data?.phoneNum,
    DOB: data?.DOB,
    address: data?.address,
    email: data?.email,
    buyStock: data?.autoBuyStock,
    manageStock: data?.autoManageStock,
    stockNews: data?.autoStockNews,
    stockNotes: data?.stockNotes,
    stockLimit: data?.stockLimit,
    withdrawalLimit: data?.withdrawalLimit,
    autoWithdraw: data?.autoWithdrawal,
    noAdvertSettings: data?.noAdverts,
    hideExpenseSettings: data?.hideExpense,
    hideBalanceSettings: data?.hideBalance,
    darkModeSettings: data?.darkModeDefault,
    defaultLanguage: data?.defaultLanguage,
    promotions: data?.isPromotion,
    packageUpdates: data?.isPackageUpdate,
    newsLetter: data?.isNewsLetter,
    newsLetterEmail: data?.newsLetterEmail,
    currentPercentage: data?.currentPercentage,
    spinningReward: data?.spinningReward,

    error,
  };
}

export function useForgottenPassword() {
  const { mutate: forgottenPassword, isPending } = useMutation({
    mutationFn: forgottenPasswordApi,

    onError: () => {
      toast.error("Could not send verification link. Try again");
    },
  });

  return { forgottenPassword, isPending };
}

export function useUpdateSettings() {
  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: updateCurrentUserSettings,

    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { updateSettings, isPending };
}

export function useGetLocation() {
  const { mutate: fetchAddress, isPending } = useMutation({
    mutationFn: getAllCountries,
    onError: () => {
      toast.error("Your location could not be fetched.");
    },
  });

  return { fetchAddress, isPending };
}

export function useSubscribePackage() {
  const { mutate: subscribePackage, isPending } = useMutation({
    mutationFn: handleSubscribePackage,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { subscribePackage, isPending };
}

export function useClaimReferralBonus() {
  const { mutate: claimReferralBonus, isPending } = useMutation({
    mutationFn: handleClaimReferral,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { claimReferralBonus, isPending };
}
