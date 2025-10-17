"use client"

import React, { FormEvent, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Paperclip, Mic, Send, RotateCcw } from "lucide-react"
import { RobotIcon } from "@/components/ui/robot-icon"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"
import { SuggestionChips } from "@/components/ui/suggestion-chips"
import { CompactSuggestionChips } from "@/components/ui/compact-suggestion-chips"
import { EnhancedMessage } from "@/components/ui/enhanced-message"
import { PredefinedQuestion, getContextualQuestions } from "@/lib/predefined-questions"

export function ExpandableChatDemo() {
  const [input, setInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [lastQuestionId, setLastQuestionId] = useState<string | null>(null)
  const [responseCount, setResponseCount] = useState(0)

  const { messages, sendMessage, status, error, setMessages } = useChat({
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: "Hi! I'm Rev-AI Clarity. I turn complex revenue data into simple, actionable insights. I can help you analyze pricing, forecast demand, and optimize your revenue strategy. What would you like to explore?",
          },
        ],
      },
    ],
    onError: (err) => {
      console.error('[Chat] Error occurred:', err)
    },
    onFinish: (result) => {
      console.log('[Chat] Message finished:', result.message?.id)
      // Increment response count for rotating suggestions
      setResponseCount(prev => prev + 1)
    },
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const handleSubmit = (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
    setInput("")
    setShowSuggestions(false) // Hide suggestions after first message
  }

  const handleQuestionSelect = (question: PredefinedQuestion) => {
    // Track which question was asked for contextual suggestions
    setLastQuestionId(question.id)
    // Send the selected question as a message
    sendMessage({ text: question.question })
    setShowSuggestions(false) // Hide suggestions after selection
  }

  const handleAttachFile = () => {
    // Placeholder for file attachment
  }

  const handleMicrophoneClick = () => {
    // Placeholder for voice input
  }

  const handleClearConversation = () => {
    // Reset to initial welcome message
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: "Hi! I'm Rev-AI Clarity. I turn complex revenue data into simple, actionable insights. I can help you analyze pricing, forecast demand, and optimize your revenue strategy. What would you like to explore?",
          },
        ],
      },
    ])
    setShowSuggestions(true) // Show suggestions again on reset
    setLastQuestionId(null) // Reset last question tracking
    setResponseCount(0) // Reset response count
  }

  return (
    <>
      <ExpandableChat
        size="lg"
        position="bottom-right"
        icon={<RobotIcon className="h-6 w-6" />}
      >
        <ExpandableChatHeader
          className="flex items-center gap-3 px-6 py-5 glass-dark text-white border-b-0 relative"
          style={{
            borderTop: '2px solid rgba(74, 95, 232, 0.4)',
          }}
        >
          <div className="w-8 h-8 rounded-full gradient-mesh flex items-center justify-center flex-shrink-0">
            <RobotIcon className="h-4 w-4" />
          </div>
          <div className="flex-1 text-left">
            <h1 className="text-[17px] font-semibold tracking-tight">Rev-AI Clarity</h1>
            <p className="text-xs text-white/60 mt-0.5">
              Complex Data. Simple Answers.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearConversation}
            className="h-8 w-8 rounded-full hover:bg-white/10 transition-colors"
            title="Clear conversation"
          >
            <RotateCcw className="h-4 w-4 text-white/80 hover:text-white" />
          </Button>
        </ExpandableChatHeader>

        <ExpandableChatBody>
          <ChatMessageList>
            {/* Show suggestion chips after welcome message */}
            {showSuggestions && messages.length === 1 && (
              <div className="px-4 py-2">
                <SuggestionChips onQuestionSelect={handleQuestionSelect} />
              </div>
            )}

            {messages.map((message) => {
              // Extract text from parts array (UIMessage format)
              const textContent = message.parts
                ?.filter((part): part is Extract<typeof part, { type: 'text' }> => part.type === 'text')
                ?.map(part => part.text)
                ?.join('') || ''

              const role = message.role as 'user' | 'assistant' | 'system'
              const variant = role === "user" ? "sent" as const : "received" as const

              // Check if message contains chart data
              const chartMatch = textContent.match(/<!--CHART_DATA:([\s\S]*?)-->/)
              let chartData = null
              let cleanText = textContent

              if (chartMatch) {
                try {
                  chartData = JSON.parse(chartMatch[1])
                  cleanText = textContent.replace(/<!--CHART_DATA:[\s\S]*?-->/, '').trim()
                } catch (e) {
                  console.error('Failed to parse chart data:', e)
                }
              }

              return (
                <React.Fragment key={message.id}>
                  <ChatBubble variant={variant}>
                    {variant === "received" && (
                      <ChatBubbleAvatar
                        className="shrink-0"
                        fallback="AI"
                      />
                    )}
                    <ChatBubbleMessage
                      variant={variant}
                    >
                      {variant === "received" && chartData ? (
                        <EnhancedMessage
                          content={cleanText}
                          chartData={chartData.data}
                        />
                      ) : (
                        cleanText
                      )}
                    </ChatBubbleMessage>
                  </ChatBubble>

                  {/* Show compact expandable quick questions after each assistant message (excluding welcome) */}
                  {variant === "received" && message.id !== 'welcome' && (
                    <div className="px-4 pb-2">
                      <CompactSuggestionChips
                        questions={getContextualQuestions(lastQuestionId, responseCount)}
                        onQuestionSelect={handleQuestionSelect}
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            })}

            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar
                  className="shrink-0"
                  fallback="AI"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}

            {/* Error display */}
            {error && (
              <div className="mx-4 my-2 p-4 rounded-lg bg-red-50 border border-red-200 shadow-sm">
                <p className="text-sm font-semibold text-red-800 mb-1">
                  Failed to get response
                </p>
                <p className="text-xs text-red-600 mb-3">
                  {error instanceof Error
                    ? error.message
                    : typeof error === 'object'
                    ? JSON.stringify(error)
                    : String(error)}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Reload Page
                </button>
              </div>
            )}
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter className="border-t-0 p-4 bg-white/50">
          <form
            onSubmit={handleSubmit}
            className="relative"
          >
            <div className="relative rounded-xl border border-gray-200 bg-gray-50/50 focus-within:border-[#4A5FE8] focus-within:bg-white transition-all">
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSubmit={handleSubmit}
                placeholder="Ask about trends, forecasts, or pricing..."
                className="min-h-[52px] resize-none bg-transparent border-0 px-4 py-3 shadow-none focus-visible:ring-0 text-[14.5px] leading-relaxed"
                style={{ color: '#1A1D2E' }}
              />
            </div>
            <div className="flex items-center mt-3 justify-between">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={handleAttachFile}
                  className="h-9 w-9 rounded-full hover:bg-gray-100"
                >
                  <Paperclip className="h-4 w-4 text-gray-500" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={handleMicrophoneClick}
                  className="h-9 w-9 rounded-full hover:bg-gray-100"
                >
                  <Mic className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              <Button
                type="submit"
                className="h-9 px-4 rounded-full gradient-blue text-white hover:scale-105 transition-transform shadow-sm"
                disabled={!input.trim()}
              >
                <span className="text-sm font-medium">Send</span>
                <Send className="h-3.5 w-3.5 ml-1.5" />
              </Button>
            </div>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
    </>
  )
}
