import { SegmentedControl } from '@mantine/core';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';

export const Lang: React.FC = memo(() => {
  const router = useRouter();
  const switchLanguage = useCallback(
    (lang: 'ja' | 'en'): void => {
      router.push(router.pathname, router.pathname, {
        locale: lang,
      });
    },
    [router]
  );
  return (
    <div>
      <SegmentedControl
        color='cyan'
        defaultValue={router.locale}
        value={router.locale}
        data={[
          { label: 'ja', value: 'ja' },
          { label: 'en', value: 'en' },
        ]}
        onChange={(lang: 'en' | 'ja') => {
          return switchLanguage(lang);
        }}
      />
    </div>
  );
});

Lang.displayName = 'Lang';
