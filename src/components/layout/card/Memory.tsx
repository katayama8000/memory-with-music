import { Card, Image } from "@mantine/core";
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
      <Card shadow="sm" className="m-auto w-[430px]">
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
            <div>memory:{memory}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
