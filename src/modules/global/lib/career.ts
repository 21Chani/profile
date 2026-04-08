export const CAREER_START = new Date("2019-03-03")

export function getYearsOfExperience(): number {
  const now = new Date()
  let years = now.getFullYear() - CAREER_START.getFullYear()
  const monthDiff = now.getMonth() - CAREER_START.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < CAREER_START.getDate())) {
    years--
  }
  return years
}
