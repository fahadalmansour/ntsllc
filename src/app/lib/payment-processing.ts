/**
 * Payment Processing System
 * Stripe & PayPal integration with multi-currency support
 */

import Stripe from 'stripe';
import { 
  collection, 
  doc, 
  updateDoc, 
  addDoc, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Collections, Invoice, Order } from './database-schema';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

// Currency conversion rates (implement with real-time API)
const CURRENCY_RATES = {
  'USD': {
    'SAR': 3.75,
    'AED': 3.67,
    'KWD': 0.31,
    'QAR': 3.64,
    'BHD': 0.38,
    'OMR': 0.38
  }
} as const;

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
}

export class PaymentProcessor {
  
  /**
   * Create Stripe payment intent for order
   */
  static async createPaymentIntent(
    orderId: string, 
    amount: number, 
    currency: string,
    clientEmail: string,
    metadata?: Record<string, string>
  ): Promise<PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: this.convertToCents(amount, currency),
        currency: currency.toLowerCase(),
        metadata: {
          orderId,
          clientEmail,
          ...metadata
        },
        receipt_email: clientEmail,
        automatic_payment_methods: {
          enabled: true
        }
      });
      
      return {
        id: paymentIntent.id,
        amount,
        currency,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret!
      };
      
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }
  
  /**
   * Create subscription for SaaS services
   */
  static async createSubscription(
    clientId: string,
    planId: string,
    paymentMethodId: string
  ): Promise<string> {
    try {
      // Get or create Stripe customer
      const customer = await this.getOrCreateStripeCustomer(clientId);
      
      // Attach payment method to customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id
      });
      
      // Set as default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });
      
      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: planId }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription'
        },
        expand: ['latest_invoice.payment_intent']
      });
      
      return subscription.id;
      
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }
  
  /**
   * Process refund
   */
  static async processRefund(
    paymentIntentId: string, 
    amount?: number,
    reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' = 'requested_by_customer'
  ): Promise<boolean> {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount ? this.convertToCents(amount, 'usd') : undefined,
        reason
      });
      
      return refund.status === 'succeeded';
      
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }
  
  /**
   * Handle successful payment webhook
   */
  static async handlePaymentSuccess(paymentIntentId: string): Promise<void> {
    try {
      // Get payment intent from Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      const orderId = paymentIntent.metadata.orderId;
      
      if (!orderId) {
        throw new Error('Order ID not found in payment metadata');
      }
      
      // Update order status
      await updateDoc(doc(db, Collections.ORDERS, orderId), {
        paymentStatus: 'captured',
        paymentIntentId,
        status: 'paid',
        updatedAt: Timestamp.now()
      });
      
      // Generate invoice
      await this.generateInvoice(orderId, paymentIntentId);
      
      // Start 90-minute setup process (import from order-management)
      // This would trigger the actual setup workflow
      console.log(`🚀 Payment successful for order ${orderId}, ready to start setup!`);
      
    } catch (error) {
      console.error('Error handling payment success:', error);
      throw new Error('Failed to handle payment success');
    }
  }
  
  /**
   * Generate invoice for completed payment
   */
  static async generateInvoice(orderId: string, paymentIntentId: string): Promise<string> {
    try {
      // Get order details (you'll need to implement getOrderById)
      // const order = await getOrderById(orderId);
      
      const invoiceNumber = await this.generateInvoiceNumber();
      
      const invoice: Omit<Invoice, 'id'> = {
        invoiceNumber,
        clientId: 'client_id', // Get from order
        orderId,
        issueDate: Timestamp.now(),
        dueDate: Timestamp.now(), // Immediate for completed payments
        paidAt: Timestamp.now(),
        status: 'paid',
        items: [
          {
            description: 'E-commerce Store Setup',
            quantity: 1,
            unitPrice: 1299, // Get from order
            total: 1299,
            taxable: true
          }
        ],
        subtotal: 1299,
        taxRate: 0, // Adjust based on client location
        taxAmount: 0,
        total: 1299,
        currency: 'USD',
        paymentTerms: 'Paid',
        paymentMethod: 'Credit Card',
        paymentReference: paymentIntentId,
        language: 'en',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      const docRef = await addDoc(collection(db, Collections.INVOICES), invoice);
      
      // Send invoice to client via email
      await this.sendInvoiceEmail(docRef.id);
      
      return docRef.id;
      
    } catch (error) {
      console.error('Error generating invoice:', error);
      throw new Error('Failed to generate invoice');
    }
  }
  
  /**
   * Convert currency amounts
   */
  static convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    if (fromCurrency === toCurrency) return amount;
    
    // Convert to USD first if needed
    let usdAmount = amount;
    if (fromCurrency !== 'USD') {
      // Implement reverse conversion
      const rate = CURRENCY_RATES.USD[fromCurrency as keyof typeof CURRENCY_RATES.USD];
      usdAmount = amount / rate;
    }
    
    // Convert from USD to target currency
    if (toCurrency !== 'USD') {
      const rate = CURRENCY_RATES.USD[toCurrency as keyof typeof CURRENCY_RATES.USD];
      return usdAmount * rate;
    }
    
    return usdAmount;
  }
  
  /**
   * Get pricing in client's local currency
   */
  static getLocalizedPricing(baseAmountUSD: number, clientCurrency: string): {
    amount: number;
    currency: string;
    originalUSD: number;
  } {
    return {
      amount: this.convertCurrency(baseAmountUSD, 'USD', clientCurrency),
      currency: clientCurrency,
      originalUSD: baseAmountUSD
    };
  }
  
  /**
   * Handle webhook from Stripe
   */
  static async handleWebhook(body: string, signature: string): Promise<void> {
    try {
      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object.id);
          break;
          
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object.id);
          break;
          
        case 'invoice.payment_succeeded':
          await this.handleSubscriptionPayment(event.data.object);
          break;
          
        case 'customer.subscription.deleted':
          await this.handleSubscriptionCancellation(event.data.object);
          break;
          
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
      
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw new Error('Webhook handling failed');
    }
  }
  
  /**
   * GCC-specific payment methods integration
   */
  static async setupGCCPaymentMethods(): Promise<void> {
    // Configure Mada for Saudi Arabia
    await this.configureMadaPayments();
    
    // Configure STC Pay
    await this.configureSTCPay();
    
    // Configure local bank transfers
    await this.configureLocalBanking();
  }
  
  /**
   * Calculate tax based on client location
   */
  static calculateTax(amount: number, clientCountry: string): {
    taxRate: number;
    taxAmount: number;
    total: number;
  } {
    let taxRate = 0;
    
    // VAT rates for GCC countries
    switch (clientCountry) {
      case 'SA': // Saudi Arabia
        taxRate = 0.15; // 15% VAT
        break;
      case 'AE': // UAE
        taxRate = 0.05; // 5% VAT
        break;
      case 'BH': // Bahrain
        taxRate = 0.10; // 10% VAT
        break;
      case 'OM': // Oman
        taxRate = 0.05; // 5% VAT
        break;
      case 'KW': // Kuwait
      case 'QA': // Qatar
        taxRate = 0; // No VAT yet
        break;
      default:
        taxRate = 0; // No tax for other countries
    }
    
    const taxAmount = amount * taxRate;
    const total = amount + taxAmount;
    
    return { taxRate, taxAmount, total };
  }
  
  // Private helper methods
  
  private static convertToCents(amount: number, currency: string): number {
    // Some currencies don't use cents (like JPY, KRW)
    const noCentsCurrencies = ['JPY', 'KRW', 'CLP', 'VND'];
    return noCentsCurrencies.includes(currency.toUpperCase()) 
      ? Math.round(amount)
      : Math.round(amount * 100);
  }
  
  private static async getOrCreateStripeCustomer(clientId: string): Promise<Stripe.Customer> {
    // Implementation to get or create Stripe customer
    // This would check if customer exists in your database and create if needed
    throw new Error('Not implemented - get or create Stripe customer');
  }
  
  private static async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const timestamp = Date.now().toString().slice(-4);
    
    return `INV-${year}${month}${day}-${timestamp}`;
  }
  
  private static async sendInvoiceEmail(invoiceId: string): Promise<void> {
    console.log(`📧 Sending invoice email for invoice ${invoiceId}`);
    // TODO: Implement invoice email sending
  }
  
  private static async handlePaymentFailure(paymentIntentId: string): Promise<void> {
    console.log(`❌ Payment failed for payment intent ${paymentIntentId}`);
    // TODO: Implement payment failure handling
  }
  
  private static async handleSubscriptionPayment(invoice: any): Promise<void> {
    console.log(`💰 Subscription payment succeeded:`, invoice.id);
    // TODO: Implement subscription payment handling
  }
  
  private static async handleSubscriptionCancellation(subscription: any): Promise<void> {
    console.log(`❌ Subscription cancelled:`, subscription.id);
    // TODO: Implement subscription cancellation handling
  }
  
  private static async configureMadaPayments(): Promise<void> {
    console.log('🏦 Configuring Mada payments for Saudi Arabia');
    // TODO: Implement Mada payment gateway
  }
  
  private static async configureSTCPay(): Promise<void> {
    console.log('📱 Configuring STC Pay for Saudi Arabia');
    // TODO: Implement STC Pay integration
  }
  
  private static async configureLocalBanking(): Promise<void> {
    console.log('🏧 Configuring local banking for GCC');
    // TODO: Implement local bank transfer options
  }
}

// Export utility functions
export const createPaymentIntent = PaymentProcessor.createPaymentIntent;
export const createSubscription = PaymentProcessor.createSubscription;
export const processRefund = PaymentProcessor.processRefund;
export const convertCurrency = PaymentProcessor.convertCurrency;
export const getLocalizedPricing = PaymentProcessor.getLocalizedPricing;
export const calculateTax = PaymentProcessor.calculateTax;