import { useQuery } from "@tanstack/react-query";
import { handleFetchCompanyDetails } from "./apiCompanyDetails";

export function useGetCompanyDetails() {
  const { data: getCompanuDetails, isLoading: isFetchingDetails } = useQuery({
    queryFn: () => handleFetchCompanyDetails(),
    queryKey: ["company_details"],
  });

  return { getCompanuDetails, isFetchingDetails };
}
