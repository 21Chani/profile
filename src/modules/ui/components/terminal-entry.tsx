export function TerminalEntry({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex py-0.75">
      <span className="text-terminal-text-muted mr-2 select-none">▸</span>
      <span className="text-terminal-text-muted inline-block w-25">{label}</span>
      <span className="text-terminal-text">{value}</span>
    </div>
  )
}
