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
import { ToastrModule } from 'ngx-toastr';
import { ApiService } from './add-ons/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DangerInterceptor } from './danger.interceptor';
import { SupportComponent } from './support/support.component';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    CreateuserComponent,
    ListuserComponent,
    SupportComponent
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
    ToastModule
  ],
  providers: [ApiService,
    {provide:HTTP_INTERCEPTORS,useClass:DangerInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
