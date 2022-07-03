import React from "react";
import { Button, Group, Modal } from "@mantine/core";

type DeleteArticleModalType = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  handleClick: () => Promise<void>;
};

export const DeleteArticleModal: React.FC<DeleteArticleModalType> = ({
  opened,
  setOpened,
  handleClick,
}) => {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} size={500}>
      <Group position="center">
        <div className="text-xl font-bold">
          Are you sure you want to delete this article?
        </div>
        <Button color="red" className="m-3 w-20" onClick={() => handleClick()}>
          delete
        </Button>
      </Group>
    </Modal>
  );
};
