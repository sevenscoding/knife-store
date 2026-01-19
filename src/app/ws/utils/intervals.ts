export const clearSafe = (id: number | null) => {
  if (id !== null) clearInterval(id)
}
