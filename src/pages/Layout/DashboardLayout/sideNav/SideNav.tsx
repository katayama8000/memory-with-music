import React, { memo } from "react";
import { useLocale } from "@hooks/useLocale";
import Link from "next/link";
import { FaSearch, FaRegListAlt } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";
import { state } from "@state/state";

type SideNavProps = {
  color?: "light" | "dark";
};

export const SideNav: React.FC<SideNavProps> = memo(() => {
  const { color } = useSnapshot(state);
  const { t } = useLocale();
  const { pathname } = useRouter();
  const Links = [
    { url: "/home", label: t.LINKS.SEACRCH, icon: <FaSearch /> },
    { url: "/write-article", label: t.LINKS.FORM, icon: <AiOutlineForm /> },
    { url: "/articles", label: t.LINKS.LIST, icon: <FaRegListAlt /> },
    { url: "/account", label: t.LINKS.ACCOUNT, icon: <MdManageAccounts /> },
    {
      url: "/articles/article-content",
      label: t.LINKS.ARTICLE + "(開発中)",
      icon: <MdOutlineArticle />,
    },
    { url: "/sign-up", label: t.LINKS.SIGNUP + "(開発中)", icon: <BiLogIn /> },
    {
      url: "/sign-in",
      label: t.LINKS.SIGNIN + "(開発中)",
      icon: <FaSignInAlt />,
    },
  ] as const;

  const colorSet = (url: string, pathname: string): string => {
    return url === pathname ? "#0c8599" : "#273030";
  };
  return (
    <div>
      {Links.map((link) => {
        return (
          <div key={link.label}>
            {color === "dark" ? (
              <div>
                {link.url === pathname ? (
                  <Link href={link.url}>
                    <div className="my-1 flex cursor-pointer  rounded-lg bg-[#0c8599] py-2  pl-2 text-white">
                      <span className="mt-[2px] pr-2">{link.icon}</span>
                      <a className="text-lg">{link.label}</a>
                    </div>
                  </Link>
                ) : (
                  <Link href={link.url}>
                    <div className="my-1 flex cursor-pointer  rounded-lg py-2 pl-2  text-lg text-inherit hover:bg-[#232323]">
                      <span className="mt-[2px] pr-2">{link.icon}</span>
                      <a className="text-lg">{link.label}</a>
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              <div>
                {link.url === pathname ? (
                  <Link href={link.url}>
                    <div className="my-1 flex cursor-pointer  rounded-lg bg-[#0c8599] py-2  pl-2 text-white">
                      <span className="mt-[2px] pr-2">{link.icon}</span>
                      <a className="text-lg">{link.label}</a>
                    </div>
                  </Link>
                ) : (
                  <Link href={link.url}>
                    <div className="my-1 flex cursor-pointer  rounded-lg py-2 pl-2  text-lg text-inherit hover:bg-[#f0f0f0]">
                      <span className="mt-[2px] pr-2">{link.icon}</span>
                      <a className="text-lg">{link.label}</a>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

SideNav.displayName = "SideNav";
