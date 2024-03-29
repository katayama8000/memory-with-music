import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AuthLayout } from '@pages/_Layout';
import type { FormModel, UserModel } from '@type/index';
import type { CustomNextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'src/lib/function/toast';

import { supabase } from '../lib/supabase/supabase';

type registerUserNameType = Pick<UserModel, 'userEmail' | 'userId' | 'userName'>;

//emailで認証しなければならない
const SignUp: CustomNextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const handleSignin = async (value: FormModel) => {
    setIsLoading(true);
    const { error, session, user } = await supabase.auth.signUp({
      email: value.email,
      password: value.password,
    });

    if (user) {
      toast('success', 'ユーザー登録に成功しました', 'cyan');
      registerUserName({ userEmail: value.email, userId: user.id, userName: value.name });
      push('/');
    }
    if (session) {
      console.log('session', session);
    }
    if (error) {
      console.log(error);
      toast('error', error.message, 'red');
    }
    setIsLoading(false);
  };

  const registerUserName = async (value: registerUserNameType) => {
    await supabase.from<registerUserNameType>('users').insert([
      {
        userEmail: value.userEmail,
        userId: value.userId,
        userName: value.userName,
      },
    ]);
  };

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
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
        <TextInput required label='Name' placeholder='name' {...form.getInputProps('name')} className='my-4' />

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
          <Button type='submit' color='cyan' loading={isLoading}>
            SignUp
          </Button>
        </Group>
      </form>
      <div>
        Already have an account? , Click
        <span className='px-2 text-xl font-bold text-inherit'>
          <Link href='/sign-in'>here</Link>
        </span>
      </div>
    </Box>
  );
};

SignUp.getLayout = AuthLayout;
export default SignUp;
