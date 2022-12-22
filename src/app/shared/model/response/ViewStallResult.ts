import {ExportItem} from "./ExportItem";

export class ViewStallResult{
  productId!:number;
  productName!:string;
  barCode!:string;
  importId!:number;
  img!:String;
  amount!:number;
  items!:ExportItem[];
  productCode!:string;
}
