import { Component } from '@angular/core';
import { DefaultLoginLayout } from '../../components/default-login-layout/default-login-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    DefaultLoginLayout
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  constructor(
    private router: Router
  ){}

  navigateToLogin(){
    this.router.navigate(['login'])
  }

  navigateToSignup(){
    this.router.navigate(['signup'])
  }
}

