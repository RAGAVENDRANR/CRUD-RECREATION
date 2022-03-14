import { UserComponent } from './dashboard/user/user.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './add-ons/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DangerInterceptor } from './danger.interceptor';
import {ToastModule} from 'primeng/toast';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthComponent } from './auth/auth.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SupportComponent } from './dashboard/support/support.component';
import { CreateuserComponent } from './dashboard/user/createuser/createuser.component';
import { ListuserComponent } from './dashboard/user/listuser/listuser.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ForgotComponent,
    LoginComponent,
    ResetComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    SupportComponent,
    UserComponent,
    CreateuserComponent,
    ListuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule,
    HttpClientModule,
    ToastModule,
    NgxCaptchaModule
  ],
  providers: [ApiService,
    {provide:HTTP_INTERCEPTORS,useClass:DangerInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
