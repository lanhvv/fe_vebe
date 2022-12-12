
import { BaseRequest } from './../request/BaseRequest';
export class DebitDetailResponse extends BaseRequest{
  productName!: string
  amount!: number
  unitId!: number
  price!: number
  totalDebit!: number
  debitId!: number
}
