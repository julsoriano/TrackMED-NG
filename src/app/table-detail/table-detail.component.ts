import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Table }         from '../table';
import { TableService }  from '../table.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {
  @Input() table: Table;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTable();
  }

  getTable(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tableService.getTable(id)
      .subscribe(table => this.table = table);
  }

  goBack(): void {
    this.location.back();
  }
}

/*
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/