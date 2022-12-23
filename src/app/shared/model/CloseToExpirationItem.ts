export default class CloseToExpirationItem{
  idImport !: number;
  nameProduct !: string;
  amount !: string;
  dateAdded !: Date;
  expired !: Date;
  inCome !: number;
  creator !: string;
  supplier !: string;
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

export class ExportItem {
  amount !: number;
  idExport !: number;
}
