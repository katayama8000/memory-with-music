export const pagesPath = {
  "article": {
    $url: (url?: { hash?: string }) => ({ pathname: '/article' as const, hash: url?.hash })
  },
  "form": {
    $url: (url?: { hash?: string }) => ({ pathname: '/form' as const, hash: url?.hash })
  },
  "list": {
    $url: (url?: { hash?: string }) => ({ pathname: '/list' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
