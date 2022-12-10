import { DetailDebitItems } from './DetailDebitItems';
export class PayRequest {
  fullName!: string
  phoneNumber!: string
  totalAmountOwed!: number
  billId!: number
  address!: string
  typeOfDebtor!: number
  expectedDateOfPaymentOfDebt!: Date
  debitItems!: DetailDebitItems[]
  inPrice!: number
}
