import { Component, Input, OnInit } from '@angular/core';
import { BasePopupComponent } from '../popup/base.popup';

@Component({
  selector: 'my-popupSystem',
  template: `
  <p *ngIf="!items"><em>loading ...</em></p>
  <span hidden>Popup: {{ message }} {{ id }} </span>
  
  <table id="nestedTable" class='table-light table-striped table-condensed table-hover table-component' cellspacing='0' width='100%' >
      <thead>
          <tr role="row">
              <th>Index</th>
              <th>IMTE</th>
              <th>Reference No.</th>
              <th>System Description</th>
              <th>Deployment Date</th>
              <th>Location</th>                   
          </tr>
      </thead>
      <tbody>
          <tr *ngFor="let item of items; let i = index;">
              <td>{{ i + 1 }}</td>
              <td>{{ item.imte }}</td>
              <td>{{ item.referenceNo }}</td>
              <td>{{ item.systemsDescription !== null ? item.systemsDescription.desc : '' }}</td>                        
              <td>{{ item.deploymentDate !== null ? (item.deploymentDate | date) : '' }}</td>
              <td>{{ item.location !== null ? (item.location.desc) : '' }}</td>
          </tr>
      </tbody>
  </table>
   
  `
})

export class SystemPopupComponent extends BasePopupComponent implements OnInit {
  private items: tblSystem[];
 
ngOnInit() {
  this.getItems();
}

getItems(): void {

  let urlComplete = this.itemUrl + 'api/SystemTab/' + this._message + '/' + this._id;
  this.appService.getItems(urlComplete)
    .subscribe(items => {
      this.items = items.sort(this.compareFn);  
    })
  }
}

export interface tblSystem {
    id: string;
    imte: string;
    referenceNo: string;
    systemsDescription: string;
    deploymentDate: Date;
    location: string;
  }