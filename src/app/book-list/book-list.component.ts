import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookEditComponent } from '../book-edit/book-edit.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  public books: Book[];
  bsModalRef: BsModalRef;
  public alerts: any = [];
  private isUpdated;
  private booksSubscription: Subscription;
  constructor(private bookService: BookService, private modalService: BsModalService) { }

  ngOnInit() {
    this.isUpdated = false;
    this.booksSubscription = this.bookService.book$.subscribe(this.onBooksUpdate.bind(this))
  }

  onBooksUpdate(books: Book[]) {
    this.books = books;
    if (this.isUpdated) {
      this.add();
    }
    this.isUpdated = true;
  }
  openModal(index) {
    this.bsModalRef = this.modalService.show(BookEditComponent);
    const component = <BookEditComponent>this.bsModalRef.content;
    component.book = this.books[index];
    component.index = index;
    component.flush();
  }
  test(book: Book) {
    const ascii = /^[A-Za-z0-9 ]*$/;
    if (!ascii.test(book.title)) {
      console.log('found non asci')
    }
     book.title = book.title.replace(/[^a-zA-Z0-9 ]/g, '');
    console.log(book.title);
  }

  public add(): void {
    this.alerts.push({
      type: 'info',
      msg: `Book updated successfully`,
      timeout: 3000
    });
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
