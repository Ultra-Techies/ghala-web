import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Utils from 'app/helpers/Utils';
import { ToastrService } from 'ngx-toastr';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dispatch-order',
  templateUrl: './dispatch-order.component.html',
  styleUrls: ['./dispatch-order.component.css'],
})
export class DispatchOrderComponent implements OnInit {
  payload: any[] = [];

  constructor(
    private http: HttpClient,
    toastr: ToastrService,
    public modalRef: MdbModalRef<DispatchOrderComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  close() {
    this.modalRef.close();
  }

  dispatchOrder() {
    //loop through the payload and dispatch the order
    this.payload.forEach((element) => {
      this.http
        .put(Utils.BASE_URL + 'deliverynotes/' + element[0] + '/1', '', {
          headers: Utils.getHeaders(),
        })
        .subscribe(
          (data) => {
            this.modalRef.close();
            console.log(data);
          },
          (err) => {
            console.log('Error: ', err);
            this.modalRef.close();
          }
        );
    });
  }
}
