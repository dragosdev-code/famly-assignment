import useSWR from "swr";
import { ChildService } from "@/services";

export function useChildListGroup() {
  const { data, error, isLoading, isValidating } = useSWR(
    "child-group-list",

    async () => {
      const response = await ChildService.listGroup();
      return response.children;
    }
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
  };
}
