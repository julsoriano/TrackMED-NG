import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-bs';

//import { MatDialog } from '@angular/material';
//import { EditDialogComponent } from '../editdialog/editdialog.component';

// Rationale: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export class Model_ManufacturerComponent extends BaseComponent implements OnInit {

  itemApi = 'api/Model_Manufacturer';
  title: String = "Model_Manufacturer";

  public tableWidget: any;

  //@Output() rowSelected: EventEmitter<number> = new EventEmitter();
  /*
  constructor() { 
    super();    
  }   
  */
  ngOnInit() {
    this.getItems(this.itemApi);
  }

  /*
  ngAfterViewInit() {
    this.initDatatable()
  }

  private initDatatable(): void {
    let exampleId: any = $('#nestedTable');
    this.tableWidget = exampleId.DataTable({
      "lengthMenu": [[25, 10, 50, -1], [25, 10, 50, "All"]],
    //  select: true  
    });
    //$('table.dataTable').DataTable({
    //  "lengthMenu": [[25, 10, 50, -1], [25, 10, 50, "All"]]
    //});
    //this.tableWidget.on('select',
    //(e, dt, type, indexes) => this.onRowSelect(indexes))
  
  }
  */
}