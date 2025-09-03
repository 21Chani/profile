import { BiLogoGoLang, BiLogoMongodb, BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi"
import { DiMysql, DiRedis } from "react-icons/di"
import { FaApple, FaHtml5, FaJava } from "react-icons/fa"
import { GrArchlinux, GrFedora, GrJs, GrUbuntu, GrWindows } from "react-icons/gr"
import { TbBrandCSharp, TbBrandCpp } from "react-icons/tb"
import type { AsciiStats } from "../types"

export const PROGRAMMING_LANGUAGE_STATS = [
  { name: "Javascript", skill: 5, time: 5, icon: GrJs, src: "/assets/lang/js.png" },
  { name: "HTML", skill: 5, time: 5, icon: FaHtml5, src: "/assets/lang/html.png" },
  { name: "Typescript", skill: 5, time: 5, icon: BiLogoTypescript, src: "/assets/lang/ts.png" },
  { name: "Golang", skill: 3, time: 3, icon: BiLogoGoLang, src: "/assets/lang/golang.png" },
  { name: "C#", skill: 3, time: 1, icon: TbBrandCSharp, src: "/assets/lang/csharp.png" },
  { name: "Cpp", skill: 2, time: 1, icon: TbBrandCpp, src: "/assets/lang/cpp.png" },
  { name: "Java", skill: 4, time: 3, icon: FaJava, src: "/assets/lang/java.png" },
] satisfies Array<AsciiStats>

export const OPERATING_SYSTEM_STATS = [
  { name: "Arch Linux", skill: 5, time: 5, icon: GrArchlinux, src: "/assets/os/arch.png" },
  { name: "Ubuntu", skill: 5, time: 4, icon: GrUbuntu, src: "/assets/os/ubuntu.png" },
  { name: "Windows", skill: 3, time: 2, icon: GrWindows, src: "/assets/os/windows.png" },
  { name: "Fedora", skill: 3, time: 2, icon: GrFedora, src: "/assets/os/fedora.png" },
  { name: "Macos", skill: 5, time: 5, icon: FaApple, src: "/assets/os/macos.png" },
] satisfies Array<AsciiStats>

export const DATABASE_STATS = [
  { name: "Postgres", skill: 5, time: 5, icon: BiLogoPostgresql, src: "/assets/database/psql.png" },
  { name: "Redis", skill: 5, time: 4, icon: DiRedis, src: "/assets/database/redis.png" },
  { name: "MongoDB", skill: 3, time: 3, icon: BiLogoMongodb, src: "/assets/database/mongodb.png" },
  { name: "MySQL", skill: 4, time: 3, icon: DiMysql, src: "/assets/database/mysql.png" },
] satisfies Array<AsciiStats>
