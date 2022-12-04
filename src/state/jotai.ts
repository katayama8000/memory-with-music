import { atom } from 'jotai';

export type themeType = 'light' | 'dark';

export const themeAtom = atom<themeType>('light');
