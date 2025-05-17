
export interface Product {
  id: string;
  name: string;
  price: number; 
  images: string[];
  category: string;
}


export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  priceSnapshot: number; 
}


export enum OrderStatus {
  DRAFT = "draft",
  PENDING = 'PENDING',
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum PaymentMethod {
  ONLINE = "online",
  CASH_ON_DELIVERY = "cash_on_delivery",
}

export interface PaymentResult {
  success: boolean;
  message?: string;
  transactionId?: string;
}