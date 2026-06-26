import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createAPackage,
  getAPackage,
  getAllPackages,
  getContact,
  updateAPackage,
  updateConact,
} from "../../services/apiPackages";
import toast from "react-hot-toast";

export function useGetAllPackages() {
  const { data: allPackages, isLoading } = useQuery({
    queryFn: getAllPackages,

    queryKey: ["all_package_subscriptions"],
  });

  return { allPackages, isLoading };
}

export function useGetAPackage(id) {
  const { data: myPackageSubscription, isLoading } = useQuery({
    queryFn: () => getAPackage(id),

    queryKey: ["my_package_subscription", id],
  });

  return { myPackageSubscription, isLoading };
}

export function useCreateMyAPackage() {
  const { mutate: createPackage, isPending } = useMutation({
    mutationFn: createAPackage,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createPackage, isPending };
}

export function useUpdateAPackage() {
  const { mutate: updatePackage, isPending } = useMutation({
    mutationFn: ({ id, updatedData }) => updateAPackage(id, updatedData),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatePackage, isPending };
}

// For contac t only... see the api

export function useGetAllContact() {
  const { data: allContact, isLoading } = useQuery({
    queryFn: getContact,

    queryKey: ["all_Contact_phone"],
  });

  return { allContact, isLoading };
}

export function useUpdateAContact() {
  const { mutate: updateContact, isPending } = useMutation({
    mutationFn: ({ id, updatedData }) => updateConact(id, updatedData),

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateContact, isPending };
}
