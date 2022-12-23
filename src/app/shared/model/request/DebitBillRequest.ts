import { BaseRequest } from './BaseRequest';

export class DebitBillRequest extends BaseRequest {
  inPrice!: number;
  paymentMethod!: string;
  transactionType!: string;
  cartCode!: string;
  fullName!: string;
  address!: string;
  phoneNumber!: string;
  totalPriceDebt!: number;
  message!: string
}
