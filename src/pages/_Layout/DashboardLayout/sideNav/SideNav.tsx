import { useLocale } from '@hooks/useLocale';
import { state } from '@state/state';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { AiOutlineForm } from 'react-icons/ai';
import { BsFillChatDotsFill } from 'react-icons/Bs';
import { FaRegListAlt, FaSearch } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';
import { useSnapshot } from 'valtio';

type SideNavProps = {
  color?: 'light' | 'dark';
};

export const SideNav: React.FC<SideNavProps> = memo(() => {
  const { color } = useSnapshot(state);
  const { t } = useLocale();
  const { pathname } = useRouter();
  type urlType = typeof Links[number]['url'];
  const Links = [
    { icon: <FaSearch />, label: t.LINKS.SEACRCH, url: '/' },
    { icon: <AiOutlineForm />, label: t.LINKS.FORM, url: '/write-article' },
    { icon: <FaRegListAlt />, label: t.LINKS.LIST, url: '/articles' },
    { icon: <MdManageAccounts />, label: t.LINKS.ACCOUNT, url: '/account' },
    { icon: <BsFillChatDotsFill />, label: t.LINKS.CHAT, url: '/chat' },
    // {
    //   url: "/articles/article-content",
    //   label: t.LINKS.ARTICLE + "(開発中)",
    //   icon: <MdOutlineArticle />,
    // },
    // { url: "/sign-up", label: t.LINKS.SIGNUP + "(開発中)", icon: <BiLogIn /> },
    // {
    //   url: "/sign-in",
    //   label: t.LINKS.SIGNIN + "(開発中)",
    //   icon: <FaSignInAlt />,
    // },
  ] as const;

  const isMacthedUrl = useCallback(
    (url: urlType): boolean => {
      return url === pathname;
    },
    [pathname]
  );
  return (
    <div>
      {Links.map((link) => {
        return (
          <div key={link.label}>
            <div>
              <Link href={link.url}>
                <div
                  className={`my-1 flex cursor-pointer  rounded-lg  py-2 pl-2 ${
                    color === 'dark'
                      ? `text-white ${isMacthedUrl(link.url) ? 'bg-[#0c8599]' : 'hover:bg-[#232323]'}`
                      : `
                      ${isMacthedUrl(link.url) ? 'bg-[#0c8599] text-white' : 'text-inherit hover:bg-[#f0f0f0]'}`
                  }`}
                >
                  <span className='mt-[2px] pr-2'>{link.icon}</span>
                  <span className='text-lg'>{link.label}</span>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
});

SideNav.displayName = 'SideNav';
