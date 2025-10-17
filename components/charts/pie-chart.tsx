'use client'

import React from 'react'
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts'

interface PieChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  title?: string
  height?: number
  showLegend?: boolean
  showPercentage?: boolean
}

export function PieChart({
  data,
  title = 'Chart',
  height = 300,
  showLegend = true,
  showPercentage = true
}: PieChartProps) {
  // Calculate total for percentage
  const total = data.reduce((sum, entry) => sum + entry.value, 0)

  // Default color palette
  const defaultColors = [
    '#4A5FE8',
    '#6B7FF0',
    '#8A9BF5',
    '#AAB7FA',
    '#CAD3FF'
  ]

  // Custom label renderer
  const renderLabel = (entry: any) => {
    if (!showPercentage) return entry.name

    const percent = ((entry.value / total) * 100).toFixed(1)
    return `${percent}%`
  }

  // Custom legend content
  const renderLegend = (props: any) => {
    const { payload } = props

    return (
      <div className="flex flex-col gap-1">
        {payload.map((entry: any, index: number) => {
          const percent = ((entry.value / total) * 100).toFixed(1)
          return (
            <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700">
                {entry.value}: {percent}%
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      const percent = ((data.value / total) * 100).toFixed(1)

      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm text-gray-800">
            {data.name}
          </p>
          <p className="text-sm text-gray-600">
            Value: {data.value}
          </p>
          <p className="text-sm text-gray-600">
            Percentage: {percent}%
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="w-full p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50">
      {title && (
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-base">🚗</span>
          {title}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="square"
              content={renderLegend}
              wrapperStyle={{
                paddingLeft: '20px'
              }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}