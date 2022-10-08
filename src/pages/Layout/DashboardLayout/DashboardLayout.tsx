import { AppShell, Navbar, Header } from "@mantine/core";
import { User } from "@pages/Layout/DashboardLayout/sideNav/User";
import dynamic from "next/dynamic";
import { CustomLayout } from "next";
import { LayoutErrorBoundary } from "@pages/Layout/LayoutErrorBoundary";
import { useIsLoggedIn } from "@hooks/useIsLoggedIn";

const HeaderComp = dynamic(async () => {
  const { HeaderComp } = await import("./Header");
  return HeaderComp;
});

const SideNav = dynamic(async () => {
  const { SideNav } = await import("./sideNav/SideNav");
  return SideNav;
});

export const DashboardLayout: CustomLayout = (page) => {
  useIsLoggedIn();

  //ここでuseEffectを使うと,エラーが出る
  // useEffect(() => {
  //   console.log("useEffect");
  // }, []);

  return (
    <>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            p="xs"
            width={{ base: 200 }}
            hidden={true}
            hiddenBreakpoint={1000}
            fixed={true}
          >
            <Navbar.Section grow mt="md">
              <SideNav />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={70} p="xs" fixed={true} zIndex={200}>
            <HeaderComp />
          </Header>
        }
      >
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </AppShell>
    </>
  );
};
