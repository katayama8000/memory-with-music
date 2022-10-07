export const pagesPath = {
  "account": {
    $url: (url?: { hash?: string }) => ({ pathname: '/account' as const, hash: url?.hash })
  },
  "article": {
    $url: (url?: { hash?: string }) => ({ pathname: '/article' as const, hash: url?.hash })
  },
  "form": {
    $url: (url?: { hash?: string }) => ({ pathname: '/form' as const, hash: url?.hash })
  },
  "list": {
    $url: (url?: { hash?: string }) => ({ pathname: '/list' as const, hash: url?.hash })
  },
  "sign_in": {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign-in' as const, hash: url?.hash })
  },
  "sign_out": {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign-out' as const, hash: url?.hash })
  },
  "sign_up": {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign-up' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
