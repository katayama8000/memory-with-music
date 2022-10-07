/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "src/lib/supabase/supabase";
import { AppShell, Navbar, Header } from "@mantine/core";
import { Sidebar } from "@pages/Layout/DashboardLayout/sideNav/SideNav";
import { User } from "@pages/Layout/DashboardLayout/sideNav/User";
import { state, saveUserId, saveUserEmail, saveUserName } from "@state/state";
import dynamic from "next/dynamic";
import { CustomLayout } from "next";
import { LayoutErrorBoundary } from "@pages/Layout/LayoutErrorBoundary";
import { useSnapshot } from "valtio";
import { useIsLoggedIn } from "@hooks/useIsLoggedIn";

const HeaderComp = dynamic(async () => {
  const { HeaderComp } = await import("./header");
  return HeaderComp;
});

export const DashboardLayout: CustomLayout = (page) => {
  const router = useRouter();
  useIsLoggedIn();

  // useEffect(() => {
  //   //sessionにユーザーがいる場合それを使用
  //   const session = supabase.auth.session();
  //   console.log("session", session?.user?.id!);
  //   if (session?.user?.id! === undefined) {
  //     router.push("/signin");
  //   } else {
  //     saveUserId(session?.user?.id!);
  //     getUserInfo(session?.user?.id!);
  //   }
  // }, []);

  // const getUserInfo = async (userId: string) => {
  //   const { data, error } = await supabase
  //     .from<{ userName: string; userEmail: string }>("users")
  //     .select("userName, userEmail")
  //     .match({ userId: userId });

  //   if (data) {
  //     //ユーザーがいない場合、サインインページに移動
  //     if (data.length === 0) {
  //       router.push("/signin");
  //     } else {
  //       const userName = data![0].userName;
  //       const userEmail = data![0].userEmail;
  //       saveUserName(userName);
  //       saveUserEmail(userEmail);
  //     }
  //   }

  //   if (error) {
  //     router.push("/signin");
  //   }
  // };

  return (
    <>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            p="xs"
            width={{ base: 300 }}
            hidden={true}
            hiddenBreakpoint={1000}
            fixed={true}
          >
            <Navbar.Section grow mt="md">
              <Sidebar />
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
