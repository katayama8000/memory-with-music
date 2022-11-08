import { Button, Group, Modal } from '@mantine/core';
import type { FC } from 'react';

type DeleteArticleModaProps = {
  handleDelete: () => Promise<void>;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteArticleModal: FC<DeleteArticleModaProps> = ({ handleDelete, opened, setOpened }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => {
        return setOpened(false);
      }}
      size={500}
    >
      <Group position='center'>
        <div className='text-xl font-bold'>Are you sure you want to delete this article?</div>
        <Button
          color='red'
          className='m-3 w-20'
          onClick={() => {
            return handleDelete();
          }}
        >
          delete
        </Button>
      </Group>
    </Modal>
  );
};
