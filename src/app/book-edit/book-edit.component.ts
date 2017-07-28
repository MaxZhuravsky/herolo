import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-book-edit',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{book?.title | nonasci | capitalize: true}}</h4>

    </div>
    <div class="modal-body">

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `,
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  public book: Book;
  public index: number;
  public s: string;
  form: FormGroup;
  constructor(private bookService: BookService, private fb: FormBuilder, public bsModalRef: BsModalRef,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      author: ['', Validators.required]
    });
    //this.s.replace(/[^\x00-\x7F]/g, '')
  }
  updateBook() {

  }

  flush() {
    this.form.reset(this.book);
    this.cd.detectChanges();
  }
}
