import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private readonly router: Router;
  private readonly authService: AuthService;

  loginForm: FormGroup;

  isLoading: boolean;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;

    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    this.loginForm.disable();
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      this.loginForm.enable();
      this.isLoading = false;
      // TODO: redirect
      this.router.navigate(['/board']);
    }, console.error);
  }
}
