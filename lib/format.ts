const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatPrintDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}.${m}.${y.slice(2)}`;
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  const month = MONTHS[parseInt(m, 10) - 1] ?? m;
  return `${parseInt(d, 10)} ${month} ${y}`;
}
