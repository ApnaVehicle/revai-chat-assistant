"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageLoading } from "@/components/ui/message-loading"
import { MarkdownMessage } from "@/components/ui/markdown-message";

interface ChatBubbleProps {
  variant?: "sent" | "received"
  layout?: "default" | "ai"
  className?: string
  children: React.ReactNode
}

export function ChatBubble({
  variant = "received",
  layout = "default",
  className,
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 mb-4",
        variant === "sent" && "flex-row-reverse",
        variant === "sent" && "justify-end",
        className,
      )}
    >
      {children}
    </div>
  )
}

interface ChatBubbleMessageProps {
  variant?: "sent" | "received"
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function ChatBubbleMessage({
  variant = "received",
  isLoading,
  className,
  children,
}: ChatBubbleMessageProps) {
  // Convert children to string for markdown processing
  const content = typeof children === 'string' ? children : String(children || '');

  return (
    <div
      className={cn(
        "rounded-xl p-4 animate-fade-slide-up",
        variant === "sent"
          ? "gradient-blue text-white shadow-sm max-w-[70%] ml-auto text-[14.5px] leading-relaxed"
          : "bg-white shadow-message border border-gray-100 max-w-[85%]",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center space-x-1.5">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-1"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-2"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-3"></div>
        </div>
      ) : variant === "received" ? (
        <MarkdownMessage content={content} />
      ) : (
        <div className="text-[14.5px] leading-relaxed">{children}</div>
      )}
    </div>
  )
}

interface ChatBubbleAvatarProps {
  src?: string
  fallback?: string
  className?: string
}

export function ChatBubbleAvatar({
  src,
  fallback = "AI",
  className,
}: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn("h-7 w-7 border border-white shadow-sm", className)}>
      {src && <AvatarImage src={src} />}
      <AvatarFallback className="text-xs gradient-mesh text-white font-medium">{fallback}</AvatarFallback>
    </Avatar>
  )
}

interface ChatBubbleActionProps {
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ChatBubbleAction({
  icon,
  onClick,
  className,
}: ChatBubbleActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6", className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex items-center gap-1 mt-2", className)}>
      {children}
    </div>
  )
}
