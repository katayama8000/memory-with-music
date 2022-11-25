import type { FC } from 'react';
import { memo } from 'react';

type Props = {
  handleToggleGood: () => Promise<void>;
  isGood: boolean;
  size: number;
};

export const GoodIcon: FC<Props> = memo(({ handleToggleGood, isGood, size }) => {
  const color = isGood ? '#ff2825' : 'none';
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-heart'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='#2c3e50'
      fill={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      onClick={handleToggleGood}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
    </svg>
  );
});

GoodIcon.displayName = 'GoodIcon';
