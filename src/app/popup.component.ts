import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'my-popup',
  templateUrl: './popup.component.html'
})

export class PopupComponent implements OnInit {
  private items: tblComponent[];
  private item: tblComponent;
  private tblName: any;
  itemUrl = 'http://localhost:5000/';
  itemApi = 'api/Owner';
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

constructor (
    protected appService: AppService,
)
{}

ngOnInit() {
  this.getItems(this.itemApi);
}

compareFn = (a, b) => {
  if (a.desc < b.desc) return -1;
  if (a.desc > b.desc) return 1;
  return 0;
};


getItems(itemApi:string): void {
  this.tblName = /api\/(.+$)/.exec(itemApi);
  let urlComplete = this.itemUrl + 'api/Component/' + this.tblName[1] + '/' + '5b0e49451bd0033950d14444';
  
  this.appService.getItems(urlComplete)
    .subscribe(items => {
      this.items = items.sort(this.compareFn);  
      console.log(this.items);
    })
  }
}

export interface tblComponent {
    id: string;
    assetnumber: string;
    imte: string;
    serialnumber: string;
    description: string;
    owner: string;
    status: string;
    model_Manufacturer: string;
    providerOfService: string;
    calibrationDate: Date;
    maintenanceDate: Date;
  }