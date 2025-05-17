import {User} from './user';
import { OrderError } from './orderError';
import { PaymentError } from './paymentError';
import { PaymentService, InventoryService, NotificationService, ErrorReportingService } from '../services/orderServices';
import { CartItem, OrderStatus, PaymentMethod } from '../interfaces';

export class Order {
    constructor(
        public readonly orderId: string,
        public deliveryAddress: string,
        public paymentMethod: PaymentMethod,
        public items: CartItem[],
        public status: OrderStatus=OrderStatus.DRAFT
        
        
    ) {}
   async finalizeOrder(paymentMethod: PaymentMethod): Promise<void> {
    try {
      this.validateOrder();
      this.setPaymentMethod(paymentMethod);
      
      await this.processPayment();
      await this.updateInventory();
      
      this.status = OrderStatus.COMPLETED;
      await this.sendNotifications();
      
    } catch (error) {
      await this.handleOrderFailure(error);
      throw error;
    }
  }

  private validateOrder(): void {
    if (this.items.length === 0) {
      throw new OrderError('Нельзя оформить пустой заказ');
    }
    
    if (this.status !== OrderStatus.PENDING) {
      throw new OrderError(`Некорректный статус заказа: ${this.status}`);
    }
  }

  private async processPayment(): Promise<void> {
    try {
      const paymentService = new PaymentService();
      const paymentResult = await paymentService.process(
        this.calculateTotal(), 
        this.paymentMethod!
      );
      
      if (!paymentResult.success) {
        throw new PaymentError(paymentResult.message || 'Ошибка оплаты');
      }
      
    } catch (error) {
      throw new PaymentError(`Платеж не прошел: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  private async updateInventory(): Promise<void> {
    const inventoryService = new InventoryService();
    await inventoryService.reserveItems(this.items);
  }

  private async sendNotifications(): Promise<void> {
    await NotificationService.sendOrderConfirmation(this.orderId);
  }

  private async handleOrderFailure(error: unknown): Promise<void> {
    this.status = OrderStatus.FAILED;
    await ErrorReportingService.log(error instanceof Error ? error : new Error(String(error)));
    
    if (error instanceof PaymentError) {
      await NotificationService.sendPaymentFailure(this.orderId, error.message);
    }
  }

  private calculateTotal(): number {
    return this.items.reduce((total, item) => total + (item.priceSnapshot * item.quantity), 0);
  }

  private setPaymentMethod(method: PaymentMethod): void {
    if (!Object.values(PaymentMethod).includes(method)) {
      throw new OrderError(`Недопустимый способ оплаты: ${method}`);
    }
    this.paymentMethod = method;
  }
}
