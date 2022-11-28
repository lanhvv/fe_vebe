import { Filter } from "../Filter";
import { ProductItem } from "../ProductItem";
import { BaseResponse } from "./BaseResponse";

export class GetProductsResponse extends BaseResponse {
    items!:ProductItem[];
    totalItems!:number;
    totalPages!:number;
    page!:number;
    pageSize!:number;
    filter!:Filter;
}