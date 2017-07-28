import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomValidators } from 'ng2-validation';
import { NonAsciPipe } from '../pipes/non-asci.pipe';
import { CapitalizePipe } from 'angular-pipes/src/string/capitalize.pipe';

@Component({
  selector: 'app-book-edit',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{book?.title | nonasci | capitalize: true}}</h4>

    </div>
    <div class="modal-body">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group p-3" [ngClass]="{
              'has-danger': inValid('title'),
              'has-success': isValid('title')
            }">
            <label class="col-form-label mr-3" for="title">Title</label>
            <input class="form-control p-2" id="title" formControlName="title">
            <div class="form-control-feedback" *ngIf="isTouched('title')">Title is required</div>

          </div>
          <div class="form-group p-3" [ngClass]="{
              'has-danger': inValid('date'),
              'has-success': isValid('date')
            }">
            <label class="col-form-label mr-3 ml-1" for="date">Date</label>
            <input class="form-control p-2" id="date" placeholder="1990/1/1" formControlName="date">
            <small class="form-text text-muted">ISO date - 1990/1/1</small>
            <div class="form-control-feedback" *ngIf="isTouched('date')">
              <p *ngIf="form.controls['date'].errors.required">Date is required</p>
              <p *ngIf="form.controls['date'].errors.dateISO">Date format: YYYY/MM/DD </p>
            </div>
          </div>
            <div class="form-group p-3" [ngClass]="{
              'has-danger': inValid('author'),
              'has-success': isValid('author')
            }">
            <label class="col-form-label mr-3 ml-1" for="author">Author</label>
            <input class="form-control p-2" id="author" formControlName="author">
              <div class="form-control-feedback" *ngIf="isTouched('author')">Author is required</div>
            </div>


      </form>
    </div>
    <div class="modal-footer">
        <button class="btn btn-success" [disabled]="!form.valid">Update</button>
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
    this.form.valueChanges.subscribe(() => {
      this.cd.detectChanges();
    })
  }
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      date: ['', [Validators.required, CustomValidators.dateISO]],
      author: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log(this.form.value);
    console.log(this.form.valid);
    this.bsModalRef.hide();
  }
  inValid(controlName: string) {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].dirty
  }
  isValid(controlName: string) {
    return this.form.controls[controlName].valid && this.form.controls[controlName].dirty
  }
  isTouched(controlName: string) {
    return this.form.controls[controlName].errors &&
      (this.form.controls[controlName].dirty || this.form.controls[controlName].touched)
  }

  flush() {
    this.book.title = new NonAsciPipe().transform(this.book.title);
    this.book.title = new CapitalizePipe().transform(this.book.title);
    this.form.reset();
    this.form.setValue(this.book);
    this.cd.detectChanges();
  }
}