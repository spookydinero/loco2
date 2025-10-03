import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  Entity,
  Tech,
  Vehicle,
  RO,
  Phase,
  Part,
  PO,
  Lift,
  QRPayload,
  Alert,
  Estimate,
  Approval,
  CoreItem
} from '@/lib/types';

// Store state interface
interface ShopState {
  // Data entities
  entities: Entity[];
  techs: Tech[];
  vehicles: Vehicle[];
  ros: RO[];
  parts: Part[];
  pos: PO[];
  lifts: Lift[];
  alerts: Alert[];
  estimates: Estimate[];
  approvals: Approval[];
  coreItems: CoreItem[];

  // Computed selectors
  getOpenLifts: () => Lift[];
  getOverdueROs: () => RO[];
  getTechWorkload: () => Record<string, number>;
  getLowStockParts: () => Part[];
  getEntityKPIs: () => {
    totalEntities: number;
    totalROs: number;
    openROs: number;
    completedROs: number;
    completionRate: number;
    lowStockParts: number;
    availableLifts: number;
    busyTechs: number;
    totalRevenue: number;
  };

  // Actions
  assignTech: (roId: string, techId: string, phaseId?: string) => void;
  advancePhase: (roId: string, phaseId: string) => void;
  createPO: (supplierId: string, parts: Array<{ partId: string; quantity: number; unitPrice: number }>) => void;
  requestApproval: (entityId: string, entityType: string, amount?: number) => void;
  scanQR: (payload: QRPayload) => void;
  flagRework: (roId: string, phaseId: string, reason: string) => void;
}

