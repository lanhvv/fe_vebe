import {BaseResponse} from "./BaseResponse";
import {ViewStallResult} from "./ViewStallResult";

export class ViewStallResponse extends BaseResponse{
  results!:ViewStallResult[];
}
