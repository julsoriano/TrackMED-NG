import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'my-popup',
})

export class BasePopupComponent {
  // private items: any[];
  // private item: any;
  
  itemUrl = 'http://localhost:5000/';

  _message: string;
  _id: string; 
  
  @Input()
  set message(message: string) {
    this._message = message;
  }

  @Input()
  set id(id: string) {
    this._id = id;
  }

  get message(): string { return this._message; }
 
  get id(): string { return this._id; }
  
  constructor (
      protected appService: AppService,
  )
  {
  }

  compareFn = (a, b) => {
    if (a.desc < b.desc) return -1;
    if (a.desc > b.desc) return 1;
    return 0;
  };
}
