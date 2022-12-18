import { DetailDebitItems } from './DetailDebitItems';
export class UpdateDebitRequest {
  fullName!: string
  idDebit!: number
  phoneNumber!: string
  totalAmountOwed!: number
  billId!: number
  address!: string
  typeOfDebtor!: number
  description!: string
  inPrice!: number;
  createDate!: Date;
  total!: number;
}
