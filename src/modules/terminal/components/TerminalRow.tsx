import { format } from "date-fns"
import { BsApple, BsClockFill, BsFillFolderFill } from "react-icons/bs"
import { twMerge } from "tailwind-merge"

interface TerminalRowProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  path?: string
  date?: Date
}

/**
 * Terminal Row component
 * Performs a simulation of a terminal in bash using styles such as oh-my-zsh.
 * @param - date - Date of when the line was fired.
 * @param - path - Path of the directory.
 */
export function TerminalRow({
  date,
  children,
  className,
  path = "~/repos/github.com/21Chani/profile",
  ...props
}: TerminalRowProps) {
  return (
    <div className={twMerge("flex flex-col gap-1", className)} {...props}>
      <div className="flex items-center">
        {/* OS Symbol Section */}
        <div className="h-6 p-3 py-1 rounded-l-full bg-gray-200 w-fit">
          <BsApple className="fill-black size-4 " />
        </div>

        {/* Path Section */}
        <div className="h-6 p-3 py-1 bg-gray-400 gap-0.5 flex">
          <BsFillFolderFill className="fill-black size-4  " />
          <p className="text-sm leading-4">{path}</p>
        </div>

        {/* Date Section */}
        {date && (
          <div className="h-6 p-3 py-1 bg-gray-600 gap-0.5 flex rounded-r-sm">
            <p className="text-sm leading-4">at {format(date, "hh:mm:ss")}</p>
            <BsClockFill className="fill-black size-4  " />
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
