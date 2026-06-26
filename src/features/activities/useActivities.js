import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createActivities,
  getAllActivities,
} from "../../services/apiActivities";

export function useGetAllActivities() {
  const { data: allActivities, isLoading } = useQuery({
    queryFn: getAllActivities,
    queryKey: ["all-activities"],
  });

  return { allActivities, isLoading };
}

export function useCreateActivity() {
  const { mutate: createActivity, isPending } = useMutation({
    mutationFn: createActivities,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createActivity, isPending };
}
