import {Status} from "../Status";
import {CloseToExpirationItem} from "../CloseToExpirationItem";

export class CloseToExpiresResponse{
  status !: Status;
  closeToExpirationItems !: CloseToExpirationItem[];
}
