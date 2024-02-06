import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from './admins.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  static isAuthenticated() {
    throw new Error('Method not implemented.');
  }

  constructor(private adminService:AdminsService,private router: Router) { }

  private authenticated=false;

  public login(username: string, pwd: string) {
    this.adminService.getAdmins().subscribe(admins => {
      const matchingAdmins = admins.filter(admin => admin.username === username && admin.password === pwd);
      this.authenticated = matchingAdmins.length > 0;
    });

    return this.authenticated;
  }

  public logout(){
    this.authenticated=false;
    this.router.navigate(['/signin']);
  }

  public isAuthenticated(){
    return this.authenticated;
  }
}
