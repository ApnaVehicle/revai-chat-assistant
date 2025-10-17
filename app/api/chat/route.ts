import { openai } from '@ai-sdk/openai'
import { streamText, convertToModelMessages } from 'ai'
import { findMatchingQuestion } from '@/lib/predefined-questions'
import { formatResponse } from '@/lib/response-formatter'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Parse request body
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      console.error('[API] Invalid request: messages not found or not an array')
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get the latest user message
    const latestMessage = messages[messages.length - 1]

    // Extract text from message (supports both parts and content formats)
    const userText = latestMessage?.parts?.[0]?.text || latestMessage?.content || ''

    console.log('[API] Request received:', {
      messageCount: messages.length,
      userMessage: userText.substring(0, 100)
    })

    // Check if this matches a predefined question
    const matchedQuestion = findMatchingQuestion(userText)

    if (matchedQuestion) {
      console.log('[API] ✅ Matched predefined question:', {
        id: matchedQuestion.id,
        question: matchedQuestion.question
      })

      // Format the predefined response with dynamic dates
      const formattedResponse = formatResponse(matchedQuestion.response)

      console.log('[API] Formatted response:', {
        textLength: formattedResponse.text.length,
        hasChart: formattedResponse.hasChart,
        chartType: formattedResponse.chartData?.type
      })

      // Add chart data as HTML comment if present
      let fullResponse = formattedResponse.text
      if (formattedResponse.hasChart) {
        fullResponse += `\n\n<!--CHART_DATA:${JSON.stringify(formattedResponse.chartData)}-->`
      }

      // GUARANTEED SOLUTION: Use streamText with predefined response
      // OpenAI will echo it back with proper streaming format
      const result = streamText({
        model: openai('gpt-4o-mini'),
        prompt: `Return exactly this text without any modifications, additions, or formatting changes:\n\n${fullResponse}`,
        temperature: 0,
      })

      console.log('[API] 📤 Streaming predefined response...')
      return result.toUIMessageStreamResponse()
    }

    console.log('[API] No match found - using OpenAI for regular chat')

    // Convert UIMessages to ModelMessages for streamText
    const modelMessages = convertToModelMessages(messages)

    // REGULAR CHAT: Use full conversation history with OpenAI
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: modelMessages,
      system: `You are Rev-AI Clarity, an intelligent revenue management assistant created by CARGAIN that transforms complex data into simple, actionable answers. Your expertise includes:

- Revenue optimization strategies and pricing analysis
- Market trends and competitive intelligence
- Financial forecasting and performance metrics
- Data-driven recommendations for maximizing profitability
- Best practices in revenue management across industries

You provide clear, actionable insights with a professional yet approachable tone. You excel at taking complex revenue data and presenting it in a simple, easy-to-understand way. You support users in making informed decisions about pricing, inventory, and revenue strategies. Always be concise, data-focused, and solution-oriented.`,
    })

    console.log('[API] 📤 Streaming OpenAI response...')
    return result.toUIMessageStreamResponse()

  } catch (error) {
    console.error('[API] ❌ Error processing request:', error)

    // Return proper error response
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    const errorDetails = error instanceof Error ? error.stack : String(error)

    return new Response(JSON.stringify({
      error: errorMessage,
      details: errorDetails
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
