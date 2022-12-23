import {BaseRequest} from "./BaseRequest";
import {ViewStallResult} from "../response/ViewStallResult";

export class TransactionBillRequest extends BaseRequest{
  inPrice!: number;
  paymentMethod!: string;
  transactionType!: string;
  cartCode!: string;
  viewStallResults: ViewStallResult[]=[];
}
