import { Component, OnInit } from '@angular/core';
import {UnitService} from "../../../services/unit/unit.service";
import {ResponseUnit} from "../../../shared/model/response/ResponseUnit";
import {UnitItems} from "../../../shared/model/UnitItems";
import {UnitRequest} from "../../../shared/model/request/UnitRequest";
import {ConfirmationService, MessageService} from "primeng/api";
import {bottom} from "@popperjs/core";
import {Unit} from "../../../shared/model/Unit";

@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-unit.component.html',
  styleUrls: ['./manage-unit.component.css']
})
export class ManageUnitComponent implements OnInit {
  constructor(private unitService : UnitService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.unit.amount = 1;
    this.load();
  }
  feature = "";
  idUnit : number = 0;
  idUnitParent : number = 0;
  idUnitChild : number = 0;
  selectedValueLocateUnit : string = "";
  unitDialog !: boolean;
  unit : UnitItems = new UnitItems();
  submitted!: boolean;
  showCategory : boolean = false;
  totalItems = 0;
  nameSearch = "";

  hideDialog() {
    this.unitDialog = false;
    this.submitted = false;
  }

  saveAndUpdateUnit() {
    if (this.feature === "create") {
      this.save();
    } else {
      this.update();
    }
  }

  save() {
    this.submitted = true;
    if (this.unit.unitName.trim()) {
      var request : UnitRequest = new UnitRequest();
      if (this.idUnit > 0) {
        request.id = this.unit.id;
      }

      request.unitName = this.unit.unitName;
      request.amount = this.unit.amount;
      request.description = this.unit.description;
      if (this.showCategory) {
        if (this.selectedValueLocateUnit === "parent") {
          request.parentId = this.unit.parent;
          request.childId = this.idUnit;
        } else if (this.selectedValueLocateUnit === "child") {
          request.parentId = this.idUnit;
          request.childId = 0;
        } else {
          return;
        }
      } else {
        request.parentId = 0;
        request.childId = 0;
      }

      this.unitService.save(request).subscribe(data => {
          this.load();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Tạo đơn vị thành công', life: 3000});
        }
      );
      this.unitDialog = false;
    }
  }

  update() {
    this.submitted = true;
    let flag = true;
    if (!this.unit.unitName.trim()) {
      flag = false;
    }
    let text = this.unit.amount+'"';
    if (text === "null") {
      flag = false;
    }

    console.log(flag);

    if (flag === true) {
      var request : UnitRequest = new UnitRequest();
      request.id = this.unit.id;
      request.unitName = this.unit.unitName;
      request.amount = this.unit.amount;
      request.description = this.unit.description;
      this.unitService.update(request).subscribe(data => {
          this.load();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Đã cập nhập đơn vị', life: 5000});
        }
      );
      this.unitDialog = false;
    }
  }

  openNew(id:number, idParent : number){
    this.showCategory = false;
    this.feature = "create";
    this.idUnitParent = 0;
    this.idUnit = id;
    this.selectedValueLocateUnit = "";
    if (this.idUnit > 0) {
      this.findById(this.idUnit, idParent);
      this.showCategory = true;
    }

    this.submitted = false;
    this.unitDialog = true;
    // @ts-ignore
    this.unit = {
      id : 0,
      unitName : "",
      parent : idParent,
      description : "",
      amount : 1
    };
    console.log(this.unit.parent);
  }

  openUpdate(id:number, idParent : number) {
    this.feature = "update";
    this.idUnit = id;
    this.showCategory = false;
    console.log(id +"-"+ idParent);
    for (let i = 0; i < this.units.list.length; i++) {
      let unit : UnitItems = this.units.list[i];
      if (idParent === 0) {
        if (this.idUnit === unit.id ) {
          Object.assign(this.unit, unit);
          break;
        }
      }else {
        for (let j = 0; j < unit.list.length; j++) {
          let unitChild = unit.list[j];
          if (id === unitChild.id) {
            Object.assign(this.unit, unitChild);
            break;
          }
        }
      }
    }
    this.unitDialog = true;
  }

  units !: ResponseUnit;

  load() {
    this.unitService.getUnit(this.nameSearch, this.page, this.row).subscribe(data => {
      this.units = data as ResponseUnit;
      this.totalItems = this.units.totalItems;
      console.log(this.units);
    });
  }

  findById(id:number, idParent:number) {
    for (let i = 0; i < this.units.list.length; i++) {
      let unit : UnitItems = this.units.list[i];
      if (idParent === 0) {
        if (id === unit.id) {
          this.idUnitParent = unit.parent;
          break;
        }
      } else {
        for (let j = 0; j < unit.list.length; j++) {
          let unitChild : UnitItems = unit.list[j];
          if (id === unitChild.id) {
            this.idUnitParent = unitChild.parent;
          }
        }
      }
    }
  }

  selectUnitDelete = 0;

