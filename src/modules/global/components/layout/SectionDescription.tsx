import type { IconType } from "react-icons/lib"
import { Fragment } from "react/jsx-runtime"
import { twMerge } from "tailwind-merge"
import { EncryptedText } from "../EncryptedText"
import { Paragraph } from "../Paragraph"

interface SectionDescriptionProps {
  icon: IconType
  /**
   * Encrypted text of your section
   */
  title: string
  /**
   * Description of your section
   */
  description: string
  /**
   * Direction of your section, rather right or left
   * @default "lr"
   */
  direction?: "rl" | "lr"

  className?: string
}

/**
 * Standard section description render.
 */
export function SectionDescription(props: SectionDescriptionProps) {
  // Split text by empty spaces to break it's values.
  const titleSplit = props.title.split(" ")

  return (
    <div
      className={twMerge(
        "flex size-full lg:max-w-xl h-fit flex-col p-4",
        props.direction === "rl" ? "text-end items-end" : "",
        props.className
      )}
    >
      <props.icon className="size-12 mt-auto fill-white w-fit" />

      <h1 className="text-3xl font-extrabold uppercase text-gradient-highlight">
        {titleSplit.map((titlePart, index) => (
          <Fragment key={`title_part_${index}_${titlePart}`}>
            <EncryptedText iterations={titlePart.length * 2} text={titlePart} />
            {index + 1 < titleSplit.length && <br />}
          </Fragment>
        ))}
      </h1>

      <Paragraph className="text-sm">{props.description}</Paragraph>
    </div>
  )
}
