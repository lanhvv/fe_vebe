import {BaseResponse} from "./BaseResponse";
import {ProductStallResult} from "./ProductStallResult";

export class SearchViewStallResponse extends BaseResponse{
  results!:ProductStallResult[];
}
