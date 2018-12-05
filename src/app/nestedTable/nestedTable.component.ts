import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'my-popup',
  templateUrl: './nestedTable.component.html',
})

export class NestedComponent implements OnInit {
  private items: tblComponent[];
  private item: tblComponent;
  itemUrl = 'http://localhost:5000/';
  itemApi = 'api/Component';
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
this.appService.getItems(this.itemUrl + itemApi)
    .subscribe(items => {this.items = items.sort(this.compareFn); })
  }
}

interface tblComponent {
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