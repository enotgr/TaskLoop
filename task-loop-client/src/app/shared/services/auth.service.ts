import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  register(user: User, company: Company): Observable<User> {
    return this.http.post<User>('/api/auth/register', {
      company: company.name,
      email: user.email,
      password: user.password,
    });
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user);
  }
}
