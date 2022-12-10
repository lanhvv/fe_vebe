import { BaseRequest } from './BaseRequest';
import { DetailDebitItems } from './DetailDebitItems';
export class CreateDebitRequest extends BaseRequest{
  fullName!: string
  phoneNumber!: string
  totalAmountOwed!: number
  billId!: number
  address!: string
  typeOfDebtor!: number
  expectedDateOfPaymentOfDebt!: Date
  debitItems!: DetailDebitItems[]
}
