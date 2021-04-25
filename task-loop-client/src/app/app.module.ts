import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { BoardPageComponent } from './board-page/board-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BoardComponent } from './shared/components/board/board.component';
import { SettingsLayoutComponent } from './shared/layouts/settings-layout/settings-layout.component';
import { SettingsSidebarComponent } from './shared/components/settings-sidebar/settings-sidebar.component';
import { ProjectsSettingsComponent } from './shared/components/projects-settings/projects-settings.component';

const components = [
  AppComponent,
  MainLayoutComponent,
  AuthLayoutComponent,
  SettingsLayoutComponent,
  LoginPageComponent,
  RegisterPageComponent,
  BoardPageComponent,
  LoaderComponent,
  HeaderComponent,
  BoardComponent,
  SettingsSidebarComponent,
  ProjectsSettingsComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
