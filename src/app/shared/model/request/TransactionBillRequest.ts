import {BaseRequest} from "./BaseRequest";

export class TransactionBillRequest extends BaseRequest{
  inPrice!: number;
  paymentMethod!: string;
  transactionType!: string;
  cartCode!: string;

}
