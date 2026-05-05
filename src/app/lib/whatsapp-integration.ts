/**
 * WhatsApp Integration for Instant Notifications
 * Using Twilio WhatsApp Business API for real-time client updates
 */

import { Timestamp } from 'firebase/firestore';

export interface WhatsAppMessage {
  to: string;
  templateName: string;
  language: 'en' | 'ar';
  parameters: Record<string, string>;
  mediaUrl?: string;
}

export interface WhatsAppTemplate {
  name: string;
  language: 'en' | 'ar';
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  components: WhatsAppComponent[];
}

export interface WhatsAppComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
  text?: string;
  parameters?: string[];
  buttons?: WhatsAppButton[];
}

export interface WhatsAppButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string;
  phone_number?: string;
}

export class WhatsAppService {
  private static readonly TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  private static readonly TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
  private static readonly WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';
  
  /**
   * Send WhatsApp message using template
   */
  static async sendTemplateMessage(message: WhatsAppMessage): Promise<boolean> {
    try {
      const client = require('twilio')(this.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);
      
      // Format phone number for WhatsApp
      const toNumber = message.to.startsWith('whatsapp:') 
        ? message.to 
        : `whatsapp:${message.to}`;
      
      const twilioMessage = await client.messages.create({
        contentSid: `HX${message.templateName}`, // Twilio Content SID format
        from: this.WHATSAPP_NUMBER,
        to: toNumber,
        contentVariables: JSON.stringify(message.parameters),
        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID
      });
      
      console.log(`✅ WhatsApp sent: ${twilioMessage.sid}`);
      return true;
      
    } catch (error) {
      console.error('❌ WhatsApp send failed:', error);
      return false;
    }
  }
  
  /**
   * Send order confirmation via WhatsApp
   */
  static async sendOrderConfirmation(
    phoneNumber: string,
    clientName: string,
    orderNumber: string,
    service: string,
    deliveryTime: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    return this.sendTemplateMessage({
      to: phoneNumber,
      templateName: language === 'ar' ? 'order_confirmation_ar' : 'order_confirmation_en',
      language,
      parameters: {
        '1': clientName,
        '2': orderNumber,
        '3': service,
        '4': deliveryTime,
        '5': `https://neotechnology.solutions/track/${orderNumber}`
      }
    });
  }
  
  /**
   * Send setup started notification
   */
  static async sendSetupStarted(
    phoneNumber: string,
    clientName: string,
    orderNumber: string,
    projectManager: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    const message = language === 'ar' 
      ? `🚀 مرحباً ${clientName}!\n\nبدأنا العمل على متجرك الآن!\n\n📋 رقم الطلب: ${orderNumber}\n👨‍💼 مدير المشروع: ${projectManager}\n⏰ سيكون متجرك جاهز خلال 90 دقيقة\n\n📱 تابع التقدم المباشر: https://neotechnology.solutions/live/${orderNumber}\n\n💬 تواصل معنا فوراً عبر الواتساب إذا كان لديك أي استفسار!`
      : `🚀 Hey ${clientName}!\n\nWe just started building your store!\n\n📋 Order: ${orderNumber}\n👨‍💼 Project Manager: ${projectManager}\n⏰ Your store will be ready in 90 minutes\n\n📱 Track live progress: https://neotechnology.solutions/live/${orderNumber}\n\n💬 Reply to this WhatsApp anytime with questions!`;
    
    return this.sendDirectMessage(phoneNumber, message);
  }
  
  /**
   * Send progress update
   */
  static async sendProgressUpdate(
    phoneNumber: string,
    clientName: string,
    orderNumber: string,
    progress: number,
    currentMilestone: string,
    remainingTime: number,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    const progressBar = this.createProgressBar(progress);
    
    const message = language === 'ar' 
      ? `📊 تحديث المشروع ${orderNumber}\n\n${progressBar} ${progress}%\n\n🔧 العمل الحالي: ${currentMilestone}\n⏱️ الوقت المتبقي: ${remainingTime} دقيقة\n\n✨ كل شيء يسير بسلاسة ${clientName}! متجرك يقترب من الإنجاز 🎯`
      : `📊 Progress Update for ${orderNumber}\n\n${progressBar} ${progress}%\n\n🔧 Current: ${currentMilestone}\n⏱️ Time remaining: ${remainingTime} minutes\n\n✨ Everything's on track ${clientName}! Your store is coming together beautifully 🎯`;
    
    return this.sendDirectMessage(phoneNumber, message);
  }
  
