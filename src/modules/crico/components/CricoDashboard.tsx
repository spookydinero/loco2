'use client'

import React from 'react'
import LiftBoard from './LiftBoard'

interface CricoDashboardProps {
  className?: string
}

const CricoDashboard: React.FC<CricoDashboardProps> = ({ className = '' }) => {
  return (
    <div className={`h-full ${className}`}>
      <LiftBoard />
    </div>
  )
}

export default CricoDashboard

