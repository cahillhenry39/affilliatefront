import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Something went wrong, try again");
    },
  });

  return { logout, isPending };
}
