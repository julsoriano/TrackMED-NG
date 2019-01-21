import { Component, OnInit, Inject } from '@angular/core';
//import { AppInjector } from '../app-injector.service';
import { AppService } from '../app.service';
import { isNullOrUndefined } from 'util';
//import { type } from 'os';

import { MedComponentPopupComponent } from '../popup/medcomponent.popup';
import { SystemPopupComponent } from '../popup/system.popup';
import { NgElement, WithProperties } from '@angular/elements';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  // styleUrls: ['./base.component.scss']
})

// Discussion: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export class BaseComponent {

  // protected loggingService: LoggingService;
  
  private items: tblCommon[];
  private item: tblCommon;
  private itemUrl = 'http://localhost:5000/';
  private selectedItem: tblCommon;
  private svSelected: tblCommon = null;
  private editText: String = "Edit";
  private tblName: any;
  private tr: Element;
  private elListSave: any;

constructor(
  protected appService: AppService,
) 
{    
  // Manually retrieve the dependencies from the injector so that constructor has no dependencies that must be passed in from child
  // No longer necessary because of angular's DI
  // const injector = AppInjector.getInjector();    

  // this.loggingService = injector.get(LoggingService);    
}

  // protected logError(errorMessage: string) { . . . } 
  
  // Function to compare two objects by comparing their `desc` property.const
  // From: https://stackoverflow.com/questions/42203953/angular2-rxjs-order-observable-list-of-objects-by-an-observable-field 
  compareFn = (a, b) => {
    if (a.desc < b.desc) return -1;
    if (a.desc > b.desc) return 1;
    return 0;
  };
  
  getItems(itemApi:string): void {
    this.tblName = /api\/(.+$)/.exec(itemApi);
    this.appService.getItems(this.itemUrl + itemApi)
      .subscribe(items => {this.items = items.sort(this.compareFn); })
  }

  headings: any = {
    'assetnumber' : 'Asset#',
    'imte' : 'IMTE',
    'serialnumber' : 'Serial Number',
    'description' : 'Description',
    'owner' : 'Owner',
    'status' : 'Status',
    'model_Manufacturer' : 'Model/Manufacturer',
    'providerOfService' : 'Service Provider',
    'calibrationDate' : 'Calibration Due Date',
    'maintenanceDate' : 'Maintenance Due Date'
  }    

  // Dynamically compose nested table: Using Plain HTML Elements
  createNTableHTML(id:string, elGP:Node, elP:Node, headings:any) {

    let urlComplete = this.itemUrl + 'api/Component/' + this.tblName[1] + '/' + id;
    
    this.appService.getItems(urlComplete)
      .subscribe(data => {
 
      // console.log("Number of Components = " + Object.keys(data).length);
      // console.log(data);

      // create a <table> element
      this.tr = document.createElement("tr");
      var td = document.createElement("td");
      td.setAttribute("colspan", "5");
    
      var tbl = document.createElement("table");
      tbl.classList.add('table', 'table-light', 'table-striped', 'table-condensed', 'table-hover', 'table-component');

      // create a <thead> element and its child nodes (<tr> and <th>)
      var tblHead = document.createElement("thead");
      var rowH = document.createElement("tr");
      
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
      const fieldNames = Object.getOwnPropertyNames(headings);

      var cell = document.createElement("th");
      cell.style.color = "blue";

      // this will be placed on the 1st column by default
      var cellText = document.createTextNode("Sequence#");
      cell.appendChild(cellText);
      rowH.appendChild(cell);

      for (var fn of fieldNames) {
        // e.g., if property name = 'assetnumber', then celltext = 'Asset#'
        var hdg = headings[fn];
        if (hdg != null) {
          cell = document.createElement("th");
          cell.style.color = "blue";
          cellText = document.createTextNode(hdg);
          cell.appendChild(cellText);
          rowH.appendChild(cell);
        }            
      }
      
      // attach headings to parent nodes
      tblHead.appendChild(rowH);
      tbl.appendChild(tblHead);

      // create a <tbody> element and its child nodes (<tr> and <td>)
      var tblBody = document.createElement("tbody");
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let idx = 0;

      for (var x of data) {

        ++idx;
        var row = document.createElement("tr"); 
        cell = document.createElement("td");

        // this will be placed on the 1st column by default
        cellText = document.createTextNode(idx.toString());
        cell.appendChild(cellText);
        row.appendChild(cell);
        
        // https://stackoverflow.com/questions/37673454/javascript-iterate-key-value-from-json/37673499                
        Object.keys(headings).forEach(function(key) {
          // console.log('Key : ' + key + ', Value : ' + x[key]);
      
          cell = document.createElement("td");
          cell.style.color = "red";
          if( headings[key] === 'Description' || 
            headings[key] === 'Owner' ||
            headings[key] === 'Status' ||
            headings[key] === 'Model/Manufacturer' ||
            headings[key] === 'Service Provider' ) {
            
            // this will be placed on the next column in sequence
            cellText = x[key] !== null ? document.createTextNode(x[key].desc) : document.createTextNode('');

          } else if( headings[key] === 'Calibration Due Date' || 
                     headings[key] === 'Maintenance Due Date')  {
                     
                    // this will be placed on the next column in sequence
                     cellText = x[key] !== null ? document.createTextNode( new Date(x[key]).toLocaleDateString('en-GB', options) ) : document.createTextNode('');                        
          } else {
            // this will be placed on the next column in sequence
            cellText = document.createTextNode(x[key]);
          }

          cell.appendChild(cellText);
          row.appendChild(cell);
        }) 
        
        // add the row to the end of the table body
        tblBody.appendChild(row);
      }
      
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      td.appendChild(tbl);

      // -------- END: C R E A T E   T A B L E 

      this.tr.appendChild(td);
      elGP.insertBefore(this.tr, elP.nextSibling); 
      // return this.tr;  
    });

  };

  // Dynamically compose nested table: Using Custom HTML Elements
  createNTableHTMLCustom(id:string, elGP:Node, elP:Node) {

    this.tr = document.createElement("tr");
    var td = document.createElement("td");
    td.setAttribute("colspan", "4");
        
    // Create element  
    if( this.tblName[1] === 'Description' || 
      this.tblName[1] === 'Owner' ||
      this.tblName[1] === 'Status' ||
      this.tblName[1] === 'Model_Manufacturer' ||
      this.tblName[1] === 'Service Provider' ) { 

      const popupEl: NgElement & WithProperties<MedComponentPopupComponent> = document.createElement('medcomponentpopup-element') as any;
  
      popupEl.message = this.tblName[1];
      popupEl.id = id;
      td.appendChild(popupEl); 
  
    } else if( this.tblName[1] === 'Location') {
      
      const popupElSystem: NgElement & WithProperties<SystemPopupComponent> = document.createElement('systempopup-element') as any;

      popupElSystem.message = this.tblName[1];
      popupElSystem.id = id;
      td.appendChild(popupElSystem); 
    } 

    this.tr.appendChild(td);
    elGP.insertBefore(this.tr, elP.nextSibling); 

  }

  onSelect(item: any): void {
    if (this.svSelected == item) {
      this.selectedItem = null;
      this.editText = "Edit";
    }
    else {
      this.selectedItem = item;
      this.svSelected = item;
      this.editText = "Cancel Edit";
    }
  }

  onDelete(item: tblCommon, index) {
    // https://stackoverflow.com/questions/43962481/angular-2-get-element-data-and-remove-it
    if(window.confirm('Please confirm deletion of row')) {
      // this.delete(this.selectedItem, this.itemUrl);    // physically delete record: not working yet
      this.items.splice(index, 1);          // remove row from array items
    } else {
      return false;
    }
  }

  delete(item: tblCommon, itemUrl:string): void {
    alert('id:' + item.id + ' name: ' + item.desc);
    this.appService.deleteItem(item, itemUrl).subscribe();
  }

  showRelatedTable(event: any , item): void {

    let id:string = item.id;
    let elP: Node = event.target.parentNode; // Parent Node: tr
    let elGP: Node = elP.parentNode;         // Parent Node: tbody
    let elList = event.target.classList;

    if (elList.contains('glyphicon-plus')) {
        
      elList.replace('glyphicon-plus', 'glyphicon-minus');
      
      if( !isNullOrUndefined(this.tr)) this.tr.parentNode.removeChild(this.tr);
      if( !isNullOrUndefined(this.elListSave)) this.elListSave.replace('glyphicon-minus', 'glyphicon-plus');

      // create nested table using regular HTML elements
      // this.createNTableHTML(id, elGP, elP, this.headings);

      // create nested table using custom HTML elements
      this.createNTableHTMLCustom(id, elGP, elP);
 
      this.elListSave = elList;

    } else {
      elList.replace('glyphicon-minus', 'glyphicon-plus');
      this.tr.parentNode.removeChild(this.tr); // https://www.w3schools.com/js/js_htmldom_nodes.asp
      this.tr = null;
    }
  } 

  /*
  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.appService.addItem({ name } as item)
    .subscribe(item => {
      this.items.push(item);
    });
  }
  */
}

export interface tblCommon {
  id: string;
  desc: string;
  createdAtUtc: Date;
}