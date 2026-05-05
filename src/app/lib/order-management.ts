/**
 * Order Management System - 90-Minute Setup Workflow
 * Handles the complete order lifecycle from creation to completion
 */

import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { 
  Order, 
  OrderMilestone, 
  Collections, 
  calculateSLADeadline, 
  isSLACompliant 
} from './database-schema';

// 90-Minute Setup Milestones Template
const SETUP_MILESTONES: Omit<OrderMilestone, 'id' | 'startTime' | 'completionTime' | 'actualDuration'>[] = [
  {
    name: 'Initial Consultation',
    description: 'Review requirements and confirm details',
    status: 'pending',
    estimatedDuration: 5,
    assignee: 'project_manager'
  },
  {
    name: 'Platform Setup',
    description: 'Initialize e-commerce platform',
    status: 'pending',
    estimatedDuration: 10,
    assignee: 'developer'
  },
  {
    name: 'Domain Configuration',
    description: 'Setup domain and SSL certificate',
    status: 'pending',
    estimatedDuration: 8,
    assignee: 'developer'
  },
  {
    name: 'Design Implementation',
    description: 'Apply theme and customize design',
    status: 'pending',
    estimatedDuration: 15,
    assignee: 'designer'
  },
  {
    name: 'Payment Gateway Integration',
    description: 'Configure payment processors',
    status: 'pending',
    estimatedDuration: 12,
    assignee: 'developer'
  },
  {
    name: 'Product Catalog Setup',
    description: 'Import and configure products',
    status: 'pending',
    estimatedDuration: 20,
    assignee: 'content_manager'
  },
  {
    name: 'Mobile Optimization',
    description: 'Ensure mobile responsiveness',
    status: 'pending',
    estimatedDuration: 10,
    assignee: 'developer'
  },
  {
    name: 'SEO Configuration',
    description: 'Basic SEO setup and meta tags',
    status: 'pending',
    estimatedDuration: 8,
    assignee: 'seo_specialist'
  },
  {
    name: 'Testing & QA',
    description: 'Comprehensive testing of all features',
    status: 'pending',
    estimatedDuration: 10,
    assignee: 'qa_tester'
  },
  {
    name: 'Final Review',
    description: 'Client review and approval',
    status: 'pending',
    estimatedDuration: 2,
    assignee: 'project_manager'
  }
];

export class OrderManager {
  
