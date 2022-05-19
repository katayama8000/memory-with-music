export const pagesPath = {
  "memories": {
    $url: (url?: { hash?: string }) => ({ pathname: '/memories' as const, hash: url?.hash })
  },
  "supa": {
    $url: (url?: { hash?: string }) => ({ pathname: '/supa' as const, hash: url?.hash })
  },
  "test": {
    $url: (url?: { hash?: string }) => ({ pathname: '/test' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
