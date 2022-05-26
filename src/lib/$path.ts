export const pagesPath = {
  "form": {
    $url: (url?: { hash?: string }) => ({ pathname: '/form' as const, hash: url?.hash })
  },
  "memories": {
    $url: (url?: { hash?: string }) => ({ pathname: '/memories' as const, hash: url?.hash })
  },
  "memoryArticle": {
    $url: (url?: { hash?: string }) => ({ pathname: '/memoryArticle' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
