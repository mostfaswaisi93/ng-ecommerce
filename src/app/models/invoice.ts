import { Payment } from './payment';
import { User } from './user';

export class Invoice {
  id: number;
  // tslint:disable-next-line:variable-name
  invoice_total: number;
  // tslint:disable-next-line:variable-name
  invoice_date: Date;
  number: string;
  // tslint:disable-next-line:variable-name
  due_date: Date;
  // tslint:disable-next-line:variable-name
  payment_date: Date;
  client: User;
  payment: Payment;
}
