/* eslint-disable react/no-unescaped-entities */
import { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase/supabase";
import { toast } from "@function/toast";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormModel } from "@type/form.model";
import Link from "next/link";
import { AuthLayout } from "@pages/Layout";

const SignIn: CustomNextPage = () => {
  const router = useRouter();
  const handleSignin = async (value: FormModel) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: value.email,
      password: value.password,
    });

    if (user) {
      console.log(user);
      let userName: Promise<string> = getUserName(user.id);
      toast("success", "ログインに成功しました", "cyan");
      router.push("/");
    }
    if (session) {
    }
    if (error) {
      console.log(error);
      toast("error", error.message, "red");
    }
  };

  const getUserName = async (userId: string) => {
    const { data, error } = await supabase
      .from<{ userName: string }>("users")
      .select("userName")
      .match({ userId: userId });

    const userName = data![0].userName;
    return userName;
  };

  const form = useForm({
    initialValues: {
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
          <Button type="submit" color="cyan">
            SignIn
          </Button>
        </Group>
      </form>
      <div>
        If you don't have an account , Click
        <Link href="/signup">
          <a className="pl-1 text-xl font-bold text-inherit">here</a>
        </Link>
      </div>
    </Box>
  );
};

SignIn.getLayout = AuthLayout;

export default SignIn;
