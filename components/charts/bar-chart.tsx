'use client'

import React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

interface BarChartProps {
  data: Array<{
    location?: string
    label?: string
    value: number
    color?: string
  }>
  title?: string
  xAxis?: string
  yAxis?: string
  height?: number
}

export function BarChart({
  data,
  title = 'Chart',
  xAxis = 'Category',
  yAxis = 'Value',
  height = 300
}: BarChartProps) {
  // Default color palette matching the design system
  const defaultColors = ['#4A5FE8', '#6B7FF0', '#8A9BF5', '#AAB7FA']

  return (
    <div className="w-full p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50">
      {title && (
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-base">📊</span>
          {title}
        </h3>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="location"
            tick={{ fontSize: 12, fill: '#666' }}
            label={{
              value: xAxis,
              position: 'insideBottom',
              offset: -5,
              style: { fontSize: 12, fill: '#888' }
            }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#666' }}
            label={{
              value: yAxis,
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: 12, fill: '#888' }
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)'
            }}
            labelStyle={{ color: '#333', fontWeight: 600 }}
            itemStyle={{ color: '#666' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}