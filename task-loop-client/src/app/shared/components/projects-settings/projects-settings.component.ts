import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/project.interface';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects-settings',
  templateUrl: './projects-settings.component.html',
  styleUrls: ['./projects-settings.component.scss'],
})
export class ProjectsSettingsComponent implements OnInit {
  constructor(private readonly projectsService: ProjectsService) {}

  public ngOnInit(): void {
    this.projectsService.getProjects().subscribe((projects: Project[]) => {
      console.log('projects:', projects);
    });
  }
}