// Seed data
const seedEntities: Entity[] = [
  {
    id: 'ent-1',
    name: 'John Smith Automotive',
    type: 'customer',
    contactInfo: {
      email: 'john@example.com',
      phone: '555-0101',
      address: '123 Main St, Anytown, USA'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'ent-2',
    name: 'AutoParts Plus',
    type: 'supplier',
    contactInfo: {
      email: 'orders@autopartsplus.com',
      phone: '555-0202',
      address: '456 Supply Ave, Partstown, USA'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'ent-3',
    name: 'Jane Doe',
    type: 'customer',
    contactInfo: {
      email: 'jane@example.com',
      phone: '555-0303',
      address: '789 Oak St, Somewhere, USA'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

const seedTechs: Tech[] = [
  {
    id: 'tech-1',
    name: 'Mike Johnson',
    email: 'mike@shop.com',
    phone: '555-1001',
    specialties: ['Engine Repair', 'Diagnostics'],
    certifications: ['ASE Master Technician'],
    availability: 'available',
    hourlyRate: 85,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'tech-2',
    name: 'Sarah Wilson',
    email: 'sarah@shop.com',
    phone: '555-1002',
    specialties: ['Brakes', 'Suspension', 'Alignment'],
    certifications: ['ASE Certified'],
    availability: 'busy',
    hourlyRate: 75,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

const seedVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    vin: '1HGCM82633A123456',
    make: 'Honda',
    model: 'Accord',
    year: 2020,
    licensePlate: 'ABC-123',
    customerId: 'ent-1',
    mileage: 45000,
    color: 'Silver',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'veh-2',
    vin: '2T1BURHE0FC123456',
    make: 'Toyota',
    model: 'Corolla',
    year: 2019,
    licensePlate: 'XYZ-789',
    customerId: 'ent-3',
    mileage: 32000,
    color: 'Blue',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

const seedParts: Part[] = [
  {
    id: 'part-1',
    name: 'Brake Pads',
    partNumber: 'BP-2020',
    description: 'Front brake pads for Honda Accord',
    category: 'Brakes',
    quantity: 8,
    minQuantity: 5,
    unitCost: 45.99,
    supplierId: 'ent-2',
    location: 'Shelf A-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'part-2',
    name: 'Oil Filter',
    partNumber: 'OF-1516',
    description: 'Standard oil filter',
    category: 'Filters',
    quantity: 3,
    minQuantity: 10,
    unitCost: 12.50,
    supplierId: 'ent-2',
    location: 'Shelf B-2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'part-3',
    name: 'Spark Plugs',
    partNumber: 'SP-4PACK',
    description: 'Set of 4 spark plugs',
    category: 'Ignition',
    quantity: 25,
    minQuantity: 15,
    unitCost: 28.75,
    supplierId: 'ent-2',
    location: 'Shelf C-3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

const seedLifts: Lift[] = [
  {
    id: 'lift-1',
    name: 'Lift Bay 1',
    type: 'two_post',
    status: 'available',
    capacity: 12,
    location: 'Bay 1',
    lastMaintenance: new Date('2024-09-01'),
    nextMaintenance: new Date('2025-03-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-2',
    name: 'Lift Bay 2',
    type: 'two_post',
    status: 'occupied',
    currentRO: 'ro-1',
    capacity: 12,
    location: 'Bay 2',
    lastMaintenance: new Date('2024-08-15'),
    nextMaintenance: new Date('2025-02-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-3',
    name: 'Lift Bay 3',
    type: 'four_post',
    status: 'available',
    capacity: 15,
    location: 'Bay 3',
    lastMaintenance: new Date('2024-09-15'),
    nextMaintenance: new Date('2025-03-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-4',
    name: 'Lift Bay 4',
    type: 'scissor',
    status: 'maintenance',
    capacity: 8,
    location: 'Bay 4',
    lastMaintenance: new Date('2024-10-01'),
    nextMaintenance: new Date('2025-04-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-5',
    name: 'Lift Bay 5',
    type: 'two_post',
    status: 'available',
    capacity: 12,
    location: 'Bay 5',
    lastMaintenance: new Date('2024-09-20'),
    nextMaintenance: new Date('2025-03-20'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-6',
    name: 'Lift Bay 6',
    type: 'two_post',
    status: 'occupied',
    currentRO: 'ro-2',
    capacity: 12,
    location: 'Bay 6',
    lastMaintenance: new Date('2024-08-30'),
    nextMaintenance: new Date('2025-02-28'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-7',
    name: 'Alignment Rack 1',
    type: 'alignment',
    status: 'available',
    capacity: 5,
    location: 'Alignment Bay 1',
    lastMaintenance: new Date('2024-09-10'),
    nextMaintenance: new Date('2025-03-10'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-8',
    name: 'Alignment Rack 2',
    type: 'alignment',
    status: 'available',
    capacity: 5,
    location: 'Alignment Bay 2',
    lastMaintenance: new Date('2024-09-05'),
    nextMaintenance: new Date('2025-03-05'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-9',
    name: 'Lift Bay 7',
    type: 'four_post',
    status: 'out_of_order',
    capacity: 15,
    location: 'Bay 7',
    lastMaintenance: new Date('2024-07-01'),
    nextMaintenance: new Date('2025-01-01'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-10',
    name: 'Lift Bay 8',
    type: 'two_post',
    status: 'available',
    capacity: 12,
    location: 'Bay 8',
    lastMaintenance: new Date('2024-09-25'),
    nextMaintenance: new Date('2025-03-25'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-11',
    name: 'Scissor Lift 2',
    type: 'scissor',
    status: 'available',
    capacity: 8,
    location: 'Bay 9',
    lastMaintenance: new Date('2024-09-18'),
    nextMaintenance: new Date('2025-03-18'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lift-12',
    name: 'Lift Bay 10',
    type: 'two_post',
    status: 'occupied',
    currentRO: 'ro-3',
    capacity: 12,
    location: 'Bay 10',
    lastMaintenance: new Date('2024-08-20'),
    nextMaintenance: new Date('2025-02-20'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

const seedROs: RO[] = [
  {
    id: 'ro-1',
    number: 'RO-2024-001',
    vehicleId: 'veh-1',
    customerId: 'ent-1',
    description: 'Brake pad replacement and oil change',
    status: 'in_progress',
    priority: 'medium',
    estimatedCompletion: new Date('2024-10-05'),
    phases: [
      {
        id: 'phase-1',
        name: 'Inspection',
        description: 'Initial vehicle inspection',
        estimatedHours: 1,
        status: 'completed',
        startDate: new Date('2024-09-28'),
        endDate: new Date('2024-09-28'),
        assignedTechId: 'tech-1',
        order: 1
      },
      {
        id: 'phase-2',
        name: 'Brake Service',
        description: 'Replace front brake pads',
        estimatedHours: 2.5,
        status: 'in_progress',
        startDate: new Date('2024-09-29'),
        assignedTechId: 'tech-2',
        order: 2
      },
      {
        id: 'phase-3',
        name: 'Oil Change',
        description: 'Complete oil and filter change',
        estimatedHours: 1,
        status: 'pending',
        assignedTechId: 'tech-1',
        order: 3
      }
    ],
    assignedTechs: ['tech-1', 'tech-2'],
    createdAt: new Date('2024-09-28'),
    updatedAt: new Date('2024-09-29')
  },
  {
    id: 'ro-2',
    number: 'RO-2024-002',
    vehicleId: 'veh-2',
    customerId: 'ent-3',
    description: 'Tire rotation and alignment',
    status: 'in_progress',
    priority: 'low',
    estimatedCompletion: new Date('2024-10-03'),
    phases: [
      {
        id: 'phase-4',
        name: 'Tire Rotation',
        description: 'Rotate all four tires',
        estimatedHours: 0.5,
        status: 'completed',
        startDate: new Date('2024-09-30'),
        endDate: new Date('2024-09-30'),
        assignedTechId: 'tech-2',
        order: 1
      },
      {
        id: 'phase-5',
        name: 'Wheel Alignment',
        description: 'Four wheel alignment',
        estimatedHours: 1.5,
        status: 'in_progress',
        startDate: new Date('2024-10-01'),
        assignedTechId: 'tech-2',
        order: 2
      }
    ],
    assignedTechs: ['tech-2'],
    createdAt: new Date('2024-09-30'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'ro-3',
    number: 'RO-2024-003',
    vehicleId: 'veh-1',
    customerId: 'ent-1',
    description: 'Engine diagnostic and tune-up',
    status: 'open',
    priority: 'high',
    estimatedCompletion: new Date('2024-10-08'),
    phases: [
      {
        id: 'phase-6',
        name: 'Diagnostic Scan',
        description: 'OBD-II diagnostic scan',
        estimatedHours: 1,
        status: 'pending',
        order: 1
      },
      {
        id: 'phase-7',
        name: 'Tune-up',
        description: 'Spark plugs and air filter replacement',
        estimatedHours: 2,
        status: 'pending',
        order: 2
      }
    ],
    assignedTechs: [],
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-01')
  }
];

const seedAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Oil Filter quantity is below minimum threshold (3 remaining, minimum 10)',
    entityId: 'part-2',
    entityType: 'part',
    isRead: false,
    createdAt: new Date('2024-10-01'),
    expiresAt: new Date('2024-10-08')
  },
  {
    id: 'alert-2',
    type: 'info',
    title: 'Maintenance Due',
    message: 'Lift Bay 4 is due for maintenance on 2025-04-01',
    entityId: 'lift-4',
    entityType: 'lift',
    isRead: false,
    createdAt: new Date('2024-09-25')
  },
  {
    id: 'alert-3',
    type: 'error',
    title: 'Overdue Repair Order',
    message: 'RO-2024-001 is past its estimated completion date',
    entityId: 'ro-1',
    entityType: 'ro',
    isRead: false,
    createdAt: new Date('2024-10-06')
  }
];

const seedPOs: PO[] = [
  {
    id: 'po-1',
    number: 'PO-2024-001',
    supplierId: 'ent-2',
    parts: [
      {
        partId: 'part-2',
        quantity: 20,
        unitPrice: 12.50
      }
    ],
    status: 'approved',
    totalAmount: 250.00,
    expectedDelivery: new Date('2024-10-10'),
    createdAt: new Date('2024-09-28'),
    updatedAt: new Date('2024-09-29')
  }
];

const seedEstimates: Estimate[] = [
  {
    id: 'est-1',
    roId: 'ro-1',
    items: [
      {
        id: 'item-1',
        type: 'labor',
        description: 'Brake pad replacement',
        quantity: 2.5,
        unitPrice: 85,
        totalPrice: 212.50
      },
      {
        id: 'item-2',
        type: 'part',
        description: 'Brake pads',
        quantity: 1,
        unitPrice: 91.98,
        totalPrice: 91.98
      },
      {
        id: 'item-3',
        type: 'labor',
        description: 'Oil change',
        quantity: 1,
        unitPrice: 85,
        totalPrice: 85.00
      }
    ],
    laborTotal: 297.50,
    partsTotal: 91.98,
    taxTotal: 31.37,
    discountTotal: 0,
    grandTotal: 420.85,
    validUntil: new Date('2024-10-15'),
    status: 'approved',
    createdAt: new Date('2024-09-28'),
    updatedAt: new Date('2024-09-28')
  }
];

const seedApprovals: Approval[] = [
  {
    id: 'app-1',
    entityId: 'est-1',
    entityType: 'estimate',
    requestedBy: 'tech-1',
    approvedBy: 'ent-1',
    status: 'approved',
    amount: 420.85,
    requestedAt: new Date('2024-09-28'),
    approvedAt: new Date('2024-09-29')
  }
];

const seedCoreItems: CoreItem[] = [
  {
    id: 'core-1',
    name: 'Aluminum Wheel',
    description: '18" aluminum alloy wheel',
    category: 'Wheels',
    value: 150.00,
    condition: 'refurbished',
    location: 'Core Storage A-1',
    status: 'available',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const useShop = create<ShopState>()(
  devtools(
    (set, get) => ({
      // Initial state with seed data
      entities: seedEntities,
      techs: seedTechs,
      vehicles: seedVehicles,
      ros: seedROs,
      parts: seedParts,
      pos: seedPOs,
      lifts: seedLifts,
      alerts: seedAlerts,
      estimates: seedEstimates,
      approvals: seedApprovals,
      coreItems: seedCoreItems,

      // Computed selectors
      getOpenLifts: () => {
        const { lifts } = get();
        return lifts.filter(lift => lift.status === 'available');
      },

      getOverdueROs: () => {
        const { ros } = get();
        const now = new Date();
        return ros.filter(ro =>
          ro.estimatedCompletion &&
          ro.estimatedCompletion < now &&
          ro.status !== 'completed' &&
          ro.status !== 'closed'
        );
      },

      getTechWorkload: () => {
        const { ros, techs } = get();
        const workload: Record<string, number> = {};

        techs.forEach(tech => {
          workload[tech.id] = 0;
        });

        ros.forEach(ro => {
          if (ro.status === 'in_progress') {
            ro.assignedTechs.forEach(techId => {
              workload[techId] = (workload[techId] || 0) + 1;
            });
          }
        });

        return workload;
      },

      getLowStockParts: () => {
        const { parts } = get();
        return parts.filter(part => part.quantity <= part.minQuantity);
      },

      getEntityKPIs: () => {
        const { entities, ros, parts, lifts, techs, estimates } = get();

        const totalROs = ros.length;
        const openROs = ros.filter(ro => ro.status === 'open' || ro.status === 'in_progress').length;
        const completedROs = ros.filter(ro => ro.status === 'completed' || ro.status === 'closed').length;
        const lowStockParts = parts.filter(part => part.quantity <= part.minQuantity).length;
        const availableLifts = lifts.filter(lift => lift.status === 'available').length;
        const busyTechs = techs.filter(tech => tech.availability === 'busy').length;

        return {
          totalEntities: entities.length,
          totalROs,
          openROs,
          completedROs,
          completionRate: totalROs > 0 ? (completedROs / totalROs) * 100 : 0,
          lowStockParts,
          availableLifts,
          busyTechs,
          totalRevenue: estimates.reduce((sum, est) => sum + est.grandTotal, 0)
        };
      },

      // Action stubs
      assignTech: (roId: string, techId: string, phaseId?: string) => {
        console.log(`Assigning tech ${techId} to RO ${roId}`, phaseId ? `for phase ${phaseId}` : '');
        // Implementation would update RO and tech assignments
        set((state) => ({
          ros: state.ros.map(ro =>
            ro.id === roId
              ? {
                  ...ro,
                  assignedTechs: phaseId
                    ? ro.assignedTechs
                    : [...new Set([...ro.assignedTechs, techId])],
                  phases: phaseId
                    ? ro.phases.map(phase =>
                        phase.id === phaseId
                          ? { ...phase, assignedTechId: techId }
                          : phase
                      )
                    : ro.phases,
                  updatedAt: new Date()
                }
              : ro
          )
        }));
      },

      advancePhase: (roId: string, phaseId: string) => {
        console.log(`Advancing phase ${phaseId} for RO ${roId}`);
        // Implementation would update phase status and potentially start next phase
        set((state) => ({
          ros: state.ros.map(ro =>
            ro.id === roId
              ? {
                  ...ro,
                  phases: ro.phases.map(phase =>
                    phase.id === phaseId
                      ? {
                          ...phase,
                          status: phase.status === 'pending' ? 'in_progress' :
                                  phase.status === 'in_progress' ? 'completed' : phase.status,
                          startDate: phase.startDate || new Date(),
                          endDate: phase.status === 'in_progress' ? new Date() : phase.endDate
                        }
                      : phase
                  ),
                  updatedAt: new Date()
                }
              : ro
          )
        }));
      },

      createPO: (supplierId: string, parts: Array<{ partId: string; quantity: number; unitPrice: number }>) => {
        console.log(`Creating PO for supplier ${supplierId} with ${parts.length} parts`);
        const totalAmount = parts.reduce((sum, part) => sum + (part.quantity * part.unitPrice), 0);
        const newPO: PO = {
          id: `po-${Date.now()}`,
          number: `PO-2024-${String(get().pos.length + 1).padStart(3, '0')}`,
          supplierId,
          parts,
          status: 'draft',
          totalAmount,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        set((state) => ({
          pos: [...state.pos, newPO]
        }));
      },

      requestApproval: (entityId: string, entityType: 'estimate' | 'po' | 'ro', amount?: number) => {
        console.log(`Requesting approval for ${entityType} ${entityId}`, amount ? `amount: ${amount}` : '');
        const newApproval: Approval = {
          id: `app-${Date.now()}`,
          entityId,
          entityType,
          requestedBy: 'system', // Would be current user in real app
          status: 'pending',
          amount,
          requestedAt: new Date()
        };
        set((state) => ({
          approvals: [...state.approvals, newApproval]
        }));
      },

      scanQR: (payload: QRPayload) => {
        console.log('QR scanned:', payload);
        // Implementation would handle different QR types (part scan, vehicle checkin, work completion)
        // For now, just log the payload
      },

      flagRework: (roId: string, phaseId: string, reason: string) => {
        console.log(`Flagging rework for RO ${roId}, phase ${phaseId}: ${reason}`);
        // Implementation would create a new phase or update existing phase status
        set((state) => ({
          ros: state.ros.map(ro =>
            ro.id === roId
              ? {
                  ...ro,
                  phases: ro.phases.map(phase =>
                    phase.id === phaseId
                      ? { ...phase, status: 'on_hold' as const }
                      : phase
                  ),
                  updatedAt: new Date()
                }
              : ro
          )
        }));
      }
    }),
    {
      name: 'shop-store',
    }
  )
);
