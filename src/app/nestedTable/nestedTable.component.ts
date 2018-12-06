import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'my-popup',
  // templateUrl: './nested.component.html'
  template: `
  <p *ngIf="!items"><em>loading ...</em></p>
  <span hidden>Popup: {{ message }} {{ id }} </span>
  <div>
      <table id="nestedTable" class='table table-light table-striped table-condensed table-hover table-component'>
          <thead>
              <tr role="row">
                  <th>Sequence #</th>
                  <th>Asset#</th>
                  <th>IMTE</th>
                  <th>Serial Number</th>
                  <th>Description</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Model/Manufacturer</th>
                  <th>Service Provider</th>
                  <th>Calibration Due Date</th>
                  <th>Maintenance Due Date</th>                   
              </tr>
          </thead>
          <tbody>
              <tr *ngFor="let item of items; let i = index;">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.assetnumber }}</td>
                  <td>{{ item.imte }}</td>
                  <td>{{ item.serialnumber }}</td>
                  <td>{{ item.description.desc }}</td> 
                  <td>{{ item.owner.desc }}</td>
                  <td>{{ item.status !== null?item.status.desc:'' }}</td>
                  <td>{{ item.model_Manufacturer.desc }}</td>
                  <td>{{ item.providerOfService !== null?item.providerOfService.desc:'' }}</td>                                      
                  <td>{{ item.calibrationDate | date }}</td>
                  <td>{{ item.maintenanceDate | date }}</td>
              </tr>
          </tbody>
      </table>
  </div>  
  `
})

export class NestedComponent implements OnInit {
  private items: tblComponent[];
  private item: tblComponent;
  
  itemUrl = 'http://localhost:5000/';
  // itemApi = 'api/Owner';

  @Input()
  set message(message: string) {
    this._message = message;
  }

  @Input()
  set id(id: string) {
    this._id = id;
  }

  get message(): string { return this._message; }
  _message: string;

  get id(): string { return this._id; }
  _id: string; 

  constructor (
      protected appService: AppService,
  )
  {
  }

ngOnInit() {
  this.getItems();
}

compareFn = (a, b) => {
  if (a.desc < b.desc) return -1;
  if (a.desc > b.desc) return 1;
  return 0;
};


getItems(): void {

  let urlComplete = this.itemUrl + 'api/Component/' + this._message + '/' + this._id;
  //let urlComplete = this.itemUrl + 'api/Component/' + this._message + '/' + '5b0e49451bd0033950d14444';
  
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