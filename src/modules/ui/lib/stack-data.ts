export interface StackFile {
  icon: string
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
      { icon: "⚛", name: "react", ext: ".tsx", proficiency: 5 },
      { icon: "▲", name: "next", ext: ".config.ts", proficiency: 4 },
      { icon: "◇", name: "typescript", ext: ".lang.ts", proficiency: 5 },
      { icon: "◈", name: "tailwind", ext: ".config.ts", proficiency: 4 },
      { icon: "⊡", name: "tanstack", ext: ".query.ts", proficiency: 4 },
      { icon: "⚡", name: "vite", ext: ".config.ts", proficiency: 4 },
      { icon: "◧", name: "shadcn", ext: ".ui.tsx", proficiency: 3 },
      { icon: "⬡", name: "zod", ext: ".schema.ts", proficiency: 3 },
      { icon: "◉", name: "jotai", ext: ".store.ts", proficiency: 4 },
    ],
  },
  {
    path: "chani@dev: ~/stacks/languages",
    files: [
      { icon: "◇", name: "typescript", ext: ".ts", proficiency: 5 },
      { icon: "◆", name: "javascript", ext: ".js", proficiency: 4 },
      { icon: "◈", name: "css", ext: ".module.css", proficiency: 4 },
      { icon: "◁", name: "html", ext: ".template.html", proficiency: 4 },
      { icon: "⬡", name: "solidity", ext: ".sol", proficiency: 3 },
      { icon: "⊞", name: "golang", ext: ".go", proficiency: 2 },
    ],
  },
  {
    path: "chani@dev: ~/stacks/web3",
    files: [
      { icon: "◎", name: "viem", ext: ".client.ts", proficiency: 4 },
      { icon: "⊙", name: "wagmi", ext: ".hooks.ts", proficiency: 4 },
      { icon: "⬡", name: "ethers", ext: ".provider.ts", proficiency: 4 },
      { icon: "◈", name: "solana-web3", ext: ".connection.ts", proficiency: 4 },
      { icon: "▣", name: "metaplex", ext: ".nft.ts", proficiency: 3 },
      { icon: "⚓", name: "anchor", ext: ".program.rs", proficiency: 3 },
    ],
  },
  {
    path: "chani@dev: ~/stacks/backend",
    files: [
      { icon: "⇌", name: "trpc", ext: ".router.ts", proficiency: 4 },
      { icon: "◫", name: "prisma", ext: ".schema", proficiency: 4 },
      { icon: "⊟", name: "postgresql", ext: ".sql", proficiency: 3 },
      { icon: "◉", name: "mongodb", ext: ".aggregate.ts", proficiency: 3 },
      { icon: "▦", name: "docker", ext: "-compose.yml", proficiency: 3 },
      { icon: "⇄", name: "websocket", ext: ".gateway.ts", proficiency: 4 },
    ],
  },
]
