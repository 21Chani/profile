import { Card } from "@/modules/global/components/Card"
import { ItemInfo } from "@/modules/global/components/ItemInfo"

export function ProfileCard() {
  return (
    <div className="max-md:w-full">
      <Card className=" bg-gradient-to-br from-background-alt/20 from-30% border border-border-primary to-black aspect-video w-[550px] justify-center rounded-none shadow-[6px_6px_0px_0px_#666] max-md:w-full  ">
        <img
          className=" mx-auto absolute bottom-0 w-[90%] object-contain "
          alt="Picture of the author"
          src={"/assets/profile.png"}
        />

        {/* Plus Signes */}
        <span className="absolute right-4 top-2 font-jetbrains text-3xl text-gray-400">+</span>
        <span className="absolute right-7 top-1.5 font-jetbrains text-xl text-gray-400">+</span>
        <div className="absolute right-2 top-20 flex flex-col gap-2">
          <span className=" h-12 w-1 bg-gradient-to-b to-gray-400 from-gray-900 font-jetbrains text-3xl"></span>
          <span className=" h-12 w-1 bg-gradient-to-b to-gray-200 from-gray-400 font-jetbrains text-3xl"></span>
          <span className=" h-12 w-1 bg-gradient-to-b to-gray-200 from-gray-400 font-jetbrains text-3xl"></span>
        </div>
        <div className="absolute left-2 top-8 flex flex-col gap-1 ">
          <ItemInfo>
            <span>AKA CHANI</span>
          </ItemInfo>
          <ItemInfo>
            <span>20 YEARS</span>
          </ItemInfo>
          <ItemInfo>
            <span>LOADING...</span>
          </ItemInfo>
        </div>
      </Card>
    </div>
  )
}
