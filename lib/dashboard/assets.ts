// Requests that are not pages: Next.js share images and icons (/blog/x/opengraph-image-ab12cd),
// service worker, manifest, PDF files, JSON, robots, sitemaps, _next, /api. Ported from
// 10minlanguages.com. The ingester drops the same paths except the PDF guides (public/guides),
// kept as a download goal; every dashboard query filters this list again (page views only).

/** POSIX regex for Postgres `path !~* …` (also valid in JavaScript). */
export const ASSET_PATH_RE =
  '((^|/)(opengraph-image|twitter-image)(-[a-z0-9]+)?(\\.[a-z0-9]+)?$|(^|/)(apple-)?icon[0-9]*(-[a-z0-9]+)?(\\.[a-z0-9]+)?$|/sw\\.js$|\\.(pdf|webmanifest|json|xml|txt)$|^/(_next|api)/|^/(robots\\.txt|manifest|sitemap))'

export const isAssetPath = (path: string): boolean => new RegExp(ASSET_PATH_RE, 'i').test(path)

/** SQL condition: the row's path is a real page (`a` = table alias with its dot). */
export const pagePath = (a = ''): string => `${a}path !~* '${ASSET_PATH_RE}'`
