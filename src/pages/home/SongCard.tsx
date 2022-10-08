import React from "react";
import Link from "next/link";
import { Button, Card, Image, Skeleton } from "@mantine/core";
import { Props } from "@type/songCard.model";
import { useLocale } from "@hooks/useLocale";

const getYear = (releaseDate: string): number => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

export const SongCard: React.FC<Props> = ({
  url,
  artistName,
  trackName,
  releaseDate,
}) => {
  const { t } = useLocale();
  return (
    <div>
      <Card radius="md" withBorder={true} className=" hover:opacity-70">
        <Card.Section className="mx-auto py-2">
          <Image
            src={url}
            alt={artistName}
            radius="md"
            height={120}
            withPlaceholder
          />
        </Card.Section>
        <div className="truncate">{trackName}</div>
        <div className="truncate">{artistName}</div>
        <div>{getYear(releaseDate)}</div>
        <Link
          href={{
            pathname: "/write-article",
            query: {
              artist: artistName,
              song: trackName,
              image: url,
              isEdit: false,
            },
          }}
        >
          <a className="no-underline">
            <Button
              variant="light"
              color="cyan"
              fullWidth
              radius="md"
              className="mt-2"
            >
              {t.SONGCARDBUTTON}
            </Button>
          </a>
        </Link>
      </Card>
    </div>
  );
};

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
