// Predefined Questions and Answers for Rev-AI Clarity Demo
// Based on the PDF requirements with exact formatting

export type QuestionCategory = 'demand' | 'pricing' | 'forecast' | 'competitor' | 'analytics'

export interface ChartData {
  type: 'bar' | 'pie'
  data: any[]
  config?: any
}

export interface ResponseData {
  type: 'text' | 'chart' | 'mixed'
  content: string
  chartData?: ChartData
  highlights?: string[]
  placeholders?: Record<string, string>
}

export interface PredefinedQuestion {
  id: string
  category: QuestionCategory
  iconName: string // Lucide icon name for monochrome display
  question: string
  shortLabel: string
  variations: string[]
  priority: number // For ordering in UI
  response: ResponseData
}

export const predefinedQuestions: PredefinedQuestion[] = [
  // Question 1: Tell me the demand for tomorrow
  {
    id: 'q1-demand-tomorrow',
    category: 'demand',
    iconName: 'TrendingUp',
    question: 'Tell me the demand for tomorrow',
    shortLabel: "Tomorrow's demand",
    variations: [
      "What's the demand for tomorrow",
      "Show tomorrow's demand",
      "Demand forecast for tomorrow",
      "What's tomorrow's demand"
    ],
    priority: 1,
    response: {
      type: 'text',
      content: `Okay, I understand!

Regarding the demand for tomorrow ({{TOMORROW_DATE}}), we're showing a Pace of 763. This indicates a potentially high level of activity or interest for rentals on that day.`,
      placeholders: {
        'TOMORROW_DATE': 'dynamic' // Will be replaced with actual date
      }
    }
  },

  // Question 2: Tell me the carclasscode with highest pace in last 10 days
  {
    id: 'q2-highest-pace',
    category: 'analytics',
    iconName: 'Car',
    question: 'Tell me the carclasscode with highest pace in last 10 days',
    shortLabel: 'Highest pace car class',
    variations: [
      'Which car class has highest pace',
      'Top performing car class',
      'Best car class by pace',
      'Highest pace carclass last 10 days'
    ],
    priority: 2,
    response: {
      type: 'text',
      content: `Okay, I can help with that!

Here's the summary of the car class code with the highest pace in the last 10 days:

Car class code "F" has the highest pace with a value of 2874.`,
      placeholders: {}
    }
  },

  // Question 3: Compare the forecast of last month and current month
  {
    id: 'q3-compare-forecast',
    category: 'forecast',
    iconName: 'LineChart',
    question: 'Compare the forecast of last month and current month',
    shortLabel: 'Compare monthly forecasts',
    variations: [
      'Compare last month and this month',
      'Monthly forecast comparison',
      'Last vs current month forecast',
      'Show forecast comparison'
    ],
    priority: 3,
    response: {
      type: 'text',
      content: `Okay, let's compare the pace from last month ({{LAST_MONTH}}) to the current month ({{CURRENT_MONTH}}).

**Summary:**

The pace was generally higher in {{LAST_MONTH_SHORT}} compared to {{CURRENT_MONTH_SHORT}}.

**Key Insights:**

• In {{LAST_MONTH_SHORT}}, the pace started strong, generally staying above 1100, and even peaking above 1400 in the first half of the month.
• However, in {{CURRENT_MONTH_SHORT}}, the pace has been noticeably lower, mostly fluctuating between 600 and 1000.

In short, {{LAST_MONTH_SHORT}} had a stronger pace overall than what we're seeing so far in {{CURRENT_MONTH_SHORT}}.`,
      placeholders: {
        'LAST_MONTH': 'dynamic', // e.g., "September 2025"
        'CURRENT_MONTH': 'dynamic', // e.g., "October 2025"
        'LAST_MONTH_SHORT': 'dynamic', // e.g., "September"
        'CURRENT_MONTH_SHORT': 'dynamic' // e.g., "October"
      }
    }
  },

  // Question 4: Plot a bar chart showing Total On Rent by Pickup Location for the next 7 OnRent dates
  {
    id: 'q4-bar-chart',
    category: 'analytics',
    iconName: 'BarChart3',
    question: 'Plot a bar chart showing Total On Rent by Pickup Location for the next 7 OnRent dates',
    shortLabel: 'On Rent by Location chart',
    variations: [
      'Show on rent by location',
      'Bar chart total on rent',
      'Pickup location chart',
      'On rent visualization'
    ],
    priority: 4,
    response: {
      type: 'mixed',
      content: `Here is your required graph

📊 **Total On Rent by Location (Next 7 Days)**`,
      chartData: {
        type: 'bar',
        data: [
          { location: 'YYC', value: 7800, label: 'YYC' },
          { location: 'YYT', value: 450, label: 'YYT' },
          { location: 'YRA', value: 320, label: 'YRA' },
          { location: 'GYM', value: 280, label: 'GYM' }
        ],
        config: {
          title: 'Total On Rent by Location (Next 7 Days)',
          xAxis: 'Pickup Location',
          yAxis: 'Total On Rent',
          color: '#4A5FE8'
        }
      }
    }
  },

  // Question 5: Plot a pie chart of top 5 carclass code with highest forecasted bookings
  {
    id: 'q5-pie-chart',
    category: 'analytics',
    iconName: 'PieChart',
    question: 'Plot a pie chart of top 5 carclass code with highest forecasted bookings',
    shortLabel: 'Top 5 car classes chart',
    variations: [
      'Show top car classes',
      'Pie chart car classes',
      'Best performing car classes',
      'Top 5 carclass bookings'
    ],
    priority: 5,
    response: {
      type: 'mixed',
      content: `**Pace Share by Top 5 Car Classes (Next 15 Days)**`,
      chartData: {
        type: 'pie',
        data: [
          { name: 'E', value: 58, color: '#4A5FE8' },
          { name: 'C', value: 20.6, color: '#6B7FF0' },
          { name: 'F', value: 12.1, color: '#8A9BF5' },
          { name: 'D', value: 7.9, color: '#AAB7FA' },
          { name: 'B', value: 1.81, color: '#CAD3FF' }
        ],
        config: {
          title: 'Pace Share by Top 5 Car Classes (Next 15 Days)',
          showPercentage: true,
          showLegend: true
        }
      }
    }
  },

  // Question 6: Tell me the carclasscode having highest subscriber price
  {
    id: 'q6-subscriber-price',
    category: 'pricing',
    iconName: 'DollarSign',
    question: 'Tell me the carclasscode having highest subscriber price',
    shortLabel: 'Highest subscriber price',
    variations: [
      'Which car class has highest price',
      'Most expensive car class',
      'Top priced car class',
      'Highest subscriber rate'
    ],
    priority: 6,
    response: {
      type: 'text',
      content: `The car class code with the highest subscriber price is "V".`,
      placeholders: {}
    }
  },

  // Question 7: Tell me the top 5 competitors for pickuplocation code YY3
  {
    id: 'q7-competitors',
    category: 'competitor',
    iconName: 'Users',
    question: 'Tell me the top 5 competitors for pickuplocation code YY3',
    shortLabel: 'YY3 competitors',
    variations: [
      'Show competitors for YY3',
      'YY3 competition analysis',
      'Top competitors YY3',
      'Who competes at YY3'
    ],
    priority: 7,
    response: {
      type: 'text',
      content: `The top 5 competitors for pickup location code YY3 are: ZD, AL, ET, ZL, and ZI, with ZD being the most prominent.`,
      placeholders: {}
    }
  },

  // Question 8: For PickupLocationCode 'YYC', what is the average recommended rate?
  {
    id: 'q8-avg-rate',
    category: 'pricing',
    iconName: 'CreditCard',
    question: "For PickupLocationCode 'YYC', what is the average recommended rate?",
    shortLabel: 'YYC average rate',
    variations: [
      'Average rate for YYC',
      'YYC recommended rate',
      'What is YYC rate',
      'YYC pricing'
    ],
    priority: 8,
    response: {
      type: 'text',
      content: `The average recommended rate for pickup location code YYC is $380.58.`,
      placeholders: {}
    }
  },

  // Question 9: Explain me the forecast for tomorrow
  {
    id: 'q9-forecast-tomorrow',
    category: 'forecast',
    iconName: 'LineChart',
    question: 'Explain me the forecast for tomorrow',
    shortLabel: 'Tomorrow forecast explained',
    variations: [
      "Tomorrow's forecast explanation",
      'Explain forecast for tomorrow',
      'Detailed tomorrow forecast',
      'Break down tomorrow forecast'
    ],
    priority: 9,
    response: {
      type: 'text',
      content: `Okay, let's break down how we're predicting the final number of bookings for Friday, {{TOMORROW_DATE}}.

**The Big Picture:**

Our prediction of 736 final bookings is based on a combination of what we've seen in the past and what's happening right now. Think of it like this: we're looking at historical trends and then adjusting them based on the current booking pace.

**How the Model Works:**

The model looks at two main categories of information:

• **Historical Data (10% influence):**
  ○ **Historical Booking Pattern:** This looks at how bookings typically ramp up in the days and weeks leading to a rental date. In this case, it's reducing the prediction slightly (-11.3%). This suggests that historically, bookings on the rental day itself (0 days lead time) tend to be lower than the average booking pattern.
  ○ **Day of Week Pattern (Friday):** This considers that some days of the week are simply more popular for rentals than others. Friday bookings are slightly higher than average (+1.2%).
  ○ **Year Seasonality:** This accounts for the time of year. October bookings are generally higher than average (+20.1%). This is likely due to fall travel, holidays, or other seasonal factors.

• **Current Data (90% influence):**
  ○ **Current Booking Pattern:** This is the most important factor (+87.8%). It looks at how bookings are trending right now compared to historical averages. If bookings are coming in faster than usual, this will push the prediction higher.
  ○ **Cumulative Bookings:** The fact that we already have 845 bookings is also considered (+2.3%). This is a good indicator of where we're heading, but the model also knows that some bookings might cancel or change.

**In Summary:**

The model is saying:

"Okay, it's October, so we expect more bookings than average. It's also a Friday, which is a popular rental day. However, bookings on the rental day itself tend to be lower than the average booking pattern. But, the current booking pace is very strong, so we're adjusting our prediction upwards significantly. We already have 845 bookings, which is a good sign, but we're still factoring in potential cancellations or changes."

**Last Year's Booking Pattern & Seasonality Insights:**

• **Last Year's Bookings (705):** This is a good benchmark. The model is predicting slightly more bookings this year (736), likely because the current booking pace is stronger.
• **Booking Seasonality:** We know that October is a popular rental month. This could be due to fall foliage trips, school breaks, or other seasonal events. Understanding why October is popular can help us better predict future demand and optimize our fleet.

**Key Takeaways:**

• The current booking pace is the biggest driver of the prediction.
• October is a strong month for rentals.
• While we're ahead of last year's pace, the model is factoring in historical trends and potential cancellations.

By understanding these factors, we can make informed decisions about fleet management, pricing, and staffing to maximize our revenue and customer satisfaction.`,
      placeholders: {
        'TOMORROW_DATE': 'dynamic' // e.g., "October 17th, 2025"
      },
      highlights: [
        'The model is saying:',
        'In Summary:',
        'Key Takeaways:'
      ]
    }
  },

  // Question 10: Explain me the forecast for next Sunday
  {
    id: 'q10-forecast-sunday',
    category: 'forecast',
    iconName: 'Calendar',
    question: 'Explain me the forecast for next Sunday',
    shortLabel: 'Sunday forecast explained',
    variations: [
      'Next Sunday forecast',
      'Explain Sunday forecast',
      'Sunday prediction',
      'Forecast for Sunday'
    ],
    priority: 10,
    response: {
      type: 'text',
      content: `Okay, here's a breakdown of how the model predicted 633 final bookings for the rental date of Sunday, {{NEXT_SUNDAY_DATE}}, and the key factors involved:

**In a nutshell:** The model is saying that based on how bookings are trending right now (the current booking pace), we're likely to end up with around 633 total bookings. It's heavily influenced by the current booking pattern, but also considers historical trends and the time of year.

Here's a more detailed explanation:

The model looks at two main categories of information: **Historical Data** and **Current Data**.

• **Historical Data (21.6% influence):** This is like looking at past years to see what typically happens around this time. It's broken down into:
  ○ **Year Seasonality (22.7% influence):** This considers the time of year. October is likely a specific season for rentals (e.g., fall foliage trips, school breaks, etc.). The model knows that October 19th typically has a certain level of demand based on previous years.
  ○ **Day of Week Pattern (1.9% influence):** This recognizes that Sundays often have a different booking pattern than weekdays. It knows that Sundays tend to be a popular day for rentals.
  ○ **Historical Booking Pattern (-3.0% influence):** This looks at how bookings typically ramp up in the days leading up to the rental date (with a 2-day lead time). It seems that the historical booking pattern is slightly lower than the current booking pattern.

• **Current Data (78.4% influence):** This is the most important factor. It's like checking the pulse of bookings right now. It's broken down into:
  ○ **Current Booking Pattern (76.8% influence):** This is the most significant factor. It looks at how bookings are coming in today and in the recent past. It's essentially saying, "Based on the current rate of bookings, we're on track for X number of rentals."
  ○ **Cumulative Bookings (1.6% influence):** This is simply the number of bookings we already have (459). While important, it's less influential than the overall booking pattern.

**How the Model Works:**

The model essentially takes all these factors and weighs them according to their influence. It then combines them to arrive at a final prediction.

**Why the Prediction is 633:**

• The model sees that the **current booking pattern** is the strongest indicator. It's likely that the current booking pace is slightly lower than the historical booking pattern.
• The **year seasonality** suggests a certain level of demand for this time of year.
• The **day of the week (Sunday)** adds a slight boost.
• The model then adjusts the prediction based on the **cumulative bookings** we already have.

**Last Year's Booking Pattern:**

The model also knows that last year, on the same day, there were 633 final bookings. This provides a benchmark for comparison.

**Booking Seasonality Insights:**

The model understands that October 19th falls within a specific season. This season might be characterized by:

• Higher demand due to fall foliage tourism.
• Increased family travel due to school breaks.
• Specific events or festivals that attract visitors.

In conclusion: The prediction of 633 final bookings is primarily driven by the current booking pattern, with adjustments based on historical trends, the day of the week, and the time of year. The model is essentially saying, "Based on what we're seeing right now, we expect to end up with around 633 rentals."`,
      placeholders: {
        'NEXT_SUNDAY_DATE': 'dynamic' // e.g., "October 19, 2025"
      },
      highlights: [
        'In a nutshell:',
        'How the Model Works:',
        'Why the Prediction is 633:',
        'In conclusion:'
      ]
    }
  }
]

