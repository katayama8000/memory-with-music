import type { FC } from 'react';

export const HogeComp: FC = () => {
  return (
    <div>
      <h1>react-test</h1>
      <input type='text' />
      <button>click1</button>
      <button>click2</button>
      <p>Udemy</p>
      <span data-testid='copyright'>@react</span>
    </div>
  );
};
