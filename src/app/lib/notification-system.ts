/**
 * Advanced Notification System for Capacity Management
 * Handles SMS, WhatsApp, Email, and in-app notifications
 */

import { CapacityStatus } from './capacity-management';

export interface NotificationConfig {
  sms: boolean;
  whatsapp: boolean;
  email: boolean;
  inApp: boolean;
  language: 'ar' | 'en';
}

export interface Subscriber {
  id: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  preferences: NotificationConfig;
  subscriptionDate: Date;
  active: boolean;
}

export interface NotificationTemplate {
  id: string;
  type: 'capacity_change' | 'order_update' | 'maintenance' | 'promotion';
  title: {
    ar: string;
    en: string;
  };
  message: {
    ar: string;
    en: string;
  };
  urgent: boolean;
}

// Mock subscriber database (in production, use your database)
let subscribers: Subscriber[] = [
  {
    id: 'user-1',
    phone: '+966501234567',
    email: 'customer@example.com',
    whatsapp: '+966501234567',
    preferences: {
      sms: true,
      whatsapp: true,
      email: true,
      inApp: true,
      language: 'ar'
    },
    subscriptionDate: new Date(),
    active: true
  },
  {
    id: 'user-2',
    phone: '+15551234567',
    email: 'customer2@example.com',
    whatsapp: '+15551234567',
    preferences: {
      sms: false,
      whatsapp: true,
      email: true,
      inApp: true,
      language: 'en'
    },
    subscriptionDate: new Date(),
    active: true
  }
];

// Notification templates
const templates: NotificationTemplate[] = [
  {
    id: 'capacity_high_demand',
    type: 'capacity_change',
    title: {
      ar: '⚠️ تحديث نيو تكنولوجي',
      en: '⚠️ NeoTechnology Update'
    },
    message: {
      ar: `بسبب الطلب العالي، تم تعديل الجداول الزمنية مؤقتاً:

البرق: 4س → 8س (خصم -20%)
الرعد: 24س → 48س (خصم -15%)  
العاصفة: 72س → 120س (خصم -10%)

احجز الآن مع الخصم أو انضم لقائمة الانتظار.

للإلغاء، اكتب STOP`,
      en: `Due to high demand, our delivery times are temporarily adjusted:

Lightning: 4h → 8h (-20% discount)
Thunder: 24h → 48h (-15% discount)  
Storm: 72h → 120h (-10% discount)

Book now with discount or join waitlist for standard times.

Reply STOP to unsubscribe.`
    },
    urgent: false
  },
  {
    id: 'capacity_enterprise_active',
    type: 'capacity_change',
    title: {
      ar: '🏢 مشروع مؤسسي نشط',
      en: '🏢 Enterprise Project Active'
    },
    message: {
      ar: `نحن حالياً نعمل على مشروع مؤسسي كبير (هنقرستيشن).

هذا يؤثر على الجداول الزمنية العادية:
- جداول زمنية ممدودة
- خصومات تعويضية تلقائية
- شفافية كاملة قبل الدفع

تفاصيل أكثر: neotechnology.solutions`,
      en: `We're currently working on a major enterprise project (HungerStation).

This affects standard timelines:
- Extended delivery times
- Automatic compensation discounts  
- Complete transparency before payment

More details: neotechnology.solutions`
    },
    urgent: true
  },
  {
    id: 'capacity_back_to_normal',
    type: 'capacity_change',
    title: {
      ar: '✅ عودة الجداول الزمنية العادية',
      en: '✅ Standard Timelines Restored'
    },
    message: {
      ar: `الأخبار الجيدة! عدنا للجداول الزمنية العادية:

البرق: 4 ساعات
الرعد: 24 ساعة
العاصفة: 72 ساعة

احجز الآن بالأسعار العادية.
neotechnology.solutions`,
      en: `Good news! We're back to standard timelines:

Lightning: 4 hours
Thunder: 24 hours
Storm: 72 hours

Book now at regular prices.
neotechnology.solutions`
    },
    urgent: false
  }
];

/**
 * Send notifications to all active subscribers
 */
export async function broadcastCapacityNotification(
  capacity: CapacityStatus,
  previousMode?: string
): Promise<void> {
  try {
    console.log('🔔 Broadcasting capacity notification:', {
      currentMode: capacity.mode,
      previousMode,
      utilization: capacity.current,
      majorClients: capacity.majorClients.length
    });

    // Determine which template to use
    let templateId = 'capacity_high_demand';
    
    if (capacity.mode === 'peak' && capacity.majorClients.length > 0) {
      templateId = 'capacity_enterprise_active';
    } else if (capacity.mode === 'standard' && previousMode !== 'standard') {
      templateId = 'capacity_back_to_normal';
    }

    const template = templates.find(t => t.id === templateId);
    if (!template) {
      console.error('Template not found:', templateId);
      return;
    }

    // Get active subscribers
    const activeSubscribers = subscribers.filter(s => s.active);
    console.log(`📋 Found ${activeSubscribers.length} active subscribers`);

    // Send notifications
    const notifications = activeSubscribers.map(subscriber => 
      sendNotificationToSubscriber(subscriber, template, capacity)
    );

    await Promise.allSettled(notifications);
    
    console.log('✅ Capacity notification broadcast completed');
  } catch (error) {
    console.error('❌ Failed to broadcast capacity notification:', error);
  }
}

