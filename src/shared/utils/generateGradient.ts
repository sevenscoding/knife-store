export function generateGradient(seed: number): string {
  const a = (seed * 9301 + 49297) % 233280
  const b = (seed * 49297 + 9301) % 233280

  const hue1 = Math.floor((a / 233280) * 360)
  const hue2 = Math.floor((b / 233280) * 360)

  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`
}
