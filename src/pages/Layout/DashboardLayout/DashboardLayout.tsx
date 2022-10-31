import { useIsLoggedIn } from '@hooks/useIsLoggedIn';
import { AppShell, Header, Navbar } from '@mantine/core';
import { LayoutErrorBoundary } from '@pages/Layout/LayoutErrorBoundary';
import type { CustomLayout } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeaderComp = dynamic(async () => {
  const { HeaderComp } = await import('./Header');
  return HeaderComp;
});

const SideNav = dynamic(async () => {
  const { SideNav } = await import('./sideNav/SideNav');
  return SideNav;
});

const User = dynamic(async () => {
  const { User } = await import('./sideNav/User');
  return User;
});

export const DashboardLayout: CustomLayout = (page) => {
  useIsLoggedIn();

  return (
    <>
      <AppShell
        padding='md'
        navbar={
          <Navbar p='xs' width={{ base: 200 }} hidden={true} hiddenBreakpoint={1000} fixed={true}>
            <Navbar.Section grow mt='md'>
              <Suspense fallback={<p id='loading'>Loading...</p>}>
                <SideNav />
              </Suspense>
            </Navbar.Section>
            <Navbar.Section>
              <Suspense fallback={<p id='loading'>Loading...</p>}>
                <User />
              </Suspense>
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={70} p='xs' fixed={true} zIndex={200}>
            <HeaderComp />
          </Header>
        }
      >
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </AppShell>
    </>
  );
};
