'use client'

import React from 'react'
import { LiftBoardData } from '../types'
import PhaseProgress from './PhaseProgress'

interface LiftCardProps {
  data: LiftBoardData
  className?: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'occupied':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'reserved':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'maintenance':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'out_of_order':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const LiftCard: React.FC<LiftCardProps> = ({ data, className = '' }) => {
  const { lift, currentRO, currentVehicle, assignedTech, currentPhase, daysInRepair, isOverdue } = data

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-4 ${className}`}>
      {/* Header with lift number and status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Lift {lift.name.split(' ').pop()} {/* Extract number from name */}
          </h3>
          {isOverdue && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              OVERDUE
            </span>
          )}
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(lift.status)}`}>
          {lift.status.charAt(0).toUpperCase() + lift.status.slice(1)}
        </span>
      </div>

      {/* Tech Avatar */}
      {assignedTech && (
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            {getInitials(assignedTech.name)}
          </div>
          <span className="text-sm text-gray-600 truncate">{assignedTech.name}</span>
        </div>
      )}

      {/* Vehicle Info */}
      {currentVehicle && (
        <div className="mb-3">
          <div className="text-sm text-gray-900 font-medium">
            {currentVehicle.year} {currentVehicle.make} {currentVehicle.model}
          </div>
          <div className="text-xs text-gray-500">
            {currentVehicle.licensePlate} • {currentVehicle.mileage?.toLocaleString()} miles
          </div>
        </div>
      )}

      {/* Days in Repair */}
      {daysInRepair > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-500">
            {daysInRepair} day{daysInRepair !== 1 ? 's' : ''} in repair
          </div>
        </div>
      )}

      {/* Phase Progress */}
      {currentPhase && (
        <div className="mt-3">
          <div className="text-xs text-gray-500 mb-1">Current Phase</div>
          <PhaseProgress currentPhaseId={currentPhase.id} />
        </div>
      )}

      {/* Empty state for available lifts */}
      {lift.status === 'available' && !currentRO && (
        <div className="text-center text-gray-400 py-4">
          <div className="text-sm">Available</div>
        </div>
      )}
    </div>
  )
}

export default LiftCard