  deleteSelectUnit(idChild:number, idParent:number) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn xóa đơn vị đang chọn?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (idParent !== 0) {
          this.delete(idChild);
        } else {
          let items = this.getUnit(idChild, this.units.list);
          if (items.list.length > 1) {
            this.selectUnitDelete = idChild;
            this.openChooseUnitParentDialog(idChild);
          } else {
            if (items.list.length === 0) {
              this.delete(idChild);
            } else {
              let listEmpty : UnitItems[] = [];
              this.deleteParentIdEqual0(idChild, items.list[0].id, listEmpty);
            }
          }
        }
      }
    });
  }

  delete(id:number) {
    this.unitService.delete(id).subscribe(data => {
      this.load();
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Đã  xóa đơn vị', life: 3000});
    })
  }

  unitDeleteEdit !: UnitItems[];
  unitIdChooseParent !: number;
  chooseUnitParentDialog !: boolean;
  submitChooseUnitParentDialog !: boolean;

  hideChooseUnitParentDialog() {
    this.chooseUnitParentDialog = false;
    this.submitChooseUnitParentDialog = false;
  }

  openChooseUnitParentDialog(id:number) {
    for (let i = 0; i < this.units.list.length; i++) {
      let item : UnitItems = this.units.list[i];
      if (id === item.id) {
        this.unitDeleteEdit = item.list;
        //console.log(this.unitDeleteEdit);
        break;
      }
    }

    this.chooseUnitParentDialog = true;
    this.submitChooseUnitParentDialog = false;
  }

  openEditAmountUnit() {
    let amountUnitChoose = this.getAmount(this.unitIdChooseParent, this.unitDeleteEdit);
    let flag = true;
    for (let i = 0; i < this.unitDeleteEdit.length; i++) {
      let item : UnitItems = this.unitDeleteEdit[i];
      if (this.unitIdChooseParent == item.id) {
        continue;
      }

      if (amountUnitChoose > item.amount) {
        flag = false;
      } else {
        flag = true;
      }
    }

    if (flag === false) {
      this.confirmationService.confirm({
        message: 'Đơn vị bạn chọn đang là nhỏ nhất trong nhánh có tiếp tục chứ?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.cloneUnitDeleteEdit = this.unitDeleteEdit.map(x => Object.assign({}, x));
          this.cloneUnitDeleteEdit.splice(this.cloneUnitDeleteEdit.indexOf(this.getUnit(this.unitIdChooseParent, this.cloneUnitDeleteEdit)), 1);
          this.chooseUnitParentDialog = false;
          this.editUnitParentDialog = true;
        }
      });
    } else {
      this.cloneUnitDeleteEdit = this.unitDeleteEdit.map(x => Object.assign({}, x));
      this.cloneUnitDeleteEdit.splice(this.cloneUnitDeleteEdit.indexOf(this.getUnit(this.unitIdChooseParent, this.cloneUnitDeleteEdit)),1);
      this.chooseUnitParentDialog = false;
      this.editUnitParentDialog = true;
    }
  }

  cloneUnitDeleteEdit !: UnitItems[];
  editUnitParentDialog = false;
  submitEditUnitParentDialog = false;

  prevChooseUnitParentDialog() {
    this.editUnitParentDialog = false;
    this.openChooseUnitParentDialog(this.selectUnitDelete);
  }

  getUnit = function (id:number, items:UnitItems[]) {
    let unit = new UnitItems();
    for (let i= 0; i < items.length; i++) {
      let item = items[i];
      if (item.id == id) {
        unit = item;
      }
    }
    return unit;
  }

  getAmount  = function (id:number , list:UnitItems[]) {
    var amount = -1;
    for (let i = 0; i < list.length; i++) {
      let item : UnitItems = list[i];
      if (id == item.id) {
        amount =  item.amount;
        break;
      }
    }
    return amount;
  };

  confirmDeleteParentUnit() {
    this.submitEditUnitParentDialog = true;
    let flag = true;
    for (let i = 0; i < this.cloneUnitDeleteEdit.length; i++) {
      let item : UnitItems = this.cloneUnitDeleteEdit[i];
      let text = item.amount+"";
      console.log(typeof (text));
      if (text === 'null') {
        flag = false;
      }
    }

    console.log(flag);

    if (flag == true) {
      this.editUnitParentDialog = false;
      this.submitEditUnitParentDialog = false;
      this.deleteParentIdEqual0(this.selectUnitDelete, this.unitIdChooseParent, this.cloneUnitDeleteEdit);
    }
  }

  deleteParentIdEqual0(idDelete:number, idParent:number, list:UnitItems[]) {
    this.unitService.deleteParentIdEqual0(idDelete, idParent, list).subscribe(data => {
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Đã  xóa đơn vị', life: 5000});
      this.load()
    });
  }

  page = 0;
  row = 10;
  paginate(event:any) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log(event.page +"-"+ event.rows);
    this.page = event.page;
    this.row = event.rows;
    this.load();
  }

  onSearch() {
    this.page = 0;
    this.row = 10;
    this.load();
  }

}
