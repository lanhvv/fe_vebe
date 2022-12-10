import { ProductItem } from "../ProductItem";
import { BaseResponse } from "./BaseResponse";

export class LockResponse extends BaseResponse{
    item!: ProductItem;
}