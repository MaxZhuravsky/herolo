import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  template: `<div class="modal-dialog" style="width: 15vw">
                <div class="modal-content">
                   <div class="modal-header text-center">
                    <!-- <button type="button" class="close" (click)="close()" >&times;</button>-->
                     <h4 class="modal-title text-danger">{{title || 'Confirm Book Deletion'}}</h4>
                   </div>
                   <div class="modal-body text-center">
                     <p>{{message || 'Are you sure?'}}</p>
                   </div>
                   <div class="modal-footer d-flex align-items-start ">
                       <button type="button" class="btn btn-danger mr-auto"  style="float: left" (click)="confirm()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`,

})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }

  // noinspection JSUnusedGlobalSymbols
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
}
