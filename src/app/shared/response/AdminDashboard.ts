export interface IAdminDashboard{
  startDate?: Date;
  endDate?: Date;
  quantity?: number;
  sales?: number;
  blockProduct?: number;
  soldOut?: number;
}

export class AdminDashboard implements IAdminDashboard{

  constructor(
    public blockProduct: number,
    public endDate: Date,
    public quantity: number,
    public sales: number,
    public soldOut: number,
    public startDate: Date,
  ) {
  }
}


