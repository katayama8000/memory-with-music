import { CustomNextPage, NextPage } from "next";
import { supabase } from "../lib/supabase/supabase";
import { toast } from "@function/toast";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { FormModel } from "@type/form.model";
import { AuthLayout } from "@pages/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

//emailで認証しなければならないらしい
const SignUp: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const handleSignin = async (value: FormModel) => {
    setIsLoading(true);
    const { user, session, error } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });

    if (user) {
      toast("success", "ユーザー登録に成功しました", "cyan");
      registerUserName(value.name!, user.id, value.email);
      push("/");
    }
    if (session) {
      console.log("session", session);
    }
    if (error) {
      console.log(error);
      toast("error", error.message, "red");
    }
    setIsLoading(false);
  };

  const registerUserName = async (
    userName: string,
    userId: string,
    userEmail: string
  ) => {
    const { data, error } = await supabase
      .from<{ userName: string; userId: string; userEmail: string }>("users")
      .insert([
        {
          userName: userName,
          userId: userId,
          userEmail: userEmail,
        },
      ]);
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
    <Box sx={{ maxWidth: 320 }} mx="auto">
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
          <Button type="submit" color="cyan" loading={isLoading}>
            SignUp
          </Button>
        </Group>
      </form>
      <div>
        Already have an account? , Click
        <span className="px-2 text-xl font-bold text-inherit">
          <Link href="/sign-in">here</Link>
        </span>
      </div>
    </Box>
  );
};

SignUp.getLayout = AuthLayout;
export default SignUp;
