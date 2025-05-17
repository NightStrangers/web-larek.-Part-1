import { PaymentMethod, CartItem, PaymentResult } from "../interfaces";
export class PaymentService {
  async process(amount: number, method: PaymentMethod): Promise<PaymentResult> {
  
    return { success: true, transactionId: 'txn_123' };
  }
}

export class InventoryService {
  async reserveItems(items: CartItem[]): Promise<void> {
   
    console.log(`Reserving ${items.length} items`);
  }
}

export class NotificationService {
  static async sendOrderConfirmation(orderId: string): Promise<void> {
    console.log(`Order confirmation sent for ${orderId}`);
  }

  static async sendPaymentFailure(orderId: string, reason: string): Promise<void> {
    console.log(`Payment failed for ${orderId}: ${reason}`);
  }
}
export class ErrorReportingService {
  static async log(error: Error): Promise<void> {
    console.error('Error reported:', error);
  }} 