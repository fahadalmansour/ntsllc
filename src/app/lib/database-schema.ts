/**
 * NeoTechnology Solutions - Database Schema & Models
 * Firebase/Firestore collection interfaces and validation
 */

import { Timestamp } from 'firebase/firestore';

// Core Client Management
export interface Client {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  country: 'US' | 'SA' | 'AE' | 'KW' | 'QR' | 'BH' | 'OM';
  preferredLanguage: 'en' | 'ar';
  timezone: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActivity: Timestamp;
  status: 'active' | 'inactive' | 'suspended';
  totalSpent: number;
  currency: 'USD' | 'SAR' | 'AED' | 'KWD' | 'QAR' | 'BHD' | 'OMR';
  source: 'website' | 'referral' | 'social' | 'ads' | 'direct';
  tags: string[];
}

// Order Management System
export interface Order {
  id: string;
  clientId: string;
  orderNumber: string; // OT-2024-001
  service: 'shopify' | 'woocommerce' | 'salla' | 'zid' | 'custom';
  package: 'basic' | 'premium' | 'enterprise';
  status: 'pending_payment' | 'paid' | 'in_progress' | 'review' | 'completed' | 'cancelled' | 'refunded';
  
  // Pricing
  subtotal: number;
  tax: number;
  total: number;
  currency: 'USD' | 'SAR' | 'AED' | 'KWD' | 'QAR' | 'BHD' | 'OMR';
  
  // 90-Minute Timer Tracking
  startTime?: Timestamp;
  completionTime?: Timestamp;
  deadline?: Timestamp; // startTime + 90 minutes
  actualDuration?: number; // milliseconds
  slaCompliant: boolean;
  
  // Payment
  paymentStatus: 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer' | 'mada' | 'stc_pay';
  paymentIntentId?: string;
  invoiceId?: string;
  
  // Store Details
  storeName: string;
  storeUrl?: string;
  domain?: string;
  requirements: OrderRequirements;
  
  // Team Assignment
  assignedTeam: string[];
  projectManager: string;
  
  // Progress Tracking
  milestones: OrderMilestone[];
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderRequirements {
  platform: string;
  niche: string;
  products: number;
  languages: string[];
  paymentGateways: string[];
  shippingZones: string[];
  integrations: string[];
  customFeatures: string[];
  logoUrl?: string;
  brandColors: string[];
  sampleProducts?: any[];
}

export interface OrderMilestone {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  startTime?: Timestamp;
  completionTime?: Timestamp;
  estimatedDuration: number; // minutes
  actualDuration?: number; // minutes
  assignee: string;
  notes?: string;
}

// SaaS Subscriptions
export interface Subscription {
  id: string;
  clientId: string;
  productId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: Timestamp;
  currentPeriodEnd: Timestamp;
  trialEnd?: Timestamp;
  cancelAtPeriodEnd: boolean;
  
  // Pricing
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  
  // Stripe/PayPal IDs
  stripeSubscriptionId?: string;
  paypalSubscriptionId?: string;
  
