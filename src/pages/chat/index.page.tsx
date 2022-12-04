import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DashboardLayout } from '@pages/_Layout';
import type { CustomNextPage } from 'next';

const Chat: CustomNextPage = () => {
  const form = useForm({
    initialValues: {
      value: '',
    },
  });

  const handleSend = (text: { value: string }) => {
    console.log(text);
    form.reset();
  };

  return (
    <div>
      <div className='m-auto flex h-screen max-w-6xl flex-col'>
        <form
          onSubmit={form.onSubmit((values) => {
            return handleSend(values);
          })}
        >
          <Flex mih={50} gap='md' justify='center' align='center' direction='row' wrap='wrap'>
            <TextInput size='lg' variant='filled' {...form.getInputProps('value')} className='w-3/5' />
            <Button size='lg' type='submit' color='cyan'>
              送信
            </Button>
          </Flex>
        </form>
      </div>
    </div>
  );
};

Chat.getLayout = DashboardLayout;
export default Chat;
