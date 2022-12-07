import {CreateDetailBillResult} from "./CreateDetailBillResult";

export class ViewBillRequest{
  cartCode!:string;
  detailBills!:CreateDetailBillResult[];
}
