import React from "react";
import { Button, Card, Image, Skeleton } from "@mantine/core";

export const SkeletonCard: React.FC = () => {
  return (
    <div>
      <Card shadow="sm" p="lg" radius="md" className="h-[234px]">
        <Card.Section className="mx-auto rounded-lg py-2">
          <Skeleton height={80} className="rounded-xl" />
        </Card.Section>
        <Skeleton height={80} />
        <Button
          variant="light"
          color="cyan"
          fullWidth
          radius="md"
          className="mt-2"
          disabled={true}
        />
      </Card>
    </div>
  );
};
