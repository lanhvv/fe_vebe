import {Status} from "../Status";
import {TypeProduct} from "../TypeProduct";
import {Supplier} from "../supplier.model";

export class SupplierResponse {
  status !: Status;
  supplierItems !: Supplier[];
}
