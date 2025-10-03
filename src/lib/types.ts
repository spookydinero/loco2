// Core entity types for the shop management system

export interface Entity {
  id: string;
  name: string;
  type: 'customer' | 'supplier' | 'vendor';
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Tech {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialties: string[];
  certifications: string[];
  availability: 'available' | 'busy' | 'off';
  hourlyRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  customerId: string;
  mileage?: number;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Phase {
  id: string;
  name: string;
  description?: string;
  estimatedHours: number;
  actualHours?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  startDate?: Date;
  endDate?: Date;
  assignedTechId?: string;
  order: number;
}

export interface Part {
  id: string;
  name: string;
  partNumber: string;
  description?: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unitCost: number;
  supplierId?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RO {
  id: string;
  number: string;
  vehicleId: string;
  customerId: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedCompletion?: Date;
  actualCompletion?: Date;
  totalEstimate?: number;
  totalCost?: number;
  phases: Phase[];
  assignedTechs: string[];
  phaseHistory?: PhaseHistory[];
  daysInRepair?: number;
  isOverdue?: boolean;
  isRework?: boolean;
  reworkReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PO {
  id: string;
  number: string;
  supplierId: string;
  parts: Array<{
    partId: string;
    quantity: number;
    unitPrice: number;
  }>;
  status: 'draft' | 'submitted' | 'approved' | 'received' | 'cancelled';
  totalAmount: number;
  expectedDelivery?: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lift {
  id: string;
  name: string;
  type: 'two_post' | 'four_post' | 'scissor' | 'alignment';
  status: 'available' | 'occupied' | 'maintenance' | 'out_of_order';
  currentRO?: string;
  capacity: number; // in tons
  location: string;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface QRPayload {
  type: 'part_scan' | 'vehicle_checkin' | 'work_completion';
  data: Record<string, any>;
  timestamp: Date;
  scannedBy: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  entityId?: string;
  entityType?: 'ro' | 'lift' | 'part' | 'tech';
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Estimate {
  id: string;
  roId: string;
  items: EstimateItem[];
  laborTotal: number;
  partsTotal: number;
  taxTotal: number;
  discountTotal: number;
  grandTotal: number;
  validUntil: Date;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface EstimateItem {
  id: string;
  type: 'labor' | 'part' | 'fee';
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Approval {
  id: string;
  entityId: string;
  entityType: 'estimate' | 'po' | 'ro';
  requestedBy: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  amount?: number;
  comments?: string;
  requestedAt: Date;
  approvedAt?: Date;
}

export interface CoreItem {
  id: string;
  name: string;
  description?: string;
  category: string;
  value: number;
  condition: 'new' | 'refurbished' | 'used';
  location?: string;
  status: 'available' | 'sold' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface PhaseHistory {
  phaseId: string;
  phaseName: string;
  status: 'started' | 'completed';
  timestamp: Date;
  techId: string;
}

// Additional utility types
export type ROStatus = RO['status'];
export type LiftStatus = Lift['status'];
export type AlertType = Alert['type'];
export type TechAvailability = Tech['availability'];
export type Priority = RO['priority'];
export type POStatus = PO['status'];
export type EstimateStatus = Estimate['status'];
export type ApprovalStatus = Approval['status'];
