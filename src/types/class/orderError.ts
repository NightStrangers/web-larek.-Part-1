export class OrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderError';
    Error.captureStackTrace?.(this, OrderError);
  }
}