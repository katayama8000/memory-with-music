import { NextPage } from "next";
import { config } from "../lib/supabase/supabase";
import { toast } from "@function/toast";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { saveUserEmail, saveUserName } from "@state/state";
import { useState } from "react";
import { Form } from "@type/typeForm";

//emailで認証しなければならないらしい
const Signup: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleSignin = async (value: Form) => {
    setLoading(true);
    console.log(value);
    const { user, session, error } = await config.supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });

    if (user) {
      console.log(user);
      console.log(user.id);
      toast("success", "ユーザー登録に成功しました", "cyan");
      registerUserName(value.name!, user.id);
      saveUserName(value.name!);
      saveUserEmail(value.email);
    }
    if (session) {
      console.log("session", session);
    }
    if (error) {
      console.log(error);
      toast("error", error.message, "red");
    }
    setLoading(false);
  };

  const registerUserName = async (userName: string, userId: string) => {
    const { data, error } = await config.supabase.from("users").insert([
      {
        userName: userName,
        userId: userId,
      },
    ]);

    console.log(data, error);
  };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSignin(values))}>
        <TextInput
          required
          label="Name"
          placeholder="name"
          {...form.getInputProps("name")}
          className="my-4"
        />

        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          className="my-4"
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
          className="my-4"
        />

        <Group position="center" mt="xl">
          <Button type="submit" color="cyan" loading={loading}>
            SignUp
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Signup;
