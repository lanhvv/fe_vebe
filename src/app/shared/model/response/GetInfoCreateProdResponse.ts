import { Category } from "../category.model";
import { InfoUnitItem } from "../InfoUnitItem";
import { BaseResponse } from "./BaseResponse";
import { GetSupplierItem } from "./GetSupplierItem";

export class GetInfoCreateProdResponse extends BaseResponse{
    items!:GetSupplierItem[];
    typeProductItems!:Category[];
    unitItems!:InfoUnitItem[];

}
