import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { BooksComponent } from './books/books.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from './services/book.service';
import { BookResolver } from './services/BookResolver';
import { AlertModule, DatepickerModule, ModalModule } from 'ngx-bootstrap';
import { BookEditComponent } from './book-edit/book-edit.component';
import { NgStringPipesModule } from 'angular-pipes';
import { NonAsciPipe } from './pipes/non-asci.pipe';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookListComponent,
    BookItemComponent,
    BooksComponent,
    BookEditComponent,
    NonAsciPipe,
    ConfirmComponent
  ],
  entryComponents: [
    BookEditComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    DatepickerModule.forRoot(),
    NgStringPipesModule,
    AlertModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [BookService, BookResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
