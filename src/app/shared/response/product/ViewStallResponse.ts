import {BaseResponse} from "../BaseResponse";
import {ViewStallResult} from "../../result/product/ViewStallResult";
import {PageItem} from "../../model/PageItem";
import {Filter} from "../../model/Filter";

export class ViewStallResponse extends BaseResponse {
  filter!: Filter;
  page!: PageItem;
  results!: ViewStallResult[];
}
