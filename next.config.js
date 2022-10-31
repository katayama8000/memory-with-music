/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
  swcMinify: true,
};
