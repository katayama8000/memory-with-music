import React from "react";
import { links } from "@type/typeLinks.model";
import { useLocale } from "@hooks/useLocale";
import Link from "next/link";
import { FaSearch, FaRegListAlt } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { MdOutlineArticle } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";

type Props = {
  color: "light" | "dark";
};

export const Sidebar: React.FC<Props> = ({ color }) => {
  const { t } = useLocale();
  const router = useRouter();
  const Links: links[] = [
    { url: "/", label: t.LINKS.SEACRCH, icon: <FaSearch /> },
    { url: "/form", label: t.LINKS.FORM, icon: <AiOutlineForm /> },
    { url: "/list", label: t.LINKS.LIST, icon: <FaRegListAlt /> },
    { url: "/article", label: t.LINKS.ARTICLE, icon: <MdOutlineArticle /> },
    { url: "/signup", label: t.LINKS.SIGNUP, icon: <BiLogIn /> },
    { url: "/signin", label: t.LINKS.SIGNIN, icon: <FaSignInAlt /> },
    { url: "/signout", label: t.LINKS.SIGNOUT, icon: <FaSignOutAlt /> },
    { url: "/account", label: t.LINKS.ACCOUNT, icon: <MdManageAccounts /> },
  ];

  const colorSet = (url: string, pathname: string): string => {
    let color: string = "";
    if (url === pathname) {
      color = "#0c8599";
    } else {
      color = "#273030";
    }
    return color;
  };
  return (
    <div>
      {Links.map((link) => {
        return (
          <div key={link.label}>
            {color === "dark" ? (
              <div>
                {link.url === router.pathname ? (
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
                {link.url === router.pathname ? (
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
};
