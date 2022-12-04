import { themeAtom } from '@state/jotai';
import { useAtom } from 'jotai';

import { DashboardLayout } from './_Layout/DashboardLayout/DashboardLayout';

const Demo3 = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div>
      <h1>demo3</h1>
      <div>{theme === 'dark' ? 'dark' : 'light'}</div>
      <button
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        change
      </button>
    </div>
  );
};

Demo3.getLayout = DashboardLayout;
export default Demo3;
