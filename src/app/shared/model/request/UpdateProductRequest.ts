import { BaseRequest } from "./BaseRequest";

export class UpdateProductRequest extends BaseRequest {
    productId!: number;
    barCode!:string;
    productName!: string;
    description!:string;
    categoryId!:number;
    statusCode!:number;
}