import {ExportStallItem} from "../../item/product/ExportStallItem";
import {CategoryItem} from "../../item/product/CategoryItem";

export class WarehouseStallResult {
  categoryItem!:CategoryItem;
   exportStallItems!:ExportStallItem[];
  img!:string;
  warehouseId!:number;
}
