export function ContactLink({
  label,
  value,
  href,
  external,
}: {
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener" })}
      className="group/link flex items-center justify-between py-4 border-b border-terminal-border text-terminal-text-dim no-underline transition-all duration-300 first:border-t first:border-t-terminal-border hover:text-terminal-text-bright"
    >
      <div>
        <div className="text-xs tracking-[2px]">{label}</div>
        <div className="text-[12px]">{value}</div>
      </div>
      <span
        className="text-sm opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0"
        aria-hidden="true"
      >
        &rarr;
      </span>
    </a>
  )
}