  /**
   * Send completion notification
   */
  static async sendSetupCompleted(
    phoneNumber: string,
    clientName: string,
    orderNumber: string,
    storeUrl: string,
    actualTime: number,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    const timeSaved = Math.max(0, (30 * 24 * 60) - actualTime); // 30 days vs actual
    const daysSaved = Math.round(timeSaved / (24 * 60));
    
    const message = language === 'ar' 
      ? `🎉 مبروك ${clientName}!\n\nمتجرك الآن مباشر ومتاح للعملاء!\n\n🚀 رابط المتجر: ${storeUrl}\n⚡ تم الإنجاز في: ${actualTime} دقيقة\n💰 وفرت عليك: ${daysSaved} يوم\n\n🎯 متجرك الآن جاهز لبدء المبيعات!\n\n📚 دليل الاستخدام: https://neotechnology.solutions/docs\n💬 الدعم الفني متوفر 24/7\n\nشكراً لثقتك في نيوتكنولوجي! 🚀`
      : `🎉 Congratulations ${clientName}!\n\nYour store is now LIVE and ready for customers!\n\n🚀 Store URL: ${storeUrl}\n⚡ Completed in: ${actualTime} minutes\n💰 Time saved: ${daysSaved} days\n\n🎯 Your store is ready to start making sales!\n\n📚 User guide: https://neotechnology.solutions/docs\n💬 24/7 support available\n\nThanks for choosing NeoTechnology! 🚀`;
    
    return this.sendDirectMessage(phoneNumber, message);
  }
  
  /**
   * Send SLA breach notification with apology
   */
  static async sendSLABreach(
    phoneNumber: string,
    clientName: string,
    orderNumber: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    const message = language === 'ar' 
      ? `⚠️ ${clientName}, نعتذر بشدة!\n\nواجهنا تأخير غير متوقع في مشروع ${orderNumber}\n\n🎁 كتعويض عن التأخير:\n• خصم 50% على الطلب القادم\n• ترقية مجانية لباقة أعلى\n• دعم فني مجاني لمدة 3 أشهر\n\n📞 سيتصل بك مدير المشروع خلال 5 دقائق\n💬 أو اتصل بنا فوراً: ${process.env.EMERGENCY_PHONE}\n\nنقدر صبرك وثقتك 🙏`
      : `⚠️ ${clientName}, we sincerely apologize!\n\nWe've encountered an unexpected delay with order ${orderNumber}\n\n🎁 As compensation for the delay:\n• 50% off your next order\n• Free upgrade to higher tier\n• 3 months free technical support\n\n📞 Project manager will call you in 5 minutes\n💬 Or call us immediately: ${process.env.EMERGENCY_PHONE}\n\nWe appreciate your patience and trust 🙏`;
    
    return this.sendDirectMessage(phoneNumber, message);
  }
  
  /**
   * Send 15-minute warning
   */
  static async sendUrgentWarning(
    phoneNumber: string,
    clientName: string,
    orderNumber: string,
    remainingTime: number,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    const message = language === 'ar' 
      ? `⏰ ${clientName}, تحديث مهم!\n\nمتبقي ${remainingTime} دقيقة على موعد التسليم المحدد\n\n🚀 فريقنا يعمل بأقصى سرعة لإنجاز ${orderNumber}\n✅ كل شيء تحت السيطرة\n\n📱 ستحصل على رابط المتجر فور الانتهاء\n💬 أي استفسارات؟ رد على هذه الرسالة فوراً!`
      : `⏰ ${clientName}, important update!\n\n${remainingTime} minutes remaining until delivery\n\n🚀 Our team is working at full speed to complete ${orderNumber}\n✅ Everything is under control\n\n📱 You'll get your store link the moment we finish\n💬 Any questions? Reply to this WhatsApp immediately!`;
    
    return this.sendDirectMessage(phoneNumber, message);
  }
  
  /**
   * Send direct message (fallback for non-template messages)
   */
  private static async sendDirectMessage(phoneNumber: string, message: string): Promise<boolean> {
    try {
      const client = require('twilio')(this.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);
      
      const toNumber = phoneNumber.startsWith('whatsapp:') 
        ? phoneNumber 
        : `whatsapp:${phoneNumber}`;
      
      const twilioMessage = await client.messages.create({
        body: message,
        from: this.WHATSAPP_NUMBER,
        to: toNumber
      });
      
      console.log(`✅ WhatsApp direct message sent: ${twilioMessage.sid}`);
      return true;
      
    } catch (error) {
      console.error('❌ WhatsApp direct message failed:', error);
      return false;
    }
  }
  
  /**
   * Create ASCII progress bar for WhatsApp
   */
  private static createProgressBar(percentage: number): string {
    const filledBlocks = Math.floor(percentage / 10);
    const emptyBlocks = 10 - filledBlocks;
    return '🟩'.repeat(filledBlocks) + '⬜'.repeat(emptyBlocks);
  }
  
  /**
   * Format phone number for WhatsApp (international format)
   */
  static formatPhoneNumber(phone: string, countryCode: string = '+1'): string {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith(countryCode.replace('+', ''))) {
      return `${countryCode}${cleaned}`;
    }
    
