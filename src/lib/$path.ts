export const pagesPath = {
  "account": {
    $url: (url?: { hash?: string }) => ({ pathname: '/account' as const, hash: url?.hash })
  },
  "articles": {
    "article_content": {
      $url: (url?: { hash?: string }) => ({ pathname: '/articles/article-content' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/articles' as const, hash: url?.hash })
  },
  "chat": {
    $url: (url?: { hash?: string }) => ({ pathname: '/chat' as const, hash: url?.hash })
  },
  "sign_in": {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign-in' as const, hash: url?.hash })
  },
  "sign_up": {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign-up' as const, hash: url?.hash })
  },
  "write_article": {
    $url: (url?: { hash?: string }) => ({ pathname: '/write-article' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
