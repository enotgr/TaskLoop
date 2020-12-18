import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  registerCompany(company: Company): Observable<Company> {
    return this.http.post<Company>('/api/company', company);
  }
}
