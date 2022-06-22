import { NextPage } from "next";
import { config } from "../lib/supabase/supabase";
import { toast } from "@function/toast";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";

type Form = {
  email: string;
  password: string;
};

//emailで認証しなければならないらしい
const Signup: NextPage = () => {
  const handleSignin = async (value: Form) => {
    console.log(value);
    const { user, session, error } = await config.supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });

    if (user) {
      console.log(user);
      toast("success", "ユーザー登録に成功しました", "cyan");
    }
    if (session) {
      console.log(session);
      toast("success", "this is session", "cyan");
    }
    if (error) {
      console.log(error);
      toast("success", "失敗", "red");
    }
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
            SignUp
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Signup;
