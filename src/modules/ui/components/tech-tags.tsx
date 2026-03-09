export function TechTags({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xxs tracking-[1px] text-terminal-text-muted px-2.5 py-0.75 border border-terminal-border transition-all duration-300 group-hover:border-terminal-border-mid group-hover:text-terminal-text-dim"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
