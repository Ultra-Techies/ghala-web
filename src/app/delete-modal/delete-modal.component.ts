import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent implements OnInit {
  constructor(public modalRef: MdbModalRef<DeleteModalComponent>) {}

  ngOnInit(): void {}

  close(message?: string) {
    this.modalRef.close(message);
  }
}
