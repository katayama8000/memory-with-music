import React from "react";
import { useRouter } from "next/router";
import { SegmentedControl } from "@mantine/core";

export const Lang: React.FC = () => {
  const router = useRouter();
  const switchLanguage = (lang: "ja" | "en") => {
    router.push(router.pathname, router.pathname, {
      locale: lang,
    });
  };
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
};
