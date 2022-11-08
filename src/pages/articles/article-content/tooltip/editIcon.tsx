import { Tooltip } from '@mantine/core';
import type { FC } from 'react';
import { forwardRef } from 'react';
import { FiEdit } from 'react-icons/fi';

const Icon = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <FiEdit className='h-8 w-8 ' />
    </div>
  );
});

Icon.displayName = 'Icon';

export const EditIcon: FC = () => {
  return (
    <Tooltip label='Edit' withArrow>
      <Icon />
    </Tooltip>
  );
};
