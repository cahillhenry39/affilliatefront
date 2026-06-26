import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createASubscriber,
  deleteSubscriber as deleteSubscriberApi,
  getAllSubscribers,
  getOneSubscriber,
  updateASubscriber,
} from "../../services/apiSubscription";
import toast from "react-hot-toast";

export function useGetAllSubscription() {
  const { data: allSubscribers, isLoading } = useQuery({
    queryFn: getAllSubscribers,
    queryKey: ["allSubscribers"],
  });

  return { allSubscribers, isLoading };
}

export function useGetASubscription(id) {
  const { data: aSubscriber, isLoading } = useQuery({
    queryFn: () => getOneSubscriber(id),
    queryKey: ["aSubscriber"],
  });

  return { aSubscriber, isLoading };
}

export function useCreateSubscriber() {
  const { mutate: createSubscriber, isPending } = useMutation({
    mutationFn: createASubscriber,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createSubscriber, isPending };
}

export function useUpdateSubscriber() {
  const queryClient = useQueryClient();

  const { mutate: updateSubscriber, isPending } = useMutation({
    mutationFn: ({ id, updatedData }) => updateASubscriber(id, updatedData),

    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSubscriber, isPending };
}

export function useDeleteSubscriber() {
  const queryClient = useQueryClient();

  const { mutate: deleteSubscriber, isPending } = useMutation({
    mutationFn: deleteSubscriberApi,

    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteSubscriber, isPending };
}
