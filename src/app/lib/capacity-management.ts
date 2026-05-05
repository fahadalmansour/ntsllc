/**
 * NeoTechnology Solutions - Dynamic Capacity Management System
 * Smart capacity-based pricing and timeline management
 */

export interface DynamicTimeSystem {
  baseTimelines: {
    lightning: { standard: number; busy: number; peak: number };
    thunder: { standard: number; busy: number; peak: number };
    storm: { standard: number; busy: number; peak: number };
  };
  currentLoad: {
    activeProjects: number;
    queueDepth: number;
    teamCapacity: number;
    majorClients: string[];
    utilization: number;
    hasEnterpriseClient: boolean;
  };
  adjustments: {
    timeMultiplier: number;
    priceAdjustment: number;
    guaranteeActive: boolean;
  };
}

export interface DeliveryEstimate {
  timeline: number;
  status: 'standard' | 'busy' | 'peak';
  message: string;
  discount: number;
  guarantee: boolean;
  alternativeSlots: AlternativeSlot[];
  originalTimeline: number;
  adjustedPrice: number;
  savings: number;
}

export interface AlternativeSlot {
  id: string;
  date: string;
  time: string;
  timeline: number;
  status: 'standard' | 'busy';
  available: boolean;
}

export interface CapacityStatus {
  current: number;
  threshold: number;
  mode: 'standard' | 'busy' | 'peak';
  activeProjects: number;
  queueDepth: number;
  teamAvailable: number;
  totalTeam: number;
  majorClients: Array<{
    name: string;
    project: string;
    progress: number;
    status: 'in_progress' | 'planning' | 'deployment';
  }>;
  lastUpdated: Date;
}

// Base service configurations
export const serviceConfig = {
  lightning: {
    basePrice: 799,
    standardTime: 4,
    busyTime: 8,
    peakTime: 12,
    name: 'Lightning Launch'
  },
  thunder: {
    basePrice: 1299,
    standardTime: 24,
    busyTime: 48,
    peakTime: 72,
    name: 'Thunder Setup'
  },
  storm: {
    basePrice: 2999,
    standardTime: 72,
    busyTime: 120,
    peakTime: 168,
    name: 'Storm Complete'
  }
} as const;

// Current capacity simulation (in production, this would come from your database)
let currentCapacityData: CapacityStatus = {
  current: 75,
  threshold: 80,
  mode: 'busy',
  activeProjects: 12,
  queueDepth: 8,
  teamAvailable: 5,
  totalTeam: 12,
  majorClients: [
    {
      name: 'HungerStation',
      project: 'Multi-vendor marketplace platform',
      progress: 65,
      status: 'in_progress'
    }
  ],
  lastUpdated: new Date()
};

/**
 * Get current capacity load from database/cache
 */
export async function getCurrentCapacityLoad(): Promise<CapacityStatus> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, fetch from your database
  return {
    ...currentCapacityData,
    lastUpdated: new Date()
  };
}

/**
 * Calculate dynamic delivery time based on current capacity
 */
export async function calculateDeliveryTime(
  tier: keyof typeof serviceConfig
): Promise<DeliveryEstimate> {
  const load = await getCurrentCapacityLoad();
  const service = serviceConfig[tier];
  
  // Peak mode - Enterprise client active
  if (load.mode === 'peak' || load.majorClients.length > 0) {
    const timeline = service.peakTime;
    const discount = 20;
    const adjustedPrice = Math.round(service.basePrice * (1 - discount / 100));
    const savings = service.basePrice - adjustedPrice;
    
    return {
      timeline,
      originalTimeline: service.standardTime,
      status: 'peak',
      message: `Currently serving enterprise client (${load.majorClients[0]?.name || 'Major Client'})`,
      discount,
      guarantee: false, // Time guarantee suspended during peak
      alternativeSlots: await generateAlternativeSlots(tier),
      adjustedPrice,
      savings
    };
  }
  
  // Busy mode - High utilization
  if (load.current > load.threshold) {
    const timeline = service.busyTime;
    const discount = 10;
    const adjustedPrice = Math.round(service.basePrice * (1 - discount / 100));
    const savings = service.basePrice - adjustedPrice;
    
    return {
      timeline,
      originalTimeline: service.standardTime,
      status: 'busy',
      message: 'High demand - Extended timeline with discount',
      discount,
      guarantee: true, // Still guaranteed, just longer
      alternativeSlots: await generateAlternativeSlots(tier),
      adjustedPrice,
      savings
    };
  }
  
  // Standard mode
  return {
    timeline: service.standardTime,
    originalTimeline: service.standardTime,
    status: 'standard',
    message: 'Standard delivery time available',
    discount: 0,
    guarantee: true,
    alternativeSlots: [],
    adjustedPrice: service.basePrice,
    savings: 0
  };
}

