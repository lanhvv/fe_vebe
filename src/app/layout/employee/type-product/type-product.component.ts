import { Component, OnInit } from '@angular/core';
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.css']
})
export class TypeProductComponent implements OnInit {
  files1!: TreeNode[];

  files2!: TreeNode[];
  cols!: any[];
  constructor() { }

  ngOnInit(): void {
  }

}
