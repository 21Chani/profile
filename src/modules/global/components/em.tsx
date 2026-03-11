export function Em({ children }: { children: React.ReactNode }) {
  return (
    <em className="not-italic text-terminal-text border-b border-dashed border-terminal-border-bright">{children}</em>
  )
}
