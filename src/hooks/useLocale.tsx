import { useRouter } from 'next/router';
import en from 'src/i18n/en';
import ja from 'src/i18n/ja';

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : ja;
  return { locale, t };
};
