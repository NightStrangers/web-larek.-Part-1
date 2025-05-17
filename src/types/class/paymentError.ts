export class PaymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymentError';
    Error.captureStackTrace?.(this, PaymentError);
  }
}