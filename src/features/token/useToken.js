import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAToken,
  getAToken,
  getATokenByToken,
  getAllToken,
  updateAToken,
} from "../../services/apiToken";
import toast from "react-hot-toast";

export function useGetAllTokens() {
  const { data: allTokens, isLoading } = useQuery({
    queryFn: getAllToken,

    queryKey: ["all_tokens"],
  });

  return { allTokens, isLoading };
}

export function useGetAToken(id) {
  const { data: aToken, isLoading } = useQuery({
    queryFn: () => getAToken(id),

    queryKey: ["a_token", id],
  });

  return { aToken, isLoading };
}

export function useGetTokenWithToken() {
  const { mutate: validateAToken, isPending } = useMutation({
    mutationFn: (token) => getATokenByToken(token),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { validateAToken, isPending };
}

export function useUpdateToken() {
  const { mutate: updateToken, isPending } = useMutation({
    mutationFn: ({ id, updatedToken }) => updateAToken(id, updatedToken),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateToken, isPending };
}

export function useCreateToken() {
  const { mutate: createToken, isPending } = useMutation({
    mutationFn: createAToken,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createToken, isPending };
}

//BM1-hgH87s22sAv

// sales@gmail.com
