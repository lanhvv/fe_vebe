import { BaseRequest } from './BaseRequest';
import { ViewStallResult } from '../response/ViewStallResult';

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
  viewStallResults: ViewStallResult[]=[];
}
