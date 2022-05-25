import { Card, Image, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

type Props = {
  song: string;
  artist: string;
  image: string;
  memory: string;
};

export const Memory: React.FC<Props> = ({ song, artist, image, memory }) => {
  return (
    <div>
      <Card withBorder={true} className="m-auto w-[430px]  hover:opacity-70">
        <Link
          href={{
            pathname: "/memoryArticle",
            query: { artist: artist, song: song, image: image, memory: memory },
          }}
        >
          <a className="text-inherit no-underline">
            <div className="flex ">
              <Image
                src={image}
                //src="https://zukan.pokemon.co.jp/zukan-api/up/images/index/bc1a41e95d5545e3ac647ca03a42359a.jpg"
                alt={artist}
                height={60}
                width={80}
                radius="md"
                withPlaceholder
                className="mr-5"
              />
              <div className="truncate">
                {song}/{artist}
                <br />
                memory:{memory}
              </div>
            </div>
          </a>
        </Link>
      </Card>
    </div>
  );
};
