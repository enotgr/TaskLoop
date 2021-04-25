import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardPageComponent } from '../board-page/board-page.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthLayoutComponent } from '../shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';
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
  { path: '**', redirectTo: routeNames.board },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
