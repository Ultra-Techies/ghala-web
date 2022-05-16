import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Utils from 'app/helpers/Utils';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  public updateUserForm!: FormGroup;
  user: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  phoneNumber: string | null = null;
  assignedWarehouse: string | null = null;
  roles: any = Utils.getRoles();
  assignedRole: string | null = null;
  warehouses = JSON.stringify(JSON.parse(localStorage.getItem('warehouses')));

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public modalRef: MdbModalRef<UpdateUserComponent>
  ) {}

  ngOnInit(): void {
    this.firstName = this.user ? this.user[1] : null;
    this.lastName = this.user ? this.user[2] : null;
    this.email = this.user ? this.user[3] : null;
    this.phoneNumber = this.user ? this.user[4] : null;
    this.assignedWarehouse = Utils.getAssignedWarehouse()
      ? Utils.getAssignedWarehouse()
      : this.user[5];
    this.assignedRole = Utils.getUserData('assignedRole')
      ? Utils.getUserData('assignedRole')
      : this.user[6];

    this.updateUserForm = this.formBuilder.group({
      id: [this.user[0], Validators.required],
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      phoneNumber: [this.phoneNumber, Validators.required],
      assignedWarehouse: [this.assignedWarehouse, Validators.required],
      assignedRole: [this.assignedRole, Validators.required],
    });
  }

  close() {
    this.modalRef.close();
  }

  updateUser() {
    this.http
      .put(
        Utils.BASE_URL + 'users/',
        {
          id: this.updateUserForm.value.id,
          firstName: this.updateUserForm.value.firstName.trim(),
          lastName: this.updateUserForm.value.lastName.trim(),
          email: this.updateUserForm.value.email.trim(),
          phoneNumber: this.updateUserForm.value.phoneNumber.trim(),
          assignedWarehouse: parseInt(this.assignedWarehouse),
          assignedRole: this.updateUserForm.value.assignedRole.trim(),
        },
        {
          headers: Utils.getHeaders(),
        }
      )
      .subscribe(
        (data) => {
          Utils.saveUserData('assignedWarehouse', this.assignedWarehouse);
          Utils.saveUserData('assignedRole', this.assignedRole);
          Utils.saveUserData('firstName', this.updateUserForm.value.firstName);
          Utils.saveUserData('lastName', this.updateUserForm.value.lastName);
          Utils.saveUserData('email', this.updateUserForm.value.email);
          Utils.saveUserData(
            'phoneNumber',
            this.updateUserForm.value.phoneNumber
          );

          this.toastr.success('User updated successfully');
          this.modalRef.close();
        },
        (err) => {
          console.log('Error: ', err);
          this.toastr.error('Error updating user');
        }
      );
  }
}
