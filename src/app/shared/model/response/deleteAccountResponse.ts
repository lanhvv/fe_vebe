import { BaseResponse } from './BaseResponse';
import {AccountItems} from "../AccountItems";
export class DeleteAccountResponse extends BaseResponse {
  item!:AccountItems;
}
