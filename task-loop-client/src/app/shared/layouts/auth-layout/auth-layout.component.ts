import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent {
  links = [
    { url: '/auth/register', name: 'Sign up' },
    { url: '/auth/login', name: 'Sign in' },
  ];

  constructor() {}
}
