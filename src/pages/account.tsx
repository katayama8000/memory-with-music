/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { config } from "src/lib/supabase/supabase";
import { useSnapshot } from "valtio";
import { state, saveUserId, saveUserEmail, saveUserName } from "@state/state";
import {
  Avatar,
  Button,
  Grid,
  Group,
  Modal,
  Spoiler,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "@function/toast";
import { AiTwotoneSetting } from "react-icons/ai";
import { MemoryCard } from "@components/layout/card";
import { FormModel } from "@type/form.model";
import { useLocale } from "@hooks/useLocale";
import { useGetUserSongs } from "@hooks/useGetUserSongs";

const Account: NextPage = () => {
  const snap = useSnapshot(state);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const { songList } = useGetUserSongs();
  const { t } = useLocale();

  const handleEdit = async (value: FormModel) => {
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

  useEffect(() => {
    form.setValues({
      name: snap.userName,
      email: snap.userEmail,
      password: "",
    });
  }, [snap]);

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
      <div className="flex justify-between px-2">
        {/* <div>{songList}</div> */}
        <div className="flex">
          <div>
            <Avatar
              src="data:image/jpeg;base64,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"
              radius="xl"
              size="lg"
            />
          </div>
          <div className="pl-6">
            <div>
              {t.ACCOUNT.NAME} : {snap.userName}
            </div>
            <div>
              {t.ACCOUNT.EMAIL} : {snap.userEmail}
            </div>
          </div>
        </div>
        <Button
          leftIcon={<AiTwotoneSetting />}
          color="cyan"
          onClick={() => setOpened(true)}
        >
          edit
        </Button>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside={false}
        title="edit"
      >
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
              onClick={form.onSubmit((values) => handleEdit(values))}
            >
              save
            </Button>
          </Group>
        </form>
      </Modal>
      <div className="mt-10">
        {songList.length > 0 ? (
          <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
            <div>
              <Grid>
                {songList?.map((item) => {
                  return (
                    <Grid.Col xs={6} key={item.id}>
                      <div className="m-auto px-2">
                        <MemoryCard
                          id={item.id}
                          song={item.song}
                          image={item.image}
                          artist={item.artist}
                          memory={item.memory}
                        />
                      </div>
                    </Grid.Col>
                  );
                })}
              </Grid>
            </div>
          </Spoiler>
        ) : (
          <div>There are no memories</div>
        )}
      </div>
    </div>
  );
};

export default Account;
