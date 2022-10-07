import { useIsLoggedIn } from "@hooks/useIsLoggedIn";
import { Center, Container } from "@mantine/core";
import type { CustomLayout } from "next";

import { LayoutErrorBoundary } from "../LayoutErrorBoundary";

export const AuthLayout: CustomLayout = (page) => {
  useIsLoggedIn();
  return (
    <Center>
      <Container size="xs" sx={{ width: 480, paddingBottom: 16 }}>
        <LayoutErrorBoundary>{page}</LayoutErrorBoundary>
      </Container>
    </Center>
  );
};
