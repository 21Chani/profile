import { FC, SVGProps } from 'react'

export interface SocialmediaBtnProps {
  icon: FC<SVGProps<SVGSVGElement>>
  href: string
}
export function SocialMediaBtn({ icon: SvgElement, href }: SocialmediaBtnProps) {
  return (
    <a href={href} className="flex items-center group text-gray-100 hover:text-white">
      <SvgElement className="w-8 h-8 fill-gray-100 transition-all hover:-translate-y-1 " />
    </a>
  )
}
