import React from "react";
import { useRouter } from "next/router";
import { useLocale } from "@hooks/useLocale";
import { SegmentedControl } from "@mantine/core";

export const Router: React.FC = () => {
  const { t } = useLocale();
  const router = useRouter();
  return (
    <div>
      <SegmentedControl
        color="cyan"
        defaultValue={router.pathname}
        value={router.pathname}
        onChange={(path: "/" | "/form" | "list" | "article") => {
          router.push(path);
        }}
        data={[
          { label: t.LINKS.SEACRCH, value: "/" },
          { label: t.LINKS.FORM, value: "/form" },
          { label: t.LINKS.LIST, value: "/list" },
          { label: t.LINKS.ARTICLE, value: "/article", disabled: true },
        ]}
      />
    </div>
  );
};
