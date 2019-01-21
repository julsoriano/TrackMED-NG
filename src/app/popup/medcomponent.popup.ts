import { Component, Input, OnInit } from '@angular/core';
import { BasePopupComponent } from '../popup/base.popup';

@Component({
  selector: 'my-popup',
  template: `
  <p *ngIf="!items"><em>loading ...</em></p>
  <span hidden>Popup: {{ message }} {{ id }} </span>
  
  <table id="nestedTable" class='table-light table-striped table-condensed table-hover table-component' cellspacing='0' width='100%' >
      <thead>
          <tr role="row">
              <th>Index</th>
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
              <td>{{ item.description !== null ? item.description.desc : '' }}</td> 
              <td>{{ item.owner !== null ? item.owner.desc : '' }}</td>
              <td>{{ item.status !== null ? item.status.desc : '' }}</td>
              <td>{{ item.model_Manufacturer !== null ? item.model_Manufacturer.desc : '' }}</td>
              <td>{{ item.providerOfService !== null ? item.providerOfService.desc : '' }}</td>                                      
              <td>{{ item.calibrationDate !== null ? (item.calibrationDate | date) :'' }}</td>
              <td>{{ item.maintenanceDate !== null ? (item.maintenanceDate | date) :'' }}</td>
          </tr>
      </tbody>
  </table>
   
  `
})

export class MedComponentPopupComponent extends BasePopupComponent implements OnInit {
  private items: tblComponent[];

ngOnInit() {
  this.getItems();
}

getItems(): void {

  let urlComplete = this.itemUrl + 'api/Component/' + this._message + '/' + this._id;
  // let urlComplete = this.itemUrl + 'api/Component/' + this._message + '/' + '5b0e49451bd0033950d14444';
  
  this.appService.getItems(urlComplete)
    .subscribe(items => {
      this.items = items.sort(this.compareFn);  
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