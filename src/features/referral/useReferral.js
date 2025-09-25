import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getAReferralWithEmail,
  getAReferralWithId,
  getAllMyReferrals,
  getMyReferralDetails,
  updateAReferral,
} from "../../services/apiReferral";

export function useGetAReferralWithEmail() {
  const { mutate: validateAReferral, isPending } = useMutation({
    mutationFn: (email) => getAReferralWithEmail(email),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { validateAReferral, isPending };
}

export function useGetMyReferralDetails() {
  const { data, isLoading } = useQuery({
    queryFn: () => getMyReferralDetails(),

    queryKey: ["all_my_referral_details_"],
  });

  return {
    allMyReferrals: data?.allMyReferrals,
    highestReferralPaid: data?.highestReferralPaid,
    referralDetails: data?.referralDetails,
    totalClaimed: data?.totalClaimed,
    totalNotClaimed: data?.totalNotClaimed,
    isLoading,
  };
}

export function useGetMyReferrals(userId) {
  const { data: myReferrals, isLoading } = useQuery({
    queryFn: () => getAllMyReferrals(userId),

    queryKey: ["all_my_referrals", userId],
  });

  return { myReferrals, isLoading };
}

export function useGetAReferralWithId() {
  const { mutate: getReferralWithId, isPending } = useMutation({
    mutationFn: (referrallId) => getAReferralWithId(referrallId),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { getReferralWithId, isPending };
}

export function useUpdateReferral() {
  const { mutate: updateReferral, isPending } = useMutation({
    mutationFn: ({ id, updatedReferral }) =>
      updateAReferral(id, updatedReferral),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateReferral, isPending };
}
