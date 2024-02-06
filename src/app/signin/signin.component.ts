import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private authService: AuthServiceService, private router: Router) { }

  signin(email: string, mdp: string) {
    if (this.authService.login(email, mdp)) {
      this.router.navigate(['/dashboard']);
    }
    else{
      alert("login ou  mot de passe incorrect")
    }
  }
}
