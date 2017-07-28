import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookResolver } from './services/BookResolver';


const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  /*{path: 'home', component: HomeComponent, pathMatch: 'full'},*/
  {path: 'books', component: BooksComponent, resolve: [BookResolver]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
