import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './dashboard/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ForgotComponent } from './auth/forgot/forgot.component';

const routes: Routes = [
{path:'',component:AuthComponent},
{path:'auth',component:AuthComponent,children:[
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'reset',component:ResetComponent},
  {path:'forgot',component:ForgotComponent}
]},
{path:'home',component:HomeComponent},
{path:'**',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
