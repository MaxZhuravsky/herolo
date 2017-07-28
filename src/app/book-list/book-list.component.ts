import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  public books: Book[];
  private booksSubscription: Subscription;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.booksSubscription = this.bookService.book$.subscribe(this.onBooksUpdate.bind(this))
  }

  onBooksUpdate(books: Book[]) {
    this.books = books;
  }


  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
