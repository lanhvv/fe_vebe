import { Unit } from '../Unit';
import {Units} from "../Units";
export class ImportInWarehouseRequest {
    nameProd!:string;
    unit!:string;
    description!:string;
    categoryId!:number;
    supplierId!:number;
    barCode!:string;
    amount!:number;
    inPrice!:number;
    units:Units[]=[];
    unitId!:number;
    fileId!:number;
    rangeDates!: string;
    supplierName!: string;
}
