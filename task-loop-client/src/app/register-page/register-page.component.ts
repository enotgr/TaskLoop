import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../shared/interfaces/company.interface';
import { User } from '../shared/interfaces/user.interface';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  private readonly authService: AuthService;

  registerForm: FormGroup;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      company: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    const company: Company = {
      name: this.registerForm.value.company,
    };

    this.authService.register(user, company).subscribe(
      () => {
        console.log('Login success');
      },
      (error) => console.warn(error)
    );
  }
}
