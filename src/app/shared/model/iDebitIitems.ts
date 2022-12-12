export interface IDebitItems {
  id?: number
  debitDate?: Date
  creatorDebtor?: string
  fullName?: string
  phoneNumber?: string
  totalAmountOwed?: number
  creatorPayer?: string
  statusCode?: string
  billId?: number
  address?: string
  typeOfDebtor?: number
  expectedDateOfPaymentOfDebt?: Date
}
