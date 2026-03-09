export function MetaRow({
  items,
  className = "",
}: {
  items: { label: string; value: string }[]
  className?: string
}) {
  return (
    <div className={`flex gap-6 text-xs ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="flex gap-1.5">
          <span className="text-terminal-text-muted tracking-[1px]">{item.label}</span>
          <span className="text-terminal-text tabular-nums">{item.value}</span>
        </div>
      ))}
    </div>
  )
}
