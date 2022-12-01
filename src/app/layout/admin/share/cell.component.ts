import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-cell',
  template: `
    <div *ngIf="!isEditing" (click)="openEdit()">
      {{ value }}
      <button class="root-btn float-end" *ngIf="!value" (click)="openEdit()">
        <i class="fa-solid fa-pencil"></i>
      </button>
    </div>
    <div *ngIf="isEditing" [formGroup]="formGroup">
      <input type="text" [formControlName]="field"/>
      <button (click)="saveEdit()" class="root-btn ms-2">Lưu</button>
    </div>
  `,
  styles: [
    '.root-btn { background-color: #0061C1; color: white; border: none; border-radius: 2px; }'
  ]
})
export class CellComponent {
  @Input() value: any | null;
  @Input() field: any | null;
  @Input() formGroup: any | null;
  isEditing = false;
  previousValue: any | null;

  openEdit() {
    this.isEditing = true;
    this.previousValue = this.value;
  }

  saveEdit() {
    this.isEditing = false;
  }

}
