import React, { memo, useCallback } from "react";
import { useRouter } from "next/router";
import { SegmentedControl } from "@mantine/core";

export const Lang: React.FC = memo(() => {
  const router = useRouter();
  const switchLanguage = useCallback(
    (lang: "ja" | "en"): void => {
      router.push(router.pathname, router.pathname, {
        locale: lang,
      });
    },
    [router]
  );
  return (
    <div>
      <SegmentedControl
        color="cyan"
        defaultValue={router.locale}
        value={router.locale}
        data={[
          { value: "ja", label: "ja" },
          { value: "en", label: "en" },
        ]}
        onChange={(lang: "en" | "ja") => switchLanguage(lang)}
      />
    </div>
  );
});

Lang.displayName = "Lang";
