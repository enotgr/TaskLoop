import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { flatMap, map, tap } from 'rxjs/operators';
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
  private readonly authService: AuthService;
  private readonly companyService: CompanyService;

  registerForm: FormGroup;

  isCompany: boolean;

  constructor(authService: AuthService, companyService: CompanyService) {
    this.authService = authService;
    this.companyService = companyService;

    this.isCompany = false;
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
    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    if (!this.isCompany) {
      this.authService.register(user).subscribe(
        () => {
          console.log('Register user success');
        },
        (error) => console.warn(error)
      );
    } else {
      const company: Company = {
        name: this.registerForm.value.company,
      };

      this.authService
        .register(user)
        .pipe(
          tap(({ token }) => {
            this.authService.setToken(token);
            console.log('tap');
          }),
          map((res) => console.log('map res 1:', res)),
          flatMap(() => {
            console.log('flatMap');

            return this.companyService.registerCompany(company);
          }),
          map((res) => console.log('map res 2:', res))
        )
        .subscribe(
          (res) => console.log('map res 3:', res),
          (error) => console.warn(error) // TODO: toasts service
        );
    }
  }
}
