import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

export class LocationComponent extends BaseComponent implements OnInit {

  itemApi = 'api/Location';
  title: String = "Location";
 
  ngOnInit() {
    this.getItems(this.itemApi);
  }
}