/**
 * Generate alternative time slots when standard times aren't available
 */
export async function generateAlternativeSlots(
  tier: keyof typeof serviceConfig
): Promise<AlternativeSlot[]> {
  const service = serviceConfig[tier];
  const slots: AlternativeSlot[] = [];
  
  // Generate next 7 days of potential slots
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Simulate different availability based on day of week
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const utilization = isWeekend ? 40 : Math.random() * 100;
    
    if (utilization < 80) {
      slots.push({
        id: `slot-${i}`,
        date: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        time: utilization < 60 ? `${service.standardTime}h` : `${service.busyTime}h`,
        timeline: utilization < 60 ? service.standardTime : service.busyTime,
        status: utilization < 60 ? 'standard' : 'busy',
        available: true
      });
    }
  }
  
  return slots.slice(0, 3); // Return top 3 options
}

/**
 * Update capacity status (Admin function)
 */
export async function updateCapacityStatus(updates: Partial<CapacityStatus>): Promise<void> {
  const previousMode = currentCapacityData.mode;
  
  currentCapacityData = {
    ...currentCapacityData,
    ...updates,
    lastUpdated: new Date()
  };
  
  // In production, save to database
  console.log('Capacity updated:', currentCapacityData);
  
  // Trigger notifications if mode changed
  if (updates.mode && updates.mode !== previousMode) {
    await notifyCapacityChange(updates.mode, previousMode);
  }
}

/**
 * Check if service needs capacity notification
 */
export async function needsCapacityNotification(
  tier: keyof typeof serviceConfig
): Promise<boolean> {
  const estimate = await calculateDeliveryTime(tier);
  return estimate.status !== 'standard';
}

/**
 * Send capacity change notifications
 */
export async function notifyCapacityChange(mode: string, previousMode?: string): Promise<void> {
  try {
    // Import notification system dynamically to avoid circular dependencies
    const { broadcastCapacityNotification } = await import('./notification-system');
    
    // Get current capacity data
    const currentCapacity = await getCurrentCapacityLoad();
    
    // Send notifications to all subscribers
    await broadcastCapacityNotification(currentCapacity, previousMode);
    
    console.log('✅ Capacity change notifications sent successfully');
  } catch (error) {
    console.error('❌ Failed to send capacity change notifications:', error);
  }
}

/**
 * Get capacity history for analytics
 */
export async function getCapacityHistory(days: number = 30): Promise<Array<{
  date: Date;
  utilization: number;
  mode: string;
  activeProjects: number;
}>> {
  // Simulate historical data
  const history = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    history.push({
      date,
      utilization: Math.floor(Math.random() * 100),
      mode: Math.random() > 0.7 ? 'busy' : 'standard',
      activeProjects: Math.floor(Math.random() * 15) + 5
    });
  }
  
  return history;
}

/**
 * Predict future capacity needs
 */
export async function predictCapacityNeeds(days: number = 7): Promise<Array<{
  date: Date;
  predictedUtilization: number;
  recommendedMode: string;
  confidence: number;
}>> {
  const predictions = [];
  const currentUtil = currentCapacityData.current;
  
  for (let i = 1; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Simple prediction algorithm (in production, use ML models)
    const trend = (Math.random() - 0.5) * 20;
    const seasonal = Math.sin(i / 7 * Math.PI) * 10; // Weekly pattern
    const predicted = Math.max(0, Math.min(100, currentUtil + trend + seasonal));
    
    predictions.push({
      date,
      predictedUtilization: Math.round(predicted),
      recommendedMode: predicted > 80 ? 'busy' : 'standard',
      confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    });
  }
  
  return predictions;
}

/**
 * Analytics functions
 */
export const capacityAnalytics = {
  /**
   * Get average response time by service tier
   */
  async getAverageResponseTimes(): Promise<Record<string, number>> {
    return {
      lightning: 4.2,
      thunder: 26.8,
      storm: 78.5
    };
  },
  
  /**
   * Get customer satisfaction by capacity mode
   */
  async getSatisfactionByMode(): Promise<Record<string, number>> {
    return {
      standard: 4.9,
      busy: 4.7,
      peak: 4.3
    };
  },
  
  /**
   * Get revenue impact of dynamic pricing
   */
  async getRevenueImpact(): Promise<{
    totalRevenue: number;
    discountGiven: number;
    customerRetention: number;
  }> {
    return {
      totalRevenue: 156780,
      discountGiven: 12340,
      customerRetention: 0.94
    };
  }
};

export default {
  getCurrentCapacityLoad,
  calculateDeliveryTime,
  generateAlternativeSlots,
  updateCapacityStatus,
  needsCapacityNotification,
  notifyCapacityChange,
  getCapacityHistory,
  predictCapacityNeeds,
  capacityAnalytics,
  serviceConfig
};