'use client'

import React, { useMemo } from 'react'
import { useShop } from '@/store/useShop'
import LiftCard from './LiftCard'
import IncomingQueue from './IncomingQueue'

interface LiftBoardProps {
  className?: string
}

const LiftBoard: React.FC<LiftBoardProps> = ({ className = '' }) => {
  const lifts = useShop(state => state.lifts)
  const ros = useShop(state => state.ros)
  const vehicles = useShop(state => state.vehicles)
  const techs = useShop(state => state.techs)
  const entities = useShop(state => state.entities)

  const liftBoardData = useMemo(() => {
    return lifts.map(lift => {
      const currentRO = lift.currentRO ? ros.find(ro => ro.id === lift.currentRO) : undefined;
      const currentVehicle = currentRO ? vehicles.find(v => v.id === currentRO.vehicleId) : undefined;
      const assignedTech = currentRO?.assignedTechs && currentRO.assignedTechs.length > 0 ? techs.find(t => t.id === currentRO.assignedTechs[0]) : undefined;

      // Calculate days in repair
      const daysInRepair = currentRO ? Math.floor((Date.now() - currentRO.createdAt.getTime()) / (1000 * 60 * 60 * 24)) : 0;

      // Check if overdue
      const isOverdue = currentRO?.estimatedCompletion ? currentRO.estimatedCompletion < new Date() : false;

      // Determine current phase (simplified - in real app this would be more complex)
      let currentPhaseId = '';
      if (currentRO) {
        const inProgressPhases = currentRO.phases.filter(p => p.status === 'in_progress');
        if (inProgressPhases.length > 0) {
          // Map existing phases to our standard phases
          const phaseName = inProgressPhases[0].name.toLowerCase();
          if (phaseName.includes('inspection') || phaseName.includes('pull')) currentPhaseId = 'pull';
          else if (phaseName.includes('diagnostic') || phaseName.includes('diagnose')) currentPhaseId = 'diagnose';
          else if (phaseName.includes('build') || phaseName.includes('repair')) currentPhaseId = 'build';
          else if (phaseName.includes('reinstall') || phaseName.includes('install')) currentPhaseId = 'reinstall';
          else if (phaseName.includes('test')) currentPhaseId = 'test_drive';
          else currentPhaseId = 'diagnose'; // default
        }
      }

      const phaseMap: Record<string, { name: string; order: number }> = {
        pull: { name: 'Pull', order: 1 },
        diagnose: { name: 'Diagnose', order: 2 },
        build: { name: 'Build', order: 3 },
        reinstall: { name: 'Reinstall', order: 4 },
        test_drive: { name: 'Test Drive', order: 5 },
        complete: { name: 'Complete', order: 6 }
      };

      return {
        lift,
        currentRO,
        currentVehicle,
        assignedTech,
        currentPhase: currentPhaseId ? { id: currentPhaseId, ...phaseMap[currentPhaseId] } : undefined,
        daysInRepair,
        isOverdue
      };
    });
  }, [lifts, ros, vehicles, techs])

  // Filter entities to get only customers
  const customers = entities.filter(entity => entity.type === 'customer')

  return (
    <div className={`flex h-full ${className}`}>
      {/* Main Lift Grid */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Lift Board</h1>
          <p className="text-gray-600 mt-1">Monitor all 12 service lifts and their current status</p>
        </div>

        {/* Responsive Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {liftBoardData.map((data, index) => (
            <LiftCard
              key={data.lift.id}
              data={data}
              className="h-fit"
            />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l border-gray-200 bg-gray-50">
        <div className="p-4">
          <IncomingQueue
            ros={ros}
            vehicles={vehicles}
            customers={customers}
          />
        </div>
      </div>
    </div>
  )
}

export default LiftBoard
