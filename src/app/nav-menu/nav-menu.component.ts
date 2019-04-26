import { Component, OnInit } from '@angular/core';

import { Table } from '../table';
import { TableService } from '../table.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  tables: Table[];

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.getTables();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  
  getTables(): void {
    this.tableService.getTables()
    .subscribe(tables => this.tables = tables);
  }

}
