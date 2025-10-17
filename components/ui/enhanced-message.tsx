'use client'

import React from 'react'
import { BarChart } from '@/components/charts/bar-chart'
import { PieChart } from '@/components/charts/pie-chart'
import { ChartData } from '@/lib/predefined-questions'
import { cn } from '@/lib/utils'

interface EnhancedMessageProps {
  content: string
  chartData?: ChartData
  icon?: string
  highlights?: string[]
  className?: string
}

export function EnhancedMessage({
  content,
  chartData,
  icon,
  highlights,
  className
}: EnhancedMessageProps) {
  // Process content for better formatting
  const formatContent = (text: string) => {
    let formatted = text

    // Convert bullet points to proper list items
    formatted = formatted.replace(/^• /gm, '• ')
    formatted = formatted.replace(/^○ /gm, '  ○ ')

    // Split into paragraphs
    const paragraphs = formatted.split('\n\n').filter(p => p.trim())

    return paragraphs.map((paragraph, idx) => {
      // Check if paragraph is a heading (starts with **)
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const heading = paragraph.replace(/\*\*/g, '')
        return (
          <h3 key={idx} className="font-semibold text-gray-900 mt-4 mb-2 text-sm">
            {heading}
          </h3>
        )
      }

      // Check if paragraph contains bullet points
      if (paragraph.includes('•') || paragraph.includes('○')) {
        const lines = paragraph.split('\n').filter(l => l.trim())
        return (
          <ul key={idx} className="space-y-1 my-2">
            {lines.map((line, lineIdx) => {
              const isSubItem = line.trim().startsWith('○')
              const text = line.replace(/^[•○]\s*/, '').trim()

              // Handle bold text within list items
              const formattedText = text.split(/(\*\*.*?\*\*)/).map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return (
                    <strong key={partIdx} className="font-semibold">
                      {part.replace(/\*\*/g, '')}
                    </strong>
                  )
                }
                return part
              })

              return (
                <li
                  key={lineIdx}
                  className={cn(
                    'flex items-start gap-2 text-sm text-gray-700',
                    isSubItem && 'ml-4'
                  )}
                >
                  <span className="text-[#4A5FE8] mt-1 flex-shrink-0">
                    {isSubItem ? '◦' : '•'}
                  </span>
                  <span>{formattedText}</span>
                </li>
              )
            })}
          </ul>
        )
      }

      // Check if paragraph should be highlighted
      const isHighlighted = highlights?.some(h => paragraph.includes(h))

      if (isHighlighted) {
        return (
          <div
            key={idx}
            className="my-3 p-3 rounded-lg bg-blue-50/50 border border-blue-200/30 backdrop-blur-sm"
          >
            <p className="text-sm text-gray-800 leading-relaxed">
              {formatTextWithBold(paragraph)}
            </p>
          </div>
        )
      }

      // Regular paragraph
      return (
        <p key={idx} className="text-sm text-gray-700 leading-relaxed my-2">
          {formatTextWithBold(paragraph)}
        </p>
      )
    })
  }

  // Helper function to format bold text
  const formatTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/)
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-semibold text-gray-900">
            {part.replace(/\*\*/g, '')}
          </strong>
        )
      }
      return part
    })
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Icon and initial text if provided */}
      {icon && (
        <div className="flex items-start gap-2">
          <span className="text-xl">{icon}</span>
          <div className="flex-1">
            {formatContent(content)}
          </div>
        </div>
      )}

      {/* Content without icon */}
      {!icon && (
        <div>
          {formatContent(content)}
        </div>
      )}

      {/* Chart rendering */}
      {chartData && (
        <div className="mt-4 animate-fade-slide-up">
          {chartData.type === 'bar' && (
            <BarChart
              data={chartData.data}
              title={chartData.config?.title}
              xAxis={chartData.config?.xAxis}
              yAxis={chartData.config?.yAxis}
            />
          )}
          {chartData.type === 'pie' && (
            <PieChart
              data={chartData.data}
              title={chartData.config?.title}
              showLegend={chartData.config?.showLegend}
              showPercentage={chartData.config?.showPercentage}
            />
          )}
        </div>
      )}
    </div>
  )
}

// Simple loading animation for AI responses
export function EnhancedMessageLoading() {
  return (
    <div className="flex items-start gap-2 p-3">
      <span className="text-xl animate-pulse">🤖</span>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200/50 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200/50 rounded animate-pulse w-1/2" />
        <div className="h-4 bg-gray-200/50 rounded animate-pulse w-2/3" />
      </div>
    </div>
  )
}