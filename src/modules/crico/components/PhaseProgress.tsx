'use client'

import React from 'react'
import { STANDARD_REPAIR_PHASES } from '../types'

interface PhaseProgressProps {
  currentPhaseId: string
  className?: string
}

const PhaseProgress: React.FC<PhaseProgressProps> = ({ currentPhaseId, className = '' }) => {
  const currentPhase = STANDARD_REPAIR_PHASES.find(phase => phase.id === currentPhaseId)
  const currentOrder = currentPhase?.order || 0

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {STANDARD_REPAIR_PHASES.map((phase, index) => {
        const isCompleted = phase.order < currentOrder
        const isCurrent = phase.order === currentOrder
        const isPending = phase.order > currentOrder

        return (
          <React.Fragment key={phase.id}>
            {/* Phase Circle */}
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {isCompleted ? '✓' : phase.name.charAt(0)}
            </div>

            {/* Connector Line (except for last phase) */}
            {index < STANDARD_REPAIR_PHASES.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  phase.order < currentOrder ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default PhaseProgress
