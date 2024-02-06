import { Component } from '@angular/core';
import { Admins } from '../interfaces/Admins';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminsService } from '../services/admins.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent {
  addAdminForm!: FormGroup;
  editAdminForm!: FormGroup;
  adminIdToDelete!: number;

  admins!:Admins[];
  deleteadmin: Admins = {
    id: 0,
    username:'',
    email:'',
    password:''
  };

  editadmin: Admins = {
    id: 0,
    username:'',
    email:'',
    password:''
  };

  constructor(private fb: FormBuilder, private adminService: AdminsService) { }

  ngOnInit(): void {
    this.getAdmins();
    this.addAdminForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.editAdminForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onOpenModal(admin: Admins, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editadmin = admin;
      button.setAttribute('data-target', '#editAdminModal');
    }
    if (mode === 'delete') {
      this.deleteadmin = admin;
      button.setAttribute('data-target', '#deleteAdminModal');
    }
    container!.appendChild(button);
    button.click();
  }

  addAdmin() {
    if (this.addAdminForm.valid) {
      this.adminService.addAdmins(this.addAdminForm.value).subscribe(
        (response: any) => {
          console.log(response);
          this.getAdmins();
          this.addAdminForm.reset();
        },
        (error: any) => {
          alert(error.message || 'An error occurred while adding the admin.');
        }
      );
    }
  }

  editAdmin(admin:Admins){
    this.adminService.updateAdmins(admin).subscribe(
      (response: Admins) => {
        console.log(response);
        this.getAdmins();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteAdmin(adminId:number){
    this.adminService.deleteAdmins(adminId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAdmins();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    );
  }


  public getAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (response: Admins[]) => {
        this.admins = response;
        console.log(this.admins);

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
