import { Tooltip } from '@mantine/core';
import type { Dispatch, FC, SetStateAction } from 'react';
import { forwardRef } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Icon = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <RiDeleteBin6Line className='h-8 w-8 ' />
    </div>
  );
});

Icon.displayName = 'Icon';

type Props = {
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const DeleteIcon: FC<Props> = ({ setOpened }) => {
  return (
    <Tooltip
      label='Delete'
      withArrow
      onClick={() => {
        return setOpened(true);
      }}
    >
      <Icon />
    </Tooltip>
  );
};
