import {Status} from "../Status";
import {Supplier} from "../../model/supplier.model";

export class SupplierResponse {
  status !: Status;
  supplierItems !: Supplier[];
  totalItems !: number;
  totalPages !: number;
  supplierActive !: number;
}
