export const TAGS = ['knife', 'limited', 'urban', 'new', 'popular', 'rare', 'cold'] as const

export const TAG_COLORS: Record<string, string> = {
  limited: 'bg-purple-100 text-purple-700',
  rare: 'bg-red-100 text-red-700',
  popular: 'bg-green-100 text-green-700',
  new: 'bg-blue-100 text-blue-700',
  urban: 'bg-slate-100 text-slate-700',
  cold: 'bg-cyan-100 text-cyan-700',
  knife: 'bg-orange-100 text-orange-700'
}