import { ActionIcon } from '@mantine/core';
import { themeAtom } from '@state/jotai';
import { useAtom } from 'jotai';
import { memo } from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';

export const ColorTheme: React.FC = memo(() => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <ActionIcon
      variant='outline'
      color={theme === 'light' ? 'yellow' : 'blue'}
      onClick={() => {
        return setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      title='Toggle color scheme'
    >
      {theme === 'light' ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
});

ColorTheme.displayName = 'ColorTheme';