  /**
   * Create a new order with 90-minute setup workflow
   */
  static async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'milestones'>): Promise<string> {
    try {
      // Generate order number
      const orderNumber = await this.generateOrderNumber();
      
      // Create milestones with unique IDs
      const milestones: OrderMilestone[] = SETUP_MILESTONES.map((milestone, index) => ({
        ...milestone,
        id: `milestone_${Date.now()}_${index}`
      }));
      
      const order: Omit<Order, 'id'> = {
        ...orderData,
        orderNumber,
        milestones,
        slaCompliant: true, // Initially true, updated when completed
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, Collections.ORDERS), order);
      
      // Send notifications
      await this.notifyTeam(docRef.id, 'new_order');
      await this.notifyClient(orderData.clientId, 'order_created', { orderId: docRef.id });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }
  
  /**
   * Start the 90-minute setup process
   */
  static async startSetup(orderId: string, assignedTeam: string[]): Promise<void> {
    try {
      const startTime = Timestamp.now();
      const deadline = calculateSLADeadline(startTime);
      
      await updateDoc(doc(db, Collections.ORDERS, orderId), {
        status: 'in_progress',
        startTime,
        deadline,
        assignedTeam,
        updatedAt: Timestamp.now()
      });
      
      // Start first milestone
      await this.startMilestone(orderId, 0);
      
      // Setup 90-minute timer
      this.setup90MinuteTimer(orderId);
      
      // Notify team and client
      await this.notifyTeam(orderId, 'setup_started');
      await this.notifyClient((await this.getOrder(orderId)).clientId, 'setup_started', { orderId });
      
    } catch (error) {
      console.error('Error starting setup:', error);
      throw new Error('Failed to start setup process');
    }
  }
  
  /**
   * Complete a milestone and move to next
   */
  static async completeMilestone(orderId: string, milestoneIndex: number, notes?: string): Promise<void> {
    try {
      const order = await this.getOrder(orderId);
      const milestones = [...order.milestones];
      
      // Complete current milestone
      milestones[milestoneIndex] = {
        ...milestones[milestoneIndex],
        status: 'completed',
        completionTime: Timestamp.now(),
        actualDuration: milestones[milestoneIndex].startTime 
          ? Math.round((Date.now() - milestones[milestoneIndex].startTime!.toMillis()) / 60000)
          : milestones[milestoneIndex].estimatedDuration,
        notes
      };
      
      // Start next milestone if exists
      const nextMilestoneIndex = milestoneIndex + 1;
      if (nextMilestoneIndex < milestones.length) {
        milestones[nextMilestoneIndex] = {
          ...milestones[nextMilestoneIndex],
          status: 'in_progress',
          startTime: Timestamp.now()
        };
      }
      
      await updateDoc(doc(db, Collections.ORDERS, orderId), {
        milestones,
        updatedAt: Timestamp.now()
      });
      
      // Check if all milestones completed
      if (nextMilestoneIndex >= milestones.length) {
        await this.completeSetup(orderId);
      }
      
      // Send progress update
      await this.sendProgressUpdate(orderId, milestoneIndex);
      
    } catch (error) {
      console.error('Error completing milestone:', error);
      throw new Error('Failed to complete milestone');
    }
  }
  
  /**
   * Complete the entire setup process
   */
  static async completeSetup(orderId: string): Promise<void> {
    try {
      const order = await this.getOrder(orderId);
      const completionTime = Timestamp.now();
      const slaCompliant = order.startTime ? isSLACompliant(order.startTime, completionTime) : false;
      
      // Calculate actual duration
      const actualDuration = order.startTime 
        ? completionTime.toMillis() - order.startTime.toMillis()
        : 0;
      
      await updateDoc(doc(db, Collections.ORDERS, orderId), {
        status: 'completed',
        completionTime,
        actualDuration,
        slaCompliant,
        updatedAt: Timestamp.now()
      });
      
      // Send completion notifications
      await this.notifyClient(order.clientId, 'setup_completed', { 
        orderId, 
        actualDuration: Math.round(actualDuration / 60000), // minutes
        slaCompliant 
      });
      
      // Generate completion report
      await this.generateCompletionReport(orderId);
      
      // Update team metrics
      await this.updateTeamMetrics(order.assignedTeam, actualDuration, slaCompliant);
      
    } catch (error) {
      console.error('Error completing setup:', error);
      throw new Error('Failed to complete setup');
    }
  }
  
  /**
   * Setup 90-minute countdown timer with alerts
   */
  private static setup90MinuteTimer(orderId: string): void {
    // 15-minute warning
    setTimeout(async () => {
      await this.sendTimeWarning(orderId, 15);
    }, 75 * 60 * 1000); // 75 minutes
    
    // 5-minute warning
    setTimeout(async () => {
      await this.sendTimeWarning(orderId, 5);
    }, 85 * 60 * 1000); // 85 minutes
    
    // SLA breach alert
    setTimeout(async () => {
      await this.handleSLABreach(orderId);
    }, 90 * 60 * 1000); // 90 minutes
  }
  
  /**
   * Handle SLA breach - escalate and notify
   */
  private static async handleSLABreach(orderId: string): Promise<void> {
    try {
      const order = await this.getOrder(orderId);
      
      if (order.status !== 'completed') {
        // Mark as SLA breach
        await updateDoc(doc(db, Collections.ORDERS, orderId), {
          slaCompliant: false,
          updatedAt: Timestamp.now()
        });
        
        // Escalate to management
        await this.escalateToManagement(orderId);
        
        // Notify client with apology and compensation
        await this.notifyClient(order.clientId, 'sla_breach', { orderId });
      }
    } catch (error) {
      console.error('Error handling SLA breach:', error);
    }
  }
  
  /**
   * Get order by ID
   */
  static async getOrder(orderId: string): Promise<Order> {
    const docSnap = await getDoc(doc(db, Collections.ORDERS, orderId));
    if (!docSnap.exists()) {
      throw new Error('Order not found');
    }
    return { id: docSnap.id, ...docSnap.data() } as Order;
  }
  
  /**
   * Get orders by client
   */
  static async getClientOrders(clientId: string): Promise<Order[]> {
    const q = query(
      collection(db, Collections.ORDERS),
      where('clientId', '==', clientId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }
  
  /**
   * Get active orders for team dashboard
   */
  static async getActiveOrders(): Promise<Order[]> {
    const q = query(
      collection(db, Collections.ORDERS),
      where('status', 'in', ['paid', 'in_progress']),
      orderBy('startTime', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
  }
  
  /**
   * Generate unique order number
   */
  private static async generateOrderNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    
    // Get count of orders for this month
    const startOfMonth = new Date(year, new Date().getMonth(), 1);
    const endOfMonth = new Date(year, new Date().getMonth() + 1, 0);
    
    const q = query(
      collection(db, Collections.ORDERS),
      where('createdAt', '>=', Timestamp.fromDate(startOfMonth)),
      where('createdAt', '<=', Timestamp.fromDate(endOfMonth))
    );
    
    const snapshot = await getDocs(q);
    const orderCount = snapshot.size + 1;
    
    return `OT-${year}${month}-${String(orderCount).padStart(3, '0')}`;
  }
  
  /**
   * Start a specific milestone
   */
  private static async startMilestone(orderId: string, milestoneIndex: number): Promise<void> {
    const order = await this.getOrder(orderId);
    const milestones = [...order.milestones];
    
    milestones[milestoneIndex] = {
      ...milestones[milestoneIndex],
      status: 'in_progress',
      startTime: Timestamp.now()
    };
    
    await updateDoc(doc(db, Collections.ORDERS, orderId), {
      milestones,
      updatedAt: Timestamp.now()
    });
  }
  
  /**
   * Send progress update to client
   */
  private static async sendProgressUpdate(orderId: string, completedMilestoneIndex: number): Promise<void> {
    const order = await this.getOrder(orderId);
    const completedCount = completedMilestoneIndex + 1;
    const totalCount = order.milestones.length;
    const progress = Math.round((completedCount / totalCount) * 100);
    
    await this.notifyClient(order.clientId, 'progress_update', {
      orderId,
      progress,
      completedMilestone: order.milestones[completedMilestoneIndex].name,
      nextMilestone: completedMilestoneIndex + 1 < totalCount 
        ? order.milestones[completedMilestoneIndex + 1].name 
        : 'Final Review'
    });
  }
  
  /**
   * Send time warning notifications
   */
  private static async sendTimeWarning(orderId: string, minutesRemaining: number): Promise<void> {
    const order = await this.getOrder(orderId);
    
    // Notify team
    await this.notifyTeam(orderId, 'time_warning', { minutesRemaining });
    
    // Notify client
    await this.notifyClient(order.clientId, 'time_update', { 
      orderId, 
      minutesRemaining,
      progress: this.calculateProgress(order.milestones)
    });
  }
  
  /**
   * Calculate completion progress percentage
   */
  private static calculateProgress(milestones: OrderMilestone[]): number {
    const completed = milestones.filter(m => m.status === 'completed').length;
    return Math.round((completed / milestones.length) * 100);
  }
  
  /**
   * Placeholder notification methods (implement with your notification system)
   */
  private static async notifyTeam(orderId: string, type: string, data?: any): Promise<void> {
    console.log(`🔔 Team notification: ${type} for order ${orderId}`, data);
    // TODO: Implement with Slack, Discord, or email notifications
  }
  
  private static async notifyClient(clientId: string, type: string, data?: any): Promise<void> {
    console.log(`📧 Client notification: ${type} for client ${clientId}`, data);
    // TODO: Implement with email templates and WhatsApp
  }
  
  private static async escalateToManagement(orderId: string): Promise<void> {
    console.log(`🚨 Escalating order ${orderId} to management`);
    // TODO: Implement management escalation
  }
  
  private static async generateCompletionReport(orderId: string): Promise<void> {
    console.log(`📊 Generating completion report for order ${orderId}`);
    // TODO: Generate PDF report with setup details and handoff instructions
  }
  
  private static async updateTeamMetrics(teamMembers: string[], duration: number, slaCompliant: boolean): Promise<void> {
    console.log(`📈 Updating metrics for team members:`, teamMembers);
    // TODO: Update individual team member performance metrics
  }
}

// Export convenience functions
export const createOrder = OrderManager.createOrder;
export const startSetup = OrderManager.startSetup;
export const completeMilestone = OrderManager.completeMilestone;
export const getOrder = OrderManager.getOrder;
export const getClientOrders = OrderManager.getClientOrders;