'use client'

import React from 'react'
import { RO, Vehicle, Entity as Customer } from '@/lib/types'

interface IncomingQueueProps {
  ros: RO[]
  vehicles: Vehicle[]
  customers: Customer[]
  className?: string
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return '🚨'
    case 'high':
      return '⚡'
    case 'medium':
      return '⚠️'
    case 'low':
      return 'ℹ️'
    default:
      return '📋'
  }
}

const IncomingQueue: React.FC<IncomingQueueProps> = ({ ros, vehicles, customers, className = '' }) => {
  // Filter ROs that are open and not assigned to any tech yet
  const incomingROs = ros
    .filter(ro => ro.status === 'open' && ro.assignedTechs.length === 0)
    .slice(0, 5) // Limit to 5 as requested

  const getVehicle = (vehicleId: string) => vehicles.find(v => v.id === vehicleId)
  const getCustomer = (customerId: string) => customers.find(c => c.id === customerId)

  return (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Incoming Queue</h3>
        <p className="text-sm text-gray-500 mt-1">
          {incomingROs.length} repair order{incomingROs.length !== 1 ? 's' : ''} waiting for assignment
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {incomingROs.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No repair orders waiting for assignment</p>
          </div>
        ) : (
          incomingROs.map((ro) => {
            const vehicle = getVehicle(ro.vehicleId)
            const customer = getCustomer(ro.customerId)

            return (
              <div key={ro.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{ro.number}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ro.priority)}`}>
                        {getPriorityIcon(ro.priority)} {ro.priority}
                      </span>
                    </div>

                    {vehicle && (
                      <div className="text-sm text-gray-600 mb-1">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </div>
                    )}

                    {customer && (
                      <div className="text-sm text-gray-500 mb-1">
                        {customer.name}
                      </div>
                    )}

                    <div className="text-xs text-gray-400">
                      Created {ro.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{ro.description}</p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default IncomingQueue
