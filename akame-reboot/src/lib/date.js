import { differenceInCalendarDays, format, parseISO } from 'date-fns'

export function daysSince(startDateStr) {
  try {
    const start = parseISO(startDateStr)
    const today = new Date()
    return differenceInCalendarDays(today, start) + 1
  } catch (e) {
    return 0
  }
}

export function todayISO() {
  return format(new Date(), 'yyyy-MM-dd')
}

export function isoToNice(dateStr) {
  try { return format(parseISO(dateStr), 'dd MMM yyyy') } catch { return dateStr }
}