import { PayItems } from './payItems';
export interface DebitUserItems {
    id?: number
    fullName?: string
    phoneNumber?: string
    total?: number
    statusCode?: string
    address?: string
    amountUserDebit?: number
    debtDate?: Date
    creator?: string
    idBill?: number
    typeDebt?: string
    payItems?: PayItems[]
}
