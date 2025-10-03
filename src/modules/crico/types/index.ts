// Crico module types
export interface CricoItem {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface CricoState {
  items: CricoItem[]
  loading: boolean
  error: string | null
}

// Lift Board specific types
export type LiftStatus = 'available' | 'occupied' | 'reserved' | 'maintenance' | 'out_of_order'

export interface RepairPhase {
  id: string
  name: string
  order: number
}

export const STANDARD_REPAIR_PHASES: RepairPhase[] = [
  { id: 'pull', name: 'Pull', order: 1 },
  { id: 'diagnose', name: 'Diagnose', order: 2 },
  { id: 'build', name: 'Build', order: 3 },
  { id: 'reinstall', name: 'Reinstall', order: 4 },
  { id: 'test_drive', name: 'Test Drive', order: 5 },
  { id: 'complete', name: 'Complete', order: 6 },
]

export interface LiftBoardData {
  lift: any // From main types
  currentRO?: any // From main types
  currentVehicle?: any // From main types
  assignedTech?: any // From main types
  currentPhase?: RepairPhase
  daysInRepair: number
  isOverdue: boolean
}

