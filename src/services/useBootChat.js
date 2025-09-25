import { useMutation, useQuery } from "@tanstack/react-query";
import { createABootChat, getAllMyBootChats } from "./apiBootChat";

export function useCreateBootChat() {
  const { mutate: createBootChat, isPending } = useMutation({
    mutationFn: createABootChat,

    onError: (err) => {
      console.log(err);
    },
  });

  return { createBootChat, isPending };
}

export function useGetAllBootChat() {
  const { data: bootChats, isLoading } = useQuery({
    queryFn: getAllMyBootChats,

    queryKey: ["all-boot-chats"],
  });

  return { bootChats, isLoading };
}
