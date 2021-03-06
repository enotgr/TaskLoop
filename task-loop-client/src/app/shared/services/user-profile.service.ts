import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private readonly http: HttpClient) {}

  public getUserInfo(): Observable<User> {
    const url = '/api/user-profile';
    return this.http.get<User>(url);
  }
}
