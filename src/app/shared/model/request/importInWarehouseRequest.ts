import { Unit } from '../Unit';
export class ImportInWarehouseRequest {
    nameProd!:string;
    unit!:string;
    description!:string;
    categoryId!:number;
    supplierId!:number;
    barCode!:string;
    amount!:number;
    inPrice!:number;
    units:Unit[]=[];
    unitId!:number;
    fileId!:number;
    rangeDates!: string;
    supplierName!: string;
}
