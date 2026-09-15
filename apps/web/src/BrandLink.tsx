/**
 * Wiederkehrender edukedo-Schriftzug mit Logo-Icon oben in jeder .card (design/system.css,
 * siehe design/README.md) — verlinkt auf die öffentliche Startseite. Da es im Projekt keinen
 * Router gibt, ist "Startseite" hier schlicht ein voller Seitenneuladen auf "/".
 */
export function BrandLink({ label = "edukedo" }: { label?: string }) {
  return (
    <a className="brand" href="/">
      <span className="brand-mark">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" fill="#fff" />
          <path
            d="M6.5 10v4.2c0 1.6 2.46 3.3 5.5 3.3s5.5-1.7 5.5-3.3V10"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {label}
    </a>
  );
}
