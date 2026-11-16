/** Lien de téléchargement d'un guide PDF (public/guides), fabriqué par scripts/guides-pdf.cjs. */
export function GuideDownload({ file, label, note }: { file: string; label: string; note: string }) {
  return (
    <p className="no-print stack">
      <a className="btn btn--ivory btn--full" href={`/guides/${file}`} download>
        {label}
      </a>
      <span className="dated">{note}</span>
    </p>
  )
}
