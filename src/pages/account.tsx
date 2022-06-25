import { NextPage } from "next";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { state, saveUserId, saveUserEmail, saveUserName } from "@state/state";
import { Avatar, Button, Group, Modal, TextInput } from "@mantine/core";
import { toast } from "@function/toast";
import { config } from "src/lib/supabase/supabase";
import { useForm } from "@mantine/form";
import { AiTwotoneSetting } from "react-icons/Ai";
import { Form } from "@type/typeForm";

const Account: NextPage = () => {
  const snap = useSnapshot(state);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignin = async (value: Form) => {
    setLoading(true);
    const { data, error } = await config.supabase
      .from("users")
      .update({ userName: value.name })
      .match({ userId: snap.userId });

    console.log(data, error);
    if (data) {
      toast("success", "編集しました", "cyan");
      saveUserName(data[0].userName);
    }
    if (error) {
      toast("error", error.message, "red");
    }
    setLoading(false);
    setOpened(false);
  };

  const form = useForm({
    initialValues: {
      name: snap.userName,
      email: snap.userEmail,
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <div>
      <Avatar
        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
        radius="xl"
      />
      <Button
        leftIcon={<AiTwotoneSetting />}
        color="cyan"
        onClick={() => setOpened(true)}
      >
        edit
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside={false}
      >
        <div className="text-center text-2xl font-semibold">edit</div>
        <form>
          <TextInput
            label="Name"
            placeholder={snap.userName}
            {...form.getInputProps("name")}
            className="my-4"
          />

          <TextInput
            label="Email"
            placeholder={snap.userEmail}
            {...form.getInputProps("email")}
            className="my-4"
          />
          <Group position="center" mt="xl">
            <Button
              type="submit"
              color="cyan"
              loading={loading}
              onClick={form.onSubmit((values) => handleSignin(values))}
            >
              save
            </Button>
          </Group>
        </form>
      </Modal>

      <div>name:{snap.userName}</div>
      <div>email:{snap.userEmail}</div>
      <div>id:{snap.userId}</div>
    </div>
  );
};

export default Account;
