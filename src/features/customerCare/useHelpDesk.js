import { useMutation } from "@tanstack/react-query";
import { createAMesage } from "../../services/apiHelpDesk";
import toast from "react-hot-toast";

export function useCreateHelpDesk() {
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: createAMesage,

    onError: (err) => toast.error(err.message),
  });

  return { sendMessage, isPending };
}
