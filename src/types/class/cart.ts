import { Product, CartItem } from '../interfaces';
import { Order } from './order';
import { OrderStatus } from '../interfaces';

class Cart {
    private readonly cartId: string;
    private items: CartItem[];

    constructor(cartId: string) {
        this.cartId = cartId;
        this.items = [];
    }

   
    public addItem(product: Product, quantity: number): void {
        if (quantity <= 0) {
            throw new Error("Количество товара должно быть больше нуля");
        }

        const existingItem = this.items.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem: CartItem = {
                id: this.generateItemId(),
                product,
                quantity,
                priceSnapshot: product.price 
            };
            this.items.push(newItem);
        }
    }

    
    public removeItem(itemId: string): void {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    
    public calculateSubtotal(): number {
        return this.items.reduce((total, item) => {
            return total + (item.priceSnapshot * item.quantity);
        }, 0);
    }

  
    public checkout(deliveryAddress: string, userAddresses: string[] = []): Order {
        if (this.items.length === 0) {
            throw new Error("Невозможно оформить заказ: корзина пуста");
        }

        const order = new Order(
            this.generateOrderId(),
            deliveryAddress,
            null,
            [...this.items], 
            OrderStatus.PENDING
        );

        this.items = []; 

        return order;
    }

   
    private generateItemId(): string {
        return `item_${Math.random().toString(36).substr(2, 9)}`;
    }

   
    private generateOrderId(): string {
        return `order_${Math.random().toString(36).substr(2, 9)}`;
    }
}