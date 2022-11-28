import { Unit } from "../Unit";
import { BaseRequest } from "./BaseRequest";

export class CreateProductRequest extends BaseRequest{
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
}