// Helper function to get question by ID
export function getQuestionById(id: string): PredefinedQuestion | undefined {
  return predefinedQuestions.find(q => q.id === id)
}

// Helper function to find matching question from user input
export function findMatchingQuestion(userInput: string): PredefinedQuestion | undefined {
  const normalizedInput = userInput.toLowerCase().trim()

  return predefinedQuestions.find(q => {
    // Check exact match first
    if (q.question.toLowerCase() === normalizedInput) {
      return true
    }

    // Check if input exactly matches any variation
    return q.variations.some(variation =>
      variation.toLowerCase() === normalizedInput
    )
  })
}

// Get questions by category
export function getQuestionsByCategory(category: QuestionCategory): PredefinedQuestion[] {
  return predefinedQuestions
    .filter(q => q.category === category)
    .sort((a, b) => a.priority - b.priority)
}

// Get top priority questions for initial display
export function getTopQuestions(limit: number = 4): PredefinedQuestion[] {
  return predefinedQuestions
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit)
}

// Get contextual questions based on last asked question or rotation
// Returns ALL 10 questions, but sorted intelligently
export function getContextualQuestions(
  lastAskedQuestionId: string | null,
  responseIndex: number = 0
): PredefinedQuestion[] {
  // Strategy 1: If we have a last question, prioritize same category
  if (lastAskedQuestionId) {
    const lastQuestion = getQuestionById(lastAskedQuestionId)

    if (lastQuestion) {
      // Get questions from same category, excluding the one just asked
      const sameCategoryQuestions = predefinedQuestions
        .filter(q => q.category === lastQuestion.category && q.id !== lastAskedQuestionId)
        .sort((a, b) => a.priority - b.priority)

      // Get questions from other categories
      const otherCategoryQuestions = predefinedQuestions
        .filter(q => q.category !== lastQuestion.category)
        .sort((a, b) => a.priority - b.priority)

      // Return all questions with same category first
      return [...sameCategoryQuestions, ...otherCategoryQuestions]
    }
  }

  // Strategy 2: Rotate through different orderings
  // Shift the array based on response index to show variety
  const rotationOffset = (responseIndex * 3) % predefinedQuestions.length

  return [
    ...predefinedQuestions.slice(rotationOffset),
    ...predefinedQuestions.slice(0, rotationOffset)
  ]
}

// Get questions by multiple categories
export function getQuestionsByCategories(categories: QuestionCategory[]): PredefinedQuestion[] {
  return predefinedQuestions
    .filter(q => categories.includes(q.category))
    .sort((a, b) => a.priority - b.priority)
}