/**
 * Send notification to a specific subscriber
 */
async function sendNotificationToSubscriber(
  subscriber: Subscriber,
  template: NotificationTemplate,
  capacity: CapacityStatus
): Promise<void> {
  const language = subscriber.preferences.language;
  const title = template.title[language];
  const message = template.message[language];

  console.log(`📤 Sending notification to ${subscriber.id} (${language})`);

  // Send SMS
  if (subscriber.preferences.sms && subscriber.phone) {
    await sendSMS(subscriber.phone, message);
  }

  // Send WhatsApp
  if (subscriber.preferences.whatsapp && subscriber.whatsapp) {
    await sendWhatsApp(subscriber.whatsapp, title, message);
  }

  // Send Email
  if (subscriber.preferences.email && subscriber.email) {
    await sendEmail(subscriber.email, title, message, capacity);
  }

  // In-app notification (store in local storage for demo)
  if (subscriber.preferences.inApp) {
    await sendInAppNotification(subscriber.id, title, message);
  }
}

/**
 * SMS Integration (Mock implementation)
 */
async function sendSMS(phone: string, message: string): Promise<void> {
  try {
    console.log('📱 SMS sent to:', phone);
    console.log('Message:', message.substring(0, 100) + '...');
    
    // In production, integrate with SMS provider like:
    // - Twilio: https://www.twilio.com/docs/sms
    // - AWS SNS: https://aws.amazon.com/sns/
    // - Vonage: https://developer.vonage.com/messaging/sms
    
    // Mock API call
    const response = await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: phone,
        message: message,
        from: 'NeoTech'
      })
    }).catch(() => ({ ok: false })); // Mock failure handling
    
    if (response.ok) {
      console.log('✅ SMS sent successfully');
    } else {
      console.log('⚠️ SMS simulation (no real SMS service)');
    }
  } catch (error) {
    console.error('❌ SMS send failed:', error);
  }
}

/**
 * WhatsApp Integration (Mock implementation)
 */
async function sendWhatsApp(phone: string, title: string, message: string): Promise<void> {
  try {
    console.log('💬 WhatsApp sent to:', phone);
    console.log('Title:', title);
    console.log('Message:', message.substring(0, 100) + '...');
    
    // In production, integrate with WhatsApp Business API:
    // - Meta WhatsApp Business API
    // - Twilio WhatsApp API
    // - 360Dialog
    
    const response = await fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: phone,
        message: `*${title}*\n\n${message}`,
        type: 'text'
      })
    }).catch(() => ({ ok: false }));
    
    if (response.ok) {
      console.log('✅ WhatsApp sent successfully');
    } else {
      console.log('⚠️ WhatsApp simulation (no real WhatsApp service)');
    }
  } catch (error) {
    console.error('❌ WhatsApp send failed:', error);
  }
}

/**
 * Email Integration (Mock implementation)
 */