    return `+${cleaned}`;
  }
  
  /**
   * Send welcome message to new clients
   */
  static async sendWelcomeMessage(
    phoneNumber: string,
    clientName: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    const message = language === 'ar' 
      ? `🎉 أهلاً وسهلاً ${clientName}!\n\nمرحباً بك في نيوتكنولوجي - نحن متخصصون في إطلاق المتاجر الإلكترونية في وقت قياسي!\n\n⚡ خدماتنا:\n• Lightning (4 ساعات) - $799\n• Thunder (24 ساعة) - $1,299\n• Storm (72 ساعة) - $2,999+\n\n💬 رد على هذه الرسالة بكلمة "أريد متجر" لنبدأ فوراً!\n\n🌟 تأسست على يد فهد المنصور من وايومنغ، أمريكا`
      : `🎉 Welcome ${clientName}!\n\nWelcome to NeoTechnology - we specialize in launching e-commerce stores in record time!\n\n⚡ Our services:\n• Lightning (4 hours) - $799\n• Thunder (24 hours) - $1,299\n• Storm (72 hours) - $2,999+\n\n💬 Reply "I want a store" to get started immediately!\n\n🌟 Founded by Fahad Almansour from Wyoming, USA`;
    
    return this.sendDirectMessage(phoneNumber, message);
  }
  
  /**
   * Handle incoming WhatsApp messages (webhook)
   */
  static async handleIncomingMessage(
    from: string,
    body: string,
    messageId: string
  ): Promise<void> {
    try {
      console.log(`📱 Incoming WhatsApp from ${from}: ${body}`);
      
      // Auto-reply logic based on message content
      const lowerBody = body.toLowerCase();
      
      if (lowerBody.includes('store') || lowerBody.includes('متجر')) {
        await this.sendQuickReply(from, 'pricing_info');
      } else if (lowerBody.includes('price') || lowerBody.includes('سعر')) {
        await this.sendQuickReply(from, 'pricing_details');
      } else if (lowerBody.includes('support') || lowerBody.includes('دعم')) {
        await this.sendQuickReply(from, 'support_info');
      } else if (lowerBody.includes('urgent') || lowerBody.includes('عاجل')) {
        await this.escalateToHuman(from, body);
      } else {
        await this.sendQuickReply(from, 'general_info');
      }
      
    } catch (error) {
      console.error('Error handling WhatsApp message:', error);
    }
  }
  
  /**
   * Send quick reply options
   */
  private static async sendQuickReply(phoneNumber: string, type: string): Promise<void> {
    const responses = {
      pricing_info: `💰 NeoTechnology Pricing:\n\n⚡ Lightning (4 hours): $799\n🔥 Thunder (24 hours): $1,299 ⭐\n🌟 Storm (72 hours): $2,999+\n\nReply with the package name to get started!`,
      pricing_details: `📊 Detailed comparison:\n\nLightning: Basic store, 10 products, 1 payment gateway\nThunder: Professional store, 50 products, email automation\nStorm: Enterprise store, unlimited products, multi-language\n\nWhich sounds right for you?`,
      support_info: `🛟 24/7 Support Available!\n\n📞 Emergency: ${process.env.EMERGENCY_PHONE}\n💬 WhatsApp: This number\n📧 Email: support@neotechnology.solutions\n\nWhat can we help you with?`,
      general_info: `👋 Hi! I'm the NeoTechnology bot.\n\nI can help you:\n• Get pricing information\n• Start a new store project\n• Check order status\n• Connect with support\n\nWhat would you like to do?`
    };
    
    await this.sendDirectMessage(phoneNumber, responses[type] || responses.general_info);
  }
  
  /**
   * Escalate urgent messages to human agents
   */
  private static async escalateToHuman(phoneNumber: string, originalMessage: string): Promise<void> {
    // Log to admin dashboard or notification system
    console.log(`🚨 URGENT WhatsApp escalation from ${phoneNumber}: ${originalMessage}`);
    
    // Send acknowledgment to customer
    await this.sendDirectMessage(
      phoneNumber,
      `🚨 Message marked as URGENT!\n\nA human agent will respond within 5 minutes.\n\nYour message: "${originalMessage}"\n\n⏰ Current time: ${new Date().toLocaleTimeString()}`
    );
    
    // TODO: Integrate with admin notification system
    // await NotificationSystem.alertAdmins('urgent_whatsapp', { phoneNumber, originalMessage });
  }
  
  /**
   * Bulk send WhatsApp messages (for marketing campaigns)
   */
  static async sendBulkMessages(
    recipients: { phone: string; name: string; language?: 'en' | 'ar' }[],
    templateName: string,
    parameters: Record<string, string>
  ): Promise<{ sent: number; failed: number }> {
    let sent = 0;
    let failed = 0;
    
    for (const recipient of recipients) {
      try {
        const success = await this.sendTemplateMessage({
          to: recipient.phone,
          templateName,
          language: recipient.language || 'en',
          parameters: { ...parameters, clientName: recipient.name }
        });
        
        if (success) sent++;
        else failed++;
        
        // Rate limiting - avoid hitting Twilio limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Failed to send to ${recipient.phone}:`, error);
        failed++;
      }
    }
    
    return { sent, failed };
  }
}

// Export convenience functions
export const sendOrderConfirmation = WhatsAppService.sendOrderConfirmation;
export const sendSetupStarted = WhatsAppService.sendSetupStarted;
export const sendProgressUpdate = WhatsAppService.sendProgressUpdate;
export const sendSetupCompleted = WhatsAppService.sendSetupCompleted;
export const sendSLABreach = WhatsAppService.sendSLABreach;
export const formatPhoneNumber = WhatsAppService.formatPhoneNumber;