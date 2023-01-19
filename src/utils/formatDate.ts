export function formatingDate(date: string | undefined) {
  if (date === undefined) {
    return
  }
  return date.slice(0, 10).split('-').join('.')
}
