"use client"

import { FormEvent, useState } from "react"
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

export function ExpandableChatDemo() {
  const [input, setInput] = useState("")

  const { messages, sendMessage, status, setMessages } = useChat({
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: "Hi! I'm REV.AI Copilot. I can help you analyze pricing recommendations, forecast demand, and optimize your revenue strategy. How can I assist you today?",
          },
        ],
      },
    ],
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const handleSubmit = (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    if (!input.trim() || isLoading) return

    sendMessage({ text: input })
    setInput("")
  }

  const handleAttachFile = () => {
    //
  }

  const handleMicrophoneClick = () => {
    //
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
            text: "Hi! I'm REV.AI Copilot. I can help you analyze pricing recommendations, forecast demand, and optimize your revenue strategy. How can I assist you today?",
          },
        ],
      },
    ])
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
            <h1 className="text-[17px] font-semibold tracking-tight">REV.AI Copilot</h1>
            <p className="text-xs text-white/60 mt-0.5">
              Ready to assist
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
            {messages.map((message) => {
              const textContent = message.parts
                .filter((part): part is Extract<typeof part, { type: 'text' }> => part.type === 'text')
                .map(part => part.text)
                .join('')

              const role = message.role as 'user' | 'assistant' | 'system'
              const variant = role === "user" ? "sent" as const : "received" as const

              return (
                <ChatBubble
                  key={message.id}
                  variant={variant}
                >
                  {variant === "received" && (
                    <ChatBubbleAvatar
                      className="shrink-0"
                      fallback="AI"
                    />
                  )}
                  <ChatBubbleMessage
                    variant={variant}
                  >
                    {textContent}
                  </ChatBubbleMessage>
                </ChatBubble>
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