async function sendEmail(
  email: string, 
  title: string, 
  message: string, 
  capacity: CapacityStatus
): Promise<void> {
  try {
    console.log('📧 Email sent to:', email);
    console.log('Subject:', title);
    
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #00d4ff, #00ff88); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">${title}</h1>
        </div>
        
        <div style="padding: 20px; background: #1a1a1a; color: white;">
          <div style="white-space: pre-line; line-height: 1.6;">
            ${message}
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #0a0a0a; border-radius: 8px;">
            <h3 style="color: #00d4ff;">Current System Status</h3>
            <p>Utilization: <strong>${capacity.current}%</strong></p>
            <p>Mode: <strong style="color: #00ff88;">${capacity.mode.toUpperCase()}</strong></p>
            <p>Active Projects: <strong>${capacity.activeProjects}</strong></p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://neotechnology.solutions" 
               style="background: linear-gradient(135deg, #00d4ff, #00ff88); 
                      color: black; padding: 12px 24px; text-decoration: none; 
                      border-radius: 6px; font-weight: bold;">
              View Details
            </a>
          </div>
        </div>
        
        <div style="padding: 15px; text-align: center; color: #666; font-size: 12px;">
          <p>NeoTechnology Solutions | Advanced E-commerce Development</p>
          <p>To unsubscribe, <a href="#" style="color: #00d4ff;">click here</a></p>
        </div>
      </div>
    `;
    
    // In production, use email service like:
    // - SendGrid
    // - AWS SES
    // - Mailgun
    // - Postmark
    
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: title,
        html: emailContent,
        from: 'notifications@neotechnology.solutions'
      })
    }).catch(() => ({ ok: false }));
    
    if (response.ok) {
      console.log('✅ Email sent successfully');
    } else {
      console.log('⚠️ Email simulation (no real email service)');
    }
  } catch (error) {
    console.error('❌ Email send failed:', error);
  }
}

/**
 * In-App Notification (using localStorage for demo)
 */
async function sendInAppNotification(
  userId: string, 
  title: string, 
  message: string
): Promise<void> {
  try {
    const notification = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      type: 'capacity_update'
    };
    
    // Store in localStorage for demo
    const existingNotifications = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    );
    
    existingNotifications.unshift(notification);
    
    // Keep only latest 50 notifications
    if (existingNotifications.length > 50) {
      existingNotifications.splice(50);
    }
    
    localStorage.setItem('notifications', JSON.stringify(existingNotifications));
    
    console.log('🔔 In-app notification stored for user:', userId);
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('newNotification', {
      detail: notification
    }));
  } catch (error) {
    console.error('❌ In-app notification failed:', error);
  }
}

/**
 * Subscribe a user to notifications
 */
export async function subscribeToNotifications(
  subscriber: Omit<Subscriber, 'id' | 'subscriptionDate' | 'active'>
): Promise<string> {
  const newSubscriber: Subscriber = {
    ...subscriber,
    id: `subscriber-${Date.now()}`,
    subscriptionDate: new Date(),
    active: true
  };
  
  subscribers.push(newSubscriber);
  
  console.log('✅ New subscriber added:', newSubscriber.id);
  return newSubscriber.id;
}

/**
 * Unsubscribe a user from notifications
 */
export async function unsubscribeFromNotifications(subscriberId: string): Promise<void> {
  const subscriber = subscribers.find(s => s.id === subscriberId);
  if (subscriber) {
    subscriber.active = false;
    console.log('✅ Subscriber unsubscribed:', subscriberId);
  }
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  subscriberId: string,
  preferences: Partial<NotificationConfig>
): Promise<void> {
  const subscriber = subscribers.find(s => s.id === subscriberId);
  if (subscriber) {
    subscriber.preferences = { ...subscriber.preferences, ...preferences };
    console.log('✅ Notification preferences updated:', subscriberId);
  }
}

/**
 * Get all in-app notifications for a user
 */
export function getInAppNotifications(userId: string): any[] {
  try {
    const allNotifications = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    );
    
    return allNotifications.filter((n: any) => n.userId === userId);
  } catch (error) {
    console.error('❌ Failed to get notifications:', error);
    return [];
  }
}

/**
 * Mark notification as read
 */
export function markNotificationAsRead(notificationId: string): void {
  try {
    const notifications = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    );
    
    const notification = notifications.find((n: any) => n.id === notificationId);
    if (notification) {
      notification.read = true;
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  } catch (error) {
    console.error('❌ Failed to mark notification as read:', error);
  }
}

/**
 * Capacity Analytics functions
 */
export const capacityAnalytics = {
  /**
   * Get revenue impact from capacity management
   */
  async getRevenueImpact(): Promise<{
    total: number;
    discountGiven: number;
    retention: number;
  }> {
    // Mock revenue data
    return {
      total: 156780,
      discountGiven: 23450,
      retention: 0.94
    };
  }
};

/**
 * Notification Analytics functions
 */
export const notificationAnalytics = {
  /**
   * Get delivery statistics
   */
  async getDeliveryStats(): Promise<{
    sms: { sent: number; delivered: number; failed: number };
    whatsapp: { sent: number; delivered: number; failed: number };
    email: { sent: number; delivered: number; failed: number };
  }> {
    // Mock analytics data
    return {
      sms: { sent: 156, delivered: 152, failed: 4 },
      whatsapp: { sent: 89, delivered: 87, failed: 2 },
      email: { sent: 203, delivered: 201, failed: 2 }
    };
  },
  
  /**
   * Get engagement metrics
   */
  async getEngagementMetrics(): Promise<{
    openRate: number;
    clickRate: number;
    unsubscribeRate: number;
  }> {
    return {
      openRate: 0.87,
      clickRate: 0.23,
      unsubscribeRate: 0.02
    };
  }
};

export default {
  broadcastCapacityNotification,
  subscribeToNotifications,
  unsubscribeFromNotifications,
  updateNotificationPreferences,
  getInAppNotifications,
  markNotificationAsRead,
  notificationAnalytics
};