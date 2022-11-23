import { useGetUserId } from '@hooks/useGetUserId';
import { Button } from '@mantine/core';
import { useEffect } from 'react';
import { supabase } from 'src/lib/supabase/supabase';

const Demo2 = () => {
  const userId = useGetUserId();
  const mySubscription = () => {
    return supabase
      .from('goods')
      .on('INSERT', (payload: any) => {
        console.log('Change received!', payload);
      })
      .subscribe();
  };
  useEffect(() => {
    console.log('test');
    mySubscription();
    return () => {
      mySubscription().unsubscribe();
    };
  }, []);

  const handleClick = async () => {
    console.log('click');
    const articleId = 27;
    console.log('userId', userId, 'articleId', articleId);
    const { data, error } = await supabase.from('goods').insert([{ articleId: articleId, userId }]);
    console.log('data', data, 'error', error);
  };
  return (
    <div>
      <h1>demo2</h1>
      <Button onClick={handleClick}>click good</Button>
    </div>
  );
};

export default Demo2;
