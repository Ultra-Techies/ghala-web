import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
  departments = [
    { id: 1, name: 'Operations' },
    { id: 2, name: 'Dispatch' },
    { id: 3, name: 'Technology' },
    { id: 4, name: 'Finance' },
  ];
  roles = [
    { id: 1, name: 'Warehouse Supervisor' },
    { id: 2, name: 'Dispatch Associate' },
    { id: 3, name: 'Sales Supervisor' },
  ];
  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      assignedWarehouse: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  submit() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        warehouse: 'Rongai',
        role: 'Dispatch Associate',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
export interface DialogData {
  name: string;
  email: string;
  departments: string;
  warehouse: string;
  role: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./account-setup.component.css'],
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
