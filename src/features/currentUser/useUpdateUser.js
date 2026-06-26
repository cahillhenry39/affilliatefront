import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCurrentUser,
  updateUserPassword,
  uploadImage as uploadImageApi,
} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    // onSuccess: () => {
    //   queryClient.invalidateQueries();
    // },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isPending };
}

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatePassword, isPending };
}

export function useUploadImage() {
  const queryClient = useQueryClient();
  const { mutate: uploadImage, isPending } = useMutation({
    mutationFn: ({ type, imageFile, newUpdate }) =>
      uploadImageApi(type, imageFile, newUpdate),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { uploadImage, isPending };
}
