export function StackRow({
  icon,
  name,
  ext,
  proficiency,
}: {
  icon: string
  name: string
  ext: string
  proficiency: number
}) {
  const filled = proficiency
  const empty = 5 - proficiency

  return (
    <div className="group/row relative flex items-center px-3.5 py-1 cursor-default text-sm leading-[1.4]">
      {/* hover bg */}
      <div className="absolute inset-0 bg-terminal-white/[0.02] opacity-0 group-hover/row:opacity-100 transition-opacity duration-150 pointer-events-none" />

      <span className="w-[22px] shrink-0 text-xs text-terminal-text-muted text-center relative z-1 transition-colors duration-150 group-hover/row:text-terminal-text-dim">
        {icon}
      </span>
      <span className="text-terminal-text relative z-1 whitespace-nowrap transition-colors duration-150 group-hover/row:text-terminal-text-bright">
        {name}
      </span>
      <span className="text-terminal-text-muted relative z-1 transition-colors duration-150 group-hover/row:text-terminal-text-dim">
        {ext}
      </span>
      <span className="ml-auto text-[8px] tracking-[2px] tabular-nums relative z-1 whitespace-nowrap transition-colors duration-150">
        {Array.from({ length: filled }, (_, i) => (
          <span key={`f${i}`} className="text-terminal-text-dim group-hover/row:text-terminal-text-bright transition-colors duration-150">
            ■
          </span>
        ))}
        {Array.from({ length: empty }, (_, i) => (
          <span key={`e${i}`} className="text-terminal-border-mid group-hover/row:text-terminal-border-bright transition-colors duration-150">
            □
          </span>
        ))}
      </span>
    </div>
  )
}
