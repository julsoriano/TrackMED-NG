import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

//import { MatDialog } from '@angular/material';
//import { EditDialogComponent } from '../editdialog/editdialog.component';

export class OwnerComponent extends BaseComponent implements OnInit {

  itemApi = 'api/Owner';
  title: String = "Owner";
 
  ngOnInit() {
    this.getItems(this.itemApi);
  }
}

