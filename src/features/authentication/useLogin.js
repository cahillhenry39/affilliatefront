import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/app", { replace: true });
    },

    onError: (error) => {
 

      toast.error(
        `${
          error.message === "Failed to fetch"
            ? "Your internet connection is lost"
            : error.message
        }`
      );
    },
  });

  return { isPending, login };
}
