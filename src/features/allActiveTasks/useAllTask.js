import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createANewAllTasks,
  getAllAvailable,
} from "../../services/apiAllTasks";
import toast from "react-hot-toast";

export function useGetAllAvailableTask() {
  const { data: allAvailableTask, isLoading } = useQuery({
    queryFn: () => getAllAvailable(),

    queryKey: ["all_available_task"],
  });

  return { allAvailableTask, isLoading };
}

export function useCreateNewAllTask() {
  const { mutate: createNewAllTask, isPending } = useMutation({
    mutationFn: createANewAllTasks,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createNewAllTask, isPending };
}
