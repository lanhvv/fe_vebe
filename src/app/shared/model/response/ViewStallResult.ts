import {ExportItem} from "./ExportItem";

export class ViewStallResult{
  productId!:number;
  productName!:String;
  barCode!:string;
  importId!:number;
  img!:String;
  amount!:number;
  items!:ExportItem[];
}
