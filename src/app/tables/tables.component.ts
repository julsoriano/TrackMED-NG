import { Component, OnInit } from '@angular/core';

import { Table } from '../table';
import { TableService } from '../table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
/*
  table: Table = {
    id: 1,
    name: 'Description'
  };

  constructor() { }

  ngOnInit() {
  }
*/
selectedHero: Table;

tables: Table[];

constructor(private tableService: TableService) { }

  ngOnInit() {
    this.getTables();
  }

  onSelect(hero: Table): void {
    this.selectedHero = hero;
  }

  getTables(): void {
    this.tableService.getTables()
    .subscribe(tables => this.tables = tables);
  }

}
