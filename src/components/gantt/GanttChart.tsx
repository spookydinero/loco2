'use client'

import React from 'react'

export interface GanttTask {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number // 0-100
  dependencies?: string[]
}

interface GanttChartProps {
  tasks: GanttTask[]
  className?: string
}

export const GanttChart: React.FC<GanttChartProps> = ({ tasks, className = '' }) => {
  // Calculate date range
  const allDates = tasks.flatMap(task => [task.startDate, task.endDate])
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))

  // Calculate total days in range
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))

  const getTaskPosition = (task: GanttTask) => {
    const startOffset = Math.ceil((task.startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24))
    const duration = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1
    const left = (startOffset / totalDays) * 100
    const width = (duration / totalDays) * 100

    return { left: `${left}%`, width: `${width}%` }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
      </div>

      <div className="p-4">
        {/* Task rows */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-4">
              {/* Task name */}
              <div className="w-48 flex-shrink-0">
                <span className="text-sm font-medium text-gray-900">{task.name}</span>
                <div className="text-xs text-gray-500">
                  {formatDate(task.startDate)} - {formatDate(task.endDate)}
                </div>
              </div>

              {/* Timeline bar */}
              <div className="flex-1 relative h-6 bg-gray-100 rounded">
                <div
                  className="absolute top-0 h-full bg-blue-500 rounded"
                  style={getTaskPosition(task)}
                >
                  {/* Progress indicator */}
                  <div
                    className="h-full bg-blue-700 rounded"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Progress percentage */}
              <div className="w-16 text-right">
                <span className="text-sm text-gray-600">{task.progress}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Planned</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-700 rounded"></div>
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GanttChart


