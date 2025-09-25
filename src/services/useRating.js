import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRating as createRatingApi,
  getAllRatings,
  getRatingsByUser,
} from "./apiRating";
import toast from "react-hot-toast";

export function useGetAllRatings(type) {
  const { data: allRatings, isLoading } = useQuery({
    queryFn: () => getAllRatings(type),
    queryKey: ["allRatings"],
  });

  return { allRatings, isLoading };
}

export function useGetAUserRating(type, userId) {
  const { data: allUsersRatings, isLoading } = useQuery({
    queryFn: () => getRatingsByUser(type, userId),
    queryKey: ["Allatings", userId],
  });

  return { allUsersRatings, isLoading };
}

export function useCreateRating() {
  const queryClient = useQueryClient();

  const { mutate: createRating, isPending } = useMutation({
    mutationFn: ({ type, newData }) => createRatingApi(type, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRatings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createRating, isPending };
}
