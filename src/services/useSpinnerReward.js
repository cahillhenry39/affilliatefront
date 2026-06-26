import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  handleFetchActiveSpinners,
  handleUpdateSpinner,
} from "./apiSpinnerReward";

export function useGetAllSpinnerEarned(type) {
  const { data: activeSpinners, isLoading: isFetchingSpinner } = useQuery({
    queryFn: () => handleFetchActiveSpinners(type),
    queryKey: ["spinnerReward"],
  });

  return { activeSpinners, isFetchingSpinner };
}

export function useUpdateActiveSpinners() {
  const queryClient = useQueryClient();

  const { mutate: updateSpinner, isPending } = useMutation({
    mutationFn: handleUpdateSpinner,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spinnerReward"] });
    },
  });

  return { updateSpinner, isPending };
}
