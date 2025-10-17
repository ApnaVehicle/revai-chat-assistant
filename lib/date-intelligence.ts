// Date Intelligence Module for Smart Contextual Responses
// Handles dynamic date calculations for demo responses

/**
 * Format date in the PDF style: "October 17, 2025"
 */
function formatDate(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

/**
 * Format date with ordinal suffix: "October 17th, 2025"
 */
function formatDateWithOrdinal(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  // Add ordinal suffix
  const suffix = getOrdinalSuffix(day)

  return `${month} ${day}${suffix}, ${year}`
}

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, 4th, etc.)
 */
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

/**
 * Get month name from date
 */
function getMonthName(date: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[date.getMonth()]
}

/**
 * Get month and year: "October 2025"
 */
function getMonthYear(date: Date): string {
  return `${getMonthName(date)} ${date.getFullYear()}`
}

// Main exported functions

/**
 * Get tomorrow's date formatted
 */
export function getTomorrow(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDate(tomorrow)
}

/**
 * Get tomorrow's date with ordinal
 */
export function getTomorrowWithOrdinal(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDateWithOrdinal(tomorrow)
}

/**
 * Get date for N days from now
 */
export function getDateInDays(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return formatDate(date)
}

/**
 * Get last N days date range
 */
export function getLastNDays(n: number): { start: string; end: string } {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - n)

  return {
    start: formatDate(start),
    end: formatDate(end)
  }
}

/**
 * Get next Sunday's date
 */
export function getNextSunday(): string {
  const date = new Date()
  const dayOfWeek = date.getDay()
  const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek
  date.setDate(date.getDate() + daysUntilSunday)
  return formatDate(date)
}

/**
 * Get next Sunday's date with "October 19, 2025" format
 */
export function getNextSundayFormatted(): string {
  const date = new Date()
  const dayOfWeek = date.getDay()
  const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek
  date.setDate(date.getDate() + daysUntilSunday)
  return formatDate(date)
}

/**
 * Get last month name and year: "September 2025"
 */
export function getLastMonth(): string {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return getMonthYear(date)
}

/**
 * Get current month name and year: "October 2025"
 */
export function getCurrentMonth(): string {
  return getMonthYear(new Date())
}

/**
 * Get last month short name: "September"
 */
export function getLastMonthShort(): string {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return getMonthName(date)
}

/**
 * Get current month short name: "October"
 */
export function getCurrentMonthShort(): string {
  return getMonthName(new Date())
}

/**
 * Get next 7 days for chart data
 */
export function getNext7Days(): string[] {
  const days: string[] = []
  for (let i = 1; i <= 7; i++) {
    days.push(getDateInDays(i))
  }
  return days
}

/**
 * Get next 15 days for forecast
 */
export function getNext15Days(): string[] {
  const days: string[] = []
  for (let i = 1; i <= 15; i++) {
    days.push(getDateInDays(i))
  }
  return days
}

/**
 * Get today's date formatted
 */
export function getToday(): string {
  return formatDate(new Date())
}

/**
 * Get today's date with ordinal
 */
export function getTodayWithOrdinal(): string {
  return formatDateWithOrdinal(new Date())
}

/**
 * Check if we're in October (for pace of 763)
 * This ensures demo consistency
 */
export function isOctober(): boolean {
  return new Date().getMonth() === 9 // October is month 9 (0-indexed)
}

/**
 * Get appropriate pace value based on current month
 * Maintains demo consistency across different times of year
 */
export function getDemoPace(): number {
  // Always return 763 for demo consistency
  // In a real system, this would vary by actual date
  return 763
}

/**
 * Get day of week name
 */
export function getDayName(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}

/**
 * Get tomorrow's day name (e.g., "Friday")
 */
export function getTomorrowDayName(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return getDayName(tomorrow)
}

/**
 * Calculate booking dates for demo
 * Returns realistic booking numbers
 */
export function getBookingNumbers(): {
  current: number
  predicted: number
  lastYear: number
} {
  // For demo purposes, return consistent numbers
  // In production, these would be calculated from actual data
  const dayOfWeek = new Date().getDay()

  // Vary slightly based on day of week for realism
  const baseBooking = 700
  const variance = dayOfWeek * 15

  return {
    current: 845,
    predicted: 736,
    lastYear: baseBooking + variance
  }
}

/**
 * Generate date context for placeholders
 */
export function getDateContext(): Record<string, string> {
  return {
    'TOMORROW_DATE': getTomorrow(),
    'TOMORROW_DATE_ORDINAL': getTomorrowWithOrdinal(),
    'NEXT_SUNDAY_DATE': getNextSundayFormatted(),
    'LAST_MONTH': getLastMonth(),
    'CURRENT_MONTH': getCurrentMonth(),
    'LAST_MONTH_SHORT': getLastMonthShort(),
    'CURRENT_MONTH_SHORT': getCurrentMonthShort(),
    'TODAY': getToday(),
    'TODAY_ORDINAL': getTodayWithOrdinal(),
    'TOMORROW_DAY': getTomorrowDayName()
  }
}