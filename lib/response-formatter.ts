// Response Formatter for Rev-AI Clarity Demo
// Formats responses with proper placeholders, icons, and rich content

import { ResponseData, ChartData } from './predefined-questions'
import { getDateContext } from './date-intelligence'

/**
 * Process placeholders in response content
 */
export function processPlaceholders(content: string, placeholders?: Record<string, string>): string {
  if (!placeholders) return content

  let processedContent = content
  const dateContext = getDateContext()

  // Replace dynamic placeholders with actual values
  Object.entries(placeholders).forEach(([key, value]) => {
    if (value === 'dynamic' && dateContext[key]) {
      // Replace with actual date value
      processedContent = processedContent.replace(
        new RegExp(`{{${key}}}`, 'g'),
        dateContext[key]
      )
    } else if (value !== 'dynamic') {
      // Replace with static value
      processedContent = processedContent.replace(
        new RegExp(`{{${key}}}`, 'g'),
        value
      )
    }
  })

  return processedContent
}

/**
 * Format response for display in chat
 */
export function formatResponse(response: ResponseData): {
  text: string
  chartData?: ChartData
  hasChart: boolean
  icon?: string
} {
  // Process placeholders in content
  const processedContent = processPlaceholders(response.content, response.placeholders)

  return {
    text: processedContent,
    chartData: response.chartData,
    hasChart: response.type === 'chart' || response.type === 'mixed'
  }
}

/**
 * Generate chart data for bar chart
 */
export function generateBarChartData(baseData: any[]): any[] {
  // Add any dynamic elements if needed
  // For demo purposes, we'll use the static data from predefined questions
  return baseData.map(item => ({
    ...item,
    // Could add dynamic values here based on date/time
    color: item.color || '#4A5FE8'
  }))
}

/**
 * Generate chart data for pie chart
 */
export function generatePieChartData(baseData: any[]): any[] {
  // Calculate percentages if not provided
  const total = baseData.reduce((sum, item) => sum + item.value, 0)

  return baseData.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
    label: `${item.name}: ${((item.value / total) * 100).toFixed(1)}%`
  }))
}

/**
 * Add typing delay for realistic feel
 */
export async function simulateTypingDelay(responseLength: number): Promise<void> {
  // Calculate delay based on response length
  // Shorter responses: 500-800ms
  // Longer responses: 800-1500ms
  const baseDelay = 500
  const variableDelay = Math.min(responseLength * 2, 1000)
  const totalDelay = baseDelay + Math.random() * variableDelay

  return new Promise(resolve => setTimeout(resolve, totalDelay))
}

/**
 * Format message with markdown enhancements
 */
export function enhanceMarkdown(text: string): string {
  // The response already contains markdown formatting
  // We just need to ensure it renders properly

  // Add line breaks for better readability where needed
  let enhanced = text

  // Ensure bullet points have proper spacing
  enhanced = enhanced.replace(/•/g, '\n•')
  enhanced = enhanced.replace(/○/g, '\n  ○')

  // Remove any double line breaks that might have been created
  enhanced = enhanced.replace(/\n\n\n+/g, '\n\n')

  // Trim any leading/trailing whitespace
  enhanced = enhanced.trim()

  return enhanced
}

/**
 * Check if user message matches a predefined question
 */
export function isQuestionMatch(userMessage: string, questionText: string, variations: string[]): boolean {
  const normalizedUser = userMessage.toLowerCase().trim()
  const normalizedQuestion = questionText.toLowerCase()

  // Exact match
  if (normalizedUser === normalizedQuestion) {
    return true
  }

  // Check variations with fuzzy matching
  for (const variation of variations) {
    const normalizedVariation = variation.toLowerCase()

    // Check if user message contains the variation
    if (normalizedUser.includes(normalizedVariation)) {
      return true
    }

    // Check if variation contains user message (for partial matches)
    if (normalizedVariation.includes(normalizedUser) && normalizedUser.length > 5) {
      return true
    }

    // Calculate similarity for close matches
    if (calculateSimilarity(normalizedUser, normalizedVariation) > 0.8) {
      return true
    }
  }

  // Check main question with similarity
  if (calculateSimilarity(normalizedUser, normalizedQuestion) > 0.8) {
    return true
  }

  return false
}

/**
 * Calculate string similarity (Levenshtein distance based)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) {
    return 1.0
  }

  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

/**
 * Generate a slight variation in response to make it feel less robotic
 */
export function addResponseVariation(text: string): string {
  // For demo purposes, we'll keep responses consistent
  // In a production system, you might add slight variations

  // Add occasional greeting variations
  const greetings = ['Okay', 'Alright', 'Sure', 'Got it']
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

  // Only replace if the text starts with a greeting
  if (text.startsWith('Okay')) {
    // Keep "Okay" for consistency in demo
    // text = text.replace('Okay', randomGreeting)
  }

  return text
}

/**
 * Format chart configuration for rendering
 */
export function formatChartConfig(chartData: ChartData): any {
  if (chartData.type === 'bar') {
    return {
      type: 'bar',
      data: generateBarChartData(chartData.data),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: chartData.config?.title || 'Chart',
            font: {
              size: 14,
              weight: 600
            },
            color: '#1A1D2E'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: chartData.config?.xAxis || 'X Axis'
            }
          },
          y: {
            title: {
              display: true,
              text: chartData.config?.yAxis || 'Y Axis'
            },
            beginAtZero: true
          }
        }
      }
    }
  } else if (chartData.type === 'pie') {
    return {
      type: 'pie',
      data: generatePieChartData(chartData.data),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: chartData.config?.showLegend !== false,
            position: 'right'
          },
          title: {
            display: true,
            text: chartData.config?.title || 'Chart',
            font: {
              size: 14,
              weight: 600
            },
            color: '#1A1D2E'
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const label = context.label || ''
                const value = context.parsed || 0
                return `${label}: ${value}%`
              }
            }
          }
        }
      }
    }
  }

  return null
}