import { Tooltip } from '@mantine/core';
import type { Dispatch, FC, SetStateAction } from 'react';
import { forwardRef } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const MyIcon = forwardRef<HTMLDivElement, { label: string; setOpened?: Dispatch<SetStateAction<boolean>> }>(
  ({ label, setOpened }, ref) => {
    return (
      <div ref={ref}>
        {label === 'Edit' ? (
          <FiEdit className='h-8 w-8 ' />
        ) : (
          <RiDeleteBin6Line
            className='h-8 w-8 '
            onClick={() => {
              if (setOpened) {
                return setOpened(true);
              }
            }}
          />
        )}
      </div>
    );
  }
);

MyIcon.displayName = 'MyBadge';

type Props = {
  label: string;
  setOpened?: Dispatch<SetStateAction<boolean>>;
};
export const Icon: FC<Props> = ({ label, setOpened }) => {
  console.log('label', label);
  return (
    <>
      <Tooltip label='Works fine'>
        <MyIcon label={label} setOpened={setOpened} />
      </Tooltip>
    </>
  );
};
