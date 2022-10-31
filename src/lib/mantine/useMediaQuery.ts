import { useMediaQuery as useMediaQueryOriginal } from '@mantine/hooks';

/* Mantineと一致させる: https://mantine.dev/theming/responsive */
const map = {
  lg: '1200px',
  md: '992px',
  sm: '768px',
  xl: '1400px',
  xs: '576px',
} as const;

export const useMediaQuery = (
  query: keyof typeof map,
  initialValue: Parameters<typeof useMediaQueryOriginal>[1] = true
) => {
  return useMediaQueryOriginal(`(min-width: ${map[query]})`, initialValue);
};
