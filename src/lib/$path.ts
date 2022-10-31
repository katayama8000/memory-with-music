export const pagesPath = {
  $url: (url?: { hash?: string }) => {
    return { hash: url?.hash, pathname: '/' as const };
  },
  account: {
    $url: (url?: { hash?: string }) => {
      return { hash: url?.hash, pathname: '/account' as const };
    },
  },
  articles: {
    $url: (url?: { hash?: string }) => {
      return { hash: url?.hash, pathname: '/articles' as const };
    },
    article_content: {
      $url: (url?: { hash?: string }) => {
        return { hash: url?.hash, pathname: '/articles/article-content' as const };
      },
    },
  },
  demo: {
    $url: (url?: { hash?: string }) => {
      return { hash: url?.hash, pathname: '/demo' as const };
    },
  },
  sign_in: {
    $url: (url?: { hash?: string }) => {
      return { hash: url?.hash, pathname: '/sign-in' as const };
    },
  },
  sign_up: {
    $url: (url?: { hash?: string }) => {
      return { hash: url?.hash, pathname: '/sign-up' as const };
    },
  },
  write_article: {
    $url: (url?: { hash?: string }) => {
      return { hash: url?.hash, pathname: '/write-article' as const };
    },
  },
};

export type PagesPath = typeof pagesPath;
