import { Filter } from "../Filter";
import { PageItem } from "../PageItem";
import { BaseRequest } from "./BaseRequest";

export class GetWarehouseRequest extends BaseRequest {
    productId!: number;
    filter!:Filter;
    pageItem!:PageItem;
}