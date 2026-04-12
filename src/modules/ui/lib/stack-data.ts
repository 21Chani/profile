import type { ComponentType, SVGProps } from "react"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiReactquery,
  SiVite,
  SiShadcnui,
  SiZod,
  SiJavascript,
  SiCss,
  SiHtml5,
  SiSolidity,
  SiGo,
  SiEthereum,
  SiWagmi,
  SiEthers,
  SiSolana,
  SiTrpc,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiSocketdotio,
} from "@icons-pack/react-simple-icons"
import { JotaiIcon, MetaplexIcon, AnchorIcon } from "./stack-icons"

export type StackIcon = ComponentType<SVGProps<SVGSVGElement>>

export interface StackFile {
  icon: StackIcon
  name: string
  ext: string
  proficiency: number // 1-5
}

export interface StackCategory {
  path: string
  files: StackFile[]
}

export const STACK_DATA: StackCategory[] = [
  {
    path: "chani@dev: ~/stacks/frontend",
    files: [
      { icon: SiReact, name: "react", ext: ".tsx", proficiency: 5 },
      { icon: SiNextdotjs, name: "next", ext: ".config.ts", proficiency: 4 },
      { icon: SiTypescript, name: "typescript", ext: ".lang.ts", proficiency: 5 },
      { icon: SiTailwindcss, name: "tailwind", ext: ".config.ts", proficiency: 4 },
      { icon: SiReactquery, name: "tanstack", ext: ".query.ts", proficiency: 4 },
      { icon: SiVite, name: "vite", ext: ".config.ts", proficiency: 4 },
      { icon: SiShadcnui, name: "shadcn", ext: ".ui.tsx", proficiency: 3 },
      { icon: SiZod, name: "zod", ext: ".schema.ts", proficiency: 3 },
      { icon: JotaiIcon, name: "jotai", ext: ".store.ts", proficiency: 4 },
    ],
  },
  {
    path: "chani@dev: ~/stacks/languages",
    files: [
      { icon: SiTypescript, name: "typescript", ext: ".ts", proficiency: 5 },
      { icon: SiJavascript, name: "javascript", ext: ".js", proficiency: 4 },
      { icon: SiCss, name: "css", ext: ".module.css", proficiency: 4 },
      { icon: SiHtml5, name: "html", ext: ".template.html", proficiency: 4 },
      { icon: SiSolidity, name: "solidity", ext: ".sol", proficiency: 3 },
      { icon: SiGo, name: "golang", ext: ".go", proficiency: 2 },
    ],
  },
  {
    path: "chani@dev: ~/stacks/web3",
    files: [
      { icon: SiEthereum, name: "viem", ext: ".client.ts", proficiency: 4 },
      { icon: SiWagmi, name: "wagmi", ext: ".hooks.ts", proficiency: 4 },
      { icon: SiEthers, name: "ethers", ext: ".provider.ts", proficiency: 4 },
      { icon: SiSolana, name: "solana-web3", ext: ".connection.ts", proficiency: 4 },
      { icon: MetaplexIcon, name: "metaplex", ext: ".nft.ts", proficiency: 3 },
      { icon: AnchorIcon, name: "anchor", ext: ".program.rs", proficiency: 3 },
    ],
  },
  {
    path: "chani@dev: ~/stacks/backend",
    files: [
      { icon: SiTrpc, name: "trpc", ext: ".router.ts", proficiency: 4 },
      { icon: SiPrisma, name: "prisma", ext: ".schema", proficiency: 4 },
      { icon: SiPostgresql, name: "postgresql", ext: ".sql", proficiency: 3 },
      { icon: SiMongodb, name: "mongodb", ext: ".aggregate.ts", proficiency: 3 },
      { icon: SiDocker, name: "docker", ext: "-compose.yml", proficiency: 3 },
      { icon: SiSocketdotio, name: "websocket", ext: ".gateway.ts", proficiency: 4 },
    ],
  },
]
