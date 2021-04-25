import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { authConfig } from '../configs/auth.config';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient;

  private token: string;

  constructor(http: HttpClient) {
    this.http = http;

    this.token = null;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        this.setToken(token);
        console.log(`Token: ${this.token}`);
      })
    );
  }

  setToken(token: string | null) {
    localStorage.setItem(authConfig.tokenSelector, token);
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    console.log(`Token: ${this.token}`);

    // TODO: store and cookies
    const isToken = !!this.token;
    if (isToken) {
      return isToken;
    }

    this.token = localStorage.getItem(authConfig.tokenSelector);

    return !!this.token;
  }

  logout() {
    this.setToken('');
  }
}