  // Usage tracking
  usage: {
    [key: string]: number;
  };
  limits: {
    [key: string]: number;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Support Ticket System
export interface SupportTicket {
  id: string;
  clientId: string;
  orderId?: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature_request' | 'bug' | 'general';
  
  // Assignment
  assignedTo?: string;
  assignedTeam?: string;
  
  // SLA Tracking
  createdAt: Timestamp;
  firstResponseAt?: Timestamp;
  resolvedAt?: Timestamp;
  closedAt?: Timestamp;
  
  // Response times based on priority
  slaResponseTime: number; // minutes
  slaResolutionTime: number; // hours
  
  messages: TicketMessage[];
  
  // Client satisfaction
  rating?: number; // 1-5
  feedback?: string;
  
  tags: string[];
  attachments: string[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  authorId: string;
  authorType: 'client' | 'staff' | 'system';
  content: string;
  timestamp: Timestamp;
  attachments: string[];
  isInternal: boolean; // Staff-only notes
}

// Invoice System
export interface Invoice {
  id: string;
  invoiceNumber: string; // INV-2024-001
  clientId: string;
  orderId?: string;
  
  // Invoice Details
  issueDate: Timestamp;
  dueDate: Timestamp;
  paidAt?: Timestamp;
  
  // Status
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  
  // Line Items
  items: InvoiceItem[];
  
  // Totals
  subtotal: number;
  taxRate: number; // 15% for Saudi Arabia
  taxAmount: number;
  total: number;
  currency: string;
  
  // Payment
  paymentTerms: string; // "Net 30"
  paymentMethod?: string;
  paymentReference?: string;
  
  // Localization
  language: 'en' | 'ar';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxable: boolean;
}

// Email Campaign System
export interface EmailCampaign {
  id: string;
  name: string;
  type: 'welcome' | 'onboarding' | 'promotion' | 'newsletter' | 'follow_up';
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled';
  
  // Content
  subject: string;
  htmlContent: string;
  textContent: string;
  language: 'en' | 'ar';
  
  // Targeting
  audience: 'all' | 'segment';
  segmentFilter?: any;
  recipients: string[]; // client IDs
  
  // Scheduling
  scheduledAt?: Timestamp;
  sentAt?: Timestamp;
  
  // Analytics
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
  
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Automation Workflow
export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  type: 'n8n' | 'zapier' | 'custom';
  status: 'active' | 'paused' | 'draft';
  
  // Trigger
  trigger: {
    type: 'order_created' | 'payment_received' | 'milestone_completed' | 'time_based';
    conditions: any;
  };
  
  // Actions
  actions: WorkflowAction[];
  
  // Execution Stats
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  lastRun?: Timestamp;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface WorkflowAction {
  id: string;
  type: 'email' | 'sms' | 'webhook' | 'update_record' | 'create_task';
  config: any;
  order: number;
}

// Analytics Events
export interface AnalyticsEvent {
  id: string;
  eventType: string;
  userId?: string;
  sessionId: string;
  timestamp: Timestamp;
  
  // Event data
  properties: {
    [key: string]: any;
  };
  
  // Context
  userAgent: string;
  ip: string;
  country: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

// System Configuration
export interface SystemConfig {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json';
  description: string;
  updatedBy: string;
  updatedAt: Timestamp;
}

// Team Member
export interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'project_manager' | 'developer' | 'designer' | 'support';
  permissions: string[];
  isActive: boolean;
  
  // Performance Metrics
  metrics: {
    averageSetupTime: number; // minutes
    completedProjects: number;
    clientSatisfaction: number; // 1-5
    slaCompliance: number; // percentage
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Collection Names (for Firestore)
export const Collections = {
  CLIENTS: 'clients',
  ORDERS: 'orders',
  SUBSCRIPTIONS: 'subscriptions',
  SUPPORT_TICKETS: 'support_tickets',
  INVOICES: 'invoices',
  EMAIL_CAMPAIGNS: 'email_campaigns',
  AUTOMATION_WORKFLOWS: 'automation_workflows',
  ANALYTICS_EVENTS: 'analytics_events',
  SYSTEM_CONFIG: 'system_config',
  TEAM_MEMBERS: 'team_members'
} as const;

// Default SLA Times (in minutes)
export const SLA_TIMES = {
  SETUP_DURATION: 90, // 90 minutes for store setup
  SUPPORT_RESPONSE: {
    low: 240,      // 4 hours
    medium: 120,   // 2 hours  
    high: 60,      // 1 hour
    urgent: 15     // 15 minutes
  },
  SUPPORT_RESOLUTION: {
    low: 48,       // 48 hours
    medium: 24,    // 24 hours
    high: 8,       // 8 hours
    urgent: 4      // 4 hours
  }
} as const;

// Validation Helpers
export const validateOrder = (order: Partial<Order>): string[] => {
  const errors: string[] = [];
  
  if (!order.clientId) errors.push('Client ID is required');
  if (!order.service) errors.push('Service type is required');
  if (!order.package) errors.push('Package type is required');
  if (!order.total || order.total <= 0) errors.push('Valid total amount is required');
  if (!order.currency) errors.push('Currency is required');
  if (!order.storeName) errors.push('Store name is required');
  
  return errors;
};

export const calculateSLADeadline = (startTime: Timestamp): Timestamp => {
  const deadline = new Date(startTime.toMillis() + (SLA_TIMES.SETUP_DURATION * 60 * 1000));
  return Timestamp.fromDate(deadline);
};

export const isSLACompliant = (startTime: Timestamp, completionTime: Timestamp): boolean => {
  const duration = completionTime.toMillis() - startTime.toMillis();
  const maxDuration = SLA_TIMES.SETUP_DURATION * 60 * 1000; // 90 minutes in milliseconds
  return duration <= maxDuration;
};