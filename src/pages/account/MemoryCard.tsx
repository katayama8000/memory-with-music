import { Card, Image } from "@mantine/core";
import Link from "next/link";
import React from "react";

type Props = {
  id: number;
  song: string;
  artist: string;
  image: string;
  memory: string;
};

export const MemoryCard: React.FC<Props> = ({
  id,
  song,
  artist,
  image,
  memory,
}) => {
  return (
    <div>
      <Card withBorder={true} className="hover:opacity-70 sm:m-0 ">
        <Link
          href={{
            pathname: "/articles/article-content",
            query: {
              id: id,
              artist: artist,
              song: song,
              image: image,
              memory: memory,
            },
          }}
        >
          <a className="text-inherit no-underline">
            <div className="flex ">
              {image && (
                <Image
                  src={image}
                  alt={artist}
                  height={60}
                  width={80}
                  radius="md"
                  withPlaceholder
                  className="mr-5"
                />
              )}
              <div className="truncate">
                {song}/{artist}
                <br />
                {memory}
              </div>
            </div>
          </a>
        </Link>
      </Card>
    </div>
  );
};