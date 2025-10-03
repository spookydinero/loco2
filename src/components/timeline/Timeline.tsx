'use client'

import React from 'react'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  date: Date
  status?: 'completed' | 'in-progress' | 'pending'
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  const sortedItems = [...items].sort((a, b) => b.date.getTime() - a.date.getTime())

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'pending':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {sortedItems.map((item, index) => (
          <div key={item.id} className="relative flex items-start mb-8">
            {/* Timeline dot */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getStatusColor(item.status)} border-4 border-white shadow-md z-10`}></div>

            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 mt-1">{item.description}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {item.date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline


