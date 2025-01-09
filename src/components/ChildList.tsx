import { useState } from "react";
import { useChildListGroup } from "@/api/useChildListGroup";
import { ChildItem } from "@/components/ChildItem";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  batchSize: number;
};

export const ChildList = ({ batchSize = 5 }: Props) => {
  const { data, isLoading } = useChildListGroup();

  const [itemsToShow, setItemsToShow] = useState(batchSize);

  const handleLoadMore = () => {
    if (!data) return;
    setItemsToShow((prev) => Math.min(prev + batchSize, data.length));
  };

  const visibleChildren = data?.slice(0, itemsToShow);
  return (
    <>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: batchSize }).map((_, index: number) => (
              <Skeleton key={index} style={{ height: 136 }} />
            ))
          : visibleChildren?.map((child) => (
              <ChildItem key={child.childId} child={child} />
            ))}
      </div>

      {itemsToShow < (data?.length ?? 0) && (
        <div className="flex justify-center mt-4">
          <Button onClick={handleLoadMore} size="lg" className="">
            Load More
          </Button>
        </div>
      )}
    </>
  );
};
