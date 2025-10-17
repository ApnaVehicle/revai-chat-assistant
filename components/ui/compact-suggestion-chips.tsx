'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  TrendingUp,
  Car,
  LineChart,
  BarChart3,
  PieChart,
  DollarSign,
  CreditCard,
  Users,
  Calendar
} from 'lucide-react'
import { PredefinedQuestion } from '@/lib/predefined-questions'
import { cn } from '@/lib/utils'

// Map icon names to Lucide components
const iconMap: Record<string, any> = {
  'TrendingUp': TrendingUp,
  'Car': Car,
  'LineChart': LineChart,
  'BarChart3': BarChart3,
  'PieChart': PieChart,
  'DollarSign': DollarSign,
  'CreditCard': CreditCard,
  'Users': Users,
  'Calendar': Calendar
}

interface CompactSuggestionChipsProps {
  questions: PredefinedQuestion[]
  onQuestionSelect: (question: PredefinedQuestion) => void
  className?: string
}

export function CompactSuggestionChips({
  questions,
  onQuestionSelect,
  className
}: CompactSuggestionChipsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Show first 5 when collapsed, all when expanded
  const visibleQuestions = isExpanded ? questions : questions.slice(0, 5)
  const remainingCount = questions.length - 5

  const handleQuestionClick = (question: PredefinedQuestion) => {
    setSelectedId(question.id)
    onQuestionSelect(question)

    // Reset selection after animation
    setTimeout(() => {
      setSelectedId(null)
    }, 500)
  }

  if (questions.length === 0) return null

  return (
    <div className={cn('w-full py-2', className)}>
      {/* Header with expand/collapse */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-gray-600 font-medium">
          Continue exploring:
        </span>
        {remainingCount > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] text-[#4A5FE8] hover:text-[#6B7FF0] transition-colors flex items-center gap-1 font-medium"
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                Show {remainingCount} more
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Compact chips grid */}
      <div className="flex flex-wrap gap-2">
        {visibleQuestions.map((question) => {
          const IconComponent = iconMap[question.iconName] || TrendingUp

          return (
            <button
              key={question.id}
              onClick={() => handleQuestionClick(question)}
              className={cn(
                'group relative inline-flex items-center gap-1.5',
                'px-2.5 py-1.5 min-h-[36px]',
                'rounded-lg border transition-all duration-200',
                'text-left text-xs',
                // Glass morphism effect
                'backdrop-filter backdrop-blur-sm',
                // Default state
                'bg-white/60 border-gray-200/50 hover:bg-white/80',
                'hover:border-[#4A5FE8]/30 hover:shadow-sm',
                'hover:scale-105',
                // Selected state
                selectedId === question.id && 'bg-gradient-to-r from-[#4A5FE8] to-[#6B7FF0] text-white border-transparent',
                selectedId === question.id && 'scale-95 shadow-md',
                // Animation
                'transform-gpu'
              )}
            >
              {/* Icon */}
              <IconComponent
                className={cn(
                  'h-3.5 w-3.5 flex-shrink-0',
                  selectedId === question.id ? 'text-white animate-pulse' : 'text-[#4A5FE8]'
                )}
              />

              {/* Text */}
              <span className={cn(
                'flex-1',
                selectedId === question.id ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
              )}>
                {question.shortLabel}
              </span>

              {/* Hover effect overlay */}
              <div
                className={cn(
                  'absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity',
                  'bg-gradient-to-r from-[#4A5FE8]/5 to-[#6B7FF0]/5',
                  'pointer-events-none'
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
