import { Filter } from "../Filter";
import { GetCharWareHouseItem } from "../GetCharWareHouseItem";
import { GetLastImportItem } from "../GetLastImportItem";
import { GetWarehouseItem } from "../GetWarehouseItem";
import { PageItem } from "../PageItem";
import { BaseResponse } from "./BaseResponse";
import { GetProductResult } from "./GetProductResult";

export class GetWarehouseResponse extends BaseResponse{
    getWarehouseItems!:GetWarehouseItem[];
    getProductResult!:GetProductResult;
    pageItem!:PageItem;
    getLastImportItem!:GetLastImportItem;
    filterItem!:Filter;
    getCharWareHouseItems!:GetCharWareHouseItem[];
}