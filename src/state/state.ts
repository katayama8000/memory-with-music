import { proxy } from "valtio";

export const state = proxy<{
  color: "light" | "dark";
}>({
  color: "light",
});

export const toggleColor = (color: "light" | "dark") => {
  state.color = color;
};
