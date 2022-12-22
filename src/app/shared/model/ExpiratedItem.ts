export default class ExpiratedItem{
  idImport !: number;
  nameProduct !: string;
  amount !: string;
  dateAdded !: Date;
  expired !: Date;
  inCome !: number;
  creator !: string;
  list !: Uitem[];
}

export class Uitem {
  nameUnit !: string;
  amount !: number;
  idUnit !: number;
  idExport !: number;
  editAmount !: number;
  outPrice !: number;
}

