import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { ChildService } from "@/services";
import { useState } from "react";

export function useChildrenAction(childId: string) {
  const [isRevalidating, setIsRevalidating] = useState(false);

  const { trigger: checkIn, isMutating: isCheckingIn } = useSWRMutation(
    `child-actions-${childId}`,
    async (_, { arg }: { arg: { pickupTime: string } }) => {
      const response = await ChildService.checkIn(childId, arg.pickupTime);

      setIsRevalidating(true);
      await mutate("child-group-list");
      setIsRevalidating(false);

      return response;
    }
  );

  const { trigger: checkOut, isMutating: isCheckingOut } = useSWRMutation(
    `child-actions-${childId}`,
    async () => {
      const response = await ChildService.checkOut(childId);

      setIsRevalidating(true);
      await mutate("child-group-list");
      setIsRevalidating(false);

      return response;
    }
  );

  return {
    isRevalidating,
    checkIn,
    isCheckingIn,
    checkOut,
    isCheckingOut,
  };
}
