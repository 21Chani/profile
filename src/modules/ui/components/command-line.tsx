interface CommandLineProps {
  prefix?: string;
  command: string;
  args?: string[];
}

export function CommandLine({
  prefix = "$",
  command,
  args = [],
}: CommandLineProps) {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-terminal-text-dim">{prefix}</span>
      <span className="text-terminal-text">{command}</span>
      {args.map((arg) => (
        <span key={arg} className="text-terminal-text-muted">
          {arg}
        </span>
      ))}
    </div>
  );
}
