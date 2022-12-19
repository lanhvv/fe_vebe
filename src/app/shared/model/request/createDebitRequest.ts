import { BaseRequest } from './BaseRequest';
export class CreateDebitRequest extends BaseRequest{
  fullName!: string
  phoneNumber!: string
  totalAmountOwed!: number
  billId!: number
  address!: string
  typeOfDebtor!: number
  description!: string
}
