'use client'

/** Bouton « Imprimer la fiche » : ouvre la boîte d'impression du navigateur (PDF possible). */
export function PrintButton({ label = 'Imprimer la fiche' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print"
      style={{
        padding: '14px 22px',
        background: 'var(--copper)',
        color: 'var(--ivory)',
        border: 'none',
        borderRadius: 100,
        fontSize: 15,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}
