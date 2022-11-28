import { Category } from "../category.model";
import { ProductStatusItem } from "../ProductStatusItem";

export class InfoUpdateProductResponse{
    typeProductItems!:Category[];
    idProd!:number;
    nameProd!:string;
    statusName!:string;
    statusCode!:number;
    img!:string;
    barCode!:string;
    description!:string;
    categoryId!:number;
    categoryName!:string;
    statusItems!:ProductStatusItem[];
}