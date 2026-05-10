/**
 * ArticleSidebar — sidebar sticky pour les articles de blog.
 * Contient : table des matières (TOC), CTA produit, articles liés.
 * Server Component — masqué sous 1100px via CSS.
 */
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/blog'
import { CATEGORY_LABELS, articleHref } from '@/lib/blog'

type TocItem = { id: string; text: string }

type Props = {
  toc: TocItem[]
  stickyCta?: { label: string; url: string }[]
  stickyCtaMessage?: string
  related: ArticleMeta[]
  affiliateTag: string
}

function addAffiliateTag(url: string, tag: string): string {
  if (!url.includes('amazon.')) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}tag=${tag}`
}

/**
 * Décode les entités HTML les plus courantes utilisées dans les frontmatter
 * MDX (`&laquo;`, `&raquo;`, `&mdash;`, `&hellip;`, `&ccedil;`, etc.).
 * Server-side safe (pas de DOMParser).
 */
function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&Ccedil;/g, 'Ç')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&acirc;/g, 'â')
    .replace(/&icirc;/g, 'î')
    .replace(/&ucirc;/g, 'û')
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/&ugrave;/g, 'ù')
    .replace(/&euro;/g, '€')
    .replace(/&amp;/g, '&')
}

export function ArticleSidebar({ toc, stickyCta, stickyCtaMessage, related, affiliateTag }: Props) {
  const decodedMessage = stickyCtaMessage ? decodeHtmlEntities(stickyCtaMessage) : undefined
  return (
    <aside className="article-sidebar" aria-label="Navigation de l'article">
      <div className="article-sidebar-inner">
        {/* ── TOC ── */}
        {toc.length > 0 && (
          <nav aria-label="Sommaire">
            <h3 style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-3)',
            }}>
              Sommaire
            </h3>
            <ol style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}>
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="toc-link"
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      lineHeight: 1.4,
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: '4px 0 4px 12px',
                      borderLeft: '2px solid var(--border)',
                      transition: 'color 150ms ease, border-color 150ms ease',
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* ── Sticky CTA ── */}
        {stickyCta && stickyCta.length > 0 && (
          <div style={{
            marginTop: toc.length > 0 ? 'var(--space-8)' : 0,
            padding: 'var(--space-4)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
          }}>
            {decodedMessage && (
              <p style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--accent-1)',
                marginBottom: 'var(--space-3)',
              }}>
                {decodedMessage}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {stickyCta.map((item) => (
                <a
                  key={item.label}
                  href={addAffiliateTag(item.url, affiliateTag)}
                  target="_blank"
                  rel="nofollow noopener sponsored"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '8px 12px',
                    background: 'var(--bg-surface-2)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    transition: 'border-color 150ms ease',
                  }}
                  className="sidebar-cta-link"
                >
                  {item.label}
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '6px' }}>→ Amazon</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Articles liés ── */}
        {related.length > 0 && (
          <div style={{
            marginTop: 'var(--space-8)',
          }}>
            <h3 style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-3)',
            }}>
              À lire aussi
            </h3>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}>
              {related.map((a) => (
                <li key={`${a.categorie}/${a.slug}`}>
                  <Link
                    href={articleHref(a)}
                    className="sidebar-related-link"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.35,
                      display: 'block',
                      transition: 'color 150ms ease',
                    }} className="sidebar-related-title">
                      {a.title}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {CATEGORY_LABELS[a.categorie] ?? a.categorie} · {a.readingTimeMin} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  )
}
