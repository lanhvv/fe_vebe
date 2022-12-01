import {Filter} from "../Filter";
import {TypeProductItemsResponse} from "./typeProductItemsResponse";
import {BaseResponse} from "./BaseResponse";

export class TypeItemsResponse extends BaseResponse{
  data!:TypeProductItemsResponse[];
  totalItems!:number;
  totalPages!:number;
  page!:number;
  pageSize!:number;
  filter!:Filter;
}
