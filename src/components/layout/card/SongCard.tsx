import React from "react";
import Link from "next/link";
import { Button, Card, Image } from "@mantine/core";
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
            pathname: "/form",
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
