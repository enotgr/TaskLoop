import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private readonly http: HttpClient) {}

  public getProjects(): Observable<Project[]> {
    const url = '/api/projects';
    return this.http.get<Project[]>(url);
  }
}
