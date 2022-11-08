import { ActionIcon } from '@mantine/core';
import { state, toggleColor } from '@state/state';
import { memo } from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';
import { useSnapshot } from 'valtio';

const changeColorTheme = (color: 'dark' | 'light') => {
  const theme = color === 'dark' ? 'light' : 'dark';
  toggleColor(theme);
};

export const ColorTheme: React.FC = memo(() => {
  const { color } = useSnapshot(state);
  return (
    <ActionIcon
      variant='outline'
      color={color === 'light' ? 'yellow' : 'blue'}
      onClick={() => {
        return changeColorTheme(color);
      }}
      title='Toggle color scheme'
    >
      {color === 'light' ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
});

ColorTheme.displayName = 'ColorTheme';
