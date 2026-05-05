/**
 * Email System with Arabic Support
 * SendGrid integration with multilingual templates
 */

import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Collections, EmailCampaign } from './database-schema';

// Email template types
export type EmailTemplateType = 
  | 'welcome'
  | 'order_created'
  | 'setup_started'
  | 'progress_update'
  | 'setup_completed'
  | 'sla_breach'
  | 'invoice'
  | 'support_ticket'
  | 'newsletter'
  | 'follow_up';

export interface EmailTemplate {
  id: string;
  name: string;
  type: EmailTemplateType;
  language: 'en' | 'ar';
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[]; // Template variables like {{clientName}}
}

export interface SendEmailRequest {
  to: string;
  templateType: EmailTemplateType;
  language: 'en' | 'ar';
  variables: Record<string, string>;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  type: string;
}

export class EmailSystem {
  private static readonly API_KEY = process.env.SENDGRID_API_KEY;
  private static readonly FROM_EMAIL = 'noreply@neotechnology.solutions';
  private static readonly FROM_NAME = 'NeoTechnology Solutions';
  
  /**
   * Send email using template
   */
  static async sendEmail(request: SendEmailRequest): Promise<boolean> {
    try {
      const template = await this.getTemplate(request.templateType, request.language);
      
      if (!template) {
        throw new Error(`Template not found: ${request.templateType} (${request.language})`);
      }
      
      // Replace variables in template
      const subject = this.replaceVariables(template.subject, request.variables);
      const htmlContent = this.replaceVariables(template.htmlContent, request.variables);
      const textContent = this.replaceVariables(template.textContent, request.variables);
      
      // Configure email direction for Arabic
      const direction = request.language === 'ar' ? 'rtl' : 'ltr';
      const finalHtmlContent = this.wrapWithLayout(htmlContent, direction);
      
      // Send via SendGrid
      const success = await this.sendViaProvider({
        to: request.to,
        subject,
        htmlContent: finalHtmlContent,
        textContent,
        attachments: request.attachments
      });
      
      // Log email activity
      await this.logEmailActivity({
        to: request.to,
        templateType: request.templateType,
        language: request.language,
        status: success ? 'sent' : 'failed',
        timestamp: Timestamp.now()
      });
      
      return success;
      
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
  
  /**
   * Send welcome email to new clients
   */
  static async sendWelcomeEmail(
    clientEmail: string, 
    clientName: string, 
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    return this.sendEmail({
      to: clientEmail,
      templateType: 'welcome',
      language,
      variables: {
        clientName,
        companyName: 'NeoTechnology Solutions',
        founderName: 'Fahad Almansour',
        supportEmail: 'support@neotechnology.solutions',
        whatsappNumber: '+1-XXX-XXX-XXXX' // Replace with actual number
      }
    });
  }
  
  /**
   * Send order confirmation email
   */
  static async sendOrderConfirmation(
    clientEmail: string,
    clientName: string,
    orderNumber: string,
    service: string,
    amount: number,
    currency: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    return this.sendEmail({
      to: clientEmail,
      templateType: 'order_created',
      language,
      variables: {
        clientName,
        orderNumber,
        service,
        amount: amount.toString(),
        currency,
        expectedDelivery: '90 minutes',
        trackingUrl: `https://neotechnology.solutions/track/${orderNumber}`
      }
    });
  }
  
  /**
   * Send setup started notification
   */
  static async sendSetupStarted(
    clientEmail: string,
    clientName: string,
    orderNumber: string,
    projectManager: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    return this.sendEmail({
      to: clientEmail,
      templateType: 'setup_started',
      language,
      variables: {
        clientName,
        orderNumber,
        projectManager,
        startTime: new Date().toLocaleString(),
        completionTime: new Date(Date.now() + 90 * 60 * 1000).toLocaleString(),
        liveTrackingUrl: `https://neotechnology.solutions/live/${orderNumber}`
      }
    });
  }
  
  /**
   * Send progress update
   */
  static async sendProgressUpdate(
    clientEmail: string,
    clientName: string,
    orderNumber: string,
    progress: number,
    currentMilestone: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    return this.sendEmail({
      to: clientEmail,
      templateType: 'progress_update',
      language,
      variables: {
        clientName,
        orderNumber,
        progress: progress.toString(),
        currentMilestone,
        remainingTime: this.calculateRemainingTime(progress).toString()
      }
    });
  }
  
  /**
   * Send setup completion email
   */
  static async sendSetupCompleted(
    clientEmail: string,
    clientName: string,
    orderNumber: string,
    storeUrl: string,
    actualTime: number,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    const timeSaved = Math.max(0, (30 * 24 * 60) - actualTime); // 30 days vs actual time
    
    return this.sendEmail({
      to: clientEmail,
      templateType: 'setup_completed',
      language,
      variables: {
        clientName,
        orderNumber,
        storeUrl,
        actualTime: actualTime.toString(),
        timeSaved: Math.round(timeSaved / (24 * 60)).toString(), // Convert to days
        loginUrl: `${storeUrl}/admin`,
        documentationUrl: 'https://neotechnology.solutions/docs',
        supportUrl: 'https://neotechnology.solutions/support'
      }
    });
  }
  
  /**
   * Send SLA breach notification with apology
   */
  static async sendSLABreach(
    clientEmail: string,
    clientName: string,
    orderNumber: string,
    language: 'en' | 'ar' = 'en'
  ): Promise<boolean> {
    return this.sendEmail({
      to: clientEmail,
      templateType: 'sla_breach',
      language,
      variables: {
        clientName,
        orderNumber,
        apologyMessage: language === 'ar' 
          ? 'نعتذر بشدة عن التأخير في إنجاز متجرك'
          : 'We sincerely apologize for the delay in completing your store',
        compensationOffer: language === 'ar'
          ? 'سنقدم لك خصم 50% على الطلب القادم'
          : 'We\'re offering you 50% off your next order',
        directContactNumber: '+1-XXX-XXX-XXXX'
      }
    });
  }
  
  /**
   * Create email campaign for marketing
   */
  static async createCampaign(
    name: string,
    type: EmailTemplateType,
    subject: string,
    content: string,
    audience: string[],
    language: 'en' | 'ar' = 'en',
    scheduledAt?: Date
  ): Promise<string> {
    try {
      const campaign: Omit<EmailCampaign, 'id'> = {
        name,
        type,
        status: scheduledAt ? 'scheduled' : 'draft',
        subject,
        htmlContent: content,
        textContent: this.stripHtml(content),
        language,
        audience: 'segment',
        recipients: audience,
        scheduledAt: scheduledAt ? Timestamp.fromDate(scheduledAt) : undefined,
        stats: {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          bounced: 0,
          unsubscribed: 0
        },
        createdBy: 'system', // Replace with actual user ID
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, Collections.EMAIL_CAMPAIGNS), campaign);
      
      // Schedule sending if needed
      if (scheduledAt) {
        setTimeout(() => {
          this.sendCampaign(docRef.id);
        }, scheduledAt.getTime() - Date.now());
      }
      
      return docRef.id;
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw new Error('Failed to create email campaign');
    }
  }
  
  /**
   * Get email template by type and language
   */
  private static async getTemplate(type: EmailTemplateType, language: 'en' | 'ar'): Promise<EmailTemplate | null> {
    // This should query your templates collection
    // For now, return a basic template structure
    return this.getBuiltInTemplate(type, language);
  }
  
  /**
   * Built-in email templates
   */
  private static getBuiltInTemplate(type: EmailTemplateType, language: 'en' | 'ar'): EmailTemplate {
    const templates = {
      welcome: {
        en: {
          subject: 'Welcome to NeoTechnology Solutions! 🚀',
          htmlContent: `
            <h1>Welcome {{clientName}}!</h1>
            <p>We're excited to have you join the NeoTechnology family.</p>
            <p>Founded by <strong>{{founderName}}</strong>, we specialize in launching e-commerce stores in just 90 minutes.</p>
            <p>Need help? Contact us:</p>
            <ul>
              <li>Email: {{supportEmail}}</li>
              <li>WhatsApp: {{whatsappNumber}}</li>
            </ul>
            <p>Best regards,<br>The NeoTechnology Team</p>
          `,
          textContent: `Welcome {{clientName}}! We're excited to have you join NeoTechnology Solutions. Need help? Email: {{supportEmail}} or WhatsApp: {{whatsappNumber}}`
        },
        ar: {
          subject: 'أهلاً بك في حلول نيوتكنولوجي! 🚀',
          htmlContent: `
            <h1>أهلاً وسهلاً {{clientName}}!</h1>
            <p>نحن متحمسون لانضمامك إلى عائلة نيوتكنولوجي.</p>
            <p>تأسست الشركة على يد <strong>{{founderName}}</strong>، ونحن متخصصون في إطلاق المتاجر الإلكترونية في 90 دقيقة فقط.</p>
            <p>تحتاج مساعدة؟ تواصل معنا:</p>
            <ul>
              <li>البريد الإلكتروني: {{supportEmail}}</li>
              <li>واتساب: {{whatsappNumber}}</li>
            </ul>
            <p>مع أطيب التحيات،<br>فريق نيوتكنولوجي</p>
          `,
          textContent: `أهلاً {{clientName}}! نحن متحمسون لانضمامك إلى نيوتكنولوجي. تحتاج مساعدة؟ ايميل: {{supportEmail}} أو واتساب: {{whatsappNumber}}`
        }
      },
      setup_completed: {
        en: {
          subject: '🎉 Your Store is Live! Setup Completed in {{actualTime}} Minutes',
          htmlContent: `
            <h1>🎉 Congratulations {{clientName}}!</h1>
            <p>Your store is now <strong>LIVE</strong> and ready to accept orders!</p>
            
            <div style="background: #f0f8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>⚡ Speed Achievement</h3>
              <p><strong>Setup completed in:</strong> {{actualTime}} minutes</p>
              <p><strong>Industry average:</strong> 30-60 days</p>
              <p><strong>Time saved:</strong> {{timeSaved}} days</p>
            </div>
            
            <h3>🚀 Your Store Details</h3>
            <p><strong>Store URL:</strong> <a href="{{storeUrl}}">{{storeUrl}}</a></p>
            <p><strong>Admin Panel:</strong> <a href="{{loginUrl}}">{{loginUrl}}</a></p>
            
            <h3>📚 Next Steps</h3>
            <ol>
              <li>Review your store and test all functions</li>
              <li>Add your products and inventory</li>
              <li>Configure shipping and tax settings</li>
              <li>Start marketing your store!</li>
            </ol>
            
            <p><strong>Need help?</strong> Check our <a href="{{documentationUrl}}">documentation</a> or <a href="{{supportUrl}}">contact support</a>.</p>
          `,
          textContent: `Congratulations {{clientName}}! Your store is live at {{storeUrl}}. Setup completed in {{actualTime}} minutes, saving you {{timeSaved}} days!`
        },
        ar: {
          subject: '🎉 متجرك الآن مباشر! تم الإنجاز في {{actualTime}} دقيقة',
          htmlContent: `
            <h1>🎉 مبروك {{clientName}}!</h1>
            <p>متجرك الآن <strong>مباشر</strong> وجاهز لاستقبال الطلبات!</p>
            
            <div style="background: #f0f8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>⚡ إنجاز سريع</h3>
              <p><strong>تم الإنجاز في:</strong> {{actualTime}} دقيقة</p>
              <p><strong>متوسط الصناعة:</strong> 30-60 يوم</p>
              <p><strong>الوقت الموفر:</strong> {{timeSaved}} يوم</p>
            </div>
            
            <h3>🚀 تفاصيل متجرك</h3>
            <p><strong>رابط المتجر:</strong> <a href="{{storeUrl}}">{{storeUrl}}</a></p>
            <p><strong>لوحة الإدارة:</strong> <a href="{{loginUrl}}">{{loginUrl}}</a></p>
            
            <h3>📚 الخطوات التالية</h3>
            <ol>
              <li>مراجعة المتجر وتجربة جميع الوظائف</li>
              <li>إضافة المنتجات والمخزون</li>
              <li>إعداد الشحن والضرائب</li>
              <li>البدء في تسويق متجرك!</li>
            </ol>
            
            <p><strong>تحتاج مساعدة؟</strong> راجع <a href="{{documentationUrl}}">الدليل</a> أو <a href="{{supportUrl}}">تواصل مع الدعم</a>.</p>
          `,
          textContent: `مبروك {{clientName}}! متجرك مباشر على {{storeUrl}}. تم الإنجاز في {{actualTime}} دقيقة، موفراً {{timeSaved}} يوم!`
        }
      }
    };
    
    const template = templates[type]?.[language];
    if (!template) {
      throw new Error(`Template not found: ${type} (${language})`);
    }
    
    return {
      id: `builtin_${type}_${language}`,
      name: `Built-in ${type} (${language})`,
      type,
      language,
      subject: template.subject,
      htmlContent: template.htmlContent,
      textContent: template.textContent,
      variables: this.extractVariables(template.htmlContent)
    };
  }
  
  /**
   * Replace template variables
   */
  private static replaceVariables(template: string, variables: Record<string, string>): string {
    let result = template;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    });
    return result;
  }
  
  /**
   * Wrap content with HTML layout
   */
  private static wrapWithLayout(content: string, direction: 'ltr' | 'rtl'): string {
    return `
      <!DOCTYPE html>
      <html dir="${direction}" lang="${direction === 'rtl' ? 'ar' : 'en'}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NeoTechnology Solutions</title>
        <style>
          body {
            font-family: ${direction === 'rtl' ? "'Cairo', " : "'Inter', "}Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #00d4ff;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
          }
          a { color: #00d4ff; }
          .logo { color: #00d4ff; font-weight: bold; font-size: 24px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">NeoTechnology Solutions</div>
            <div style="color: #666; margin-top: 5px;">Founded by Fahad Almansour | Wyoming, USA</div>
          </div>
          
          ${content}
          
          <div class="footer">
            <p>NeoTechnology Solutions - Launching E-commerce Stores in 90 Minutes</p>
            <p>Wyoming, USA | support@neotechnology.solutions</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  
  /**
   * Send email via provider (placeholder for SendGrid)
   */
  private static async sendViaProvider(emailData: {
    to: string;
    subject: string;
    htmlContent: string;
    textContent: string;
    attachments?: EmailAttachment[];
  }): Promise<boolean> {
    try {
      // TODO: Implement actual SendGrid API call
      console.log(`📧 Sending email to ${emailData.to}: ${emailData.subject}`);
      
      // Simulate API call
      return new Promise(resolve => {
        setTimeout(() => resolve(true), 1000);
      });
      
    } catch (error) {
      console.error('SendGrid error:', error);
      return false;
    }
  }
  
  // Helper methods
  private static extractVariables(template: string): string[] {
    const matches = template.match(/{{(\w+)}}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  }
  
  private static stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
  
  private static calculateRemainingTime(progress: number): number {
    const totalTime = 90; // minutes
    return Math.max(0, totalTime * (100 - progress) / 100);
  }
  
  private static async logEmailActivity(activity: any): Promise<void> {
    console.log('📊 Email activity logged:', activity);
    // TODO: Log to analytics system
  }
  
  private static async sendCampaign(campaignId: string): Promise<void> {
    console.log(`📨 Sending campaign ${campaignId}`);
    // TODO: Implement campaign sending
  }
}

// Export utility functions
export const sendWelcomeEmail = EmailSystem.sendWelcomeEmail;
export const sendOrderConfirmation = EmailSystem.sendOrderConfirmation;
export const sendSetupStarted = EmailSystem.sendSetupStarted;
export const sendProgressUpdate = EmailSystem.sendProgressUpdate;
export const sendSetupCompleted = EmailSystem.sendSetupCompleted;