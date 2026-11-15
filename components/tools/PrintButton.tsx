'use client'

/** Bouton « Imprimer la fiche » : ouvre la boîte d'impression du navigateur (PDF possible). */
export function PrintButton({ label = 'Imprimer la fiche' }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="btn no-print">
      {label}
    </button>
  )
}
