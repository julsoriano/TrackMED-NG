import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // in lieu of import { Http, Response } from '@angular/http';  

import { Observable, of } from 'rxjs';                   // in lieu of import { Observable } from 'rxjs/Rx'; 
import { catchError, tap } from 'rxjs/operators';          // in lieu of import 'rxjs/add/operator/map'; 

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class AppService{ 

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getItems(itemUrl:string): Observable<any> {
  return this.http.get(itemUrl)   
    .pipe(
      tap(items => this.log(`fetched items`)),
      catchError(this.handleError('getItems', []))
    );
  }

  // DELETE: delete the item from the server
  deleteItem(item: any | number, itemUrl:string): Observable<any> {
    const id = typeof item === 'number' ? item : item.id;
    const desc = typeof item === 'number' ? null : item.desc;
    const url = `${itemUrl}/${id}`;
    alert("desc: " + desc + " url: " + url);
    // alert("id: " + id + " name: " + item.desc + ", url: " + url);
    return this.http.delete(url, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<any>('deleteItem'))
    );
  }
  

  /*
  // GET description by id. Return `undefined` when id not found 
  getHeroNo404<Data>(id: number): Observable<Description> {
    const url = `${this.descriptionsUrl}/?id=${id}`;
    return this.http.get<Description[]>(url)
      .pipe(
      map(descriptions => descriptions[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} description id=${id}`);
      }),
      catchError(this.handleError<Description>(`getHero id=${id}`))
      );
  }

  // GET description by id. Will 404 if id not found
  getHero(id: number): Observable<Description> {
    const url = `${this.descriptionsUrl}/${id}`;
    return this.http.get<Description>(url)
    .pipe(
      tap(_ => this.log(`fetched description id=${id}`)),
      catchError(this.handleError<Description>(`getHero id=${id}`))
    );
  }

  // GET descriptions whose name contains search term
  searchHeroes(term: string): Observable<Description[]> {
    if (!term.trim()) {
      // if not search term, return empty description array.
      return of([]);
    }
    return this.http.get<Description[]>(`api/descriptions/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found descriptions matching "${term}"`)),
      catchError(this.handleError<Description[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  // POST: add a new description to the server 
  addHero(description: Description): Observable<Description> {
    return this.http.post<Description>(this.descriptionsUrl, description, httpOptions)
    .pipe(
      tap((description: Description) => this.log(`added description w/ id=${description.id}`)),
      catchError(this.handleError<Description>('addHero'))
    );
  }

  // DELETE: delete the description from the server
  deleteHero(description: Description | number): Observable<Description> {
    const id = typeof description === 'number' ? description : description.id;
    const url = `${this.descriptionsUrl}/${id}`;

    return this.http.delete<Description>(url, httpOptions)
    .pipe(
      tap(_ => this.log(`deleted description id=${id}`)),
      catchError(this.handleError<Description>('deleteHero'))
    );
  }

  // PUT: update the description on the server 
  updateHero(description: Description): Observable<any> {
    return this.http.put(this.descriptionsUrl, description, httpOptions)
    .pipe(
      tap(_ => this.log(`updated description id=${description.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  */

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('appService: ' + message);
  }
}  
