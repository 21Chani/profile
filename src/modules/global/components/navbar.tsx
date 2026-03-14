import { ThemeSwitcher } from "./theme-switcher"

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "STACKS", href: "#stacks" },
  { label: "WORK", href: "#work" },
] as const

export function Navbar({ className = "" }: { className?: string }) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-1000 flex items-center justify-between bg-terminal-bg/75 backdrop-blur-[20px] border-b border-terminal-border px-5 py-3.5 md:px-10 md:py-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <img className="size-8" src="icon.png" />
        <a
          href="/"
          className="font-mono uppercase font-black text-sm text-terminal-white tracking-3px] no-underline md:text-lg"
        >
          chani.sh
        </a>
        <div className="w-px h-4 bg-terminal-border-mid" />
        <ThemeSwitcher />
      </div>

      <div className="flex items-center gap-1.5">
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-terminal-text-dim text-xxs tracking-[2px] no-underline px-2.5 py-1.5 border border-transparent transition-all duration-300 hover:text-terminal-text-bright hover:border-terminal-border-mid md:text-xs md:px-3.5 md:py-1.5"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="text-terminal-text-bright text-xxs tracking-[2px] no-underline px-2.5 py-1.5 border border-terminal-border-mid transition-all duration-300 hover:border-terminal-border-bright md:text-xs md:px-3.5 md:py-1.5"
        >
          CONTACT
        </a>
      </div>
    </nav>
  )
}
