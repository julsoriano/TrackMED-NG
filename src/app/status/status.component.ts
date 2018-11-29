import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

export class StatusComponent extends BaseComponent implements OnInit {

  itemApi = 'api/Status';
  title: String = "Status";

  ngOnInit() {
    this.getItems(this.itemApi);
  }
}
