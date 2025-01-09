import clsx from "clsx";
import { useChildrenAction } from "@/api/useChildrenAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Child } from "@/services/children/types";

type Props = {
  child: Child;
};

export const ChildItem = ({ child }: Props) => {
  const { isRevalidating, checkIn, isCheckingIn, checkOut, isCheckingOut } =
    useChildrenAction(child.childId);

  const isProcessing = isCheckingIn || isCheckingOut;

  return (
    <div className="relative">
      {isProcessing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <p className="text-white text-2xl font-bold">
            {isCheckingIn ? "Checking In..." : "Checking Out..."}
          </p>
        </div>
      )}

      <Card
        key={child.childId}
        className={clsx("transition-opacity duration-200", {
          "opacity-90 cursor-wait": isProcessing || isRevalidating,
        })}
      >
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{child.name.fullName}</h3>
          <p
            className={clsx("text-sm font-bold", {
              "text-green-600": child.checkedIn,
              "text-red-600": !child.checkedIn,
            })}
          >
            {child.checkedIn ? "Checked In" : "Checked Out"}
          </p>
          <div className="mt-4 space-x-2">
            <Button
              onClick={() => checkIn({ pickupTime: "22:00" })}
              disabled={child.checkedIn || isCheckingIn}
            >
              Check In
            </Button>
            <Button
              onClick={() => checkOut()}
              disabled={!child.checkedIn || isCheckingOut}
            >
              Check Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
