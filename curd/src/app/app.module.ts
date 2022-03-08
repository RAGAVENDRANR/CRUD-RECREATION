import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { ListuserComponent } from './user/listuser/listuser.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './add-ons/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DangerInterceptor, fakeBackendProvider } from './danger.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    HttpClientModule
  ],
  providers: [ApiService,
    {provide:HTTP_INTERCEPTORS,useClass:DangerInterceptor,multi:true},
   // provider used to create fake backend
   fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
