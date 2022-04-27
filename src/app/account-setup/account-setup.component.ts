import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.css'],
})
export class AccountSetupComponent implements OnInit {
  accountForm!: FormGroup;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    public formBuilder: FormBuilder
  ) {}
  warehouses = [
    { id: 1, name: 'Ruiru' },
    { id: 2, name: 'Rongai' },
    { id: 3, name: 'Kiambu' },
  ];

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assignedWarehouse: ['', Validators.required],
    });
  }
  submit() {
    //call modal popup

    alert('Registration SuccessFull');
    this.accountForm.reset();
    this.router.navigate(['dashboard']);
  }
}
export interface DialogData {
  name: string;
  email: string;
  warehouse: string;
}
