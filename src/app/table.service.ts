import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Table } from './table';
import { Tables } from './mock-tables';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})

export class TableService {

  constructor(private messageService: MessageService) { }


  /** GET tablees from mockt table */
  getTables(): Observable<Table[]> {
    this.messageService.add('TableService: fetched tables');
    return of(Tables);
  }

  getTable(id: number): Observable<Table> {
    // Todo: send the message _after_ fetching the table
    // this.messageService.add(`TableService: fetched table id=${id}`);
    return of(Tables.find(table => table.id === id));
  }
}
