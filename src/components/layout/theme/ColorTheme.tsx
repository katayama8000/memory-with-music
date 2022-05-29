import React from "react";
import { ActionIcon } from "@mantine/core";
import { MoonStars, Sun } from "tabler-icons-react";

type Props = {
  onClick: () => void;
  color: "dark" | "light";
};

export const ColorTheme: React.FC<Props> = ({ onClick, color }) => {
  return (
    <div>
      <ActionIcon
        variant="outline"
        color={color === "light" ? "yellow" : "blue"}
        onClick={() => onClick()}
        title="Toggle color scheme"
      >
        {color === "light" ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </div>
  );
};
