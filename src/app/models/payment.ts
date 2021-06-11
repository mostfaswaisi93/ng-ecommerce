import { PaymentMethod } from '../enums/payment-methods.enum';
import { User } from './user';

export class Payment {
  id: number;
  client: User;
  date: Date;
  amount: number;
  // tslint:disable-next-line:variable-name
  payment_method: PaymentMethod;
  invoiceId: number;
}
