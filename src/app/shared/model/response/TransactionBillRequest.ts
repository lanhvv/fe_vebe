import {BaseRequest} from "../request/BaseRequest";
import {TransactionBillResult} from "../../result/bill/TransactionBillResult";

export class TransactionBillRequest extends BaseRequest{
  inPrice!:number;
  paymentMethod!:string;
  transactionType!:string;
  cartCode!:string;
  results!:TransactionBillResult[];
}
