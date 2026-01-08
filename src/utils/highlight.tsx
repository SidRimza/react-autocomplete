export function highlightMatch(text: string, query: string) {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return parts.map((part, i) =>
    part.match(new RegExp(query, 'i')) ? (
      <span key={i} className="highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
}