import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Book } from '../models/Book';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BookService {
  private _BookSource = new BehaviorSubject<Book[]>(null);
  book$ = this._BookSource.asObservable();
  constructor(private httpService: Http) {
  }
  updateBooks(books: Book[]) {
    this._BookSource.next(books);
  }
  get BookSource(): Book[] {
    return this._BookSource.getValue();
  }
  fetchBooks() {
    return this.httpService.get('assets/books.mock.json')
      .map(this.extractData.bind(this))
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body: Book[] = res.json();
    this.updateBooks(body);
    return body || {};
  }
  private handleError(error: Response | any) {
    // TODO Add logging
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      errMsg = `${body.status} - ${body.message || ''}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  updateBookValues(book: Book, index: number) {
    const books = this.BookSource;
    books[index] = book;
    this.updateBooks(books);
  }
}
