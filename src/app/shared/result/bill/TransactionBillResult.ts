import {ExportItem} from "../../model/response/ExportItem";

export class TransactionBillResult{
  productId!:number;
  importId!:number;
  amount!:number;
  item!:ExportItem;
}
