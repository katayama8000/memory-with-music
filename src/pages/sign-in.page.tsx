/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthLayout } from '@pages/_Layout';
import type { FormModel } from '@type/form.model';
import type { CustomNextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'src/lib/function/toast';

import { supabase } from '../lib/supabase/supabase';

const SignIn: CustomNextPage = () => {
  const router = useRouter();

  const handleSignin = async (value: Omit<FormModel, 'name'>) => {
    const { error, session, user } = await supabase.auth.signIn({
      email: value.email,
      password: value.password,
    });

    if (user) {
      toast('success', 'ログインに成功しました', 'cyan');
      router.push('/');
    }
    if (session) {
    }
    if (error) {
      console.log(error);
      toast('error', error.message, 'red');
    }
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => {
        return /^\S+@\S+$/.test(value) ? null : 'Invalid email';
      },
    },
  });

  return (
    <Box sx={{ maxWidth: 320 }} mx='auto'>
      <form
        onSubmit={form.onSubmit((values) => {
          return handleSignin(values);
        })}
      >
        <TextInput
          required
          label='Email'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
          className='my-4'
        />

        <PasswordInput
          required
          label='Password'
          placeholder='Password'
          {...form.getInputProps('password')}
          className='my-4'
        />

        <Group position='center' mt='xl'>
          <Button type='submit' color='cyan'>
            SignIn
          </Button>
        </Group>
      </form>
      <div>
        If you don't have an account , Click
        <span className='px-2 text-xl font-bold text-inherit'>
          <Link href='/sign-up'>here</Link>
        </span>
      </div>
    </Box>
  );
};

SignIn.getLayout = AuthLayout;
export default SignIn;
