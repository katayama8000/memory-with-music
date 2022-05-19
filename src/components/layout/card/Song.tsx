import React from "react";
import { Button, Card, Image, Skeleton } from "@mantine/core";

type Props = {
  url: string;
  artistName: string;
  trackName: string;
  releaseDate: string;
  loading: boolean;
};

const getYear = (releaseDate: string) => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

//loading中に表示されるスケルトン
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
        >
          Go to this song
        </Button>
      </Card>
    </div>
  );
};

export const SongCard: React.FC<Props> = ({
  url,
  artistName,
  trackName,
  releaseDate,
  loading,
}) => {
  return (
    <div>
      <Card shadow="sm" p="lg" radius="md">
        <Card.Section className="mx-auto py-2">
          <Image
            src={url}
            alt={artistName}
            radius="md"
            height={80}
            withPlaceholder
          />
        </Card.Section>
        <div className="truncate">{trackName}</div>
        <div className="truncate">{artistName}</div>
        <div>{getYear(releaseDate)}</div>

        <Button
          variant="light"
          color="cyan"
          fullWidth
          radius="md"
          className="mt-2"
        >
          Go to this song
        </Button>
      </Card>
    </div>
  );
};
