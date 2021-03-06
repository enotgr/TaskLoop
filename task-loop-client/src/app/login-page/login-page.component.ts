import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routeNames } from '../app-routing/route-names.const';
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
  httpErrorMessage: string;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;

    this.isLoading = false;
    this.httpErrorMessage = '';
  }

  ngOnInit(): void {
    this.authService.logout();

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

    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.loginForm.enable();
        this.isLoading = false;
        this.router.navigate([`/${routeNames.board}`]);
      },
      (response: HttpErrorResponse) => {
        this.httpErrorMessage = response.error?.message;
        this.isLoading = false;
        this.loginForm.enable();
      }
    );
  }
}
