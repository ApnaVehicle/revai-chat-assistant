'use client'

import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
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
import { PredefinedQuestion, getTopQuestions, predefinedQuestions } from '@/lib/predefined-questions'
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

interface SuggestionChipsProps {
  onQuestionSelect: (question: PredefinedQuestion) => void
  className?: string
}

export function SuggestionChips({ onQuestionSelect, className }: SuggestionChipsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Get initial questions (top 4) and all questions
  const topQuestions = getTopQuestions(4)
  const displayQuestions = isExpanded ? predefinedQuestions : topQuestions

  useEffect(() => {
    // Fade in animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleQuestionClick = (question: PredefinedQuestion) => {
    setSelectedId(question.id)
    onQuestionSelect(question)

    // Reset selection after animation
    setTimeout(() => {
      setSelectedId(null)
    }, 500)
  }

  // Group questions by category for expanded view
  const groupedQuestions = isExpanded
    ? predefinedQuestions.reduce((acc, q) => {
        if (!acc[q.category]) {
          acc[q.category] = []
        }
        acc[q.category].push(q)
        return acc
      }, {} as Record<string, PredefinedQuestion[]>)
    : null

  const categoryLabels: Record<string, string> = {
    demand: 'Demand Analysis',
    pricing: 'Pricing Intelligence',
    forecast: 'Forecasting',
    competitor: 'Competition',
    analytics: 'Analytics & Charts'
  }

  return (
    <div
      className={cn(
        'w-full transition-all duration-500 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#4A5FE8]" />
          <span className="text-sm font-medium text-gray-700">Quick Questions</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-[#4A5FE8] hover:text-[#6B7FF0] transition-colors flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              Show less
              <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show all ({predefinedQuestions.length})
              <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      </div>

      {/* Questions Grid */}
      <div
        className={cn(
          'transition-all duration-300 ease-out',
          isExpanded ? 'max-h-[400px] overflow-y-auto' : 'max-h-[200px]'
        )}
      >
        {!isExpanded ? (
          // Compact view - top 4 questions
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {displayQuestions.map((question) => (
              <ChipButton
                key={question.id}
                question={question}
                isSelected={selectedId === question.id}
                onClick={() => handleQuestionClick(question)}
              />
            ))}
          </div>
        ) : (
          // Expanded view - grouped by category
          <div className="space-y-4">
            {Object.entries(groupedQuestions || {}).map(([category, questions]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 px-1">
                  {categoryLabels[category]}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {questions.map((question) => (
                    <ChipButton
                      key={question.id}
                      question={question}
                      isSelected={selectedId === question.id}
                      onClick={() => handleQuestionClick(question)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle divider */}
      <div className="mt-4 border-t border-gray-200/30" />
    </div>
  )
}

// Individual chip button component
function ChipButton({
  question,
  isSelected,
  onClick
}: {
  question: PredefinedQuestion
  isSelected: boolean
  onClick: () => void
}) {
  const IconComponent = iconMap[question.iconName] || TrendingUp

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex items-center gap-2 px-3 py-2.5 min-h-[44px]',
        'rounded-xl border transition-all duration-200',
        'text-left text-sm',
        // Glass morphism effect
        'backdrop-filter backdrop-blur-sm',
        // Default state
        'bg-white/60 border-gray-200/50 hover:bg-white/80',
        'hover:border-[#4A5FE8]/30 hover:shadow-md',
        // Selected state
        isSelected && 'bg-gradient-to-r from-[#4A5FE8] to-[#6B7FF0] text-white border-transparent',
        isSelected && 'scale-95 shadow-lg',
        // Animation
        'transform-gpu'
      )}
    >
      {/* Icon */}
      <IconComponent
        className={cn(
          'h-4 w-4 flex-shrink-0',
          isSelected ? 'text-white animate-pulse' : 'text-[#4A5FE8]'
        )}
      />

      {/* Text */}
      <span className={cn(
        'flex-1',
        isSelected ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
      )}>
        {question.shortLabel}
      </span>

      {/* Hover effect overlay */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity',
          'bg-gradient-to-r from-[#4A5FE8]/5 to-[#6B7FF0]/5',
          'pointer-events-none'
        )}
      />
    </button>
  )
}

// Minimal version for inline display
export function InlineSuggestionChips({
  onQuestionSelect,
  limit = 3
}: {
  onQuestionSelect: (question: PredefinedQuestion) => void
  limit?: number
}) {
  const topQuestions = getTopQuestions(limit)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (question: PredefinedQuestion) => {
    setSelectedId(question.id)
    onQuestionSelect(question)
    setTimeout(() => setSelectedId(null), 500)
  }

  return (
    <div className="flex flex-wrap gap-2 p-2">
      <span className="text-xs text-gray-500 self-center">Try:</span>
      {topQuestions.map((question) => {
        const IconComponent = iconMap[question.iconName] || TrendingUp
        return (
          <button
            key={question.id}
            onClick={() => handleSelect(question)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5',
              'text-xs rounded-full border transition-all',
              'bg-white/60 border-gray-200/50 hover:bg-white/80',
              'hover:border-[#4A5FE8]/30 hover:shadow-sm',
              selectedId === question.id && 'bg-[#4A5FE8] text-white border-transparent'
            )}
          >
            <IconComponent className={cn(
              'h-3 w-3',
              selectedId === question.id ? 'text-white' : 'text-[#4A5FE8]'
            )} />
            <span>{question.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}