import { ListuserComponent } from './dashboard/user/listuser/listuser.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SupportComponent } from './dashboard/support/support.component';
import { UserComponent } from './dashboard/user/user.component';
import { CreateuserComponent } from './dashboard/user/createuser/createuser.component';

const routes: Routes = [
{path:'',component:AuthComponent},
{path:'auth',component:AuthComponent,children:[
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'reset',component:ResetComponent},
  {path:'forgot',component:ForgotComponent}
]},
{path:'',component:DashboardComponent,
children:[
  {path:'',component:HomeComponent},
  {path:'support',component:SupportComponent},
  {path:'home',component:HomeComponent},
  {path:'user',component:UserComponent,
    children:[
      {path:'',component:ListuserComponent},
      {path:'createuser',component:CreateuserComponent},
      {path:'listuser',component:ListuserComponent}]}]
},

{path:'**',redirectTo:'auth/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
