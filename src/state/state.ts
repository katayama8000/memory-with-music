import { proxy } from 'valtio';

type themeModel = 'light' | ' dark';

export const state = proxy<{ color: themeModel }>({
  color: 'light',
});

export const toggleColor = (color: themeModel): void => {
  state.color = color;
};
