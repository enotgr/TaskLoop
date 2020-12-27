import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat, Observable } from 'rxjs';
import { Company } from '../shared/interfaces/company.interface';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';
import { CompanyService } from '../shared/services/company.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  private readonly router: Router;
  private readonly authService: AuthService;
  private readonly companyService: CompanyService;

  registerForm: FormGroup;

  isCompany: boolean;

  isLoading: boolean;

  constructor(
    router: Router,
    authService: AuthService,
    companyService: CompanyService
  ) {
    this.router = router;
    this.authService = authService;
    this.companyService = companyService;

    this.isCompany = false;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onCheckIsCompany(isCompany: boolean): void {
    this.isCompany = isCompany;

    if (this.isCompany) {
      const companyControl = new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]);
      this.registerForm.addControl('company', companyControl);
    } else {
      this.registerForm.removeControl('company');
    }
  }

  onSubmit(): void {
    this.registerForm.disable();
    this.isLoading = true;

    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    let requests$: Observable<any> = concat(
      this.authService.register(user),
      this.authService.login(user)
    );

    if (this.isCompany) {
      const company: Company = {
        name: this.registerForm.value.company,
      };

      requests$ = concat(
        requests$,
        this.companyService.registerCompany(company)
      );
    }

    requests$.subscribe(console.log, console.error, () => {
      this.registerForm.reset();
      this.registerForm.enable();
      this.isLoading = false;
      // TODO: redirect
      this.router.navigate(['/board']);
    });
  }
}
