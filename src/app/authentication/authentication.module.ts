import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotfoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutes } from './authentication.routing';
import { LoginService } from '../services/api/login.service.old';
import { UserInfoService } from '../services/user-info.service';
import { AuthenticationService } from '../services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    FormsModule
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    LockComponent,

  ], providers: [

    LoginService,
    UserInfoService,
    AuthenticationService
  ],
})
export class AuthenticationModule { }
