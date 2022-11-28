import {WarehouseStallResult} from "./WarehouseStallResult";

export class ViewStallResult {
  productName!:string;
  productId!:number;
  barCode!:string;
  results!:WarehouseStallResult[];
}
