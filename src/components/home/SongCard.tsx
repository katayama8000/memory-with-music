import React, { memo } from "react";
import Link from "next/link";
import { Button, Card, Image, Skeleton } from "@mantine/core";
import { Props } from "@type/articleCard.model";
import { useLocale } from "@hooks/useLocale";

const getYear = (releaseDate: string): number => {
  const date = new Date(releaseDate);
  return date.getFullYear();
};

export const SongCard: React.FC<Props> = memo(
  ({ url, artistName, trackName, releaseDate }) => {
    const { t } = useLocale();
    return (
      <div>
        <Card radius="md" withBorder={true} className=" hover:opacity-70">
          <Card.Section className="mx-auto pb-4">
            <Image
              src={url}
              alt={artistName}
              radius="xs"
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
  }
);
SongCard.displayName = "SongCard";

export const SkeletonCard: React.FC = memo(() => {
  return (
    <div>
      <Card radius="md" withBorder={true} className="h-[320px]">
        <Card.Section className="mx-auto rounded-lg pb-4">
          <Skeleton height={120} className="rounded-xl" />
        </Card.Section>
        <Skeleton height={120} />
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
});

SkeletonCard.displayName = "SkeletonCard";
