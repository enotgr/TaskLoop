import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardPageComponent } from '../board-page/board-page.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { ProjectsSettingsComponent } from '../shared/components/projects-settings/projects-settings.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthLayoutComponent } from '../shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
import { SettingsLayoutComponent } from '../shared/layouts/settings-layout/settings-layout.component';
import { routeNames } from './route-names.const';

const routes: Routes = [
  {
    path: '',
    redirectTo: routeNames.board,
    pathMatch: 'full',
  },
  {
    path: routeNames.auth,
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
  {
    path: routeNames.board,
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: BoardPageComponent },
      { path: '**', redirectTo: '' },
    ],
  },
  {
    path: routeNames.settings,
    component: SettingsLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new-project', component: ProjectsSettingsComponent },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '**', redirectTo: routeNames.board },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
