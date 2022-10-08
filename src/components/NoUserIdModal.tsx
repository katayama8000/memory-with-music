import React, { useState } from "react";
import { Button, Modal } from "@mantine/core";
import { useRouter } from "next/router";

type Props = {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NoUserIdModal: React.FC<Props> = ({ opened, setOpened }) => {
  const router = useRouter();

  return (
    <div>
      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => router.push("/")}
        title="投稿するためにはログインしてください"
      >
        <div className="text-center">
          <Button
            color={"red"}
            className="mx-1"
            onClick={() => router.push("/sign-in")}
          >
            OK
          </Button>
          <Button
            color={"cyan"}
            className="mx-1"
            onClick={() => router.push("/")}
          >
            キャンセル
          </Button>
        </div>
      </Modal>
    </div>
  );
};
