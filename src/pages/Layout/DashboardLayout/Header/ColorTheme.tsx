import { ActionIcon } from "@mantine/core";
import { state, toggleColor } from "@state/state";
import React from "react";
import { MoonStars, Sun } from "tabler-icons-react";
import { useSnapshot } from "valtio";

type Props = {
  onClick: () => void;
  color?: "dark" | "light";
};

const changeColorTheme = (color: "dark" | "light") => {
  console.log(color, "color");
  const theme = color === "dark" ? "light" : "dark";
  console.log(theme, "theme");
  toggleColor(theme);
};

export const ColorTheme: React.FC<Props> = ({ onClick }) => {
  const { color } = useSnapshot(state);
  return (
    <ActionIcon
      variant="outline"
      color={color === "light" ? "yellow" : "blue"}
      onClick={() => changeColorTheme(color)}
      title="Toggle color scheme"
    >
      {color === "light" ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
};
