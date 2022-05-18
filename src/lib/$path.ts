export const pagesPath = {
  "supa": {
    $url: (url?: { hash?: string }) => ({ pathname: '/supa' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
