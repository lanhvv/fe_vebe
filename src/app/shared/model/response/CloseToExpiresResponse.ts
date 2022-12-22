import {Status} from "../Status";
import CloseToExpirationItem from "../CloseToExpirationItem";

export class CloseToExpiresResponse{
  status !: Status;
  closeToExpirationItems !: CloseToExpirationItem[];

  totalItems !: number;
  totalPages !: number;
  page !: number;
  pageSize !: number;
}
