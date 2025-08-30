import { EncryptedText } from "@/modules/global/components/EncryptedText"
import { Paragraph } from "@/modules/global/components/Paragraph"

/**
 * Summary component
 * Displays a brief introduction and description.
 */
export function Summary() {
  return (
    <div className=" flex items-start gap-2 max-md:flex-col  max-w-xl">
      {/* Details */}

      <div className="text-foreground ">
        <span className="mx-auto uppercase ">
          <h1 className="text-xl font-bold md:text-4xl text-foreground-alt xl:text-5xl xl:leading-[42px]">
            <EncryptedText animate text="I'm Chani" iterations={12} />
          </h1>
          <h1 className="text-xl font-bold md:text-4xl text-foreground-alt xl:text-5xl xl:leading-[42px]">
            <EncryptedText animate text="A" iterations={1} />
            &nbsp;
            <EncryptedText animate className="text-gradient-highlight" text="full stack" iterations={12} />
            <br className="ma-xl:hidden" />
            <EncryptedText animate className="text-gradient-highlight" text="software" iterations={12} />
            &nbsp;
            <EncryptedText animate text="engineer" iterations={12} />
          </h1>
        </span>

        {/* Description */}
        <Paragraph className="mt-4 text-justify text-xs md:text-sm font-extrabold">
          My real name is Diogo, but you can call me Chani. I am a passionate technology enthusiast from Brazil who
          loves to learn new things and solve problems. I do know a lot of everything in this programming world, from
          hardware to software, but I have focused the past 3 years to dedicate into the web3 ecosystem, where I have
          been working with blockchain technologies, smart contracts, and decentralized applications.
        </Paragraph>
        {/* <div className="mt-2 h-[1px] w-52 bg-white/20"></div> */}
      </div>
    </div>
  )
}
