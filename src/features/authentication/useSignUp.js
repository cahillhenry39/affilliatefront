import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";

import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isPending };
}
